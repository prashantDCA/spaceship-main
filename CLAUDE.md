# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ANYA SEGEN is a Next.js 15 agency operations platform. It supports two distinct user roles — **admin** and **user** — each with a dedicated sidebar-driven dashboard. Admins manage clients, team members, departments, documents, a kanban board, a content calendar, and AI-generated social content. Regular users browse knowledge-base documents scoped to their department and view clients shared with them.

## Development Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Required Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   # used by admin server actions
GOOGLE_API_KEY              # Gemini 2.5 Flash Lite for AI chat
GROQ_API_KEY                # Groq fallback for AI chat
```

## Architecture

### Request / Auth Flow

1. `src/middleware.ts` runs on every non-static request; it calls `updateSession` from `src/lib/supabase/middleware.ts` (part of `@supabase/ssr`) to refresh the Supabase session cookie.
2. `AuthProvider` in `src/lib/auth.tsx` wraps the whole app and exposes `useAuth()`. It calls `supabase.auth.getUser()` on mount and subscribes to `onAuthStateChange`. `isAdmin` is derived from `profile.role === 'admin'`.
3. Route guards — `ProtectedRoute`, `AdminRoute`, `UserRoute` in `src/components/` — read from `useAuth()` and redirect unauthenticated / unauthorised users.

### Supabase Client Variants

| File | When to use |
|---|---|
| `src/lib/supabase/client.ts` | Client components (`createBrowserClient`) |
| `src/lib/supabase/server.ts` | Server components / Route Handlers (requires `cookies()`) |
| `src/lib/supabase/admin.ts` | Server Actions that need service-role bypass (admin ops) |
| `src/lib/supabase.ts` | Legacy re-export used by some older client components |

### Server Actions (`src/app/actions/`)

All data mutations go through Next.js Server Actions (`'use server'`). The naming convention is `admin-<feature>.ts` for admin-only actions and bare names for shared/user actions. AI features use `ai-chat.ts` (Gemini primary, Groq fallback) and `ai-analysis.ts`.

### Dashboard Structure

Both `/dashboard` and `/admin` are single-page shell components that render a `<Sidebar>` and a content pane. Navigation is purely state-based (`activeTab` string) — switching tabs does **not** change the URL (except for tab state read from `?tab=` query param in the admin page). Feature sections are lazy-loaded components under `src/components/admin/` and `src/components/user/`.

**Admin tabs:** overview, members, messages, assets, departments, clients, content, documents, calendar, kanban, settings

**User tabs:** clients (shared), messages, knowledge-base, notifications, profile

### Key Database Tables

- `profiles` — extends Supabase auth users; holds `role`, `department_id`, `first_name`, `last_name`
- `departments` — org units; documents and profiles reference these
- `documents` — knowledge-base articles scoped by `department_id`, gated by `is_published`
- `content_posts` — social content drafts with `status` (`pending_review`, `approved`, etc.) and `is_scheduled` / `scheduled_for`
- `clients` — agency clients; can be shared with specific users

### Styling

Dark theme throughout. Backgrounds: `black` (page) → `gray-900` (sidebar) → `gray-800` (cards). Primary action colour: `blue-600` / `blue-400`. All UI primitives live in `src/components/ui/` and follow the shadcn/ui pattern (Radix UI + CVA variants).

### Path Alias

`@/*` → `src/*`
