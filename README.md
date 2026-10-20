# UET LMS Clone

> **Built by [Musab Projects](https://musab-007.netlify.app)** — a project group by Musab Dawood

An AI-powered Learning Management System clone for UET Lahore. It provides a university student portal with authentication, onboarding, academic modules, AI assistance, and curriculum management for multiple campuses.

## Features

- Authentication with registration, OTP email verification, and password reset
- Onboarding for campus, department, degree, semester, and roll number
- Academic calendar, offered subjects, timetable, course selection, and convocation modules
- Hostel admission, cancellation, and complaint workflows
- Results, DMC, and recheck-request features
- Fees, challans, fee summaries, and miscellaneous payments
- Student profile, clearance, PEC registration, and mentoring services
- Scholarship applications and tracking
- Course, exit, and university surveys
- Built-in AI chat assistant
- Support for Lahore, KSK, Faisalabad, RCET, and Narowal campuses
- Semester-wise curriculum data for multiple departments

## Tech stack

| Area | Technology |
|---|---|
| Framework | Next.js 16.1.1 with App Router |
| Language | TypeScript 5 |
| UI | React 19, Radix UI, and shadcn/ui patterns |
| Styling | Tailwind CSS 4 |
| State | Zustand |
| Forms and validation | React Hook Form and Zod |
| Database | MongoDB |
| Authentication | JWT with jose, bcryptjs, and OTP email |
| Email | Nodemailer |
| AI chat | OpenAI-compatible API |
| Charts | Recharts |
| Animation | Framer Motion |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env` file and configure the MongoDB connection, SMTP credentials, AI API key, and JWT secret required by your deployment:

```env
MONGODB_URI=mongodb+srv://...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your-app-password
AI_API_KEY=your-api-key
JWT_SECRET=your-jwt-secret
```

Never commit environment files or credentials to Git.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project structure

```text
LMS-Clone/
├── src/app/              # Pages, layouts, and API routes
├── src/components/       # Auth, dashboard, onboarding, and UI components
├── src/hooks/            # Custom React hooks
├── src/lib/              # Curriculum, database, email, and utilities
├── src/store/            # Zustand authentication store
├── public/               # Static assets and logos
└── prisma/               # Repository database-related files
```

## License

Built by [Musab Projects](https://musab-007.netlify.app) — a project group by Musab Dawood.
