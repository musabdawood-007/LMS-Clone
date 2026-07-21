# UET LMS Clone

> **Built by [Musab Projects](https://musab-007.netlify.app)** — a project group by Musab Dawood

An AI-powered Learning Management System clone for UET Lahore. A full-featured university student portal with authentication, academic modules, AI chat, and curriculum management for multiple campuses and departments.

---

## Features

- **Authentication System** — Login, registration, OTP email verification, forgot/reset password
- **Onboarding Flow** — Select campus, department, degree program, semester, and roll number
- **7 Module Categories:**
  - **Academic** — Calendar, offered subjects, timetables, course selection, convocation
  - **Hostel** — Admission, cancellation, complaints
  - **Results** — View DMC, recheck requests
  - **Fees & Challans** — Fee generation, summary, miscellaneous
  - **Student Services** — Profile, clearance, PEC registration, mentoring
  - **Scholarship** — Application and tracking
  - **Surveys** — Course, exit, and university surveys
- **AI Chat Assistant** — Built-in AI chatbot accessible from dashboard
- **Multi-Campus Support** — Main (Lahore), KSK, Faisalabad, RCET, Narowal
- **Comprehensive Curriculum Data** — Full semester-wise course plans for all departments

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 + shadcn/ui (48 components) |
| Styling | Tailwind CSS 4 |
| State | Zustand (auth store with localStorage) |
| Forms | React Hook Form + Zod |
| Database | MongoDB + Prisma |
| Auth | JWT (jose) + bcryptjs + OTP email |
| Email | Nodemailer (Gmail SMTP) |
| AI Chat | OpenAI-compatible API (byNara router) |
| Charts | Recharts |
| Animations | Framer Motion |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:3000

## Required Environment Variables

Create a `.env` file with:

```env
MONGODB_URI=mongodb+srv://...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
AI_API_KEY=your-api-key
JWT_SECRET=your-jwt-secret
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
LMS-Clone/
├── src/
│   ├── app/              # Next.js App Router + API routes
│   │   └── api/          # Auth, AI chat, profile endpoints
│   ├── components/       # Auth, dashboard, onboarding, UI (48 shadcn/ui)
│   ├── hooks/            # Custom hooks (mobile detection, toast)
│   ├── lib/              # Curriculum data, DB, email, utils
│   └── store/            # Zustand auth store
├── public/               # Static assets (logos)
└── prisma/               # MongoDB schema
```

## License

Built by [Musab Projects](https://musab-007.netlify.app) — a project group by Musab Dawood.
