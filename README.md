# 🔖 Smart Bookmark App

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

> A production-ready, real-time bookmark manager built with Next.js, Supabase, and Vercel.

---

## 🌐 Live Demo

🚀 https://smart-bookmark-app-pi-lemon.vercel.app

---

## ✨ Features

- 🔐 Google OAuth Authentication
- 🔒 Private user bookmarks (Row Level Security)
- ⚡ Real-time multi-tab sync
- 🚫 Duplicate URL prevention
- 🌙 Dark neon UI
- 🖼 Website preview thumbnails
- 📱 Fully responsive design
- 🚀 Production deployed on Vercel

---

## 🛠 Tech Stack

**Frontend**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- React Hot Toast

**Backend**
- Supabase (PostgreSQL + Auth + Realtime)
- Row Level Security (RLS)

**Deployment**
- Vercel
- GitHub

---

## ⚠️ Challenges Faced

Realtime DELETE events not syncing across tabs

TypeScript typing issues with Supabase Realtime payloads

Duplicate bookmark race conditions

OAuth redirect misconfiguration in production

Vercel build failures due to missing environment variables

Enforcing strict per-user data isolation with RLS

---

## ✅ Solutions Implemented

Enabled REPLICA IDENTITY FULL for proper realtime delete tracking

Derived strict types from Supabase Database schema

Added UNIQUE (user_id, url) constraint to prevent duplicates

Corrected OAuth flow configuration (Google → Supabase → App)

Configured environment variables properly in Vercel

Implemented secure Row Level Security policies

---

## 🔐 Security Architecture

- UUID Primary Keys
- Unique constraint on `(user_id, url)`
- RLS policies enforce per-user data isolation
- Supabase Realtime filtered by user_id

---

## ⚡ Real-Time Behavior

- INSERT sync across tabs
- DELETE sync across tabs
- UPDATE sync across tabs
- Replica identity FULL enabled for delete tracking

---

## 🧑‍💻 Local Setup

```bash
git clone https://github.com/Harsha0116/smart-bookmark-app.git
cd smart-bookmark-app
npm install

-Create .env.local:
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

-Run:
npm run dev
```
---

## 🚀 Deployment

- ▲ Vercel (Production Hosting)
- 🐙 GitHub (Version Control)

---

🏆 What This Project Demonstrates

Full-stack production architecture

Secure multi-tenant database design

OAuth implementation

Realtime WebSocket integration

Type-safe Supabase integration

CI/CD deployment via Vercel

---

👨‍💻 Author:
Harsha Vardhan🖤
