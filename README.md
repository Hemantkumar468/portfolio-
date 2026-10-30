# Hemant Kushwaha — 3D Portfolio (React 19 + Three.js + Motion)

Production-grade, highly animated 3D developer portfolio for **Hemant Kushwaha**, MERN Full Stack Developer and ERP Systems Specialist.

---

## 🚀 Architectural & Thematic Highlights

- **Separate Route Per Section**:
  - `/` — Hero (Home)
  - `/about` — About (Summary, BCA at Eklavya University, Coding Ninjas verified certs, animated counters)
  - `/skills` — Skills (Interactive CSS-3D orbiting ring + categorized skills grid)
  - `/experience` — Experience (D-Table Analytics internship & interactive 5 ERP modules breakdown)
  - `/projects` — Projects (PMS – ERP System, Order-to-Dispatch ERP, Mojito – Cocktail Platform)
  - `/contact` — Contact (Working RTK Query form + direct phone/email/socials)
  - Each route renders only its dedicated page with `PageShell` enter/exit transitions (`AnimatePresence mode="wait"`), and auto-scrolls to top on navigation.
- **Route-Driven 3D Scene**:
  - The current route drives `scrollProgress = routeIndex / (routes - 1)`.
  - The Three.js render loop reads `store.getState().ui.scrollProgress` and smoothly eases between keyframe coordinates.
  - On non-home routes (`/about`, `/skills`, `/experience`, `/projects`, `/contact`), the 3D core **recedes** (scales down, moves further back, and lowers opacity) so text readability is 100% crystal clear.
- **Light Theme**:
  - Pale lavender background (`#f4f5ff`) with soft ambient radial tints.
  - Dark ink text (`text-slate-900`) and white glass cards with soft drop shadows.
  - Saturated violet (`#7c3aed`), cyan (`#0284c7`), and pink (`#db2777`) accents.
  - Three.js uses **normal blending** (`THREE.NormalBlending`) with saturated darker particle colors and light lavender fog for crisp definition.
- **Mobile-First Experience**:
  - Base styles crafted for 360px and up with zero horizontal overflow.
  - On mobile (`< md`), a thumb-reach **bottom tab bar** with tactile icons and labels (safe-area aware).
  - On desktop (`md:` and up), a floating top navigation pill with animated active tab indicator.
  - Letter-by-letter 3D hero entrance that cleanly wraps by word on mobile screens.

---

## 🛠️ Hard Constraints & Dependencies

- **Frontend**:
  - `react@^19.3.1` & `react-dom@^19.3.1`
  - `react-router-dom@^7.18.5` (separate route per section)
  - `three@^0.186.1` (fullscreen canvas with normal blending on light theme)
  - `motion@^14.7.1` (`import { motion } from "motion/react"`)
  - `@reduxjs/toolkit@^2.13.0` & `react-redux@^9.3.1` (UI state + RTK Query contact API)
  - `tailwindcss@^4.3.3` with `@tailwindcss/vite@^4.3.3` (modern `@theme` variables, no legacy `tailwind.config.js`)
  - `vite@^8.3.5` with Rolldown (Three.js lazy loaded via `React.lazy`)
  - `oxlint@^1.89.0` (0 errors, 0 warnings)
- **Backend**:
  - `express@^5.3.0` (ESM `"type": "module"`)
  - `mongoose@^9.11.4` (Contact schema with validation & offline fallback)
  - Manual CORS middleware without external runtime libraries
  - In-memory IP rate limiter protecting `/api/contact`

---

## 📁 Architecture Overview

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BottomNav.tsx      # Mobile thumb-reach bottom tab bar (safe-area aware)
│   │   │   ├── PageShell.tsx      # AnimatePresence enter/exit motion wrapper
│   │   │   ├── Navbar.tsx         # Desktop top navigation pill + mobile header
│   │   │   ├── Hero.tsx           # 3D letter stagger entrance, typewriter subroles, CTA badges
│   │   │   ├── About.tsx          # Summary, education, verified certs, animated counters
│   │   │   ├── Skills.tsx         # CSS-3D orbiting skill ring + categorized cards
│   │   │   ├── Experience.tsx     # D-Table Analytics internship & 5 ERP modules breakdown
│   │   │   ├── Projects.tsx       # 3 core ERP & Web projects with 3D tilt & dynamic spotlight
│   │   │   ├── Contact.tsx        # Working RTK Query form + direct phone/email/socials
│   │   │   ├── Tilt.tsx           # Pointer-based 3D tilt card with radial spotlight
│   │   │   ├── Reveal.tsx         # Motion whileInView blur-fade wrapper
│   │   │   ├── SectionTitle.tsx   # Neon eyebrow tag and gradient headings
│   │   │   └── Cursor.tsx         # Custom spring cursor (pointer: fine only)
│   │   ├── pages/
│   │   │   ├── HomePage.tsx       # /
│   │   │   ├── AboutPage.tsx      # /about
│   │   │   ├── SkillsPage.tsx     # /skills
│   │   │   ├── ExperiencePage.tsx # /experience
│   │   │   ├── ProjectsPage.tsx   # /projects
│   │   │   └── ContactPage.tsx    # /contact
│   │   ├── data/
│   │   │   └── resume.ts          # Typed single source of truth from resume PDF
│   │   ├── store/
│   │   │   ├── api.ts             # RTK Query POST /api/contact & GET /api/health
│   │   │   ├── hooks.ts           # Typed useAppDispatch & useAppSelector
│   │   │   ├── index.ts           # Redux configureStore
│   │   │   └── uiSlice.ts         # scrollProgress, activeSection, cursorVariant
│   │   ├── three/
│   │   │   └── Scene.tsx          # Fullscreen 3D Three.js canvas reading store.getState()
│   │   ├── App.tsx, main.tsx, index.css, vite-env.d.ts
│   │   └── index.html, vite.config.ts, tsconfig.json
└── backend/
    ├── index.js                   # Express 5 server, manual CORS, rate-limiting, /api/health, /api/contact
    ├── models/
    │   └── Contact.js             # Mongoose Contact model & field validators
    ├── .env.example
    └── package.json
```

---

## 🏃 Quick Start Guide

### 1. Start the Backend API

```bash
cd backend
npm run dev
# or: node index.js
```
The API server starts on **`http://localhost:5000`**.

### 2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```
The Vite development server starts on **`http://localhost:5173`** with an automated proxy forwarding `/api` requests to `http://localhost:5000`.

### 3. Build & Lint (Verification)

```bash
# Inside frontend:
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

---

## ⚙️ Environment Variables (`backend/.env`)

Copy `backend/.env.example` to `backend/.env`:

| Variable | Default Value | Description |
|---|---|---|
| `PORT` | `5000` | Port for the Express backend server |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/portfolio` | MongoDB connection string |
| `CLIENT_ORIGIN` | `http://localhost:5173` | Allowed origin for manual CORS handling |

> **Note on MongoDB**: If MongoDB is running locally, inquiries are stored in MongoDB. If MongoDB is offline, the backend logs the message to the server console and returns a success response with a tracking ID without failing.

---

## 🔗 Verified Resume Links & Credentials

- **LinkedIn**: [https://www.linkedin.com/in/hemant-kushwaha-dev](https://www.linkedin.com/in/hemant-kushwaha-dev)
- **GitHub**: [https://github.com/Hemantkumar468](https://github.com/Hemantkumar468)
- **Email**: [kushwahhemant766@gmail.com](mailto:kushwahhemant766@gmail.com)
- **Phone**: `+91 7495008424`
- **Projects**:
  - **PMS – ERP System**: [GitHub](https://github.com/Hemantkumar468/real) · [Live Demo](https://real-sooty-five.vercel.app)
  - **Order-to-Dispatch ERP**: [GitHub](https://github.com/Hemantkumar468/Order-to-dispatch-) · [Live Demo](https://deluxe-pasca-d1c123.netlify.app/dashboard)
  - **Mojito – Cocktail Recipe Platform**: [GitHub](https://github.com/Hemantkumar468/mojito) · [Live Demo](https://mojito-eight-beta.vercel.app/)
  - **Redefine Gaming – 3D Metagame Platform**: [GitHub](https://github.com/Hemantkumar468/gaming) · [Live Demo](https://gaming-gamma-taupe.vercel.app)
- **Coding Ninjas Certifications**:
  - Full Stack Web Development: [Credential](https://certificate.codingninjas.com/view/7fc0a5f7911796f9)
  - Generative AI: [Credential](https://certificate.codingninjas.com/view/404e582c1738c5a8)
  - Soft Skills: [Credential](https://certificate.codingninjas.com/view/9fc81421db130aa1)
  - Data Structures & Python: [Credential](https://certificate.codingninjas.com/view/54b5671dcc81fb69)
