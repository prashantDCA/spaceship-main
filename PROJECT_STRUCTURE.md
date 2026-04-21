# Project Structure — ANYA SEGEN

Next.js 15 agency operations platform with admin and user dashboards, backed by Supabase.

```
spaceship-main/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   ├── admin-calendar.ts        # Server actions for content calendar CRUD
│   │   │   ├── admin-departments.ts     # Server actions for department management
│   │   │   ├── admin-documents.ts       # Server actions for knowledge-base documents
│   │   │   ├── admin-kanban.ts          # Server actions for kanban board tasks
│   │   │   ├── admin-team.ts            # Server actions for team member management
│   │   │   ├── ai-analysis.ts           # AI-powered client/content analysis actions
│   │   │   ├── ai-chat.ts               # Gemini/Groq AI chat with fallback logic
│   │   │   ├── assets.ts                # Server actions for file/asset management
│   │   │   ├── chat.ts                  # Messaging/chat server actions
│   │   │   ├── client-demographics.ts   # Client demographic data server actions
│   │   │   ├── client-intelligence.ts   # Client intelligence/insights server actions
│   │   │   ├── client-sharing.ts        # Share clients with specific users
│   │   │   ├── content-posts.ts         # Social content post CRUD actions
│   │   │   └── user-clients.ts          # Fetch clients shared with a regular user
│   │   ├── admin/
│   │   │   ├── assets/page.tsx          # Standalone admin assets page
│   │   │   ├── freepik/page.tsx         # Freepik stock asset browser page
│   │   │   ├── istock/page.tsx          # iStock asset browser page
│   │   │   └── page.tsx                 # Main admin dashboard shell (tab-driven)
│   │   ├── api/
│   │   │   ├── admin/users/route.ts     # REST endpoint: list/manage auth users
│   │   │   ├── ai/generate-content/route.ts  # REST endpoint: AI social content generation
│   │   │   ├── auth/profile/route.ts    # REST endpoint: fetch current user profile
│   │   │   ├── clients/[id]/route.ts    # REST endpoint: single client CRUD
│   │   │   ├── clients/route.ts         # REST endpoint: clients list
│   │   │   ├── documents/route.ts       # REST endpoint: documents list
│   │   │   ├── freepik-download/route.ts      # Proxy: download assets from Freepik
│   │   │   ├── istock-download/route.ts       # Proxy: download assets from iStock
│   │   │   └── istock-media-manager/route.ts  # Proxy: iStock media management API
│   │   ├── auth/
│   │   │   ├── auth-code-error/page.tsx # Error page for OAuth code exchange failures
│   │   │   ├── callback/page.tsx        # Supabase OAuth callback handler
│   │   │   ├── confirm-email/page.tsx   # Email confirmation landing page
│   │   │   ├── forgot-password/page.tsx # Trigger password reset email
│   │   │   ├── login/page.tsx           # Email/password login page
│   │   │   ├── reset-password/page.tsx  # Reset password with token
│   │   │   ├── set-password/page.tsx    # Set password for new invited users
│   │   │   └── signup/page.tsx          # New user registration page
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # User dashboard shell (tab-driven)
│   │   ├── test-styles/
│   │   │   └── page.tsx                 # Dev-only page for testing Tailwind styles
│   │   ├── globals.css                  # Primary global styles and Tailwind base
│   │   ├── globals-simple.css           # Minimal fallback global stylesheet
│   │   ├── layout.tsx                   # Root layout: AuthProvider, SWRProvider, fonts
│   │   └── page.tsx                     # Landing/home page with auth redirect
│   ├── components/
│   │   ├── admin/
│   │   │   ├── assets/
│   │   │   │   ├── AdminAssets.tsx      # Admin asset library management UI
│   │   │   │   ├── AssetGrid.tsx        # Grid display for uploaded assets
│   │   │   │   └── AssetUploader.tsx    # Drag-and-drop asset upload component
│   │   │   ├── clients/
│   │   │   │   ├── AdminClients.tsx     # Main client management panel
│   │   │   │   ├── ClientAssets.tsx     # Assets linked to a specific client
│   │   │   │   ├── ClientChat.tsx       # AI chat panel scoped to a client
│   │   │   │   ├── ClientDemographics.tsx   # Demographic charts for a client
│   │   │   │   ├── ClientNewsPanel.tsx  # Live news feed related to a client
│   │   │   │   ├── ClientSharing.tsx    # UI to share a client with team members
│   │   │   │   ├── ClientTwitterFeed.tsx    # Twitter/X feed embed for a client
│   │   │   │   └── ManifestoPriorities.tsx  # Client manifesto/priority editor
│   │   │   ├── content/
│   │   │   │   └── ContentCreator.tsx   # AI-assisted social content creation UI
│   │   │   ├── departments/
│   │   │   │   └── AdminDepartments.tsx # Department list and editor
│   │   │   ├── documents/
│   │   │   │   └── AdminDocuments.tsx   # Knowledge-base document manager
│   │   │   ├── team/
│   │   │   │   └── AdminTeamMembers.tsx # Team member list, invite, and role editor
│   │   │   ├── AdminCalendar.tsx        # Content calendar with scheduling UI
│   │   │   └── AdminKanban.tsx          # Drag-and-drop kanban board
│   │   ├── user/
│   │   │   ├── ChatPanel.tsx            # AI chat panel for regular users
│   │   │   └── SharedClients.tsx        # Clients shared with the current user
│   │   ├── ui/
│   │   │   ├── badge.tsx                # Shadcn badge primitive
│   │   │   ├── button.tsx               # Shadcn button with CVA variants
│   │   │   ├── calendar.tsx             # Shadcn calendar (date picker)
│   │   │   ├── card.tsx                 # Shadcn card container
│   │   │   ├── dialog.tsx               # Shadcn modal/dialog
│   │   │   ├── dropdown-menu.tsx        # Shadcn dropdown menu
│   │   │   ├── event-modal.tsx          # Modal for creating/editing calendar events
│   │   │   ├── input.tsx                # Shadcn text input
│   │   │   ├── kanban-board.tsx         # Kanban column and card layout primitives
│   │   │   ├── label.tsx                # Shadcn form label
│   │   │   ├── loading.tsx              # Spinner/skeleton loading states
│   │   │   ├── scroll-area.tsx          # Shadcn scrollable container
│   │   │   ├── select.tsx               # Shadcn select/dropdown
│   │   │   ├── table.tsx                # Shadcn data table
│   │   │   ├── tabs.tsx                 # Shadcn tab navigation
│   │   │   ├── task-card.tsx            # Kanban task card display
│   │   │   ├── task-modal.tsx           # Modal for creating/editing kanban tasks
│   │   │   ├── textarea.tsx             # Shadcn textarea input
│   │   │   └── tooltip.tsx              # Shadcn tooltip
│   │   ├── AdminRoute.tsx               # Route guard: redirects non-admins
│   │   ├── ErrorBoundary.tsx            # React error boundary for graceful failures
│   │   ├── LazyComponents.tsx           # Dynamic imports for code-split dashboard sections
│   │   ├── Logo.tsx                     # Brand logo component
│   │   ├── ProtectedRoute.tsx           # Route guard: redirects unauthenticated users
│   │   ├── Sidebar.tsx                  # Shared sidebar navigation for both dashboards
│   │   ├── SWRProvider.tsx              # SWR global config/cache provider
│   │   └── UserRoute.tsx                # Route guard: redirects non-regular-users
│   ├── hooks/
│   │   ├── admin/
│   │   │   ├── useDepartments.ts        # SWR hook to fetch department list
│   │   │   └── useDocuments.ts          # SWR hook to fetch documents
│   │   ├── useClients.ts                # SWR hook to fetch clients
│   │   ├── useEvents.ts                 # SWR hook to fetch calendar events
│   │   ├── useSWR.ts                    # Generic typed SWR wrapper
│   │   └── useTasks.ts                  # SWR hook to fetch kanban tasks
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── admin.ts                 # Service-role Supabase client (server-only)
│   │   │   ├── client.ts                # Browser Supabase client for client components
│   │   │   ├── middleware.ts            # Session refresh helper used in middleware
│   │   │   └── server.ts                # Cookie-based Supabase client for server components
│   │   ├── admin-helper.ts              # Utility helpers for admin server actions
│   │   ├── auth.tsx                     # AuthProvider context and useAuth hook
│   │   ├── demographics-constants.ts    # Static options for demographic form fields
│   │   ├── errors.ts                    # Typed error classes and error handling utils
│   │   ├── supabase.ts                  # Legacy browser client re-export
│   │   ├── supabase-server.ts           # Legacy server client re-export
│   │   └── utils.ts                     # General utility functions (cn, etc.)
│   └── middleware.ts                    # Next.js middleware: session refresh on every request
├── docs/
│   ├── supabase-best-practices.md       # Internal Supabase usage guidelines
│   └── supabase-issues-analysis.md      # Analysis of past Supabase auth/query issues
├── deck/                                # Static portfolio/pitch deck images and HTML
├── codefetch/
│   └── codebase.md                      # Auto-generated full codebase snapshot
├── CLAUDE.md                            # Claude Code project instructions
├── next.config.js                       # Next.js config (image domains, redirects)
├── tailwind.config.js                   # Primary Tailwind CSS configuration
├── tailwind-complex.config.js           # Alternate complex Tailwind config (unused/legacy)
├── postcss.config.js                    # PostCSS config for Tailwind
├── tsconfig.json                        # TypeScript config with @/* path alias
├── package.json                         # Dependencies and npm scripts
└── .env.local                           # Local environment variables (not committed)
```
