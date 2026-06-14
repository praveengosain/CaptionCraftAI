"""Backend API tests for CaptionCraft AI."""
import os
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://caption-gen-staging.preview.emergentagent.com").rstrip("/")
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def mongo_db():
    cli = MongoClient(MONGO_URL, serverSelectionTimeoutMS=3000)
    yield cli[DB_NAME]
    cli.close()


# ---------- Health check ----------
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert isinstance(data["message"], str)


# ---------- Caption generation ----------
class TestCaptionGenerate:
    def test_generate_success_yoga(self, api_client, mongo_db):
        payload = {
            "topic": "Morning yoga routine",
            "category": "Fitness",
            "tone": "Casual",
            "length": "Short",
        }
        r = api_client.post(f"{BASE_URL}/api/captions/generate", json=payload, timeout=60)
        assert r.status_code == 200, f"Body: {r.text}"
        data = r.json()
        # Response shape
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "caption" in data and isinstance(data["caption"], str) and len(data["caption"].strip()) > 0
        assert "hashtags" in data and isinstance(data["hashtags"], list) and len(data["hashtags"]) > 0
        for h in data["hashtags"]:
            assert isinstance(h, str)
            assert h.startswith("#"), f"hashtag missing #: {h}"
        assert "cta" in data and isinstance(data["cta"], str)
        # Echo
        assert data["topic"] == payload["topic"]
        assert data["category"] == payload["category"]
        assert data["tone"] == payload["tone"]
        assert data["length"] == payload["length"]
        # Persistence in MongoDB
        try:
            doc = mongo_db.captions.find_one({"id": data["id"]})
            assert doc is not None, "Caption not persisted in MongoDB collection 'captions'"
            assert doc["topic"] == payload["topic"]
            assert doc["caption"] == data["caption"]
        except Exception as e:
            pytest.fail(f"Mongo persistence check failed: {e}")

    def test_generate_invalid_category(self, api_client):
        payload = {
            "topic": "Valid topic here",
            "category": "Foo",
            "tone": "Casual",
            "length": "Short",
        }
        r = api_client.post(f"{BASE_URL}/api/captions/generate", json=payload, timeout=30)
        assert r.status_code == 422, f"Expected 422, got {r.status_code}: {r.text}"

    def test_generate_topic_too_short(self, api_client):
        payload = {
            "topic": "a",
            "category": "Fitness",
            "tone": "Casual",
            "length": "Short",
        }
        r = api_client.post(f"{BASE_URL}/api/captions/generate", json=payload, timeout=30)
        assert r.status_code == 422, f"Expected 422, got {r.status_code}: {r.text}"

    def test_generate_missing_fields(self, api_client):
        payload = {"topic": "Some valid topic"}
        r = api_client.post(f"{BASE_URL}/api/captions/generate", json=payload, timeout=30)
        assert r.status_code == 422, f"Expected 422, got {r.status_code}: {r.text}"

    def test_generate_invalid_tone(self, api_client):
        payload = {
            "topic": "Valid topic",
            "category": "Fitness",
            "tone": "Aggressive",
            "length": "Short",
        }
        r = api_client.post(f"{BASE_URL}/api/captions/generate", json=payload, timeout=30)
        assert r.status_code == 422
