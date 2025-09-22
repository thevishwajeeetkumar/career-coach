# Sens-AI Career Coach

> Next.js App Router • Tailwind/shadcn • Prisma (Postgres/Neon) • Clerk Auth • Gemini

[![Live Demo](https://img.shields.io/badge/Live-Demo-00b894)](https://career-coach-six.vercel.app/)
[![Status](https://img.shields.io/website?url=https%3A%2F%2Fcareer-coach-six.vercel.app)](https://career-coach-six.vercel.app)

> ⚠️ Access is restricted via Clerk. If you need demo access, please request an invite.

## 🚀 Live
**Production:** https://career-coach-six.vercel.app/

## ✨ Features
- AI interview coach & resume helper (Gemini)
- Auth & sessions (Clerk)
- Postgres/Prisma data layer (Neon)
- App Router, RSC, server actions, shadcn UI

## 🧰 Tech Stack
Next.js 15 • Tailwind/shadcn • Prisma • Postgres (Neon) • Clerk • Vercel

## 🖥️ Local Dev
```bash
git clone https://github.com/thevishwajeeetkumar/career-coach
cd career-coach
cp .env.example .env.local   # fill vars
npm ci
npx prisma generate
npm run dev
