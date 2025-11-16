# SkillUp — Course + AI Platform (starter)

This repo is a minimal, scalable starter for a course platform with AI features.

Stack:
- Backend: Node.js, Express, Prisma (Postgres), JWT
- Frontend: React + Vite
- DB: PostgreSQL (via docker-compose)
- AI: OpenAI-compatible endpoint (uses OPENAI_API_KEY)

Quick start (local):
1. Copy .env files (backend/.env.example -> backend/.env)
2. Set POSTGRES_PASSWORD, DATABASE_URL, JWT_SECRET, OPENAI_API_KEY in backend/.env
3. docker-compose up --build
4. Backend: http://localhost:4000
   Frontend: http://localhost:3000

What to extend:
- Add roles (instructors, students), subscriptions, payments (Stripe)
- Rich content editing (WYSIWYG, media storage)
- Course recommendations and personalized AI features
- CI/CD, monitoring, and autoscaling (Kubernetes)

This scaffold is intentionally small and ready to extend.