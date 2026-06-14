from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import json
import re
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Optional, Literal

from pydantic import BaseModel, Field, ConfigDict

from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")

app = FastAPI(title="CaptionCraft AI")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


CategoryType = Literal[
    "Travel", "Technology", "Business", "Fitness", "Food", "Personal Brand"
]
ToneType = Literal["Professional", "Casual", "Funny", "Inspirational", "Luxury"]
LengthType = Literal["Short", "Medium", "Long"]


class CaptionRequest(BaseModel):
    topic: str = Field(min_length=2, max_length=400)
    category: CategoryType
    tone: ToneType
    length: LengthType


class CaptionResponse(BaseModel):
    id: str
    caption: str
    hashtags: List[str]
    cta: str
    topic: str
    category: str
    tone: str
    length: str
    created_at: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "CaptionCraft AI is live"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


LENGTH_GUIDE = {
    "Short": "1-2 punchy sentences (under 180 characters).",
    "Medium": "2-4 sentences with strong hook, value, and CTA (180-400 characters).",
    "Long": "A storytelling caption with 4-7 sentences, line breaks, hook + value + CTA (400-700 characters).",
}


def _build_system_prompt() -> str:
    return (
        "You are CaptionCraft AI — an expert Instagram caption copywriter who helps "
        "creators, influencers, and brands write viral, engagement-optimised captions. "
        "You always respond with ONLY a valid JSON object (no markdown fences, no commentary). "
        "The JSON shape MUST be: "
        "{\"caption\": string, \"hashtags\": string[], \"cta\": string}. "
        "Rules: "
        "- caption must include 1-3 tasteful emojis placed naturally. "
        "- caption must start with a strong scroll-stopping hook. "
        "- hashtags: 10-15 mixed-volume hashtags (no spaces, include the # prefix), "
        "  blend niche + medium + broad reach, no banned tags, no duplicates. "
        "- cta: a single short call-to-action line (max 100 chars). "
        "Never break character. Never include explanations outside the JSON."
    )


def _build_user_prompt(req: CaptionRequest) -> str:
    return (
        f"Write an Instagram caption.\n"
        f"Topic: {req.topic}\n"
        f"Category/Niche: {req.category}\n"
        f"Tone: {req.tone}\n"
        f"Length: {req.length} — {LENGTH_GUIDE[req.length]}\n\n"
        "Return ONLY the JSON object as specified."
    )


def _parse_llm_json(raw: str) -> dict:
    """Extract a JSON object from the LLM response, tolerating stray text/fences."""
    if not raw:
        raise ValueError("Empty LLM response")
    text = raw.strip()
    # Strip code fences if present
    text = re.sub(r"^```(?:json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()
    # Locate first JSON object
    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError("No JSON object found in LLM response")
    return json.loads(match.group(0))


def _normalize_hashtags(items) -> List[str]:
    out: List[str] = []
    seen = set()
    if isinstance(items, str):
        items = items.split()
    for tag in items or []:
        t = str(tag).strip()
        if not t:
            continue
        if not t.startswith("#"):
            t = "#" + t.lstrip("#")
        t = re.sub(r"\s+", "", t)
        if t.lower() in seen:
            continue
        seen.add(t.lower())
        out.append(t)
    return out[:15]


@api_router.post("/captions/generate", response_model=CaptionResponse)
async def generate_caption(payload: CaptionRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(
            status_code=500,
            detail="Caption generation is unavailable: EMERGENT_LLM_KEY not configured.",
        )

    session_id = f"caption-{uuid.uuid4()}"
    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=_build_system_prompt(),
        ).with_model("openai", "gpt-5.2")

        user_msg = UserMessage(text=_build_user_prompt(payload))
        raw = await chat.send_message(user_msg)
    except Exception as exc:
        logging.exception("LLM call failed")
        raise HTTPException(status_code=502, detail=f"LLM error: {exc}") from exc

    try:
        parsed = _parse_llm_json(raw if isinstance(raw, str) else str(raw))
    except Exception as exc:
        logging.exception("Failed to parse LLM JSON response: %s", raw)
        raise HTTPException(
            status_code=502, detail=f"Could not parse AI response: {exc}"
        ) from exc

    caption_text = str(parsed.get("caption", "")).strip()
    hashtags = _normalize_hashtags(parsed.get("hashtags", []))
    cta_text = str(parsed.get("cta", "")).strip()
    if not caption_text:
        raise HTTPException(status_code=502, detail="AI did not return a caption.")

    doc = {
        "id": str(uuid.uuid4()),
        "topic": payload.topic,
        "category": payload.category,
        "tone": payload.tone,
        "length": payload.length,
        "caption": caption_text,
        "hashtags": hashtags,
        "cta": cta_text,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.captions.insert_one({**doc})
    doc.pop("_id", None)
    return CaptionResponse(**doc)


# Register router + middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
