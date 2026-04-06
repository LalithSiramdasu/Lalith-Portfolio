# Lalith Portfolio

Personal portfolio and publishing site for Siramdasu Lalith Kumar.

This repository now contains two coordinated apps:

- a React + TypeScript + Vite portfolio application
- an Astro-powered static backend blog pipeline that serves long-form backend engineering articles under the same domain

## What The Project Includes

- portfolio pages for about, projects, skills, education, certifications, resume, contact, legal, and coding profiles
- an editorial-style notes section for AI, ML systems, and applied engineering writing
- a dedicated backend blog index inside the portfolio at `/blogs/backend`
- statically generated backend article pages under `/backend-blogs/topic-.../`
- route-aware favicon handling
- responsive layouts for desktop and mobile
- admin login UI and Supabase-backed flows for selected features

## Current Architecture

### Portfolio App

The main app lives in [`src/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/src) and is built with:

- React 18
- TypeScript
- Vite 7
- Tailwind CSS
- React Router
- React Helmet Async
- Lucide React
- Supabase client SDK

### Backend Blog App

The backend blog app lives in [`apps/backend-blogs/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/apps/backend-blogs).

Important details:

- article source of truth is kept in [`apps/backend-blogs/source/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/apps/backend-blogs/source)
- Astro reads those source HTML files directly at build time
- temporary generated/staging folders are created only during dev/build and cleaned up afterward
- final backend blog output is merged directly into [`dist/backend-blogs/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/dist/backend-blogs) and [`dist/_astro/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/dist/_astro) during production builds
- the old committed generated copies in `public/backend-blogs` and `public/_astro` are no longer used

## Repo Structure

```text
apps/
  backend-blogs/
    source/
    src/

scripts/
  build-backend-blogs.mjs
  build-site.mjs
  clean-generated.mjs
  dev-backend-blogs.mjs
  dev-site.mjs
  prepare-backend-blog-stage.mjs

src/
  features/
    about/
    admin/
    backend-blogs/
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
```

## Environment Variables

Create a local env file such as `.env.local` in the project root.

```env
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_admin_password
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

Notes:

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are required for Supabase-backed functionality.
- admin login currently still has a local fallback path for development if env credentials are not supplied.
- all `VITE_*` variables are exposed to the client, so do not place server-only secrets here.

## Install

```bash
npm install
```

## Development

Run the complete local site:

```bash
npm run dev
```

This starts:

- the Vite portfolio app
- the Astro backend blog app

During development, the portfolio app proxies:

- `/backend-blogs/*`
- `/_astro/*`

to the Astro dev server so backend article routes work without committing generated files.

If needed, you can run each side separately:

```bash
npm run dev:app
npm run dev:backend-blogs
```

## Build

Full production build:

```bash
npm run build
```

What it does:

1. builds the React portfolio app into `dist`
2. builds the Astro backend blog app from `apps/backend-blogs/source`
3. merges backend blog output directly into `dist/backend-blogs` and `dist/_astro`
4. removes temporary Astro build/stage folders after completion

Build only the backend blog app:

```bash
npm run build:backend-blogs
```

## Other Scripts

```bash
npm run build:app
npm run clean:generated
npm run lint
npm run preview
```

Script notes:

- `build:app` builds only the React/Vite portfolio
- `clean:generated` removes generated blog output, Astro caches, staging folders, and legacy generated artifacts from the workspace
- `lint` currently runs TypeScript type checking with `tsc --noEmit`
- `preview` runs Vite preview for the main app output

## Backend Blog Migration Notes

The backend blogs were rebuilt to preserve the existing article design while improving delivery and workspace hygiene.

Key outcomes:

- same backend article route shape
- same long-form article shell and styling direction
- lower permanent repo duplication
- static Astro output instead of committed generated HTML copies
- self-hosted frontend font assets emitted through the build pipeline
- no long-lived `public/backend-blogs` or `public/_astro` source copies in the repo

## Deployment Output

After a successful build, deployable assets live in [`dist/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/dist).

Important output paths:

- [`dist/index.html`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/dist/index.html)
- [`dist/assets/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/dist/assets)
- [`dist/backend-blogs/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/dist/backend-blogs)
- [`dist/_astro/`](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/dist/_astro)

## License

This project is licensed under the MIT License. See [LICENSE](/c:/Users/HP/Desktop/portfolio/Lalith%20Portfolio/LICENSE).
