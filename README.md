<div align="center">
  <img src="frontend/public/logo.png" alt="Calliope Logo" width="90" height="90" />
  
  # CΛLLiOPE

  ### *Your work deserves a real stage.*

  **A modern, full-stack SaaS portfolio builder.**  
  Build your professional portfolio in minutes — no HTML, no hosting headaches.

  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-calliope--frontend.vercel.app-7C3AED?style=for-the-badge)](https://calliope-frontend.vercel.app)

  [![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js_4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Frontend_Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://calliope-frontend.vercel.app)
  [![Render](https://img.shields.io/badge/Backend_Render-46E3B7?style=flat-square&logo=render&logoColor=black)](https://calliope-tdnz.onrender.com)

</div>

---

## 💡 The App Idea

**Calliope** solves a common problem for developers, designers, and creators: building and maintaining a personal portfolio takes hours of design work, setup, and deployment overhead. 

With Calliope, users sign in securely with **Google One-Tap**, fill out modular sections using an intuitive visual editor, customize theme surfaces and typography, and instantly publish a fast, mobile-optimized public page at a unique permanent URL (e.g. `/p/alex-developer`).

---

## ✨ Features

- 🎨 **Visual Profile Builder**: Live 3-pane real-time builder (Section Navigator, Editor, Live Preview) for Hero, About, Skills, Projects, Education, Experience, and Contact sections.
- ⚡ **Instant Publishing & Custom Slugs**: One-click publish generates a public link (`/p/your-slug`) with automated conflict-free slug fallback generation.
- 🌗 **Theme Customization**: Tailor page background, card surfaces, typography weights, and accent colors to reflect your personal brand in both Light & Dark modes.
- 📬 **Built-in Visitor Inbox**: Integrated messaging system allowing portfolio visitors to contact you directly without needing external mail client setups.
- 🔒 **Secure Authentication**: Frictionless Google OAuth login paired with HTTP-only, cross-site JWT cookies (`SameSite=None; Secure`).
- 🗑️ **Account Control (Danger Zone)**: Permanent account & portfolio deletion with double-confirmation email friction to prevent accidental data loss.
- 🖼️ **ImageKit Media Integration**: High-speed CDN media upload support for avatars, thumbnails, and project media.

---

## 🛠️ Technical Details & Architecture

Calliope is architected as an **npm workspaces monorepo** with strict end-to-end type safety shared between the frontend client and Express REST API backend.

```
calliope/
├── frontend/     # Next.js 16 (App Router, Tailwind v4, Framer Motion, TanStack Query)
├── backend/      # Express 4 REST API (Mongoose, JWT, Google OAuth Library)
└── shared/       # Monorepo workspace with shared TypeScript interfaces & schemas
```

### Tech Stack Breakdown

| Domain | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16 + React 19 | Server & Client Components using App Router |
| **Styling & UI** | Tailwind CSS v4 + Base UI + Lucide | Custom glassmorphism, responsive panels, dark theme tokens |
| **Animations** | Framer Motion | Smooth landing page reveals and micro-interactions |
| **Data & Forms** | TanStack Query v5 + React Hook Form + Zod | Reactive data fetching, caching, and strict schema validation |
| **Backend API** | Node.js + Express.js (TypeScript) | Modular REST API with structured controllers & error handling |
| **Database** | MongoDB Atlas + Mongoose | Document database with schema models (`User`, `Portfolio`, `Message`) |
| **Security & Auth** | Google Auth Library + JWT | Verified OAuth token exchange + HTTP-Only secure cookies |
| **Media CDN** | ImageKit | Cloud image upload and asset optimization |

---

## 🚀 Live Production Links

* **🌐 Application**: [https://calliope-frontend.vercel.app](https://calliope-frontend.vercel.app)
* **⚡ Backend API**: `https://calliope-tdnz.onrender.com`
* **🩺 API Health Endpoint**: [https://calliope-tdnz.onrender.com/health](https://calliope-tdnz.onrender.com/health)

---

## 💻 Local Development Setup

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB**: Local MongoDB server or a free MongoDB Atlas cluster

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/johanmanoj-dev/Calliope.git
cd Calliope

# Install all workspace dependencies across frontend, backend, and shared
npm install
```

### 2. Set Up Environment Variables

Create `.env` in `backend/`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/calliope
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
FRONTEND_URL=http://localhost:3000
```

Create `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### 3. Run Development Server

```bash
# Run both frontend and backend concurrently
npm run dev
```

* **Frontend**: `http://localhost:3000`
* **Backend API**: `http://localhost:5000`

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
