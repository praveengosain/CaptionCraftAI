# CaptionCraft AI

> Generate viral Instagram captions, hashtags, and CTAs in seconds — powered by AI.

A modern SaaS landing page for an AI-driven Instagram caption generator. React + FastAPI + MongoDB, with a live, working caption generator backed by GPT-5.2 (via the Emergent universal LLM key).

![CaptionCraft AI](https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&h=630&fit=crop)

---

## ✨ Features

- **Modern SaaS landing page** — 10 sections (Hero, Features, How It Works, Live Demo, Benefits, Testimonials, Pricing, FAQ, Final CTA, Footer)
- **Live AI caption generator** — type a topic, pick category/tone/length, get a caption + 10–15 smart hashtags + a CTA in seconds
- **Premium design** — purple/blue/pink gradient palette, Outfit + Plus Jakarta Sans typography, framer-motion animations, glassmorphism, animated "tracing beam" Pro pricing card
- **Mobile responsive** with hamburger nav
- **SEO optimised** meta tags

## 🛠 Tech Stack

| Layer        | Tech                                                                 |
| ------------ | -------------------------------------------------------------------- |
| **Frontend** | React 19 · Tailwind CSS · Shadcn UI · framer-motion · lucide-react    |
| **Backend**  | FastAPI · Motor (async MongoDB) · Pydantic v2                         |
| **LLM**      | GPT-5.2 via `emergentintegrations` (Emergent universal LLM key)       |
| **Database** | MongoDB                                                              |

## 📂 Project Structure

```
.
├── backend/                  # FastAPI app
│   ├── server.py             # Routes + LLM caption endpoint
│   ├── requirements.txt
│   └── .env                  # MONGO_URL, DB_NAME, EMERGENT_LLM_KEY (gitignored)
├── frontend/                 # React app (CRA + craco)
│   ├── src/
│   │   ├── pages/LandingPage.jsx
│   │   ├── components/landing/*  # Hero, Features, LiveDemo, etc.
│   │   └── constants/testIds/    # data-testid registry
│   ├── package.json
│   └── .env                  # REACT_APP_BACKEND_URL (gitignored)
└── memory/PRD.md             # product spec
```

## 🚀 Getting Started

### 1. Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env       # then fill in your secrets
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

`.env` requires:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=captioncraft
CORS_ORIGINS=*
EMERGENT_LLM_KEY=sk-emergent-xxxxxxxx
```

> Get your Emergent universal LLM key from your Emergent profile.

### 2. Frontend

```bash
cd frontend
yarn install
cp .env.example .env       # then set REACT_APP_BACKEND_URL
yarn start
```

`.env` requires:
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 3. Try it

Open http://localhost:3000 and scroll to the **Live Demo** section.

## 🔌 API

| Method | Path                      | Body                                              | Returns                                                                  |
| ------ | ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| `GET`  | `/api/`                   | —                                                 | health check                                                             |
| `POST` | `/api/captions/generate`  | `{topic, category, tone, length}`                 | `{id, caption, hashtags[], cta, topic, category, tone, length, created_at}` |

Allowed values:
- `category`: Travel · Technology · Business · Fitness · Food · Personal Brand
- `tone`: Professional · Casual · Funny · Inspirational · Luxury
- `length`: Short · Medium · Long

Example:
```bash
curl -X POST http://localhost:8001/api/captions/generate \
  -H "Content-Type: application/json" \
  -d '{"topic":"Sunset hike in Bali","category":"Travel","tone":"Inspirational","length":"Medium"}'
```

## 📜 License

MIT — feel free to fork, learn, and build on top.

## 🙏 Acknowledgements

Built with [Emergent](https://app.emergent.sh).
