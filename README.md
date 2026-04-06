# Portfolio V2

Modern portfolio website for Siramdasu Lalith Kumar, built with React, TypeScript, Vite, and Tailwind CSS.

## Overview

This project is a polished personal portfolio focused on AI/ML, intelligent systems, and engineering work. It includes:

- a landing page with quick search-style navigation
- dedicated pages for about, projects, skills, education, certifications, resume, and contact
- coding profile highlights and competitive programming stats
- an editorial-style blogs section with data analyst and data scientist collections
- route-aware favicons and responsive desktop/mobile navigation
- admin and Supabase-backed functionality for selected flows

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Helmet Async
- Lucide React
- Supabase

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root and add the variables used by the app:

```env
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_admin_password
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

Notes:

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are required for the admin and Supabase-backed features.
- the app will still start without Supabase keys, but those features will not work correctly

### 3. Start the development server

```bash
npm run dev
```

Open the local Vite URL shown in your terminal.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Project Structure

```text
src/
  features/
    about/
    admin/
    blogs/
    certifications/
    coding-profiles/
    contact/
    education/
    legal/
    projects/
    resume/
    skills/
  hooks/
  lib/
  shared/
  App.tsx
  Home.tsx
```

## Highlights

- editorial blog experience with collection and article views
- mobile-first navigation with a bottom nav and full-screen menu
- collapsible desktop sidebar
- smooth motion and scroll behavior with reduced-motion support

## Build

To create a production build:

```bash
npm run build
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
