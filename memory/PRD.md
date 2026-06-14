# CaptionCraft AI — PRD

## Original Problem Statement
Build a modern SaaS landing page for an AI Instagram Caption Generator called **CaptionCraft AI**. Premium SaaS look, light theme, purple/blue/pink gradients, smooth animations, mobile responsive. Includes 10 sections (Hero, Features, How It Works, Live Demo, Benefits, Testimonials, Pricing, FAQ, Final CTA, Footer) and an interactive caption generator demo.

## User Personas
- **Solo creators / influencers** who post daily and need consistent captions.
- **Social media managers / agencies** running multiple brand accounts.
- **Small business owners** who want on-brand captions without hiring a copywriter.

## Architecture
- **Backend** (`/app/backend/server.py`): FastAPI with `/api` prefix. Endpoints:
  - `GET /api/` — health check
  - `POST /api/captions/generate` — generate caption + hashtags + CTA via GPT-5.2 (Emergent Universal Key, `emergentintegrations`)
  - `POST /api/status` / `GET /api/status` — template status checks
- **DB**: MongoDB. Collections: `captions`, `status_checks`. ISO timestamps, no raw ObjectId returned.
- **Frontend** (`/app/frontend/src`):
  - `pages/LandingPage.jsx` orchestrates 10 sections.
  - `components/landing/*` — Navbar, Hero, Features, HowItWorks, LiveDemo, Benefits, Testimonials, Pricing, FAQ, FinalCTA, Footer.
  - Stack: React 19 + Tailwind + Shadcn UI (Select, Textarea, Accordion, Sonner) + framer-motion + lucide-react.
  - Fonts: Outfit (headings) + Plus Jakarta Sans (body) via Google Fonts.
- **Integration**: GPT-5.2 via Emergent Universal LLM key (env: `EMERGENT_LLM_KEY`).

## Core Requirements (static)
- Light theme, purple/blue/pink gradient accents, premium SaaS feel.
- Mobile responsive (Navbar collapses to hamburger).
- Smooth scroll + framer-motion entrance animations.
- Live, working caption generator (no signup required).
- SEO meta tags + descriptive page title.
- All interactive elements use kebab-case `data-testid`.

## What's Implemented (2026-12)
- ✅ 10-section landing page (Navbar, Hero, Features, How It Works, Live Demo, Benefits, Testimonials, Pricing, FAQ, Final CTA, Footer)
- ✅ Live caption generator backed by GPT-5.2 (returns caption + 10–15 hashtags + CTA)
- ✅ Sample buttons that pre-fill the demo with curated examples
- ✅ Copy-to-clipboard with toast feedback (sonner)
- ✅ Pricing with animated gradient "tracing beam" border on Pro
- ✅ FAQ accordion (shadcn)
- ✅ Mobile-responsive navbar with hamburger menu
- ✅ SEO meta tags, Outfit + Plus Jakarta Sans fonts

## Prioritized Backlog (post-1st-finish)
- **P1** — Signup/auth flow + persisted caption history per user
- **P1** — Multiple variations per generation (Pro plan promise)
- **P2** — Brand voice presets (save tone + style guide per project)
- **P2** — Direct Instagram OAuth + scheduled posting
- **P2** — Analytics dashboard (which captions drove most engagement)
- **P3** — Team workspaces / agency mode
