# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ANYA SEGEN is a Next.js 15 knowledge management system built with TypeScript, Tailwind CSS, and Supabase. The application provides role-based access to standard operating procedures and documentation across different departments (HR, Finance, Operations, etc.).

## Development Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Build and production
npm run build        # Build for production
npm run start        # Start production server

# Code quality
npm run lint         # Run ESLint for code linting
```

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Backend**: Supabase (authentication, database, real-time)
- **UI Components**: Radix UI primitives with custom theming
- **Icons**: Lucide React
- **State Management**: React Context for authentication

### Key Directories
```
src/
├── app/              # Next.js App Router pages
│   ├── auth/         # Authentication pages (login, signup, confirm-email)
│   ├── dashboard/    # User dashboard
│   └── admin/        # Admin-only pages
├── components/       # Reusable React components
│   └── ui/           # shadcn/ui component library
├── lib/              # Utilities and configurations
│   ├── auth.tsx      # Authentication context and hooks
│   ├── supabase.ts   # Supabase client configuration
│   └── utils.ts      # Utility functions (cn helper, etc.)
└── types/            # TypeScript type definitions
```

### Authentication System
- Uses Supabase Auth with email/password authentication
- Role-based access control (admin vs user roles)
- Department-based organization
- Protected routes with `ProtectedRoute`, `AdminRoute`, and `UserRoute` components
- Profile management with automatic profile creation via database triggers

### Component Patterns
- **shadcn/ui Integration**: All UI components use the shadcn/ui pattern with Radix UI primitives
- **Compound Components**: Card, Select, and Tabs follow compound component patterns
- **Variant-Based Styling**: Uses `class-variance-authority` for component variants
- **Route Guards**: Authentication and authorization handled at component level
- **Context Pattern**: Authentication state managed via React Context (`AuthProvider`)

### Styling Guidelines
- **Dark Theme**: Primary theme with black backgrounds and white text
- **Color Palette**: 
  - Blue (`blue-400`, `blue-600`) for primary actions
  - Gray (`gray-900`, `gray-800`) for cards and backgrounds
  - Red (`red-400`) for errors
  - Green (`green-400`) for success states
- **Utility Classes**: Prefer Tailwind utilities over custom CSS
- **Component Variants**: Use CVA for managing component state variations

### Database Schema (Supabase)
- **profiles**: User profiles with department relationships
- **departments**: Department organization structure
- User roles: 'admin' and 'user'
- Authentication triggers automatically create profiles

### Key Features
- **Landing Page**: Public marketing page with feature highlights
- **Authentication**: Complete signup/login flow with email confirmation
- **Dashboard**: User-specific content area
- **Admin Panel**: Administrative functionality for user/content management
- **Role-Based Navigation**: Different navigation menus based on user role

### Development Notes
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Uses TypeScript strict mode
- All components use forwarded refs for accessibility
- Loading states and error handling implemented throughout
- Path alias `@/*` maps to `src/*`

### Code Quality Standards
- TypeScript interfaces for all component props
- Consistent error handling patterns
- Loading states for all async operations
- Proper accessibility attributes via Radix UI
- Clean separation between UI components and business logic