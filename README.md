<p align="center">
  <img src="public/icon.svg" alt="TitanFlow Logo" width="80" height="80" />
</p>

<h1 align="center">⚡ TitanFlow — All-in-One Gym OS</h1>

<p align="center">
  A modern, feature-rich fitness dashboard built with <strong>Next.js 16</strong>, <strong>React 19</strong>, and <strong>Tailwind CSS v4</strong>.<br/>
  Track calories, log workouts, run HIIT timers, explore exercises, and manage your weekly schedule — all in one sleek app.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#database-setup">Database</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel" alt="Vercel" />
</p>

---

## ✨ Features

| Module | Description |
|---|---|
| 📊 **Dashboard** | Overview of your fitness stats, progress rings, daily goals, and quick-action cards. |
| 🔥 **Calorie Engine** | Smart calorie calculator with macro breakdown — set targets and track intake effortlessly. |
| ⏱️ **HIIT Timer** | Customizable High-Intensity Interval Training timer with work/rest phases and audio cues. |
| 🏋️ **Workout Log** | Log sets, reps, and weights for each session. Review your workout history over time. |
| 📚 **Exercise Library** | Browse through a curated list of exercises categorized by muscle group with instructions. |
| 🗓️ **Weekly Schedule** | Plan and organize your training week with a drag-friendly weekly calendar view. |

### Additional Highlights

- 🌙 **Dark Mode** support via `next-themes`
- 📱 **Fully Responsive** — Desktop sidebar + Mobile bottom navigation
- ✨ **Smooth Page Transitions** powered by Framer Motion
- 🧩 **57+ Reusable UI Components** built with Radix UI & shadcn/ui
- 📈 **Charts & Analytics** via Recharts
- 🔔 **Toast Notifications** via Sonner
- ♿ **Accessible** — Built on top of Radix UI primitives for ARIA compliance

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router, SSR, SSG |
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5.7](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | Animations & page transitions |
| [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) | Accessible, composable UI components |
| [Recharts](https://recharts.org/) | Data visualization / charts |
| [Lucide React](https://lucide.dev/) | Beautiful icon set |

### Backend & Database
| Technology | Purpose |
|---|---|
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | Serverless backend (inside `app/api/`) |
| [Prisma ORM](https://www.prisma.io/) | Type-safe database access |
| [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/)) | Cloud-hosted relational database |

### Other
| Technology | Purpose |
|---|---|
| [Vercel Analytics](https://vercel.com/analytics) | Web analytics & performance monitoring |
| [Zod](https://zod.dev/) | Schema validation |
| [React Hook Form](https://react-hook-form.com/) | Performant form management |
| [SWR](https://swr.vercel.app/) | Data fetching with caching & revalidation |

---

## 📸 Screenshots

> _Replace these placeholders with actual screenshots of your running application._

| Dashboard | Calorie Engine | HIIT Timer |
|---|---|---|
| ![Dashboard](https://via.placeholder.com/400x250?text=Dashboard) | ![Calorie Engine](https://via.placeholder.com/400x250?text=Calorie+Engine) | ![HIIT Timer](https://via.placeholder.com/400x250?text=HIIT+Timer) |

| Workout Log | Exercise Library | Weekly Schedule |
|---|---|---|
| ![Workout Log](https://via.placeholder.com/400x250?text=Workout+Log) | ![Exercise Library](https://via.placeholder.com/400x250?text=Exercise+Library) | ![Weekly Schedule](https://via.placeholder.com/400x250?text=Weekly+Schedule) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aravindhan222/gym2.git
cd gym2

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then edit .env and add your DATABASE_URL (see Database Setup below)

# 4. Push the Prisma schema to your database
npx prisma db push

# 5. Generate the Prisma client
npx prisma generate

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🗄️ Database Setup

TitanFlow uses **PostgreSQL** via [Neon](https://neon.tech/) (free tier available) and **Prisma ORM**.

### 1. Create a Free Database

Sign up at [neon.tech](https://neon.tech/) and create a new project. Copy the connection string.

### 2. Configure Environment

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@your-neon-host.neon.tech/neondb?sslmode=require"
```

### 3. Database Schema

The Prisma schema (`prisma/schema.prisma`) includes the following models:

```
User             → Members, Trainers, Admins (role-based)
MembershipPlan   → Available gym plans with pricing & duration
Membership       → Active user subscriptions linked to plans
GymClass         → Scheduled gym classes with capacity
ClassBooking     → User bookings for specific classes
```

**Entity Relationship:**

```
User ──┬── Membership ── MembershipPlan
       └── ClassBooking ── GymClass
```

### 4. Run Migrations

```bash
npx prisma db push      # Push schema to database
npx prisma generate     # Generate the Prisma Client
npx prisma studio       # (Optional) Open visual database editor
```

---

## ☁️ Deployment

### Deploy to Vercel (Recommended)

TitanFlow is optimized for [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TitanFlow"
   git remote add origin https://github.com/aravindhan222/gym2.git
   git branch -M main
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Vercel auto-detects Next.js and configures the build

3. **Add Environment Variables:**
   - In Vercel Project Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string

4. **Deploy!** — Your app will be live at `https://your-project.vercel.app` 🚀

---

## 📁 Project Structure

```
titanflow/
├── app/
│   ├── globals.css          # Global styles & Tailwind imports
│   ├── layout.tsx           # Root layout with metadata & fonts
│   └── page.tsx             # Main page with tab-based navigation
├── components/
│   ├── titanflow/           # Core feature components
│   │   ├── dashboard.tsx        # 📊 Dashboard overview
│   │   ├── calorie-engine.tsx   # 🔥 Calorie calculator
│   │   ├── hiit-timer.tsx       # ⏱️ HIIT interval timer
│   │   ├── workout-log.tsx      # 🏋️ Workout logging
│   │   ├── exercise-library.tsx # 📚 Exercise browser
│   │   ├── weekly-schedule.tsx  # 🗓️ Weekly planner
│   │   └── navigation.tsx       # Sidebar & bottom nav
│   ├── ui/                  # 57+ reusable UI components (shadcn/ui)
│   └── theme-provider.tsx   # Dark/light theme provider
├── hooks/
│   ├── use-mobile.ts        # Mobile detection hook
│   └── use-toast.ts         # Toast notification hook
├── lib/
│   └── utils.ts             # Utility functions (cn, etc.)
├── prisma/
│   └── schema.prisma        # Database schema (PostgreSQL)
├── public/                  # Static assets & icons
├── styles/
│   └── globals.css          # Additional global styles
├── .env                     # Environment variables (not committed)
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies & scripts
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server on `localhost:3000` |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint to check for code issues |
| `npx prisma studio` | Open Prisma's visual database browser |
| `npx prisma db push` | Sync Prisma schema with the database |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/awesome-feature`
3. **Commit** your changes: `git commit -m "Add awesome feature"`
4. **Push** to the branch: `git push origin feature/awesome-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with 💪 by <a href="https://github.com/aravindhan222">Aravindhan</a>
</p>
