# Calliope

> **Build your professional portfolio. Never touch HTML again.**

Calliope is a modern SaaS portfolio builder for developers, designers, students, and professionals. Sign in with Google, fill out visual forms, publish once, and share your permanent portfolio link forever.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14+ (TypeScript, App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Motion (Framer Motion) |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query |
| Backend | Node.js + Express.js (TypeScript) |
| Auth | Google OAuth + JWT (HTTP-only cookie) |
| Database | MongoDB Atlas (Mongoose) |
| Images | ImageKit CDN |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## Project Structure

```
calliope/
├── frontend/     # Next.js app
├── backend/      # Express REST API
└── shared/       # Shared types and constants
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# Install all workspace deps
npm install

# Copy env template
cp backend/.env.example backend/.env
# Fill in your keys in backend/.env

# Run both dev servers
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000  
Health: http://localhost:5000/health

---

## Environment Variables

See `backend/.env.example` for required keys:
- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — Secret for JWT signing
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth credentials
- `IMAGEKIT_*` — ImageKit credentials

---

## Build Phases

See [calliope-implementation-plan.md](../calliope-implementation-plan.md) for the full phased build plan.
