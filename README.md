# AI-Powered Spend Audit Platform

An intelligent procurement and spend optimization platform built using React, TanStack Router, Vite, Tailwind CSS, and Supabase.

This platform helps businesses analyze procurement workflows, optimize vendor spending, and improve financial decision-making using AI-driven insights.

---

# Features

* AI-powered procurement audit interface
* Modern responsive dashboard UI
* Vendor and spend analysis workflow
* Smart optimization recommendations
* FAQ and onboarding sections
* Fast routing using TanStack Router
* Scalable React architecture
* Tailwind CSS modern design system
* Supabase backend integration
* Fully deployable using Vercel

---

# Tech Stack

## Frontend

* React 19
* Vite
* TypeScript
* TanStack Router
* Tailwind CSS
* Radix UI
* React Hook Form
* Recharts

## Backend / Services

* Supabase

## Deployment

* Vercel
webiste is live at: https://vercel.com/ankisinghhs-projects/real-time-spend-optimization-engine/Ekr2hiNhaeYpWkHxBzmtNwRENc3V

if not run locally at the : http://localhost:5174/

---

# Project Structure

```bash
src/
 ├── components/
 │    ├── audit/
 │    ├── ui/
 │
 ├── routes/
 │    ├── index.tsx
 │
 ├── lib/
 ├── hooks/
 ├── styles/
 │
 └── main.tsx
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-powered-spend-audit-platform.git
```

```bash
cd ai-powered-spend-audit-platform
```

---

# Install Dependencies

```bash
npm install
```

---

# Run Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# Build For Production

```bash
npm run build
```

---

# Preview Production Build

```bash
npm run preview
```

---

# Vercel Deployment Guide

## Step 1 — Push Project To GitHub

Initialize Git:

```bash
git init
git add .
git commit -m "Initial commit"
```

Add remote repository:

```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

---

## Step 2 — Deploy Using Vercel

1. Open Vercel
2. Import GitHub repository
3. Select the project repository
4. Framework preset: `Vite`
5. Add environment variables from `.env`
6. Click Deploy

---

# Important Notes

* Never upload `.env` publicly.
* Ensure `.env` is included in `.gitignore`.
* Remove unused Cloudflare or Lovable configs if not needed.
* Recommended Node.js version: `20+`

---

# Available Scripts

## Start Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Run ESLint

```bash
npm run lint
```

---

# Future Improvements

* Authentication system
* AI-generated spend recommendations
* Vendor comparison analytics
* Expense forecasting
* Admin dashboard
* Role-based access control
* PDF report generation
* Docker support
* CI/CD pipeline integration

---

# Deployment Stack

| Service  | Purpose            |
| -------- | ------------------ |
| Vercel   | Frontend Hosting   |
| Supabase | Database & Backend |
| GitHub   | Version Control    |

---

# Author

Developed as a modern full-stack AI procurement optimization platform.

---

# License

This project is open-source and available for learning and development purposes.
