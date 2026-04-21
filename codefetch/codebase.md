Project Structure:
├── CLAUDE.md
├── README.md
├── SECURITY_AND_UX_AUDIT_REPORT.md
├── creds.md
├── deck
│   ├── Lemon Pickle.jpg
│   ├── corp-d2c-gogrin.jpg
│   ├── corp-d2c-lisabona.jpg
│   ├── corp-d2c-pentagonia.jpg
│   ├── corp-d2c-phirkcraft.jpg
│   ├── corp-intract-quest.jpg
│   ├── corp-itc-infographic-1.jpg
│   ├── corp-itc-infographic-2.jpg
│   ├── corp-itc-infographic-3.jpg
│   ├── corp-itc-infographic-4.jpg
│   ├── corp-philips-foundation.jpg
│   ├── dev-bbc-kilkari.jpg
│   ├── dev-nutrition-initiatives.jpg
│   ├── dev-path-je.jpg
│   ├── dev-pathfinder-fp.jpg
│   ├── dev-pfi-saathiya.jpg
│   ├── dev-pfi-sbcc.jpg
│   ├── gov-bihan-chhattisgarh.jpg
│   ├── gov-gullak-event.jpg
│   ├── gov-ministries-film.jpg
│   ├── gov-rbi-rebrand.jpg
│   ├── index.html
│   ├── pol-bjym.jpg
│   ├── pol-modi-hai-naa.jpg
│   └── pol-ram-rajya.jpg
├── logoblack.svg
├── newfeature.prd
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── middleware.ts
├── tailwind-complex.config.js
├── tailwind.config.js
└── tsconfig.json


.mcp.json
```
1 | {
2 |     "mcpServers": {
3 |       "supabase": {
4 |         "command": "npx",
5 |         "args": [
6 |           "-y",
7 |           "@supabase/mcp-server-supabase@latest",
8 |         "--project-ref=smnurgbdtnbukgzaarpw"
9 |         ],
10 |         "env": {
11 |           "SUPABASE_ACCESS_TOKEN": "sbp_11581c37e7297621e142c2db789643a82efedd0f"
12 |         }
13 |       }
14 |     }
15 |   }
```

CLAUDE.md
```
1 | # CLAUDE.md
2 | 
3 | This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
4 | 
5 | ## Project Overview
6 | 
7 | ANYA SEGEN is a Next.js 15 knowledge management system built with TypeScript, Tailwind CSS, and Supabase. The application provides role-based access to standard operating procedures and documentation across different departments (HR, Finance, Operations, etc.).
8 | 
9 | ## Development Commands
10 | 
11 | ```bash
12 | # Development
13 | npm run dev          # Start development server on localhost:3000
14 | 
15 | # Build and production
16 | npm run build        # Build for production
17 | npm run start        # Start production server
18 | 
19 | # Code quality
20 | npm run lint         # Run ESLint for code linting
21 | ```
22 | 
23 | ## Project Architecture
24 | 
25 | ### Tech Stack
26 | - **Framework**: Next.js 15 with App Router and TypeScript
27 | - **Styling**: Tailwind CSS with shadcn/ui component library
28 | - **Backend**: Supabase (authentication, database, real-time)
29 | - **UI Components**: Radix UI primitives with custom theming
30 | - **Icons**: Lucide React
31 | - **State Management**: React Context for authentication
32 | 
33 | ### Key Directories
34 | ```
35 | src/
36 | ├── app/              # Next.js App Router pages
37 | │   ├── auth/         # Authentication pages (login, signup, confirm-email)
38 | │   ├── dashboard/    # User dashboard
39 | │   └── admin/        # Admin-only pages
40 | ├── components/       # Reusable React components
41 | │   └── ui/           # shadcn/ui component library
42 | ├── lib/              # Utilities and configurations
43 | │   ├── auth.tsx      # Authentication context and hooks
44 | │   ├── supabase.ts   # Supabase client configuration
45 | │   └── utils.ts      # Utility functions (cn helper, etc.)
46 | └── types/            # TypeScript type definitions
47 | ```
48 | 
49 | ### Authentication System
50 | - Uses Supabase Auth with email/password authentication
51 | - Role-based access control (admin vs user roles)
52 | - Department-based organization
53 | - Protected routes with `ProtectedRoute`, `AdminRoute`, and `UserRoute` components
54 | - Profile management with automatic profile creation via database triggers
55 | 
56 | ### Component Patterns
57 | - **shadcn/ui Integration**: All UI components use the shadcn/ui pattern with Radix UI primitives
58 | - **Compound Components**: Card, Select, and Tabs follow compound component patterns
59 | - **Variant-Based Styling**: Uses `class-variance-authority` for component variants
60 | - **Route Guards**: Authentication and authorization handled at component level
61 | - **Context Pattern**: Authentication state managed via React Context (`AuthProvider`)
62 | 
63 | ### Styling Guidelines
64 | - **Dark Theme**: Primary theme with black backgrounds and white text
65 | - **Color Palette**: 
66 |   - Blue (`blue-400`, `blue-600`) for primary actions
67 |   - Gray (`gray-900`, `gray-800`) for cards and backgrounds
68 |   - Red (`red-400`) for errors
69 |   - Green (`green-400`) for success states
70 | - **Utility Classes**: Prefer Tailwind utilities over custom CSS
71 | - **Component Variants**: Use CVA for managing component state variations
72 | 
73 | ### Database Schema (Supabase)
74 | - **profiles**: User profiles with department relationships
75 | - **departments**: Department organization structure
76 | - User roles: 'admin' and 'user'
77 | - Authentication triggers automatically create profiles
78 | 
79 | ### Key Features
80 | - **Landing Page**: Public marketing page with feature highlights
81 | - **Authentication**: Complete signup/login flow with email confirmation
82 | - **Dashboard**: User-specific content area
83 | - **Admin Panel**: Administrative functionality for user/content management
84 | - **Role-Based Navigation**: Different navigation menus based on user role
85 | 
86 | ### Development Notes
87 | - Environment variables required: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
88 | - Uses TypeScript strict mode
89 | - All components use forwarded refs for accessibility
90 | - Loading states and error handling implemented throughout
91 | - Path alias `@/*` maps to `src/*`
92 | 
93 | ### Code Quality Standards
94 | - TypeScript interfaces for all component props
95 | - Consistent error handling patterns
96 | - Loading states for all async operations
97 | - Proper accessibility attributes via Radix UI
98 | - Clean separation between UI components and business logic
```

SECURITY_AND_UX_AUDIT_REPORT.md
```
1 | # ANYA SEGEN - Comprehensive Security & UX Audit Report
2 | 
3 | **Application**: ANYA SEGEN Knowledge Management System  
4 | **Technology Stack**: Next.js 15, TypeScript, Supabase, Tailwind CSS, shadcn/ui  
5 | **Audit Date**: January 2025  
6 | **Audit Scope**: Complete application analysis including security, UX/UI, and code quality
7 | 
8 | ## Executive Summary
9 | 
10 | This comprehensive audit of the ANYA SEGEN knowledge management application revealed **12 critical issues**, **15 high-priority issues**, and **25 medium-to-low priority improvements**. The application has a solid foundation with modern technologies but requires immediate attention to security vulnerabilities, user experience issues, and code quality problems.
11 | 
12 | ### Critical Findings Summary:
13 | - **Security**: Client-side authorization vulnerabilities, insufficient input validation
14 | - **UX/UI**: Broken authentication flows, missing core functionality, poor mobile experience
15 | - **Code Quality**: Memory leaks, race conditions, missing error boundaries
16 | 
17 | ---
18 | 
19 | ## 🚨 CRITICAL SECURITY VULNERABILITIES
20 | 
21 | ### 1. Client-Side Authorization Logic (CRITICAL)
22 | **Files**: `src/components/AdminRoute.tsx` (lines 37-47), `src/components/UserRoute.tsx` (lines 49-51)
23 | 
24 | **Issue**: All authorization checks are performed client-side and can be bypassed.
25 | 
26 | ```typescript
27 | // AdminRoute.tsx lines 37-47
28 | if (!user || !isAdmin) {
29 |   return (
30 |     <div className="min-h-screen bg-black flex items-center justify-center">
31 |       // Access denied UI
32 |     </div>
33 |   )
34 | }
35 | ```
36 | 
37 | **Impact**: Attackers can bypass authorization by:
38 | - Disabling JavaScript
39 | - Manipulating client-side state
40 | - Direct URL access with modified authentication state
41 | 
42 | **Recommendation**: Implement server-side authorization using Next.js middleware.
43 | 
44 | ### 2. Role-Based Access Control Vulnerabilities (CRITICAL)
45 | **File**: `src/lib/auth.tsx` (lines 61-69)
46 | 
47 | **Issue**: Fallback mechanism assigns default 'user' role when profile is missing.
48 | 
49 | ```typescript
50 | const fallbackProfile = {
51 |   id: userToFetch.id,
52 |   email: userToFetch.email || '',
53 |   role: 'user', // Default role assignment - SECURITY RISK
54 |   department_id: null
55 | }
56 | ```
57 | 
58 | **Impact**: Race conditions or database sync issues could lead to privilege escalation.
59 | 
60 | **Recommendation**: Never use fallback roles. Always verify server-side and fail securely.
61 | 
62 | ### 3. Direct Database Access with Insufficient Validation (HIGH)
63 | **File**: `src/app/admin/page.tsx` (lines 188-199)
64 | 
65 | **Issue**: Admin operations lack server-side validation.
66 | 
67 | ```typescript
68 | const { data, error } = await supabase
69 |   .from('documents')
70 |   .insert([{
71 |     created_by: user.id  // Client-controlled user ID
72 |   }])
73 | ```
74 | 
75 | **Impact**: Parameter manipulation could allow creating documents as other users.
76 | 
77 | **Recommendation**: Move all database operations to secure API routes with server-side validation.
78 | 
79 | ### 4. Information Disclosure in Error Messages (HIGH)
80 | **Files**: `src/lib/auth.tsx` (lines 52-53), `src/app/auth/login/page.tsx` (lines 37-38)
81 | 
82 | **Issue**: Detailed error messages expose system internals.
83 | 
84 | ```typescript
85 | if (authError) {
86 |   setError(authError.message)  // Exposes raw Supabase errors
87 | }
88 | ```
89 | 
90 | **Impact**: Reveals database structure, system configuration, and valid/invalid accounts.
91 | 
92 | **Recommendation**: Use generic error messages for users, log details server-side only.
93 | 
94 | ### 5. Session Management Issues (HIGH)
95 | **File**: `src/lib/auth.tsx` (lines 96-120)
96 | 
97 | **Issue**: No explicit session timeout or secure invalidation.
98 | 
99 | **Impact**: Sessions may persist longer than intended, potential session fixation.
100 | 
101 | **Recommendation**: Implement proper session management with timeouts and validation.
102 | 
103 | ---
104 | 
105 | ## 🔒 ADDITIONAL SECURITY ISSUES
106 | 
107 | ### 6. Environment Variable Exposure (HIGH)
108 | **File**: `src/lib/supabase.ts` (lines 3-4)
109 | 
110 | **Issue**: Supabase credentials exposed in client-side code.
111 | 
112 | ```typescript
113 | const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
114 | const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
115 | ```
116 | 
117 | **Recommendation**: While anonymous keys are public by design, ensure proper RLS policies.
118 | 
119 | ### 7. Weak Password Policy (MEDIUM)
120 | **File**: `src/app/auth/signup/page.tsx` (lines 81-85)
121 | 
122 | **Issue**: Minimal password requirements (6 characters minimum).
123 | 
124 | **Recommendation**: Implement stronger policies (12+ characters, complexity requirements).
125 | 
126 | ### 8. Missing Input Validation and Sanitization (MEDIUM)
127 | **Files**: Multiple form inputs throughout the application
128 | 
129 | **Issue**: No input sanitization for user data, potential XSS vulnerabilities.
130 | 
131 | **Recommendation**: Implement comprehensive input validation and sanitization.
132 | 
133 | ### 9. Insufficient Rate Limiting (MEDIUM)
134 | **Files**: Authentication endpoints
135 | 
136 | **Issue**: No rate limiting on login/signup.
137 | 
138 | **Impact**: Vulnerable to brute force attacks.
139 | 
140 | ### 10. Missing CSRF Protection (MEDIUM)
141 | **Files**: All form submissions
142 | 
143 | **Issue**: No CSRF tokens or protection mechanisms.
144 | 
145 | **Recommendation**: Implement CSRF protection for all state-changing operations.
146 | 
147 | ---
148 | 
149 | ## 🎨 CRITICAL UI/UX ISSUES
150 | 
151 | ### 11. Broken "Forgot Password" Link (CRITICAL)
152 | **File**: `src/app/auth/login/page.tsx` (line 109)
153 | 
154 | **Issue**: Link points to non-existent `/auth/forgot-password` page.
155 | 
156 | **Impact**: Users cannot recover passwords, causing authentication deadlock.
157 | 
158 | **Fix**: Create forgot password page and implement reset functionality.
159 | 
160 | ### 12. Missing Error Handling in Department Loading (CRITICAL)
161 | **File**: `src/app/auth/signup/page.tsx` (lines 38-61)
162 | 
163 | **Issue**: If departments fail to load, shows "Loading departments..." forever.
164 | 
165 | **Impact**: Users cannot complete signup process.
166 | 
167 | **Fix**: Add error handling and retry mechanisms.
168 | 
169 | ### 13. No Email Verification Status Feedback (CRITICAL)
170 | **File**: `src/app/auth/confirm-email/page.tsx`
171 | 
172 | **Issue**: Static page with no verification logic or status updates.
173 | 
174 | **Impact**: Users don't know if email was verified.
175 | 
176 | **Fix**: Implement actual email verification with status feedback.
177 | 
178 | ### 14. Inconsistent Loading States (CRITICAL)
179 | **Files**: Multiple components
180 | 
181 | **Issue**: Some components show loading states while others don't.
182 | 
183 | **Impact**: Users uncertain about system state.
184 | 
185 | **Fix**: Implement consistent loading patterns throughout.
186 | 
187 | ### 15. Poor Mobile Responsiveness (HIGH)
188 | **Files**: Admin dashboard, tables, forms
189 | 
190 | **Issue**: Fixed layouts don't adapt to mobile screens.
191 | 
192 | **Impact**: Poor mobile user experience with horizontal scrolling.
193 | 
194 | **Fix**: Implement responsive design patterns.
195 | 
196 | ### 16. Missing Form Validation Feedback (HIGH)
197 | **File**: `src/app/auth/signup/page.tsx`
198 | 
199 | **Issue**: Basic validation with no real-time feedback.
200 | 
201 | **Impact**: Users discover errors only after submission.
202 | 
203 | **Fix**: Add real-time validation with helpful messages.
204 | 
205 | ### 17. No Search Implementation (HIGH)
206 | **File**: `src/app/dashboard/page.tsx` (lines 256-262)
207 | 
208 | **Issue**: Search tab exists but shows placeholder content.
209 | 
210 | **Impact**: Core functionality missing.
211 | 
212 | **Fix**: Implement document search functionality.
213 | 
214 | ### 18. Missing Accessibility Features (HIGH)
215 | **Files**: Throughout application
216 | 
217 | **Issues**:
218 | - No focus management
219 | - Missing ARIA labels
220 | - No keyboard navigation
221 | - Poor color contrast
222 | 
223 | **Impact**: Not accessible to users with disabilities.
224 | 
225 | **Fix**: Implement WCAG 2.1 AA compliance features.
226 | 
227 | ---
228 | 
229 | ## 💻 REACT CODE QUALITY ISSUES
230 | 
231 | ### 19. Missing useEffect Dependencies (CRITICAL)
232 | **File**: `src/lib/auth.tsx` (line 120)
233 | 
234 | **Issue**: Empty dependency array but uses variables inside effect.
235 | 
236 | ```typescript
237 | useEffect(() => {
238 |   // Uses 'user' but missing from dependencies
239 | }, []) // Should include dependencies
240 | ```
241 | 
242 | **Impact**: Stale closures and inconsistent state updates.
243 | 
244 | ### 20. Potential Memory Leaks (CRITICAL)
245 | **File**: `src/lib/auth.tsx` (lines 96-119)
246 | 
247 | **Issue**: Async operations in auth state changes without proper cleanup.
248 | 
249 | **Impact**: Memory leaks and race conditions.
250 | 
251 | ### 21. Race Condition in Authentication (HIGH)
252 | **File**: `src/app/auth/login/page.tsx` (lines 42-45)
253 | 
254 | **Issue**: Using `setTimeout` for navigation timing.
255 | 
256 | ```typescript
257 | setTimeout(() => {
258 |   router.push("/dashboard")
259 | }, 100) // Race condition
260 | ```
261 | 
262 | **Impact**: Unreliable authentication flow.
263 | 
264 | ### 22. Missing Error Boundaries (HIGH)
265 | **Files**: All components
266 | 
267 | **Issue**: No error boundaries implemented.
268 | 
269 | **Impact**: Unhandled errors can crash entire application.
270 | 
271 | ### 23. Inefficient Re-renders (MEDIUM)
272 | **File**: `src/app/dashboard/page.tsx` (lines 87-91)
273 | 
274 | **Issue**: Filter operations on every render.
275 | 
276 | **Fix**: Use `useMemo` for expensive computations.
277 | 
278 | ---
279 | 
280 | ## 📱 ADDITIONAL UX ISSUES
281 | 
282 | ### Medium Priority Issues:
283 | - **Inconsistent Button Styling**: Mix of hardcoded vs design system
284 | - **No Confirmation Dialogs**: Uses native `confirm()` instead of styled dialogs
285 | - **Missing Toast Notifications**: No feedback for success/error actions
286 | - **No Dark/Light Mode Toggle**: Hardcoded dark theme
287 | - **Poor Table Responsiveness**: Tables don't adapt to smaller screens
288 | - **Missing Breadcrumbs**: No navigation context
289 | - **No Pagination**: All documents load at once
290 | - **Missing Document Preview**: Limited preview content
291 | - **Static Activity Feed**: Hardcoded instead of real data
292 | - **No Bulk Operations**: Cannot select multiple items
293 | 
294 | ### Low Priority Issues:
295 | - **Missing User Avatars**: Only initials shown
296 | - **No Document Versioning UI**: No history tracking
297 | - **Missing Keyboard Shortcuts**: Mouse-dependent interface
298 | - **No Export Functionality**: Cannot export documents/data
299 | - **No Real-time Updates**: Data only updates on refresh
300 | - **No Caching Strategy**: Repeated unnecessary requests
301 | 
302 | ---
303 | 
304 | ## 🔧 IMMEDIATE ACTION PLAN
305 | 
306 | ### Priority 1: Critical Security Fixes (This Week)
307 | 1. **Implement server-side authorization** using Next.js middleware
308 | 2. **Remove fallback role assignment** - fail securely instead
309 | 3. **Add server-side validation** for all database operations
310 | 4. **Implement proper error handling** with generic user messages
311 | 5. **Create forgot password functionality**
312 | 
313 | ### Priority 2: Critical UX Fixes (This Week)
314 | 1. **Fix broken forgot password link**
315 | 2. **Add department loading error handling**
316 | 3. **Implement email verification status**
317 | 4. **Add consistent loading states**
318 | 5. **Fix useEffect dependencies and memory leaks**
319 | 
320 | ### Priority 3: High Priority Improvements (Next 2 Weeks)
321 | 1. **Improve mobile responsiveness**
322 | 2. **Add real-time form validation**
323 | 3. **Implement search functionality**
324 | 4. **Add accessibility features**
325 | 5. **Implement error boundaries**
326 | 6. **Add session timeout management**
327 | 
328 | ### Priority 4: Medium Priority Enhancements (Next Month)
329 | 1. **Add CSRF protection**
330 | 2. **Implement toast notifications**
331 | 3. **Add confirmation dialogs**
332 | 4. **Improve table responsiveness**
333 | 5. **Add breadcrumb navigation**
334 | 6. **Implement proper caching**
335 | 
336 | ---
337 | 
338 | ## 🏗️ ARCHITECTURAL RECOMMENDATIONS
339 | 
340 | ### Security Architecture
341 | - **Move to API Routes**: All database operations should go through secure API routes
342 | - **Implement Middleware**: Use Next.js middleware for route protection
343 | - **Add Rate Limiting**: Implement rate limiting on all endpoints
344 | - **Security Headers**: Add CSP, HSTS, and other security headers
345 | - **Input Validation**: Server-side validation for all inputs
346 | 
347 | ### Code Architecture
348 | - **State Management**: Consider Redux/Zustand for complex state
349 | - **Error Boundaries**: Implement at strategic component levels
350 | - **Component Composition**: Break down large monolithic components
351 | - **Type Safety**: Improve TypeScript usage and validation
352 | - **Testing**: Add comprehensive testing with React Testing Library
353 | 
354 | ### UX Architecture
355 | - **Design System**: Complete and consistent component library
356 | - **Accessibility**: WCAG 2.1 AA compliance throughout
357 | - **Performance**: Implement lazy loading and optimization
358 | - **Mobile First**: Responsive design from ground up
359 | - **User Feedback**: Comprehensive notification and loading systems
360 | 
361 | ---
362 | 
363 | ## 📊 RISK ASSESSMENT
364 | 
365 | ### Critical Risk (Immediate Action Required)
366 | - **Authentication Bypass**: Client-side authorization can be bypassed
367 | - **Privilege Escalation**: Role assignment vulnerabilities
368 | - **Broken User Flows**: Users cannot complete core tasks
369 | - **Memory Leaks**: Application stability issues
370 | 
371 | ### High Risk (Action Required This Week)
372 | - **Information Disclosure**: Error messages reveal system details
373 | - **Session Security**: Inadequate session management
374 | - **Mobile UX**: Poor mobile experience affects user adoption
375 | - **Code Quality**: React anti-patterns causing instability
376 | 
377 | ### Medium Risk (Address Within Month)
378 | - **Accessibility**: Legal and usability compliance issues
379 | - **Performance**: Scalability concerns with current patterns
380 | - **Security Headers**: Missing standard security protections
381 | - **User Experience**: Missing expected functionality
382 | 
383 | ---
384 | 
385 | ## 📈 SUCCESS METRICS
386 | 
387 | ### Security Improvements
388 | - Zero client-side authorization checks
389 | - All database operations through secure API routes
390 | - Comprehensive input validation coverage
391 | - Proper session management implementation
392 | 
393 | ### UX Improvements
394 | - 100% completion rate for critical user flows
395 | - Mobile responsiveness on all pages
396 | - WCAG 2.1 AA compliance score
397 | - User satisfaction with loading states and feedback
398 | 
399 | ### Code Quality Improvements
400 | - Zero memory leaks in React components
401 | - All useEffect hooks properly implemented
402 | - Comprehensive error boundary coverage
403 | - 90%+ TypeScript strict mode compliance
404 | 
405 | ---
406 | 
407 | ## 🎯 CONCLUSION
408 | 
409 | The ANYA SEGEN application has solid foundations with modern technologies and clean architecture. However, it requires immediate attention to critical security vulnerabilities and user experience issues. The recommended fixes will transform this into a secure, accessible, and user-friendly knowledge management system.
410 | 
411 | **Estimated Timeline for Critical Fixes**: 2-3 weeks  
412 | **Estimated Timeline for Complete Remediation**: 2-3 months  
413 | **Recommended Team**: 2-3 developers with security and UX expertise
414 | 
415 | The investment in these improvements will result in a production-ready application that meets industry standards for security, accessibility, and user experience.
416 | 
417 | 
```

newfeature.prd
```
1 | # Client Management Feature - Product Requirements Document
2 | ## Anya Segen Knowledge Management System
3 | 
4 | **Version**: 1.0  
5 | **Date**: January 2025  
6 | **Feature**: Client Management Module  
7 | **Integration**: Next.js 15 + Supabase + TypeScript
8 | 
9 | ---
10 | 
11 | ## 1. Executive Summary
12 | 
13 | The Client Management feature will extend the existing Anya Segen platform to handle comprehensive client (politician/corporate) information management. This module will integrate seamlessly with the current role-based authentication system and follow the established architectural patterns.
14 | 
15 | ### Core Objectives
16 | - Centralized client information repository
17 | - Role-based access to client data
18 | - Department-wise client assignment
19 | - Comprehensive client profiles with political/corporate categorization
20 | - Activity tracking and relationship management
21 | 
22 | ---
23 | 
24 | ## 2. Technical Context
25 | 
26 | ### Existing Architecture Alignment
27 | ```typescript
28 | // Follows existing patterns from:
29 | - Authentication: lib/auth.tsx (useAuth hook)
30 | - Database: lib/supabase.ts (Supabase client)
31 | - Components: components/ui/* (shadcn/ui patterns)
32 | - Routing: app/dashboard/* (App Router structure)
33 | ```
34 | 
35 | ### Design System Consistency
36 | - **Theme**: Dark theme with existing color palette
37 | - **Components**: Extends current shadcn/ui component library
38 | - **Patterns**: Compound components, forwarded refs, CVA variants
39 | 
40 | ---
41 | 
42 | ## 3. Data Model
43 | 
44 | ### 3.1 Database Schema Extensions
45 | 
46 | ```sql
47 | -- Client Types Enum
48 | CREATE TYPE client_type AS ENUM ('politician', 'corporate', 'ngo', 'government_body');
49 | CREATE TYPE client_status AS ENUM ('active', 'inactive', 'prospect', 'archived');
50 | 
51 | -- Main Clients Table
52 | CREATE TABLE clients (
53 |     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
54 |     client_type client_type NOT NULL,
55 |     status client_status DEFAULT 'active',
56 |     
57 |     -- Basic Information
58 |     name VARCHAR(255) NOT NULL,
59 |     display_name VARCHAR(255),
60 |     slug VARCHAR(255) UNIQUE NOT NULL, -- URL-friendly identifier
61 |     avatar_url TEXT,
62 |     
63 |     -- Contact Information
64 |     primary_email VARCHAR(255),
65 |     primary_phone VARCHAR(50),
66 |     secondary_contacts JSONB DEFAULT '[]', -- Array of {name, role, email, phone}
67 |     
68 |     -- Metadata
69 |     tags TEXT[] DEFAULT '{}', -- Searchable tags
70 |     internal_notes TEXT, -- Private notes for team
71 |     
72 |     -- Relationships
73 |     department_id UUID REFERENCES departments(id),
74 |     account_manager_id UUID REFERENCES profiles(id),
75 |     created_by UUID REFERENCES profiles(id),
76 |     
77 |     -- Timestamps
78 |     created_at TIMESTAMPTZ DEFAULT NOW(),
79 |     updated_at TIMESTAMPTZ DEFAULT NOW(),
80 |     last_activity_at TIMESTAMPTZ DEFAULT NOW(),
81 |     
82 |     -- Search
83 |     search_vector tsvector GENERATED ALWAYS AS (
84 |         setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
85 |         setweight(to_tsvector('english', coalesce(display_name, '')), 'B') ||
86 |         setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'C')
87 |     ) STORED
88 | );
89 | 
90 | -- Politician-Specific Information
91 | CREATE TABLE politician_profiles (
92 |     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
93 |     client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
94 |     
95 |     -- Political Information
96 |     party_affiliation VARCHAR(255),
97 |     current_position VARCHAR(255), -- MP, MLA, Minister, etc.
98 |     constituency VARCHAR(255),
99 |     state VARCHAR(100),
100 |     previous_positions JSONB DEFAULT '[]', -- Array of {position, from_date, to_date}
101 |     
102 |     -- Public Profiles
103 |     wikipedia_url TEXT,
104 |     official_website TEXT,
105 |     
106 |     -- Demographics
107 |     date_of_birth DATE,
108 |     place_of_birth VARCHAR(255),
109 |     languages_spoken TEXT[],
110 |     education JSONB DEFAULT '[]', -- Array of {degree, institution, year}
111 |     
112 |     -- Political Stance
113 |     key_focus_areas TEXT[],
114 |     committees JSONB DEFAULT '[]', -- Array of {name, role, from_date}
115 |     
116 |     UNIQUE(client_id)
117 | );
118 | 
119 | -- Corporate-Specific Information  
120 | CREATE TABLE corporate_profiles (
121 |     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
122 |     client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
123 |     
124 |     -- Company Information
125 |     company_name VARCHAR(255),
126 |     industry VARCHAR(255),
127 |     company_size VARCHAR(50), -- small, medium, large, enterprise
128 |     founded_year INTEGER,
129 |     headquarters_location VARCHAR(255),
130 |     
131 |     -- Key Contacts
132 |     ceo_name VARCHAR(255),
133 |     pr_head_name VARCHAR(255),
134 |     
135 |     -- Business Details
136 |     revenue_range VARCHAR(100),
137 |     employee_count_range VARCHAR(100),
138 |     key_services TEXT[],
139 |     
140 |     UNIQUE(client_id)
141 | );
142 | 
143 | -- Client Social Media Accounts
144 | CREATE TABLE client_social_accounts (
145 |     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
146 |     client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
147 |     platform VARCHAR(50) NOT NULL, -- twitter, facebook, instagram, etc.
148 |     handle VARCHAR(255) NOT NULL,
149 |     url TEXT,
150 |     is_verified BOOLEAN DEFAULT false,
151 |     follower_count INTEGER,
152 |     is_primary BOOLEAN DEFAULT false,
153 |     last_updated TIMESTAMPTZ DEFAULT NOW()
154 | );
155 | 
156 | -- Client Guidelines (Do's and Don'ts)
157 | CREATE TABLE client_guidelines (
158 |     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
159 |     client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
160 |     guideline_type VARCHAR(20) CHECK (guideline_type IN ('do', 'dont')),
161 |     category VARCHAR(100), -- communication, topics, branding, etc.
162 |     guideline TEXT NOT NULL,
163 |     priority INTEGER DEFAULT 0, -- Higher number = higher priority
164 |     created_by UUID REFERENCES profiles(id),
165 |     created_at TIMESTAMPTZ DEFAULT NOW()
166 | );
167 | 
168 | -- Client Documents
169 | CREATE TABLE client_documents (
170 |     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
171 |     client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
172 |     document_type VARCHAR(100), -- brand_guidelines, manifesto, biography, etc.
173 |     title VARCHAR(255) NOT NULL,
174 |     description TEXT,
175 |     file_url TEXT,
176 |     file_size INTEGER,
177 |     mime_type VARCHAR(100),
178 |     uploaded_by UUID REFERENCES profiles(id),
179 |     uploaded_at TIMESTAMPTZ DEFAULT NOW(),
180 |     last_accessed_at TIMESTAMPTZ
181 | );
182 | 
183 | -- Client Activity Log
184 | CREATE TABLE client_activities (
185 |     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
186 |     client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
187 |     activity_type VARCHAR(50), -- note_added, document_uploaded, status_changed, etc.
188 |     description TEXT,
189 |     metadata JSONB DEFAULT '{}',
190 |     performed_by UUID REFERENCES profiles(id),
191 |     performed_at TIMESTAMPTZ DEFAULT NOW()
192 | );
193 | 
194 | -- Indexes for performance
195 | CREATE INDEX idx_clients_search ON clients USING GIN(search_vector);
196 | CREATE INDEX idx_clients_department ON clients(department_id);
197 | CREATE INDEX idx_clients_status ON clients(status);
198 | CREATE INDEX idx_clients_type ON clients(client_type);
199 | CREATE INDEX idx_activities_client_date ON client_activities(client_id, performed_at DESC);
200 | ```
201 | 
202 | ### 3.2 Row Level Security (RLS) Policies
203 | 
204 | ```sql
205 | -- Enable RLS on all tables
206 | ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
207 | ALTER TABLE politician_profiles ENABLE ROW LEVEL SECURITY;
208 | -- ... (similar for all tables)
209 | 
210 | -- Clients table policies
211 | CREATE POLICY "Users can view clients in their department" ON clients
212 |     FOR SELECT USING (
213 |         department_id IN (
214 |             SELECT department_id FROM profiles WHERE id = auth.uid()
215 |         ) OR 
216 |         EXISTS (
217 |             SELECT 1 FROM profiles 
218 |             WHERE id = auth.uid() AND role = 'admin'
219 |         )
220 |     );
221 | 
222 | CREATE POLICY "Only admins and account managers can update clients" ON clients
223 |     FOR UPDATE USING (
224 |         account_manager_id = auth.uid() OR
225 |         EXISTS (
226 |             SELECT 1 FROM profiles 
227 |             WHERE id = auth.uid() AND role = 'admin'
228 |         )
229 |     );
230 | ```
231 | 
232 | ---
233 | 
234 | ## 4. User Interface Design
235 | 
236 | ### 4.1 Route Structure
237 | ```
238 | app/
239 | ├── dashboard/
240 | │   ├── clients/
241 | │   │   ├── page.tsx                 # Client list view
242 | │   │   ├── [slug]/
243 | │   │   │   ├── page.tsx            # Client detail view
244 | │   │   │   ├── edit/
245 | │   │   │   │   └── page.tsx       # Edit client
246 | │   │   │   ├── documents/
247 | │   │   │   │   └── page.tsx       # Client documents
248 | │   │   │   └── activity/
249 | │   │   │       └── page.tsx       # Activity log
250 | │   │   └── new/
251 | │   │       └── page.tsx           # Create new client
252 | ```
253 | 
254 | ### 4.2 Component Structure
255 | 
256 | ```typescript
257 | // Core components following existing patterns
258 | components/
259 | ├── clients/
260 | │   ├── client-list.tsx           # Main list component
261 | │   ├── client-card.tsx           # Card view for grid
262 | │   ├── client-table.tsx          # Table view
263 | │   ├── client-filters.tsx        # Filter sidebar
264 | │   ├── client-search.tsx         # Search with autocomplete
265 | │   ├── client-detail-header.tsx  # Profile header
266 | │   ├── client-info-tabs.tsx      # Tabbed information
267 | │   ├── client-guidelines.tsx     # Do's and Don'ts
268 | │   ├── client-documents.tsx      # Document management
269 | │   └── client-activity-feed.tsx  # Activity timeline
270 | ```
271 | 
272 | ### 4.3 Client List View
273 | 
274 | ```typescript
275 | // Sample structure following existing patterns
276 | interface ClientListProps {
277 |   view: 'grid' | 'table';
278 |   filters: ClientFilters;
279 | }
280 | 
281 | // Features:
282 | - Toggle between grid/table view
283 | - Real-time search with debouncing
284 | - Filters: type, status, department, tags
285 | - Sorting: name, last activity, created date
286 | - Pagination with infinite scroll
287 | - Bulk actions for admins
288 | ```
289 | 
290 | ### 4.4 Client Detail Page
291 | 
292 | ```typescript
293 | // Tab structure for client details
294 | const clientTabs = [
295 |   { id: 'overview', label: 'Overview', icon: User },
296 |   { id: 'guidelines', label: 'Guidelines', icon: FileText },
297 |   { id: 'social', label: 'Social Media', icon: Share2 },
298 |   { id: 'documents', label: 'Documents', icon: File },
299 |   { id: 'activity', label: 'Activity', icon: Activity },
300 |   { id: 'team', label: 'Team Access', icon: Users }, // Admin only
301 | ];
302 | ```
303 | 
304 | ---
305 | 
306 | ## 5. User Flows
307 | 
308 | ### 5.1 Creating a New Client
309 | 
310 | ```mermaid
311 | graph TD
312 |     A[Dashboard] --> B[Click New Client]
313 |     B --> C{Select Client Type}
314 |     C -->|Politician| D[Politician Form]
315 |     C -->|Corporate| E[Corporate Form]
316 |     D --> F[Fill Basic Info]
317 |     E --> F
318 |     F --> G[Add Contact Details]
319 |     G --> H[Assign Department]
320 |     H --> I[Set Account Manager]
321 |     I --> J[Add Initial Guidelines]
322 |     J --> K[Save Client]
323 |     K --> L[Redirect to Client Detail]
324 | ```
325 | 
326 | ### 5.2 Client Search and Filter
327 | 
328 | 1. **Quick Search**: Instant search across name, tags, notes
329 | 2. **Advanced Filters**: 
330 |    - Client type (politician/corporate)
331 |    - Status (active/inactive/prospect)
332 |    - Department assignment
333 |    - Tags
334 |    - Date ranges
335 | 3. **Saved Filters**: Users can save filter combinations
336 | 4. **Export**: Filtered results can be exported (CSV/PDF)
337 | 
338 | ### 5.3 Managing Client Guidelines
339 | 
340 | ```typescript
341 | // Guidelines management flow
342 | interface GuidelineFlow {
343 |   steps: [
344 |     'Select guideline type (Do/Don\'t)',
345 |     'Choose category',
346 |     'Write guideline text',
347 |     'Set priority level',
348 |     'Save with audit trail'
349 |   ];
350 |   validation: {
351 |     maxLength: 500;
352 |     requiresCategory: true;
353 |     allowedCategories: ['communication', 'topics', 'branding', 'events'];
354 |   };
355 | }
356 | ```
357 | 
358 | ---
359 | 
360 | ## 6. API Design
361 | 
362 | ### 6.1 API Routes (Following Next.js App Router patterns)
363 | 
364 | ```typescript
365 | // app/api/clients/route.ts
366 | export async function GET(request: Request) {
367 |   // List clients with pagination, filters, search
368 | }
369 | 
370 | export async function POST(request: Request) {
371 |   // Create new client
372 | }
373 | 
374 | // app/api/clients/[slug]/route.ts
375 | export async function GET(request: Request, { params }: { params: { slug: string } }) {
376 |   // Get single client details
377 | }
378 | 
379 | export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
380 |   // Update client
381 | }
382 | 
383 | // Real-time subscriptions using Supabase
384 | const clientSubscription = supabase
385 |   .channel('clients')
386 |   .on('postgres_changes', { 
387 |     event: '*', 
388 |     schema: 'public', 
389 |     table: 'clients' 
390 |   }, handleClientChange)
391 |   .subscribe();
392 | ```
393 | 
394 | ### 6.2 Client Hooks (Following existing auth pattern)
395 | 
396 | ```typescript
397 | // lib/clients.tsx
398 | export function useClient(slug: string) {
399 |   const [client, setClient] = useState<Client | null>(null);
400 |   const [loading, setLoading] = useState(true);
401 |   
402 |   // Fetch logic with real-time updates
403 |   return { client, loading, error };
404 | }
405 | 
406 | export function useClients(filters?: ClientFilters) {
407 |   // List hook with pagination
408 | }
409 | 
410 | export function useClientActivity(clientId: string) {
411 |   // Activity feed with real-time updates
412 | }
413 | ```
414 | 
415 | ---
416 | 
417 | ## 7. Search Implementation
418 | 
419 | ### 7.1 Full-Text Search
420 | 
421 | ```typescript
422 | // Using PostgreSQL full-text search
423 | interface SearchImplementation {
424 |   // Indexed fields with weights
425 |   fields: {
426 |     name: 'A',        // Highest weight
427 |     displayName: 'B',
428 |     tags: 'C',
429 |     notes: 'D'        // Lowest weight
430 |   };
431 |   
432 |   // Search features
433 |   features: [
434 |     'Fuzzy matching',
435 |     'Prefix search',
436 |     'Tag filtering',
437 |     'Type-ahead suggestions',
438 |     'Search history'
439 |   ];
440 | }
441 | ```
442 | 
443 | ### 7.2 Search UI Component
444 | 
445 | ```typescript
446 | // components/clients/client-search.tsx
447 | export function ClientSearch() {
448 |   // Debounced search input
449 |   // Dropdown with categorized results
450 |   // Recent searches
451 |   // Quick filters
452 | }
453 | ```
454 | 
455 | ---
456 | 
457 | ## 8. Performance Considerations
458 | 
459 | ### 8.1 Optimization Strategies
460 | 
461 | 1. **Database Level**:
462 |    - Indexed columns for common queries
463 |    - Materialized views for complex aggregations
464 |    - Connection pooling via Supabase
465 | 
466 | 2. **Application Level**:
467 |    - React Query for caching and synchronization
468 |    - Virtual scrolling for large lists
469 |    - Image optimization with next/image
470 |    - Lazy loading for tabs
471 | 
472 | 3. **Real-time Updates**:
473 |    - Selective subscriptions (only subscribe to visible data)
474 |    - Debounced updates
475 |    - Optimistic UI updates
476 | 
477 | ### 8.2 Loading States
478 | 
479 | ```typescript
480 | // Consistent loading patterns
481 | <Skeleton className="h-[200px] w-full" />  // For cards
482 | <TableSkeleton rows={5} />                 // For tables
483 | <Spinner size="sm" />                       // For inline loading
484 | ```
485 | 
486 | ---
487 | 
488 | ## 9. Security & Permissions
489 | 
490 | ### 9.1 Access Control Matrix
491 | 
492 | | Feature | Admin | User (Same Dept) | User (Other Dept) | Account Manager |
493 | |---------|-------|------------------|-------------------|-----------------|
494 | | View Client List | All | Department Only | No | Assigned Only |
495 | | View Client Details | All | Department Only | No | Assigned Only |
496 | | Create Client | Yes | No | No | No |
497 | | Edit Client | Yes | No | No | Assigned Only |
498 | | Delete Client | Yes | No | No | No |
499 | | Manage Guidelines | Yes | View Only | No | Yes |
500 | | Upload Documents | Yes | Yes | No | Yes |
501 | | View Activity | Yes | Yes | No | Yes |
502 | 
503 | ### 9.2 Data Validation
504 | 
505 | ```typescript
506 | // Using Zod for validation (industry standard)
507 | import { z } from 'zod';
508 | 
509 | const clientSchema = z.object({
510 |   name: z.string().min(2).max(255),
511 |   client_type: z.enum(['politician', 'corporate', 'ngo', 'government_body']),
512 |   primary_email: z.string().email().optional(),
513 |   primary_phone: z.string().regex(/^\+?[\d\s-()]+$/).optional(),
514 |   tags: z.array(z.string()).max(10),
515 | });
516 | ```
517 | 
518 | ---
519 | 
520 | ## 10. Integration Points
521 | 
522 | ### 10.1 Existing System Integration
523 | 
524 | 1. **Authentication**: Uses existing `useAuth()` hook
525 | 2. **Departments**: Links to existing department structure
526 | 3. **Profiles**: References existing user profiles
527 | 4. **UI Components**: Extends current shadcn/ui library
528 | 5. **Theme**: Follows established dark theme
529 | 
530 | ### 10.2 Future Integration Considerations
531 | 
532 | - Content Management System (link SOPs to clients)
533 | - Task Management (assign tasks to client projects)
534 | - Communication Logs (email/call tracking)
535 | - Analytics Dashboard (client engagement metrics)
536 | 
537 | ---
538 | 
539 | ## 11. Mobile Responsiveness
540 | 
541 | ### 11.1 Responsive Design Approach
542 | 
543 | ```typescript
544 | // Following Tailwind responsive patterns
545 | <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
546 |   {/* Client cards */}
547 | </div>
548 | 
549 | // Mobile-first navigation
550 | <Sheet> {/* Mobile menu */}
551 |   <SheetTrigger asChild>
552 |     <Button variant="ghost" className="md:hidden">
553 |       <Menu className="h-6 w-6" />
554 |     </Button>
555 |   </SheetTrigger>
556 | </Sheet>
557 | ```
558 | 
559 | ### 11.2 Touch Interactions
560 | 
561 | - Swipe gestures for navigation
562 | - Touch-friendly tap targets (min 44x44px)
563 | - Pull-to-refresh for lists
564 | - Bottom sheet for mobile actions
565 | 
566 | ---
567 | 
568 | ## 12. Error Handling
569 | 
570 | ### 12.1 Error States
571 | 
572 | ```typescript
573 | // Consistent error handling
574 | interface ErrorStates {
575 |   network: "Unable to connect. Please check your internet connection.";
576 |   permission: "You don't have permission to view this client.";
577 |   notFound: "Client not found.";
578 |   validation: "Please check the form for errors.";
579 |   server: "Something went wrong. Please try again.";
580 | }
581 | 
582 | // Error boundary for client sections
583 | export function ClientErrorBoundary({ children }: { children: React.ReactNode }) {
584 |   return (
585 |     <ErrorBoundary fallback={<ClientErrorFallback />}>
586 |       {children}
587 |     </ErrorBoundary>
588 |   );
589 | }
590 | ```
591 | 
592 | ---
593 | 
594 | ## 13. Analytics & Monitoring
595 | 
596 | ### 13.1 Tracked Events
597 | 
598 | ```typescript
599 | // Analytics events
600 | enum ClientEvents {
601 |   CLIENT_CREATED = 'client_created',
602 |   CLIENT_VIEWED = 'client_viewed',
603 |   CLIENT_EDITED = 'client_edited',
604 |   GUIDELINE_ADDED = 'guideline_added',
605 |   DOCUMENT_UPLOADED = 'document_uploaded',
606 |   SEARCH_PERFORMED = 'search_performed'
607 | }
608 | 
609 | // Usage tracking
610 | track(ClientEvents.CLIENT_VIEWED, {
611 |   client_id: client.id,
612 |   client_type: client.client_type,
613 |   department_id: client.department_id
614 | });
615 | ```
616 | 
617 | ---
618 | 
619 | ## 14. Testing Strategy
620 | 
621 | ### 14.1 Test Coverage Requirements
622 | 
623 | 1. **Unit Tests**: 
624 |    - Client validation schemas
625 |    - Utility functions
626 |    - Custom hooks
627 | 
628 | 2. **Integration Tests**:
629 |    - API routes
630 |    - Database queries
631 |    - RLS policies
632 | 
633 | 3. **E2E Tests**:
634 |    - Client creation flow
635 |    - Search functionality
636 |    - Permission scenarios
637 | 
638 | ---
639 | 
640 | ## 15. Deployment Considerations
641 | 
642 | ### 15.1 Database Migrations
643 | 
644 | ```sql
645 | -- Migration strategy
646 | -- 1. Create new tables without breaking existing schema
647 | -- 2. Add foreign key relationships
648 | -- 3. Enable RLS policies
649 | -- 4. Create indexes
650 | -- 5. Seed initial data for testing
651 | ```
652 | 
653 | ### 15.2 Feature Flags
654 | 
655 | ```typescript
656 | // Progressive rollout
657 | const features = {
658 |   clientManagement: process.env.NEXT_PUBLIC_FEATURE_CLIENT_MANAGEMENT === 'true',
659 |   advancedSearch: process.env.NEXT_PUBLIC_FEATURE_ADVANCED_SEARCH === 'true',
660 | };
661 | ```
662 | 
663 | ---
664 | 
665 | ## 16. Success Metrics
666 | 
667 | ### 16.1 KPIs
668 | 
669 | 1. **Adoption**: 80% of users accessing client module weekly
670 | 2. **Efficiency**: 50% reduction in time to find client information
671 | 3. **Data Quality**: 95% of clients with complete profiles
672 | 4. **Performance**: <2s load time for client list
673 | 5. **Search Accuracy**: 90% success rate on first search
674 | 
675 | ---
676 | 
677 | ## 17. Timeline
678 | 
679 | ### Phase 1: Foundation (Week 1-2)
680 | - Database schema implementation
681 | - Basic CRUD operations
682 | - RLS policies
683 | 
684 | ### Phase 2: Core Features (Week 3-4)
685 | - Client list and detail views
686 | - Search implementation
687 | - Guidelines management
688 | 
689 | ### Phase 3: Advanced Features (Week 5-6)
690 | - Document management
691 | - Activity tracking
692 | - Real-time updates
693 | 
694 | ### Phase 4: Polish (Week 7-8)
695 | - Performance optimization
696 | - Mobile responsiveness
697 | - Testing and bug fixes
698 | 
699 | ---
700 | 
701 | ## Appendix A: Sample Code Patterns
702 | 
703 | ### A.1 Client List Component
704 | 
705 | ```tsx
706 | // Following existing component patterns
707 | export function ClientList() {
708 |   const { user } = useAuth();
709 |   const [view, setView] = useState<'grid' | 'table'>('grid');
710 |   const { clients, loading, error } = useClients();
711 | 
712 |   if (loading) return <ClientListSkeleton />;
713 |   if (error) return <ErrorState error={error} />;
714 | 
715 |   return (
716 |     <div className="space-y-4">
717 |       <div className="flex justify-between items-center">
718 |         <h1 className="text-2xl font-bold text-white">Clients</h1>
719 |         <div className="flex gap-2">
720 |           <ViewToggle view={view} onChange={setView} />
721 |           {user?.role === 'admin' && (
722 |             <Button asChild>
723 |               <Link href="/dashboard/clients/new">
724 |                 <Plus className="h-4 w-4 mr-2" />
725 |                 Add Client
726 |               </Link>
727 |             </Button>
728 |           )}
729 |         </div>
730 |       </div>
731 |       
732 |       {view === 'grid' ? (
733 |         <ClientGrid clients={clients} />
734 |       ) : (
735 |         <ClientTable clients={clients} />
736 |       )}
737 |     </div>
738 |   );
739 | }
740 | ```
741 | 
742 | ### A.2 Client Detail Tabs
743 | 
744 | ```tsx
745 | // Using existing Tabs component pattern
746 | <Tabs defaultValue="overview" className="w-full">
747 |   <TabsList className="grid w-full grid-cols-5">
748 |     <TabsTrigger value="overview">Overview</TabsTrigger>
749 |     <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
750 |     <TabsTrigger value="social">Social Media</TabsTrigger>
751 |     <TabsTrigger value="documents">Documents</TabsTrigger>
752 |     <TabsTrigger value="activity">Activity</TabsTrigger>
753 |   </TabsList>
754 |   
755 |   <TabsContent value="overview">
756 |     <ClientOverview client={client} />
757 |   </TabsContent>
758 |   
759 |   <TabsContent value="guidelines">
760 |     <ClientGuidelines clientId={client.id} />
761 |   </TabsContent>
762 |   
763 |   {/* ... other tabs */}
764 | </Tabs>
765 | ```
766 | 
767 | ---
768 | 
769 | This PRD provides a comprehensive blueprint for implementing the client management feature while maintaining consistency with your existing architecture and design patterns.
```

next.config.js
```
1 | /** @type {import('next').NextConfig} */
2 | const nextConfig = {
3 |   // ESLint configuration
4 |   eslint: {
5 |     // Only fail on errors, not warnings during build
6 |     ignoreDuringBuilds: false,
7 |   },
8 |   
9 |   // Performance optimizations
10 |   
11 |   // Experimental features for better performance
12 |   experimental: {
13 |     optimizePackageImports: [
14 |       '@radix-ui/react-slot',
15 |       '@radix-ui/react-label',
16 |       '@radix-ui/react-select',
17 |       '@radix-ui/react-tabs',
18 |       'lucide-react'
19 |     ]
20 |   },
21 | 
22 |   // Image optimization
23 |   images: {
24 |     formats: ['image/webp', 'image/avif'],
25 |     minimumCacheTTL: 60,
26 |   },
27 | 
28 |   // Bundle analyzer (enable in development for debugging)
29 |   ...(process.env.ANALYZE === 'true' && {
30 |     webpack: (config, { isServer }) => {
31 |       if (!isServer) {
32 |         const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
33 |         config.plugins.push(
34 |           new BundleAnalyzerPlugin({
35 |             analyzerMode: 'static',
36 |             reportFilename: '../analyze/client.html',
37 |             openAnalyzer: false,
38 |           })
39 |         )
40 |       }
41 |       return config
42 |     }
43 |   }),
44 | 
45 |   // Security headers
46 |   async headers() {
47 |     return [
48 |       {
49 |         source: '/(.*)',
50 |         headers: [
51 |           {
52 |             key: 'X-Frame-Options',
53 |             value: 'DENY'
54 |           },
55 |           {
56 |             key: 'X-Content-Type-Options',
57 |             value: 'nosniff'
58 |           },
59 |           {
60 |             key: 'Referrer-Policy',
61 |             value: 'strict-origin-when-cross-origin'
62 |           },
63 |           {
64 |             key: 'Content-Security-Policy',
65 |             value: [
66 |               "default-src 'self'",
67 |               "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
68 |               "style-src 'self' 'unsafe-inline'",
69 |               "img-src 'self' data: https:",
70 |               "font-src 'self'",
71 |               "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
72 |               "frame-ancestors 'none'"
73 |             ].join('; ')
74 |           }
75 |         ]
76 |       }
77 |     ]
78 |   }
79 | }
80 | 
81 | module.exports = nextConfig
```

package.json
```
1 | {
2 |   "name": "anyasegen",
3 |   "version": "1.0.0",
4 |   "main": "index.js",
5 |   "scripts": {
6 |     "dev": "next dev",
7 |     "build": "next build",
8 |     "start": "next start",
9 |     "lint": "next lint"
10 |   },
11 |   "keywords": [],
12 |   "author": "",
13 |   "license": "ISC",
14 |   "description": "",
15 |   "dependencies": {
16 |     "@radix-ui/react-label": "^2.1.7",
17 |     "@radix-ui/react-select": "^2.2.5",
18 |     "@radix-ui/react-slot": "^1.2.3",
19 |     "@radix-ui/react-tabs": "^1.1.12",
20 |     "@supabase/ssr": "^0.6.1",
21 |     "@supabase/supabase-js": "^2.50.3",
22 |     "@types/node": "^24.0.10",
23 |     "@types/react": "^19.1.8",
24 |     "@types/react-dom": "^19.1.6",
25 |     "autoprefixer": "^10.4.21",
26 |     "class-variance-authority": "^0.7.1",
27 |     "clsx": "^2.1.1",
28 |     "eslint": "^9.30.1",
29 |     "eslint-config-next": "^15.3.5",
30 |     "framer-motion": "^12.23.0",
31 |     "lucide-react": "^0.525.0",
32 |     "next": "^15.3.5",
33 |     "postcss": "^8.5.6",
34 |     "react": "^19.1.0",
35 |     "react-dom": "^19.1.0",
36 |     "tailwind-merge": "^3.3.1",
37 |     "tailwindcss": "^3.4.17",
38 |     "task-master-ai": "^0.19.0",
39 |     "typescript": "^5.8.3"
40 |   }
41 | }
```

postcss.config.js
```
1 | module.exports = {
2 |   plugins: {
3 |     tailwindcss: {},
4 |     autoprefixer: {},
5 |   },
6 | }
```

tailwind-complex.config.js
```
1 | /** @type {import('tailwindcss').Config} */
2 | module.exports = {
3 |   darkMode: "class",
4 |   content: [
5 |     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
6 |     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
7 |     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
8 |   ],
9 |   theme: {
10 |     extend: {
11 |       colors: {
12 |         border: "hsl(var(--border))",
13 |         input: "hsl(var(--input))",
14 |         ring: "hsl(var(--ring))",
15 |         background: "hsl(var(--background))",
16 |         foreground: "hsl(var(--foreground))",
17 |         primary: {
18 |           DEFAULT: "hsl(var(--primary))",
19 |           foreground: "hsl(var(--primary-foreground))",
20 |         },
21 |         secondary: {
22 |           DEFAULT: "hsl(var(--secondary))",
23 |           foreground: "hsl(var(--secondary-foreground))",
24 |         },
25 |         destructive: {
26 |           DEFAULT: "hsl(var(--destructive))",
27 |           foreground: "hsl(var(--destructive-foreground))",
28 |         },
29 |         muted: {
30 |           DEFAULT: "hsl(var(--muted))",
31 |           foreground: "hsl(var(--muted-foreground))",
32 |         },
33 |         accent: {
34 |           DEFAULT: "hsl(var(--accent))",
35 |           foreground: "hsl(var(--accent-foreground))",
36 |         },
37 |         popover: {
38 |           DEFAULT: "hsl(var(--popover))",
39 |           foreground: "hsl(var(--popover-foreground))",
40 |         },
41 |         card: {
42 |           DEFAULT: "hsl(var(--card))",
43 |           foreground: "hsl(var(--card-foreground))",
44 |         },
45 |       },
46 |       borderRadius: {
47 |         lg: "var(--radius)",
48 |         md: "calc(var(--radius) - 2px)",
49 |         sm: "calc(var(--radius) - 4px)",
50 |       },
51 |     },
52 |   },
53 |   plugins: [],
54 | }
```

tailwind.config.js
```
1 | /** @type {import('tailwindcss').Config} */
2 | module.exports = {
3 |   content: [
4 |     './src/**/*.{js,ts,jsx,tsx,mdx}',
5 |   ],
6 |   theme: {
7 |     extend: {},
8 |   },
9 |   plugins: [],
10 | }
```

tsconfig.json
```
1 | {
2 |   "compilerOptions": {
3 |     "target": "es5",
4 |     "lib": ["dom", "dom.iterable", "es6"],
5 |     "allowJs": true,
6 |     "skipLibCheck": true,
7 |     "strict": true,
8 |     "noEmit": true,
9 |     "esModuleInterop": true,
10 |     "module": "esnext",
11 |     "moduleResolution": "bundler",
12 |     "resolveJsonModule": true,
13 |     "isolatedModules": true,
14 |     "jsx": "preserve",
15 |     "incremental": true,
16 |     "plugins": [
17 |       {
18 |         "name": "next"
19 |       }
20 |     ],
21 |     "baseUrl": ".",
22 |     "paths": {
23 |       "@/*": ["./src/*"]
24 |     }
25 |   },
26 |   "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
27 |   "exclude": ["node_modules"]
28 | }
```

.claude/settings.local.json
```
1 | {
2 |   "permissions": {
3 |     "allow": [
4 |       "Bash(npx create-next-app:*)",
5 |       "Bash(cp:*)",
6 |       "Bash(true)",
7 |       "Bash(rm:*)",
8 |       "Bash(npm init:*)",
9 |       "Bash(npm install:*)",
10 |       "Bash(mkdir:*)",
11 |       "Bash(npx tailwindcss init:*)",
12 |       "Bash(./node_modules/.bin/tailwindcss:*)",
13 |       "Bash(npm run dev:*)",
14 |       "Bash(npm uninstall:*)",
15 |       "mcp__supabase__apply_migration",
16 |       "Bash(pkill:*)",
17 |       "Bash(npx tailwindcss:*)",
18 |       "Bash(mv:*)",
19 |       "mcp__supabase__execute_sql",
20 |       "mcp__supabase__get_project_url",
21 |       "mcp__supabase__get_logs",
22 |       "Bash(npm run build:*)",
23 |       "Bash(rg:*)",
24 |       "mcp__supabase__list_tables",
25 |       "Bash(find:*)",
26 |       "Bash(ls:*)",
27 |       "Bash(npm run lint)",
28 |       "Bash(sed:*)"
29 |     ]
30 |   },
31 |   "enableAllProjectMcpServers": true,
32 |   "enabledMcpjsonServers": [
33 |     "supabase"
34 |   ]
35 | }
```

deck/index.html
```
1 | <!DOCTYPE html>
2 | <html lang="en">
3 | <head>
4 |     <meta charset="UTF-8">
5 |     <meta name="viewport" content="width=device-width, initial-scale=1.0">
6 |     <title>Anya Segen | Creative Agency</title>
7 |     
8 |     <link rel="preconnect" href="https://fonts.googleapis.com">
9 |     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
10 |     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
11 |     
12 |     <style>
13 |         :root {
14 |             /* Core Palette */
15 |             --color-navy-dark: #050816;
16 |             --color-navy-medium: #101832;
17 |             --color-white-off: #f0f4f8;
18 |             --color-slate-light: #a0aec0;
19 |             --color-slate-dark: #4a5568;
20 | 
21 |             /* Main Accent */
22 |             --color-electric-blue: #007CF0;
23 |             --color-cyan-glow: #00DFD8;
24 | 
25 |             /* Keyword Accent Palette */
26 |             --color-gov-accent: #007CF0;      /* Blue */
27 |             --color-pol-accent: #E11D8F;      /* Fuchsia/Magenta */
28 |             --color-corp-accent: #00DFD8;     /* Cyan */
29 |             --color-dev-accent: #10B981;      /* Green */
30 | 
31 |             --font-main: 'Inter', sans-serif;
32 |         }
33 | 
34 |         *, *::before, *::after { box-sizing: border-box; }
35 |         html { scroll-behavior: smooth; }
36 |         body {
37 |             font-family: var(--font-main);
38 |             background-color: var(--color-navy-dark);
39 |             color: var(--color-white-off);
40 |             margin: 0;
41 |             -webkit-font-smoothing: antialiased;
42 |             -moz-osx-font-smoothing: grayscale;
43 |             overflow-x: hidden;
44 |         }
45 | 
46 |         .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 40px; }
47 |         section { padding: 160px 0; position: relative; }
48 |         section:not(#hero)::before {
49 |             content: ''; position: absolute; top: 0; left: 50%;
50 |             transform: translateX(-50%); width: 80%; height: 1px;
51 |             background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
52 |         }
53 |         
54 |         h1, h2, h3 { font-weight: 700; margin-top: 0; letter-spacing: -1px; }
55 |         h2 {
56 |             font-size: clamp(2.8rem, 5vw, 4rem); color: var(--color-white-off);
57 |             text-align: center; margin-bottom: 100px;
58 |         }
59 |         h2 span {
60 |             background: -webkit-linear-gradient(45deg, var(--color-electric-blue), var(--color-cyan-glow));
61 |             -webkit-background-clip: text; -webkit-text-fill-color: transparent;
62 |         }
63 |         
64 |         .aurora-shape {
65 |             position: absolute; width: 500px; height: 500px;
66 |             background: radial-gradient(circle, rgba(0, 124, 240, 0.1), transparent 60%);
67 |             filter: blur(120px); z-index: -1; animation: slow-drift 20s ease-in-out infinite alternate;
68 |         }
69 |         .aurora-1 { top: -10%; left: -20%; }
70 |         .aurora-2 { bottom: -15%; right: -25%; animation-direction: alternate-reverse; }
71 |         @keyframes slow-drift { from { transform: translate(0, 0); } to { transform: translate(100px, 50px); } }
72 | 
73 |         /* --- HERO --- */
74 |         #hero {
75 |             height: 100vh; display: flex; flex-direction: column;
76 |             justify-content: center; align-items: center; text-align: center;
77 |         }
78 |         #hero h1 {
79 |             font-size: clamp(3.5rem, 10vw, 8rem); font-weight: 800;
80 |             margin: 0; letter-spacing: -3px;
81 |         }
82 |         #hero .subtitle {
83 |             font-size: clamp(1.2rem, 4vw, 1.75rem); font-weight: 400;
84 |             color: var(--color-electric-blue); margin: 10px 0 40px 0;
85 |             letter-spacing: 2px; text-transform: uppercase;
86 |         }
87 |         #hero .contact-info a, #hero .contact-info span {
88 |             color: var(--color-slate-light);
89 |             font-weight: 400;
90 |             transition: color 0.3s ease;
91 |             text-decoration: none;
92 |         }
93 |         #hero .contact-info a:hover {
94 |             color: var(--color-white-off);
95 |         }
96 | 
97 | 
98 |         /* --- ABOUT US --- */
99 |         #about p {
100 |             font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 500;
101 |             line-height: 1.4; max-width: 1100px; margin: 0 auto;
102 |             color: var(--color-slate-light);
103 |         }
104 |         #about p span { color: var(--color-white-off); font-weight: 600; }
105 | 
106 |         /* --- OUR EXPERTISE (What We Do) --- */
107 |         .expertise-grid {
108 |             display: grid;
109 |             grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
110 |             gap: 40px;
111 |         }
112 |         .expertise-card {
113 |             background: rgba(16, 24, 50, 0.6); backdrop-filter: blur(10px);
114 |             padding: 40px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1);
115 |             transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
116 |         }
117 |         .expertise-card:hover {
118 |             transform: translateY(-12px);
119 |             box-shadow: 0 0 40px rgba(0, 124, 240, 0.3);
120 |             border-color: var(--color-electric-blue);
121 |         }
122 |         .expertise-card h3 { color: var(--color-white-off); font-size: 1.75rem; margin-bottom: 20px; }
123 |         .expertise-card h3 span { transition: color 0.3s ease; }
124 |         .expertise-card:hover h3 span { color: var(--color-electric-blue); }
125 |         .expertise-card p { margin: 0; color: var(--color-slate-light); line-height: 1.8; }
126 | 
127 |         /* --- OUR APPROACH --- */
128 |         #approach .container { max-width: 900px; }
129 |         .approach-timeline { position: relative; padding: 20px 0; }
130 |         .approach-timeline::before {
131 |             content: ''; position: absolute; left: 50%; top: 0; bottom: 0;
132 |             width: 2px; background: var(--color-slate-dark); transform: translateX(-50%);
133 |         }
134 |         .step {
135 |             padding: 20px 40px; position: relative; width: 50%;
136 |             opacity: 0; transform: translateY(50px);
137 |             transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
138 |         }
139 |         .step.visible { opacity: 1; transform: translateY(0); }
140 |         .step:nth-child(odd) { left: 0; padding-left: 0; text-align: right; }
141 |         .step:nth-child(even) { left: 50%; padding-right: 0; text-align: left; }
142 |         .step::after {
143 |             content: ''; position: absolute; width: 18px; height: 18px;
144 |             border-radius: 50%; background: var(--color-slate-dark);
145 |             border: 3px solid var(--color-slate-dark); top: 50%;
146 |             transform: translateY(-50%); transition: all 0.3s ease;
147 |         }
148 |         .step:nth-child(odd)::after { right: -11px; }
149 |         .step:nth-child(even)::after { left: -11px; }
150 |         .step:hover::after { background: var(--color-electric-blue); border-color: var(--color-electric-blue); }
151 |         .step h3 { font-size: 2rem; margin: 0 0 10px 0; color: var(--color-white-off); transition: color 0.3s ease; }
152 |         .step:hover h3 { color: var(--color-electric-blue); }
153 |         .step p { margin: 0; color: var(--color-slate-light); font-size: 1.1rem; line-height: 1.6; }
154 | 
155 |         /* --- IMPACT STORIES (Portfolio) --- */
156 |         .tabs { display: flex; justify-content: center; gap: 15px; margin-bottom: 80px; flex-wrap: wrap; }
157 |         .tab-button {
158 |             background: rgba(16, 24, 50, 0.6); border: 1px solid var(--color-slate-dark);
159 |             color: var(--color-slate-light); padding: 12px 25px; border-radius: 50px; cursor: pointer;
160 |             font-size: 1rem; font-weight: 500; transition: all 0.3s ease; backdrop-filter: blur(5px);
161 |         }
162 |         .tab-button:hover { color: var(--color-white-off); border-color: var(--color-electric-blue); }
163 |         .tab-button.active {
164 |             background-color: var(--color-electric-blue); border-color: var(--color-electric-blue);
165 |             color: var(--color-white-off); font-weight: 600; box-shadow: 0 5px 20px rgba(0, 119, 255, 0.2);
166 |         }
167 |         .tab-content { display: none; }
168 |         .tab-content.active { display: block; }
169 |         .project-layout {
170 |             display: grid; grid-template-columns: 7fr 5fr;
171 |             gap: 60px; align-items: center; margin-bottom: 120px;
172 |         }
173 |         .project-layout:last-child { margin-bottom: 0; }
174 |         .project-description h3 { font-size: 2.5rem; margin-bottom: 20px; color: var(--color-white-off); }
175 |         .project-description p { color: var(--color-slate-light); line-height: 1.8; font-size: 1.1rem; }
176 |         
177 |         /* Keyword Hover Magic */
178 |         .project-description span { font-weight: 600; color: var(--color-slate-light); transition: color 0.3s ease; }
179 |         #gov .project-description:hover span { color: var(--color-gov-accent); }
180 |         #pol .project-description:hover span { color: var(--color-pol-accent); }
181 |         #corp .project-description:hover span { color: var(--color-corp-accent); }
182 |         #dev .project-description:hover span { color: var(--color-dev-accent); }
183 |         
184 |         .project-gallery { display: grid; gap: 20px; }
185 |         .image-box {
186 |             background-color: var(--color-navy-medium); border-radius: 12px;
187 |             overflow: hidden; position: relative;
188 |             border: 1px solid rgba(255,255,255,0.1); transition: all 0.4s ease;
189 |             aspect-ratio: 16 / 9;
190 |         }
191 |         /* Removes default "IMAGE" text if an img tag is present */
192 |         .image-box:has(img)::before { display: none; }
193 |         .image-box img {
194 |             width: 100%;
195 |             height: 100%;
196 |             object-fit: cover; /* This is key for preventing distortion */
197 |             transition: transform 0.4s ease;
198 |         }
199 |         .image-box:hover img {
200 |             transform: scale(1.05);
201 |         }
202 |         .image-box:hover {
203 |             border-color: var(--color-cyan-glow);
204 |             box-shadow: 0 0 30px rgba(0, 223, 216, 0.1);
205 |         }
206 | 
207 |         /* Custom gallery for featured D2C project */
208 |         .gallery-featured-d2c {
209 |             grid-template-columns: 1fr 1fr;
210 |         }
211 |         .gallery-featured-d2c .image-box {
212 |             aspect-ratio: 4 / 3;
213 |         }
214 | 
215 |         /* Custom gallery for ITC square project */
216 |         .gallery-square {
217 |             grid-template-columns: 1fr 1fr;
218 |         }
219 |         .gallery-square .image-box {
220 |             aspect-ratio: 1 / 1;
221 |         }
222 | 
223 |         /* Custom gallery for Intract vertical project */
224 |         .gallery-vertical .image-box {
225 |             aspect-ratio: 9 / 16;
226 |         }
227 | 
228 | 
229 |         /* --- WHY US --- */
230 |         #why-us .expertise-grid { grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); }
231 |         #why-us .expertise-card { display: flex; align-items: flex-start; gap: 20px; }
232 |         #why-us .expertise-card .icon { color: var(--color-electric-blue); flex-shrink: 0; margin-top: 5px; }
233 |         #why-us .expertise-card p { margin: 0; color: var(--color-slate-light); line-height: 1.6; }
234 |         #why-us .expertise-card p strong { color: var(--color-white-off); font-weight: 600; }
235 |         
236 |         /* --- CONTACT --- */
237 |         #contact { text-align: center; }
238 |         #contact .founder-quote {
239 |             font-size: clamp(2rem, 4vw, 3rem); font-weight: 500;
240 |             color: var(--color-white-off); max-width: 800px; margin: 0 auto 20px; line-height: 1.4;
241 |         }
242 |         #contact .founder-quote::before, #contact .founder-quote::after { color: var(--color-electric-blue); }
243 |         #contact .founder-quote::before { content: "“"; } #contact .founder-quote::after { content: "”"; }
244 |         #contact .founder-name { font-size: 1.2rem; font-weight: 500; color: var(--color-slate-light); }
245 |         #contact .team-desc { font-size: 1rem; color: var(--color-slate-dark); max-width: 600px; margin: 20px auto 0; font-style: italic; }
246 |         #contact h2 { margin-top: 120px; margin-bottom: 20px; }
247 |         #contact .final-pitch { font-size: 1.2rem; color: var(--color-slate-light); max-width: 600px; margin: 0 auto 50px; line-height: 1.7; }
248 |         
249 |         #contact .contact-links a {
250 |             margin: 0 10px;
251 |             font-size: 1.2rem;
252 |             font-weight: 500;
253 |             color: var(--color-slate-light); 
254 |             text-decoration: none;
255 |             transition: color 0.3s ease;
256 |         }
257 |         #contact .contact-links a:hover {
258 |             color: var(--color-white-off);
259 |         }
260 |         #contact .address {
261 |             font-size: 1rem;
262 |             color: var(--color-slate-dark);
263 |             margin-top: 30px;
264 |             line-height: 1.6;
265 |         }
266 |         
267 |         /* --- RESPONSIVE --- */
268 |         @media (max-width: 992px) {
269 |             .project-layout { grid-template-columns: 1fr; }
270 |             .project-gallery { grid-row: 1; margin-bottom: 40px; }
271 |         }
272 |         @media (max-width: 768px) {
273 |             section { padding: 100px 0; }
274 |             h2 { margin-bottom: 60px; }
275 |             .step, .step:nth-child(even), .step:nth-child(odd) {
276 |                 width: 100%; left: 0; padding: 20px 0 20px 40px; text-align: left;
277 |             }
278 |             .approach-timeline::before { left: 10px; }
279 |             .step::after, .step:nth-child(odd)::after, .step:nth-child(even)::after { left: 1px; }
280 |             #why-us .expertise-grid { grid-template-columns: 1fr; }
281 |         }
282 |     </style>
283 | </head>
284 | <body>
285 | 
286 |     <main>
287 |         <section id="hero">
288 |             <div class="aurora-shape aurora-1"></div>
289 |             <div class="aurora-shape aurora-2"></div>
290 |             <h1>Anya Segen</h1>
291 |             <p class="subtitle">Creative Agency</p>
292 |             <div class="contact-info">
293 |                 <a href="http://www.anyasegen.com" target="_blank">www.anyasegen.com</a>
294 |                 <span>&nbsp;|&nbsp;</span>
295 |                 <a href="mailto:admin@anyasegen.com">admin@anyasegen.com</a>
296 |                 <span>&nbsp;|&nbsp;</span>
297 |                 <a href="tel:+918383036073">+91 8383036073</a>
298 |             </div>
299 |         </section>
300 | 
301 |         <section id="about" class="container">
302 |             <p>Anya Segen is a creative agency building <span>brands, stories, and campaigns</span> that resonate. Since 2014, we've worked at the intersection of strategy, design, and technology—helping <span>leaders and brands</span> shape their narratives and drive meaningful impact.</p>
303 |         </section>
304 | 
305 |         <section id="expertise">
306 |             <div class="container">
307 |                 <div class="aurora-shape aurora-1"></div>
308 |                 <h2 class="reveal">Our <span>Expertise</span></h2>
309 |                 <div class="expertise-grid">
310 |                     <div class="expertise-card reveal"><h3><span>Branding</span> & Identity</h3><p>Crafting memorable logos, comprehensive brand systems, messaging, and packaging that capture your essence.</p></div>
311 |                     <div class="expertise-card reveal"><h3><span>Digital Marketing</span> & Amplification</h3><p>Executing targeted social media strategies, paid advertising campaigns, and influencer marketing to grow your audience.</p></div>
312 |                     <div class="expertise-card reveal"><h3><span>Films</span> & Storytelling</h3><p>Producing compelling motion graphics, short films, and animated explainers that transform complex ideas into elegant narratives.</p></div>
313 |                     <div class="expertise-card reveal"><h3><span>Public Sector</span> & Advocacy</h3><p>Designing high-impact election campaigns, public health messaging (SBCC), and grassroots outreach interventions.</p></div>
314 |                     <div class="expertise-card reveal"><h3><span>Brand</span> & Product Launch</h3><p>Developing end-to-end launch strategies, from initial positioning and identity to e-commerce platforms and market entry.</p></div>
315 |                     <div class="expertise-card reveal"><h3><span>Corporate</span> & Editorial Design</h3><p>Creating premium communication assets like annual reports, coffee table books, and e-books with original illustration and design.</p></div>
316 |                 </div>
317 |             </div>
318 |         </section>
319 | 
320 |         <section id="approach">
321 |             <div class="container">
322 |                 <h2 class="reveal">Our <span>Approach</span></h2>
323 |                 <div class="approach-timeline">
324 |                     <div class="step"><div class="content"><h3>Discover</h3><p>Our process begins with deep listening. We immerse ourselves in your world to understand your audience, challenges, and ambitions.</p></div></div>
325 |                     <div class="step"><div class="content"><h3>Strategize</h3><p>With a foundation of insight, we architect a clear, strategic blueprint that guides every creative decision with purpose and clarity.</p></div></div>
326 |                     <div class="step"><div class="content"><h3>Create</h3><p>This is where ideas take flight. We craft the designs, stories, and experiences that forge an emotional connection with your audience.</p></div></div>
327 |                     <div class="step"><div class="content"><h3>Amplify</h3><p>A great idea needs to be seen. We execute targeted campaigns across all channels—digital, print, and on-ground—to make waves.</p></div></div>
328 |                     <div class="step"><div class="content"><h3>Refine</h3><p>Our partnership doesn't end at launch. We believe in data-driven evolution, continuously measuring and adapting for long-term success.</p></div></div>
329 |                 </div>
330 |             </div>
331 |         </section>
332 | 
333 |         <section id="portfolio">
334 |              <div class="aurora-shape aurora-2"></div>
335 |             <div class="container">
336 |                 <h2 class="reveal">Impact <span>Stories</span></h2>
337 |                 <div class="tabs reveal">
338 |                     <button class="tab-button active" data-tab="gov">Government & Policy</button>
339 |                     <button class="tab-button" data-tab="pol">Political Campaigns</button>
340 |                     <button class="tab-button" data-tab="corp">Corporate & FMCG</button>
341 |                     <button class="tab-button" data-tab="dev">Development & Health</button>
342 |                 </div>
343 |                 
344 |                 <div id="gov" class="tab-content active">
345 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="gov-gullak-event.jpg" alt="Gullak Event branding showcase"></div></div><div class="project-description"><h3>Gullak Event</h3><p>For the <span>Ministry of Rural Development</span>, Uttarakhand, we developed a <span>Shark Tank-style</span> platform for <span>rural entrepreneurs</span>, delivering brand identity, campaign collaterals, and success story films.</p></div></div>
346 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="gov-rbi-rebrand.jpg" alt="Rural Business Incubator rebrand concept"></div></div><div class="project-description"><h3>RBI Rebrand</h3><p>We proposed a complete <span>identity revamp</span> for the Rural Business Incubator to clearly <span>differentiate it</span> from the Reserve Bank of India, covering name strategy to brand architecture.</p></div></div>
347 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="gov-bihan-chhattisgarh.jpg" alt="BIHAN Chhattisgarh product packaging design"></div></div><div class="project-description"><h3>BIHAN, Chhattisgarh</h3><p>We partnered with the <span>Dept. of Rural Development</span> to build <span>packaging SOPs</span> and branding for 25 SHG products, impacting over <span>7,500 households</span> and positioning them on national platforms.</p></div></div>
348 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="gov-ministries-film.jpg" alt="Film still from Ministry of Coal & Mines project"></div></div><div class="project-description"><h3>Ministry of Coal & Mines</h3><p>We produced HD films for both Ministries on <span>commercial mine auctions</span>, featuring top industrialists and showcasing themes of <span>sustainability</span>, investment, and employment.</p></div></div>
349 |                 </div>
350 |                 
351 |                 <div id="pol" class="tab-content">
352 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="pol-bjym.jpg" alt="BJYM social media campaign graphic"></div></div><div class="project-description"><h3>BJYM</h3><p>As an ongoing partner, we manage social media narratives, <span>milestone campaigns</span>, and <span>digital amplification</span> for the Bharatiya Janata Yuva Morcha, strengthening <span>youth engagement</span> nationwide.</p></div></div>
353 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="pol-ram-rajya.jpg" alt="Ram Rajya campaign collateral"></div></div><div class="project-description"><h3>Ram Rajya Campaign</h3><p>We designed a campaign to position a BJYM leader in Ayodhya via a <span>‘Say No to Plastic’</span> narrative, developing a complete <span>campaign identity</span> and leading all social media execution.</p></div></div>
354 |                      <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="pol-modi-hai-naa.jpg" alt="Modi Hai Naa digital campaign content"></div></div><div class="project-description"><h3>Modi Hai Naa</h3><p>We crafted a digital campaign for Neha Joshi (VP BJYM) with the message “If PM Modi is there, everything is possible,” delivering an <span>end-to-end campaign</span> from concept to content.</p></div></div>
355 |                 </div>
356 |                 
357 |                 <div id="corp" class="tab-content">
358 |                     <div class="project-layout reveal"><div class="project-gallery gallery-featured-d2c"><div class="image-box"><img src="corp-d2c-gogrin.jpg" alt="Go Grin brand identity and website"></div><div class="image-box"><img src="corp-d2c-pentagonia.jpg" alt="Pentagonia e-commerce interface"></div><div class="image-box"><img src="corp-d2c-phirkcraft.jpg" alt="Phirk Craft brand launch visuals"></div><div class="image-box"><img src="corp-d2c-lisabona.jpg" alt="Lisabona e-commerce platform design"></div></div><div class="project-description"><h3>D2C E-Commerce Brands</h3><p>For brands like <span>Go Grin</span>, <span>Pentagonia</span>, Phirk Craft, and <span>Lisabona</span>, we developed complete brand identities, launch strategies, and end-to-end <span>e-commerce platforms</span>.</p></div></div>
359 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="corp-philips-foundation.jpg" alt="Philips Foundation coffee table book design"></div></div><div class="project-description"><h3>Philips Foundation</h3><p>We produced a premium <span>coffee table book</span>, managing the entire process from on-ground photography and interviews to the <span>elegant final design</span> and printing.</p></div></div>
360 |                     <div class="project-layout reveal"><div class="project-gallery gallery-square"><div class="image-box"><img src="corp-itc-infographic-1.jpg" alt="ITC Infographic on brand portfolio"></div><div class="image-box"><img src="corp-itc-infographic-2.jpg" alt="ITC Infographic on sustainability"></div><div class="image-box"><img src="corp-itc-infographic-3.jpg" alt="ITC Infographic on vertical integration"></div><div class="image-box"><img src="corp-itc-infographic-4.jpg" alt="ITC Infographic on market leadership"></div></div><div class="project-description"><h3>ITC Limited</h3><p>For the launch of their new corporate website, we partnered with ITC to design four distinct <span>infographics</span>. Each visual narrative was meticulously crafted to articulate the <span>vast scale</span> of the ITC conglomerate, elegantly showcasing their diverse <span>portfolio of brands</span> and impact across multiple verticals.</p></div></div>
361 |                     <div class="project-layout reveal"><div class="project-gallery gallery-vertical"><div class="image-box"><img src="corp-intract-quest.jpg" alt="Intract Quest digital hub interface"></div></div><div class="project-description"><h3>Intract</h3><p>Designed and developed a dynamic <span>digital hub</span> for Quest by Intract — merging <span>sleek interfaces</span> with intuitive user journeys to drive community engagement in the <span>Web3 ecosystem</span>.</p></div></div>
362 |                 </div>
363 | 
364 |                 <div id="dev" class="tab-content">
365 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="dev-pfi-sbcc.jpg" alt="Population Foundation of India SBCC tools"></div><div class="image-box"><img src="dev-pfi-saathiya.jpg" alt="Saathiya program rebrand logo"></div></div><div class="project-description"><h3>Population Foundation of India</h3><p>We developed a rich suite of <span>SBCC tools</span> for <span>adolescent health</span>, including 3D comics and interactive games. We also <span>rebranded their Saathiya program</span> with a new logo, leaflets, and app promos.</p></div></div>
366 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="dev-bbc-kilkari.jpg" alt="BBC Media Action 'Kilkari' campaign poster"></div></div><div class="project-description"><h3>BBC Media Action</h3><p>We produced the <span>‘Kilkari’ campaign</span> on maternal health, a nationwide initiative to raise awareness and promote healthier practices among <span>rural women</span>.</p></div></div>
367 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="dev-path-je.jpg" alt="PATH animated film on Japanese Encephalitis"></div><div class="image-box"><img src="dev-pathfinder-fp.jpg" alt="Pathfinder family planning video module"></div></div><div class="project-description"><h3>PATH & Pathfinder</h3><p>This partnership involved creating animated films on <span>Japanese Encephalitis</span> and developing 24 video modules on <span>family planning</span> for an LMS serving over 1,500 health workers.</p></div></div>
368 |                     <div class="project-layout reveal"><div class="project-gallery"><div class="image-box"><img src="dev-nutrition-initiatives.jpg" alt="Maternal and Child Nutrition campaign collateral"></div></div><div class="project-description"><h3>Maternal & Child Nutrition</h3><p>For the <span>Micronutrients Initiative</span> and <span>ABT Associates</span>, we conducted communication needs assessments and designed <span>behavior change</span> and contraceptive awareness campaigns.</p></div></div>
369 |                 </div>
370 |             </div>
371 |         </section>
372 | 
373 |         <section id="why-us">
374 |             <div class="container">
375 |                 <h2 class="reveal">Why <span>Partner With Us</span></h2>
376 |                 <div class="expertise-grid">
377 |                     <div class="expertise-card reveal"><div class="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/></svg></div><div><p><strong>Diverse Expertise:</strong> 10+ years across health, corporate, and high-impact political narratives.</p></div></div>
378 |                     <div class="expertise-card reveal"><div class="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/></svg></div><div><p><strong>Integrated Stack:</strong> Strategy, design, content, motion & tech under one roof.</p></div></div>
379 |                     <div class="expertise-card reveal"><div class="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/></svg></div><div><p><strong>Emotion & Insight:</strong> Combining data with sharp creative to move audiences.</p></div></div>
380 |                     <div class="expertise-card reveal"><div class="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/></svg></div><div><p><strong>Collaborative Partnership:</strong> We work as an extension of your team, building together.</p></div></div>
381 |                 </div>
382 |             </div>
383 |         </section>
384 | 
385 |         <section id="contact">
386 |             <div class="aurora-shape aurora-1"></div>
387 |             <div class="container reveal">
388 |                 <p class="founder-quote">We don’t sell designs. We build emotional algorithms.</p>
389 |                 <p class="founder-name">Prashant Chaudhary — Founder & Creative Director</p>
390 |                 <p class="team-desc">Supported by our agile team of brand strategists, designers, motion artists, video editors, illustrators & content specialists.</p>
391 |                 
392 |                 <h2 class="reveal">Let’s Build Together</h2>
393 |                 <p class="final-pitch">Whether launching a product, shaping a health story, or driving a political narrative — we turn your vision into a living, breathing brand experience.</p>
394 |                 <div class="contact-links">
395 |                     <a href="mailto:admin@anyasegen.com">admin@anyasegen.com</a>
396 |                     <span style="color: var(--color-slate-dark); margin: 0 10px;">•</span>
397 |                     <a href="tel:+918383036073">+91 8383036073</a>
398 |                     <span style="color: var(--color-slate-dark); margin: 0 10px;">•</span>
399 |                     <a href="http://www.anyasegen.com" target="_blank">www.anyasegen.com</a>
400 |                 </div>
401 |                 <p class="address">H-187, Lohia Road, Sector 63, Noida-201301, Uttar Pradesh, India</p>
402 |             </div>
403 |         </section>
404 |     </main>
405 |     
406 |     <script>
407 |         document.addEventListener('DOMContentLoaded', function() {
408 |             // On-Scroll Reveal Animation
409 |             const revealElements = document.querySelectorAll('.reveal, .step');
410 |             const observer = new IntersectionObserver(entries => {
411 |                 entries.forEach((entry) => {
412 |                     if (entry.isIntersecting) {
413 |                         entry.target.classList.add('visible');
414 |                     }
415 |                 });
416 |             }, {
417 |                 threshold: 0.1,
418 |                 rootMargin: '0px 0px -50px 0px'
419 |             });
420 |             revealElements.forEach((el, index) => {
421 |                 el.style.transitionDelay = `${(index % 5) * 100}ms`;
422 |                 observer.observe(el);
423 |             });
424 | 
425 |             // Portfolio Tabs
426 |             const tabsContainer = document.querySelector('.tabs');
427 |             if(tabsContainer) {
428 |                 const tabButtons = document.querySelectorAll('.tab-button');
429 |                 const tabContents = document.querySelectorAll('.tab-content');
430 | 
431 |                 tabsContainer.addEventListener('click', function(e) {
432 |                     if (!e.target.classList.contains('tab-button')) return;
433 |                     const tabId = e.target.getAttribute('data-tab');
434 | 
435 |                     tabButtons.forEach(button => button.classList.remove('active'));
436 |                     tabContents.forEach(content => content.classList.remove('active'));
437 | 
438 |                     e.target.classList.add('active');
439 |                     const activeTab = document.getElementById(tabId);
440 |                     activeTab.classList.add('active');
441 |                     
442 |                     // Re-observe elements in the new active tab to trigger animation
443 |                     const newRevealElements = activeTab.querySelectorAll('.reveal');
444 |                     newRevealElements.forEach(el => {
445 |                         observer.unobserve(el); // remove to re-trigger
446 |                         el.classList.remove('visible'); // remove class to re-animate
447 |                         observer.observe(el);
448 |                     });
449 |                 });
450 |             }
451 |         });
452 |     </script>
453 | 
454 | </body>
455 | </html>
```

src/middleware.ts
```
1 | import { createServerClient } from '@supabase/ssr'
2 | import { NextRequest, NextResponse } from 'next/server'
3 | 
4 | export async function middleware(req: NextRequest) {
5 |   let res = NextResponse.next({
6 |     request: {
7 |       headers: req.headers,
8 |     },
9 |   })
10 | 
11 |   const supabase = createServerClient(
12 |     process.env.NEXT_PUBLIC_SUPABASE_URL!,
13 |     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
14 |     {
15 |       cookies: {
16 |         get(name: string) {
17 |           return req.cookies.get(name)?.value
18 |         },
19 |         set(name: string, value: string, options: any) {
20 |           req.cookies.set({
21 |             name,
22 |             value,
23 |             ...options,
24 |           })
25 |           res = NextResponse.next({
26 |             request: {
27 |               headers: req.headers,
28 |             },
29 |           })
30 |           res.cookies.set({
31 |             name,
32 |             value,
33 |             ...options,
34 |           })
35 |         },
36 |         remove(name: string, options: any) {
37 |           req.cookies.set({
38 |             name,
39 |             value: '',
40 |             ...options,
41 |           })
42 |           res = NextResponse.next({
43 |             request: {
44 |               headers: req.headers,
45 |             },
46 |           })
47 |           res.cookies.set({
48 |             name,
49 |             value: '',
50 |             ...options,
51 |           })
52 |         },
53 |       },
54 |     }
55 |   )
56 | 
57 |   // Get the session from Supabase
58 |   const {
59 |     data: { session },
60 |   } = await supabase.auth.getSession()
61 | 
62 |   const { pathname } = req.nextUrl
63 |   
64 |   // Debug logging for troubleshooting
65 |   console.log(`Middleware: ${pathname} - Session: ${session ? 'exists' : 'none'} - User: ${session?.user?.id || 'none'}`)
66 | 
67 |   // Public routes that don't require authentication
68 |   const publicRoutes = ['/auth/login', '/auth/signup', '/auth/confirm-email', '/auth/forgot-password', '/auth/reset-password', '/']
69 |   const isPublicRoute = publicRoutes.includes(pathname)
70 | 
71 |   // Auth routes - redirect authenticated users to dashboard
72 |   const authRoutes = ['/auth/login', '/auth/signup']
73 |   const isAuthRoute = authRoutes.includes(pathname)
74 | 
75 |   // Protected routes
76 |   const protectedRoutes = ['/dashboard', '/admin']
77 |   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
78 | 
79 |   // Admin routes
80 |   const adminRoutes = ['/admin']
81 |   const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
82 | 
83 |   // If user is authenticated and trying to access auth pages, redirect to dashboard
84 |   if (session && isAuthRoute) {
85 |     console.log('Redirecting authenticated user from auth page to dashboard')
86 |     return NextResponse.redirect(new URL('/dashboard', req.url))
87 |   }
88 | 
89 |   // Temporarily disable protected route redirect to break the loop
90 |   // if (!session && isProtectedRoute) {
91 |   //   console.log('Redirecting unauthenticated user to login')
92 |   //   return NextResponse.redirect(new URL('/auth/login', req.url))
93 |   // }
94 | 
95 |   // If user is authenticated but trying to access admin routes, check their role
96 |   if (session && isAdminRoute) {
97 |     try {
98 |       // Get user profile to check role
99 |       const { data: profile, error } = await supabase
100 |         .from('profiles')
101 |         .select('role')
102 |         .eq('id', session.user.id)
103 |         .single()
104 | 
105 |       if (error || !profile || profile.role !== 'admin') {
106 |         return NextResponse.redirect(new URL('/dashboard', req.url))
107 |       }
108 |     } catch (error) {
109 |       console.error('Error checking user role:', error)
110 |       return NextResponse.redirect(new URL('/dashboard', req.url))
111 |     }
112 |   }
113 | 
114 |   return res
115 | }
116 | 
117 | export const config = {
118 |   matcher: [
119 |     /*
120 |      * Match all request paths except for the ones starting with:
121 |      * - _next/static (static files)
122 |      * - _next/image (image optimization files)
123 |      * - favicon.ico (favicon file)
124 |      * - public folder
125 |      */
126 |     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
127 |   ],
128 | }
```

src/app/globals-simple.css
```
1 | @tailwind base;
2 | @tailwind components;
3 | @tailwind utilities;
4 | 
5 | html {
6 |   height: 100%;
7 | }
8 | 
9 | body {
10 |   height: 100%;
11 |   background-color: #0f172a; /* slate-900 */
12 |   color: #f8fafc; /* slate-50 */
13 | }
```

src/app/globals.css
```
1 | @tailwind base;
2 | @tailwind components;
3 | @tailwind utilities;
4 | 
5 | @layer base {
6 |   :root {
7 |     --background: 0 0% 100%;
8 |     --foreground: 222.2 84% 4.9%;
9 |     --card: 0 0% 100%;
10 |     --card-foreground: 222.2 84% 4.9%;
11 |     --popover: 0 0% 100%;
12 |     --popover-foreground: 222.2 84% 4.9%;
13 |     --primary: 222.2 47.4% 11.2%;
14 |     --primary-foreground: 210 40% 98%;
15 |     --secondary: 210 40% 96%;
16 |     --secondary-foreground: 222.2 47.4% 11.2%;
17 |     --muted: 210 40% 96%;
18 |     --muted-foreground: 215.4 16.3% 46.9%;
19 |     --accent: 210 40% 96%;
20 |     --accent-foreground: 222.2 47.4% 11.2%;
21 |     --destructive: 0 84.2% 60.2%;
22 |     --destructive-foreground: 210 40% 98%;
23 |     --border: 214.3 31.8% 91.4%;
24 |     --input: 214.3 31.8% 91.4%;
25 |     --ring: 222.2 84% 4.9%;
26 |     --radius: 0.5rem;
27 |   }
28 | 
29 |   .dark {
30 |     --background: 222.2 84% 4.9%;
31 |     --foreground: 210 40% 98%;
32 |     --card: 222.2 84% 4.9%;
33 |     --card-foreground: 210 40% 98%;
34 |     --popover: 222.2 84% 4.9%;
35 |     --popover-foreground: 210 40% 98%;
36 |     --primary: 210 40% 98%;
37 |     --primary-foreground: 222.2 47.4% 11.2%;
38 |     --secondary: 217.2 32.6% 17.5%;
39 |     --secondary-foreground: 210 40% 98%;
40 |     --muted: 217.2 32.6% 17.5%;
41 |     --muted-foreground: 215 20.2% 65.1%;
42 |     --accent: 217.2 32.6% 17.5%;
43 |     --accent-foreground: 210 40% 98%;
44 |     --destructive: 0 62.8% 30.6%;
45 |     --destructive-foreground: 210 40% 98%;
46 |     --border: 217.2 32.6% 17.5%;
47 |     --input: 217.2 32.6% 17.5%;
48 |     --ring: 212.7 26.8% 83.9%;
49 |   }
50 | }
51 | 
52 | @layer base {
53 |   * {
54 |     @apply border-border;
55 |   }
56 |   body {
57 |     @apply bg-background text-foreground;
58 |   }
59 | }
60 | 
61 | @layer utilities {
62 |   .bg-gradient-radial {
63 |     background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
64 |   }
65 | }
```

src/app/layout.tsx
```
1 | import type { Metadata } from 'next'
2 | import { Inter } from 'next/font/google'
3 | import './globals-simple.css'
4 | import { AuthProvider } from '@/lib/auth'
5 | import ErrorBoundary from '@/components/ErrorBoundary'
6 | 
7 | const inter = Inter({ subsets: ['latin'] })
8 | 
9 | export const metadata: Metadata = {
10 |   title: 'ANYA SEGEN',
11 |   description: 'Knowledge Management System',
12 | }
13 | 
14 | export default function RootLayout({
15 |   children,
16 | }: {
17 |   children: React.ReactNode
18 | }) {
19 |   return (
20 |     <html lang="en">
21 |       <body className={`${inter.className} bg-black text-white antialiased`}>
22 |         <ErrorBoundary>
23 |           <AuthProvider>
24 |             {children}
25 |           </AuthProvider>
26 |         </ErrorBoundary>
27 |       </body>
28 |     </html>
29 |   )
30 | }
```

src/app/page.tsx
```
1 | 'use client'
2 | 
3 | import { Button } from "@/components/ui/button"
4 | import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
5 | import { useState, useEffect, useRef } from "react"
6 | import Link from "next/link"
7 | import Image from "next/image"
8 | import Logo from "@/components/Logo"
9 | import { Mail, Phone, Globe, ChevronDown, X, ExternalLink } from "lucide-react"
10 | import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
11 | 
12 | export default function LandingPage() {
13 |   const [activeTab, setActiveTab] = useState('gov')
14 |   const [imageLoadingStates, setImageLoadingStates] = useState<{[key: string]: boolean}>({})
15 |   const [selectedProject, setSelectedProject] = useState<any>(null)
16 |   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
17 | 
18 |   const containerRef = useRef<HTMLDivElement>(null)
19 |   const { scrollYProgress } = useScroll({ target: containerRef })
20 |   const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
21 | 
22 |   useEffect(() => {
23 |     const handleMouseMove = (e: MouseEvent) => {
24 |       setMousePosition({ x: e.clientX, y: e.clientY })
25 |     }
26 |     
27 |     window.addEventListener('mousemove', handleMouseMove)
28 |     return () => window.removeEventListener('mousemove', handleMouseMove)
29 |   }, [])
30 | 
31 |   const handleImageLoad = (imageSrc: string) => {
32 |     setImageLoadingStates(prev => ({ ...prev, [imageSrc]: true }))
33 |   }
34 | 
35 |   // Animation variants
36 |   const fadeInUp = {
37 |     initial: { opacity: 0, y: 60 },
38 |     animate: { opacity: 1, y: 0 },
39 |     transition: { duration: 0.6, ease: "easeOut" }
40 |   }
41 | 
42 |   const staggerChildren = {
43 |     animate: {
44 |       transition: {
45 |         staggerChildren: 0.1
46 |       }
47 |     }
48 |   }
49 | 
50 |   const scaleIn = {
51 |     initial: { opacity: 0, scale: 0.8 },
52 |     animate: { opacity: 1, scale: 1 },
53 |     transition: { duration: 0.5, ease: "easeOut" }
54 |   }
55 | 
56 |   return (
57 |     <motion.div 
58 |       ref={containerRef}
59 |       className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white overflow-x-hidden relative"
60 |       initial={{ opacity: 0 }}
61 |       animate={{ opacity: 1 }}
62 |       transition={{ duration: 1 }}
63 |     >
64 |       {/* Interactive Cursor Effect */}
65 |       <motion.div
66 |         className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
67 |         animate={{
68 |           x: mousePosition.x - 12,
69 |           y: mousePosition.y - 12,
70 |         }}
71 |         transition={{
72 |           type: "spring",
73 |           stiffness: 500,
74 |           damping: 28
75 |         }}
76 |       >
77 |         <div className="w-full h-full bg-white rounded-full opacity-75"></div>
78 |       </motion.div>
79 | 
80 |       {/* Enhanced Aurora Background Effects */}
81 |       <div className="fixed inset-0 pointer-events-none">
82 |         <motion.div 
83 |           className="absolute top-[-20%] left-[-30%] w-[800px] h-[800px] bg-gradient-radial from-blue-500/8 via-blue-500/3 to-transparent rounded-full"
84 |           animate={{
85 |             scale: [1, 1.2, 1],
86 |             opacity: [0.3, 0.6, 0.3],
87 |             x: [0, 100, 0],
88 |             y: [0, -50, 0],
89 |           }}
90 |           transition={{
91 |             duration: 20,
92 |             repeat: Infinity,
93 |             ease: "easeInOut"
94 |           }}
95 |         />
96 |         <motion.div 
97 |           className="absolute bottom-[-30%] right-[-40%] w-[1000px] h-[1000px] bg-gradient-radial from-cyan-500/8 via-cyan-500/3 to-transparent rounded-full"
98 |           animate={{
99 |             scale: [1.2, 1, 1.2],
100 |             opacity: [0.4, 0.7, 0.4],
101 |             x: [-50, 50, -50],
102 |             y: [50, -100, 50],
103 |           }}
104 |           transition={{
105 |             duration: 25,
106 |             repeat: Infinity,
107 |             ease: "easeInOut",
108 |             delay: 5
109 |           }}
110 |         />
111 |         <motion.div 
112 |           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/6 via-purple-500/2 to-transparent rounded-full"
113 |           animate={{
114 |             scale: [1, 1.3, 1],
115 |             opacity: [0.2, 0.5, 0.2],
116 |             rotate: [0, 180, 360],
117 |           }}
118 |           transition={{
119 |             duration: 30,
120 |             repeat: Infinity,
121 |             ease: "linear",
122 |             delay: 10
123 |           }}
124 |         />
125 |       </div>
126 | 
127 |       {/* Enhanced Navigation */}
128 |       <motion.nav 
129 |         className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 sticky top-0"
130 |         initial={{ y: -100, opacity: 0 }}
131 |         animate={{ y: 0, opacity: 1 }}
132 |         transition={{ duration: 0.6, ease: "easeOut" }}
133 |       >
134 |         <div className="container mx-auto px-4 py-6 flex items-center justify-between">
135 |           <motion.div 
136 |             className="flex items-center space-x-3"
137 |             initial={{ x: -50, opacity: 0 }}
138 |             animate={{ x: 0, opacity: 1 }}
139 |             transition={{ duration: 0.6, delay: 0.2 }}
140 |           >
141 |             <Logo size="lg" />
142 |             <motion.div 
143 |               className="h-8 w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent hidden sm:block"
144 |               initial={{ scaleY: 0 }}
145 |               animate={{ scaleY: 1 }}
146 |               transition={{ duration: 0.8, delay: 0.5 }}
147 |             />
148 |             <span className="text-sm text-gray-400 hidden sm:inline font-medium tracking-wide">Creative Agency</span>
149 |           </motion.div>
150 |           <motion.div 
151 |             className="flex items-center space-x-4"
152 |             initial={{ x: 50, opacity: 0 }}
153 |             animate={{ x: 0, opacity: 1 }}
154 |             transition={{ duration: 0.6, delay: 0.3 }}
155 |           >
156 |             <Link href="#contact" className="text-gray-400 hover:text-white transition-colors hidden md:inline-flex items-center space-x-1 hover:scale-105 transition-transform">
157 |               <span>Contact</span>
158 |             </Link>
159 |             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
160 |               <Link href="/auth/login">
161 |                 <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
162 |                   Login
163 |                 </Button>
164 |               </Link>
165 |             </motion.div>
166 |             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
167 |               <Link href="/auth/signup">
168 |                 <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/20">
169 |                   Sign Up
170 |                 </Button>
171 |               </Link>
172 |             </motion.div>
173 |           </motion.div>
174 |         </div>
175 |       </motion.nav>
176 | 
177 |       {/* Revolutionary Hero Section */}
178 |       <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
179 |         {/* Parallax Background Elements */}
180 |         <motion.div
181 |           className="absolute inset-0 opacity-30"
182 |           style={{ y: backgroundY }}
183 |         >
184 |           <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
185 |           <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
186 |           <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
187 |         </motion.div>
188 | 
189 |         <div className="container mx-auto px-4 text-center relative">
190 |           <motion.div
191 |             initial="initial"
192 |             animate="animate"
193 |             variants={staggerChildren}
194 |             className="space-y-8"
195 |           >
196 |             {/* Minimalist Title */}
197 |             <motion.div className="relative">
198 |               <motion.h1 
199 |                 className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-tight tracking-wide"
200 |                 variants={fadeInUp}
201 |               >
202 |                 <span className="text-white">
203 |                   ANYA SEGEN
204 |                 </span>
205 |               </motion.h1>
206 |               
207 |               {/* Simple Subtitle */}
208 |               <motion.div 
209 |                 className="mt-4 mb-8"
210 |                 variants={fadeInUp}
211 |               >
212 |                 <motion.p 
213 |                   className="text-lg md:text-xl text-gray-400 font-light tracking-widest uppercase"
214 |                   initial={{ opacity: 0 }}
215 |                   animate={{ opacity: 1 }}
216 |                   transition={{ duration: 1, delay: 0.5 }}
217 |                 >
218 |                   Creative Agency
219 |                 </motion.p>
220 |               </motion.div>
221 |             </motion.div>
222 | 
223 |             {/* Simple Description */}
224 |             <motion.p 
225 |               className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
226 |               variants={fadeInUp}
227 |             >
228 |               Building brands, stories, and campaigns that resonate since 2014
229 |             </motion.p>
230 | 
231 |             {/* Minimal Stats */}
232 |             <motion.div 
233 |               className="grid grid-cols-4 gap-6 max-w-3xl mx-auto my-16"
234 |               variants={staggerChildren}
235 |             >
236 |               {[
237 |                 { label: "Years", value: "10+" },
238 |                 { label: "Projects", value: "200+" },
239 |                 { label: "Clients", value: "150+" },
240 |                 { label: "Success", value: "98%" },
241 |               ].map((stat, index) => (
242 |                 <motion.div
243 |                   key={stat.label}
244 |                   className="text-center"
245 |                   variants={scaleIn}
246 |                   whileHover={{ y: -2 }}
247 |                 >
248 |                   <motion.div 
249 |                     className="text-xl md:text-2xl font-extralight text-white mb-1"
250 |                     initial={{ opacity: 0 }}
251 |                     animate={{ opacity: 1 }}
252 |                     transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
253 |                   >
254 |                     {stat.value}
255 |                   </motion.div>
256 |                   <div className="text-xs text-gray-500 font-light tracking-wide uppercase">{stat.label}</div>
257 |                 </motion.div>
258 |               ))}
259 |             </motion.div>
260 |             
261 |             {/* Minimal Contact Links */}
262 |             <motion.div 
263 |               className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mb-16"
264 |               variants={staggerChildren}
265 |             >
266 |               {[
267 |                 { href: "http://www.anyasegen.com", label: "anyasegen.com", external: true },
268 |                 { href: "mailto:admin@anyasegen.com", label: "admin@anyasegen.com" },
269 |                 { href: "tel:+918383036073", label: "+91 8383036073" },
270 |               ].map((contact) => (
271 |                 <motion.a
272 |                   key={contact.label}
273 |                   href={contact.href}
274 |                   target={contact.external ? "_blank" : undefined}
275 |                   rel={contact.external ? "noopener noreferrer" : undefined}
276 |                   className="text-gray-500 hover:text-white transition-colors duration-300 font-light text-sm"
277 |                   variants={fadeInUp}
278 |                   whileHover={{ y: -1 }}
279 |                 >
280 |                   {contact.label}
281 |                 </motion.a>
282 |               ))}
283 |             </motion.div>
284 | 
285 |             {/* Simple Scroll Indicator */}
286 |             <motion.div 
287 |               className="flex flex-col items-center space-y-2"
288 |               variants={fadeInUp}
289 |             >
290 |               <motion.div
291 |                 animate={{ y: [0, 4, 0] }}
292 |                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
293 |               >
294 |                 <ChevronDown className="w-4 h-4 text-gray-600" />
295 |               </motion.div>
296 |             </motion.div>
297 |           </motion.div>
298 |         </div>
299 |       </section>
300 | 
301 |       {/* Enhanced About Section */}
302 |       <motion.section 
303 |         className="relative z-10 py-32 overflow-hidden"
304 |         initial={{ opacity: 0 }}
305 |         whileInView={{ opacity: 1 }}
306 |         viewport={{ once: true, margin: "-100px" }}
307 |         transition={{ duration: 0.8 }}
308 |       >
309 |         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
310 |         
311 |         <div className="container mx-auto px-4">
312 |           <motion.div 
313 |             className="max-w-5xl mx-auto text-center relative"
314 |             initial={{ y: 100, opacity: 0 }}
315 |             whileInView={{ y: 0, opacity: 1 }}
316 |             viewport={{ once: true, margin: "-50px" }}
317 |             transition={{ duration: 0.8, ease: "easeOut" }}
318 |           >
319 |             {/* Floating Elements */}
320 |             <motion.div
321 |               className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"
322 |               animate={{
323 |                 y: [0, -20, 0],
324 |                 scale: [1, 1.2, 1],
325 |               }}
326 |               transition={{
327 |                 duration: 4,
328 |                 repeat: Infinity,
329 |                 ease: "easeInOut"
330 |               }}
331 |             />
332 |             <motion.div
333 |               className="absolute -bottom-8 -right-8 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"
334 |               animate={{
335 |                 y: [0, 20, 0],
336 |                 scale: [1.2, 1, 1.2],
337 |               }}
338 |               transition={{
339 |                 duration: 5,
340 |                 repeat: Infinity,
341 |                 ease: "easeInOut",
342 |                 delay: 2
343 |               }}
344 |             />
345 | 
346 |             <motion.p 
347 |               className="text-xl md:text-2xl lg:text-3xl font-extralight leading-relaxed text-gray-300"
348 |               initial={{ opacity: 0, y: 50 }}
349 |               whileInView={{ opacity: 1, y: 0 }}
350 |               viewport={{ once: true }}
351 |               transition={{ duration: 1, delay: 0.2 }}
352 |             >
353 |               Anya Segen is a creative agency building{" "}
354 |               <span className="text-white font-light">
355 |                 brands, stories, and campaigns
356 |               </span>{" "}
357 |               that resonate. Since{" "}
358 |               <span className="text-blue-400 font-light">
359 |                 2014
360 |               </span>
361 |               , we&apos;ve worked at the intersection of strategy, design, and technology—helping{" "}
362 |               <span className="text-white font-light">
363 |                 leaders and brands
364 |               </span>{" "}
365 |               shape their narratives and drive meaningful impact.
366 |             </motion.p>
367 | 
368 |             {/* Achievement Badges */}
369 |             <motion.div 
370 |               className="flex flex-wrap justify-center gap-6 mt-16"
371 |               initial={{ opacity: 0, y: 30 }}
372 |               whileInView={{ opacity: 1, y: 0 }}
373 |               viewport={{ once: true }}
374 |               transition={{ duration: 0.8, delay: 0.5 }}
375 |             >
376 |               {[
377 |                 { label: "Trusted by Government", value: "Ministries" },
378 |                 { label: "Award-Winning", value: "Campaigns" },
379 |                 { label: "Multi-Sector", value: "Expertise" },
380 |               ].map((badge) => (
381 |                 <motion.div
382 |                   key={badge.label}
383 |                   className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-center"
384 |                   whileHover={{ scale: 1.05, y: -5 }}
385 |                   transition={{ type: "spring", stiffness: 300 }}
386 |                 >
387 |                   <div className="text-blue-400 font-bold text-lg">{badge.value}</div>
388 |                   <div className="text-gray-400 text-sm">{badge.label}</div>
389 |                 </motion.div>
390 |               ))}
391 |             </motion.div>
392 |           </motion.div>
393 |         </div>
394 |       </motion.section>
395 | 
396 |       {/* Enhanced Expertise Section */}
397 |       <motion.section 
398 |         className="relative z-10 py-32"
399 |         initial={{ opacity: 0 }}
400 |         whileInView={{ opacity: 1 }}
401 |         viewport={{ once: true, margin: "-100px" }}
402 |         transition={{ duration: 0.8 }}
403 |       >
404 |         <div className="container mx-auto px-4">
405 |           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
406 |           
407 |           <motion.h2 
408 |             className="text-2xl md:text-3xl font-extralight text-center mb-20 text-gray-300"
409 |             initial={{ y: 50, opacity: 0 }}
410 |             whileInView={{ y: 0, opacity: 1 }}
411 |             viewport={{ once: true }}
412 |             transition={{ duration: 0.8 }}
413 |           >
414 |             Our <span className="text-white font-light">Expertise</span>
415 |           </motion.h2>
416 |           
417 |           <motion.div 
418 |             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
419 |             variants={staggerChildren}
420 |             initial="initial"
421 |             whileInView="animate"
422 |             viewport={{ once: true, margin: "-50px" }}
423 |           >
424 |             {[
425 |               { title: "Branding", subtitle: "& Identity", color: "blue", description: "Crafting memorable logos, comprehensive brand systems, messaging, and packaging that capture your essence." },
426 |               { title: "Digital Marketing", subtitle: "& Amplification", color: "cyan", description: "Executing targeted social media strategies, paid advertising campaigns, and influencer marketing to grow your audience." },
427 |               { title: "Films", subtitle: "& Storytelling", color: "green", description: "Producing compelling motion graphics, short films, and animated explainers that transform complex ideas into elegant narratives." },
428 |               { title: "Public Sector", subtitle: "& Advocacy", color: "purple", description: "Designing high-impact election campaigns, public health messaging (SBCC), and grassroots outreach interventions." },
429 |               { title: "Brand", subtitle: "& Product Launch", color: "orange", description: "Developing end-to-end launch strategies, from initial positioning and identity to e-commerce platforms and market entry." },
430 |               { title: "Corporate", subtitle: "& Editorial Design", color: "pink", description: "Creating premium communication assets like annual reports, coffee table books, and e-books with original illustration and design." },
431 |             ].map((service, index) => (
432 |               <motion.div
433 |                 key={service.title}
434 |                 variants={scaleIn}
435 |                 whileHover={{ 
436 |                   scale: 1.05, 
437 |                   y: -10,
438 |                   rotateY: 5,
439 |                 }}
440 |                 whileTap={{ scale: 0.98 }}
441 |                 className="group cursor-pointer"
442 |               >
443 |                 <Card className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:border-${service.color}-500/50 h-full relative overflow-hidden`}>
444 |                   {/* Animated Background Gradient */}
445 |                   <motion.div
446 |                     className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
447 |                   />
448 |                   
449 |                   <CardHeader className="relative z-10">
450 |                     <motion.div
451 |                       initial={{ scale: 0 }}
452 |                       whileInView={{ scale: 1 }}
453 |                       transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
454 |                       className={`w-12 h-12 bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 rounded-2xl mb-4 flex items-center justify-center`}
455 |                     >
456 |                       <motion.div
457 |                         animate={{ rotate: [0, 360] }}
458 |                         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
459 |                         className="w-6 h-6 bg-white rounded-full"
460 |                       />
461 |                     </motion.div>
462 |                     
463 |                     <CardTitle className="text-white text-lg mb-2 font-light">
464 |                       <span className={`text-${service.color}-400 font-extralight`}>{service.title}</span> {service.subtitle}
465 |                     </CardTitle>
466 |                     <CardDescription className="text-gray-400 leading-relaxed">
467 |                       {service.description}
468 |                     </CardDescription>
469 |                   </CardHeader>
470 |                   
471 |                   {/* Hover Effect Particles */}
472 |                   <motion.div
473 |                     className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
474 |                     animate={{
475 |                       y: [0, -10, 0],
476 |                     }}
477 |                     transition={{
478 |                       duration: 2,
479 |                       repeat: Infinity,
480 |                       ease: "easeInOut"
481 |                     }}
482 |                   >
483 |                     <div className={`w-2 h-2 bg-${service.color}-400 rounded-full`} />
484 |                   </motion.div>
485 |                 </Card>
486 |               </motion.div>
487 |             ))}
488 |           </motion.div>
489 |         </div>
490 |       </motion.section>
491 | 
492 |       {/* Portfolio Section */}
493 |       <section className="relative z-10 container mx-auto px-4 py-24">
494 |         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
495 |         <h2 className="text-2xl md:text-3xl font-extralight text-center mb-20 text-gray-300">
496 |           Impact <span className="text-white font-light">Stories</span>
497 |         </h2>
498 |         
499 |         {/* Enhanced Tabs */}
500 |         <div className="flex justify-center gap-2 mb-20 flex-wrap">
501 |           <button
502 |             onClick={() => setActiveTab('gov')}
503 |             className={`px-8 py-4 rounded-full font-light transition-all duration-300 backdrop-blur-sm border ${
504 |               activeTab === 'gov'
505 |                 ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/20'
506 |                 : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
507 |             }`}
508 |           >
509 |             Government & Policy
510 |           </button>
511 |           <button
512 |             onClick={() => setActiveTab('pol')}
513 |             className={`px-8 py-4 rounded-full font-light transition-all duration-300 backdrop-blur-sm border ${
514 |               activeTab === 'pol'
515 |                 ? 'bg-pink-600/20 border-pink-500/50 text-pink-400 shadow-lg shadow-pink-500/20'
516 |                 : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
517 |             }`}
518 |           >
519 |             Political Campaigns
520 |           </button>
521 |           <button
522 |             onClick={() => setActiveTab('corp')}
523 |             className={`px-8 py-4 rounded-full font-light transition-all duration-300 backdrop-blur-sm border ${
524 |               activeTab === 'corp'
525 |                 ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20'
526 |                 : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
527 |             }`}
528 |           >
529 |             Corporate & FMCG
530 |           </button>
531 |           <button
532 |             onClick={() => setActiveTab('dev')}
533 |             className={`px-8 py-4 rounded-full font-light transition-all duration-300 backdrop-blur-sm border ${
534 |               activeTab === 'dev'
535 |                 ? 'bg-green-600/20 border-green-500/50 text-green-400 shadow-lg shadow-green-500/20'
536 |                 : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
537 |             }`}
538 |           >
539 |             Development & Health
540 |           </button>
541 |         </div>
542 | 
543 |         {/* Portfolio Content */}
544 |         <div className="max-w-6xl mx-auto">
545 |           {activeTab === 'gov' && (
546 |             <div className="space-y-24">
547 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
548 |                 <div className="relative group">
549 |                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
550 |                   <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
551 |                     {!imageLoadingStates['/images/gov-gullak-event.jpg'] && (
552 |                       <div className="w-full h-[300px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl animate-pulse flex items-center justify-center">
553 |                         <div className="text-gray-500">Loading...</div>
554 |                       </div>
555 |                     )}
556 |                     <Image 
557 |                       src="/images/gov-gullak-event.jpg" 
558 |                       alt="Gullak Event - Ministry of Rural Development campaign" 
559 |                       width={600} 
560 |                       height={400}
561 |                       className="rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full h-auto"
562 |                       onLoad={() => handleImageLoad('/images/gov-gullak-event.jpg')}
563 |                       priority
564 |                     />
565 |                   </div>
566 |                 </div>
567 |                 <div className="space-y-6">
568 |                   <div className="space-y-2">
569 |                     <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
570 |                       Government
571 |                     </span>
572 |                     <h3 className="text-3xl font-bold text-white">Gullak Event</h3>
573 |                   </div>
574 |                   <p className="text-gray-400 leading-relaxed text-lg">
575 |                     For the <span className="text-blue-400 font-semibold">Ministry of Rural Development</span>, Uttarakhand, we developed a <span className="text-blue-400 font-semibold">Shark Tank-style</span> platform for <span className="text-blue-400 font-semibold">rural entrepreneurs</span>, delivering brand identity, campaign collaterals, and success story films.
576 |                   </p>
577 |                   <div className="flex flex-wrap gap-2">
578 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Brand Identity</span>
579 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Campaign Strategy</span>
580 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Video Production</span>
581 |                   </div>
582 |                 </div>
583 |               </div>
584 | 
585 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
586 |                 <div className="lg:order-2 relative group">
587 |                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
588 |                   <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
589 |                     <Image 
590 |                       src="/images/gov-rbi-rebrand.jpg" 
591 |                       alt="RBI Rebrand - Rural Business Incubator identity redesign" 
592 |                       width={600} 
593 |                       height={400}
594 |                       className="rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full h-auto"
595 |                     />
596 |                   </div>
597 |                 </div>
598 |                 <div className="lg:order-1 space-y-6">
599 |                   <div className="space-y-2">
600 |                     <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
601 |                       Rebranding
602 |                     </span>
603 |                     <h3 className="text-3xl font-bold text-white">RBI Rebrand</h3>
604 |                   </div>
605 |                   <p className="text-gray-400 leading-relaxed text-lg">
606 |                     We proposed a complete <span className="text-blue-400 font-semibold">identity revamp</span> for the Rural Business Incubator to clearly <span className="text-blue-400 font-semibold">differentiate it</span> from the Reserve Bank of India, covering name strategy to brand architecture.
607 |                   </p>
608 |                   <div className="flex flex-wrap gap-2">
609 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Identity Design</span>
610 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Brand Strategy</span>
611 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Architecture</span>
612 |                   </div>
613 |                 </div>
614 |               </div>
615 | 
616 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
617 |                 <div className="relative group">
618 |                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
619 |                   <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
620 |                     <Image 
621 |                       src="/images/gov-bihan-chhattisgarh.jpg" 
622 |                       alt="BIHAN Chhattisgarh - SHG product packaging and branding" 
623 |                       width={600} 
624 |                       height={400}
625 |                       className="rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full h-auto"
626 |                     />
627 |                   </div>
628 |                 </div>
629 |                 <div className="space-y-6">
630 |                   <div className="space-y-2">
631 |                     <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
632 |                       Rural Development
633 |                     </span>
634 |                     <h3 className="text-3xl font-bold text-white">BIHAN, Chhattisgarh</h3>
635 |                   </div>
636 |                   <p className="text-gray-400 leading-relaxed text-lg">
637 |                     We partnered with the <span className="text-blue-400 font-semibold">Dept. of Rural Development</span> to build <span className="text-blue-400 font-semibold">packaging SOPs</span> and branding for 25 SHG products, impacting over <span className="text-blue-400 font-semibold">7,500 households</span> and positioning them on national platforms.
638 |                   </p>
639 |                   <div className="flex flex-wrap gap-2">
640 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Packaging Design</span>
641 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">SOP Development</span>
642 |                     <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">7,500+ Impact</span>
643 |                   </div>
644 |                 </div>
645 |               </div>
646 |             </div>
647 |           )}
648 | 
649 |           {activeTab === 'pol' && (
650 |             <div className="space-y-16">
651 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
652 |                 <div className="relative">
653 |                   <Image 
654 |                     src="/images/pol-bjym.jpg" 
655 |                     alt="BJYM Campaign" 
656 |                     width={600} 
657 |                     height={400}
658 |                     className="rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full h-auto"
659 |                   />
660 |                 </div>
661 |                 <div className="space-y-4">
662 |                   <h3 className="text-2xl font-bold text-white">BJYM</h3>
663 |                   <p className="text-gray-400 leading-relaxed">
664 |                     As an ongoing partner, we manage social media narratives, <span className="text-pink-400 font-semibold">milestone campaigns</span>, and <span className="text-pink-400 font-semibold">digital amplification</span> for the Bharatiya Janata Yuva Morcha, strengthening <span className="text-pink-400 font-semibold">youth engagement</span> nationwide.
665 |                   </p>
666 |                 </div>
667 |               </div>
668 | 
669 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
670 |                 <div className="lg:order-2 relative">
671 |                   <Image 
672 |                     src="/images/pol-ram-rajya.jpg" 
673 |                     alt="Ram Rajya Campaign" 
674 |                     width={600} 
675 |                     height={400}
676 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
677 |                   />
678 |                 </div>
679 |                 <div className="lg:order-1 space-y-4">
680 |                   <h3 className="text-2xl font-bold text-white">Ram Rajya Campaign</h3>
681 |                   <p className="text-gray-400 leading-relaxed">
682 |                     We designed a campaign to position a BJYM leader in Ayodhya via a <span className="text-pink-400 font-semibold">Say No to Plastic</span> narrative, developing a complete <span className="text-pink-400 font-semibold">campaign identity</span> and leading all social media execution.
683 |                   </p>
684 |                 </div>
685 |               </div>
686 | 
687 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
688 |                 <div className="relative">
689 |                   <Image 
690 |                     src="/images/pol-modi-hai-naa.jpg" 
691 |                     alt="Modi Hai Naa Campaign" 
692 |                     width={600} 
693 |                     height={400}
694 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
695 |                   />
696 |                 </div>
697 |                 <div className="space-y-4">
698 |                   <h3 className="text-2xl font-bold text-white">Modi Hai Naa</h3>
699 |                   <p className="text-gray-400 leading-relaxed">
700 |                     We crafted a digital campaign for Neha Joshi (VP BJYM) with the message &quot;If PM Modi is there, everything is possible,&quot; delivering an <span className="text-pink-400 font-semibold">end-to-end campaign</span> from concept to content.
701 |                   </p>
702 |                 </div>
703 |               </div>
704 |             </div>
705 |           )}
706 | 
707 |           {activeTab === 'corp' && (
708 |             <div className="space-y-16">
709 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
710 |                 <div className="grid grid-cols-2 gap-4">
711 |                   <Image 
712 |                     src="/images/corp-d2c-gogrin.jpg" 
713 |                     alt="Go Grin" 
714 |                     width={300} 
715 |                     height={200}
716 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
717 |                   />
718 |                   <Image 
719 |                     src="/images/corp-d2c-pentagonia.jpg" 
720 |                     alt="Pentagonia" 
721 |                     width={300} 
722 |                     height={200}
723 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
724 |                   />
725 |                   <Image 
726 |                     src="/images/corp-d2c-phirkcraft.jpg" 
727 |                     alt="Phirk Craft" 
728 |                     width={300} 
729 |                     height={200}
730 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
731 |                   />
732 |                   <Image 
733 |                     src="/images/corp-d2c-lisabona.jpg" 
734 |                     alt="Lisabona" 
735 |                     width={300} 
736 |                     height={200}
737 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
738 |                   />
739 |                 </div>
740 |                 <div className="space-y-4">
741 |                   <h3 className="text-2xl font-bold text-white">D2C E-Commerce Brands</h3>
742 |                   <p className="text-gray-400 leading-relaxed">
743 |                     For brands like <span className="text-cyan-400 font-semibold">Go Grin</span>, <span className="text-cyan-400 font-semibold">Pentagonia</span>, Phirk Craft, and <span className="text-cyan-400 font-semibold">Lisabona</span>, we developed complete brand identities, launch strategies, and end-to-end <span className="text-cyan-400 font-semibold">e-commerce platforms</span>.
744 |                   </p>
745 |                 </div>
746 |               </div>
747 | 
748 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
749 |                 <div className="lg:order-2 relative">
750 |                   <Image 
751 |                     src="/images/corp-philips-foundation.jpg" 
752 |                     alt="Philips Foundation" 
753 |                     width={600} 
754 |                     height={400}
755 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
756 |                   />
757 |                 </div>
758 |                 <div className="lg:order-1 space-y-4">
759 |                   <h3 className="text-2xl font-bold text-white">Philips Foundation</h3>
760 |                   <p className="text-gray-400 leading-relaxed">
761 |                     We produced a premium <span className="text-cyan-400 font-semibold">coffee table book</span>, managing the entire process from on-ground photography and interviews to the <span className="text-cyan-400 font-semibold">elegant final design</span> and printing.
762 |                   </p>
763 |                 </div>
764 |               </div>
765 | 
766 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
767 |                 <div className="grid grid-cols-2 gap-4">
768 |                   <Image 
769 |                     src="/images/corp-itc-infographic-1.jpg" 
770 |                     alt="ITC Infographic 1" 
771 |                     width={300} 
772 |                     height={300}
773 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
774 |                   />
775 |                   <Image 
776 |                     src="/images/corp-itc-infographic-2.jpg" 
777 |                     alt="ITC Infographic 2" 
778 |                     width={300} 
779 |                     height={300}
780 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
781 |                   />
782 |                   <Image 
783 |                     src="/images/corp-itc-infographic-3.jpg" 
784 |                     alt="ITC Infographic 3" 
785 |                     width={300} 
786 |                     height={300}
787 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
788 |                   />
789 |                   <Image 
790 |                     src="/images/corp-itc-infographic-4.jpg" 
791 |                     alt="ITC Infographic 4" 
792 |                     width={300} 
793 |                     height={300}
794 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
795 |                   />
796 |                 </div>
797 |                 <div className="space-y-4">
798 |                   <h3 className="text-2xl font-bold text-white">ITC Limited</h3>
799 |                   <p className="text-gray-400 leading-relaxed">
800 |                     For the launch of their new corporate website, we partnered with ITC to design four distinct <span className="text-cyan-400 font-semibold">infographics</span>. Each visual narrative was meticulously crafted to articulate the <span className="text-cyan-400 font-semibold">vast scale</span> of the ITC conglomerate.
801 |                   </p>
802 |                 </div>
803 |               </div>
804 |             </div>
805 |           )}
806 | 
807 |           {activeTab === 'dev' && (
808 |             <div className="space-y-16">
809 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
810 |                 <div className="grid grid-cols-2 gap-4">
811 |                   <Image 
812 |                     src="/images/dev-pfi-sbcc.jpg" 
813 |                     alt="PFI SBCC Tools" 
814 |                     width={300} 
815 |                     height={200}
816 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
817 |                   />
818 |                   <Image 
819 |                     src="/images/dev-pfi-saathiya.jpg" 
820 |                     alt="Saathiya Program" 
821 |                     width={300} 
822 |                     height={200}
823 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
824 |                   />
825 |                 </div>
826 |                 <div className="space-y-4">
827 |                   <h3 className="text-2xl font-bold text-white">Population Foundation of India</h3>
828 |                   <p className="text-gray-400 leading-relaxed">
829 |                     We developed a rich suite of <span className="text-green-400 font-semibold">SBCC tools</span> for <span className="text-green-400 font-semibold">adolescent health</span>, including 3D comics and interactive games. We also <span className="text-green-400 font-semibold">rebranded their Saathiya program</span> with a new logo, leaflets, and app promos.
830 |                   </p>
831 |                 </div>
832 |               </div>
833 | 
834 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
835 |                 <div className="lg:order-2 relative">
836 |                   <Image 
837 |                     src="/images/dev-bbc-kilkari.jpg" 
838 |                     alt="BBC Kilkari Campaign" 
839 |                     width={600} 
840 |                     height={400}
841 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
842 |                   />
843 |                 </div>
844 |                 <div className="lg:order-1 space-y-4">
845 |                   <h3 className="text-2xl font-bold text-white">BBC Media Action</h3>
846 |                   <p className="text-gray-400 leading-relaxed">
847 |                     We produced the <span className="text-green-400 font-semibold">Kilkari campaign</span> on maternal health, a nationwide initiative to raise awareness and promote healthier practices among <span className="text-green-400 font-semibold">rural women</span>.
848 |                   </p>
849 |                 </div>
850 |               </div>
851 | 
852 |               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
853 |                 <div className="grid grid-cols-2 gap-4">
854 |                   <Image 
855 |                     src="/images/dev-path-je.jpg" 
856 |                     alt="PATH Japanese Encephalitis" 
857 |                     width={300} 
858 |                     height={200}
859 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
860 |                   />
861 |                   <Image 
862 |                     src="/images/dev-pathfinder-fp.jpg" 
863 |                     alt="Pathfinder Family Planning" 
864 |                     width={300} 
865 |                     height={200}
866 |                     className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
867 |                   />
868 |                 </div>
869 |                 <div className="space-y-4">
870 |                   <h3 className="text-2xl font-bold text-white">PATH & Pathfinder</h3>
871 |                   <p className="text-gray-400 leading-relaxed">
872 |                     This partnership involved creating animated films on <span className="text-green-400 font-semibold">Japanese Encephalitis</span> and developing 24 video modules on <span className="text-green-400 font-semibold">family planning</span> for an LMS serving over 1,500 health workers.
873 |                   </p>
874 |                 </div>
875 |               </div>
876 |             </div>
877 |           )}
878 |         </div>
879 |       </section>
880 | 
881 |       {/* Enhanced Contact Section */}
882 |       <section id="contact" className="relative z-10 py-32">
883 |         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
884 |         <div className="container mx-auto px-4 text-center">
885 |           <div className="max-w-5xl mx-auto">
886 |             {/* Founder Quote */}
887 |             <div className="mb-20">
888 |               <blockquote className="text-3xl md:text-5xl font-medium text-white mb-8 leading-tight">
889 |                 <span className="text-blue-400">&quot;</span>We don&apos;t sell designs. We build emotional algorithms.<span className="text-blue-400">&quot;</span>
890 |               </blockquote>
891 |               <div className="space-y-2">
892 |                 <p className="text-xl text-gray-300 font-medium">
893 |                   Prashant Chaudhary — Founder & Creative Director
894 |                 </p>
895 |                 <p className="text-gray-500 italic">
896 |                   Supported by our agile team of brand strategists, designers, motion artists, video editors, illustrators & content specialists.
897 |                 </p>
898 |               </div>
899 |             </div>
900 |             
901 |             {/* CTA Section */}
902 |             <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
903 |               <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
904 |                 Let&apos;s Build Together
905 |               </h2>
906 |               <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
907 |                 Whether launching a product, shaping a health story, or driving a political narrative — we turn your vision into a living, breathing brand experience.
908 |               </p>
909 |               
910 |               {/* Contact Cards */}
911 |               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
912 |                 <a href="mailto:admin@anyasegen.com" 
913 |                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
914 |                   <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
915 |                   <p className="text-white font-medium mb-2">Email Us</p>
916 |                   <p className="text-gray-400 text-sm">admin@anyasegen.com</p>
917 |                 </a>
918 |                 
919 |                 <a href="tel:+918383036073" 
920 |                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
921 |                   <Phone className="w-8 h-8 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
922 |                   <p className="text-white font-medium mb-2">Call Us</p>
923 |                   <p className="text-gray-400 text-sm">+91 8383036073</p>
924 |                 </a>
925 |                 
926 |                 <a href="http://www.anyasegen.com" target="_blank" rel="noopener noreferrer"
927 |                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
928 |                   <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
929 |                   <p className="text-white font-medium mb-2">Visit Website</p>
930 |                   <p className="text-gray-400 text-sm">www.anyasegen.com</p>
931 |                 </a>
932 |               </div>
933 |               
934 |               {/* Address */}
935 |               <div className="pt-8 border-t border-white/10">
936 |                 <p className="text-gray-500 text-sm leading-relaxed">
937 |                   H-187, Lohia Road, Sector 63, Noida-201301, Uttar Pradesh, India
938 |                 </p>
939 |               </div>
940 |             </div>
941 |           </div>
942 |         </div>
943 |       </section>
944 | 
945 |       {/* Footer */}
946 |       <footer className="relative z-10 border-t border-white/10 py-8">
947 |         <div className="container mx-auto px-4 text-center">
948 |           <p className="text-gray-500 text-sm">
949 |             © 2024 Anya Segen. All rights reserved.
950 |           </p>
951 |         </div>
952 |       </footer>
953 | 
954 |       {/* Project Modal */}
955 |       <AnimatePresence>
956 |         {selectedProject && (
957 |           <motion.div
958 |             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
959 |             initial={{ opacity: 0 }}
960 |             animate={{ opacity: 1 }}
961 |             exit={{ opacity: 0 }}
962 |             onClick={() => setSelectedProject(null)}
963 |           >
964 |             <motion.div
965 |               className="bg-gray-900/90 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
966 |               initial={{ scale: 0.8, y: 100 }}
967 |               animate={{ scale: 1, y: 0 }}
968 |               exit={{ scale: 0.8, y: 100 }}
969 |               transition={{ type: "spring", damping: 25, stiffness: 300 }}
970 |               onClick={(e) => e.stopPropagation()}
971 |             >
972 |               <div className="relative">
973 |                 <motion.button
974 |                   className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors"
975 |                   onClick={() => setSelectedProject(null)}
976 |                   whileHover={{ scale: 1.1 }}
977 |                   whileTap={{ scale: 0.9 }}
978 |                 >
979 |                   <X className="w-6 h-6" />
980 |                 </motion.button>
981 | 
982 |                 <div className="aspect-video relative overflow-hidden rounded-t-3xl">
983 |                   <Image
984 |                     src={selectedProject.image}
985 |                     alt={selectedProject.title}
986 |                     fill
987 |                     className="object-cover"
988 |                   />
989 |                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
990 |                 </div>
991 | 
992 |                 <div className="p-8">
993 |                   <motion.div
994 |                     initial={{ opacity: 0, y: 20 }}
995 |                     animate={{ opacity: 1, y: 0 }}
996 |                     transition={{ delay: 0.2 }}
997 |                   >
998 |                     <div className="flex items-center space-x-3 mb-4">
999 |                       <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
1000 |                         {selectedProject.category}
1001 |                       </span>
1002 |                       <ExternalLink className="w-4 h-4 text-gray-400" />
1003 |                     </div>
1004 |                     
1005 |                     <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
1006 |                     <p className="text-gray-300 text-lg leading-relaxed mb-6">{selectedProject.description}</p>
1007 |                     
1008 |                     {selectedProject.tags && (
1009 |                       <div className="flex flex-wrap gap-2 mb-6">
1010 |                         {selectedProject.tags.map((tag: string) => (
1011 |                           <span
1012 |                             key={tag}
1013 |                             className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full"
1014 |                           >
1015 |                             {tag}
1016 |                           </span>
1017 |                         ))}
1018 |                       </div>
1019 |                     )}
1020 |                     
1021 |                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
1022 |                       <div>
1023 |                         <div className="text-2xl font-bold text-blue-400 mb-1">2024</div>
1024 |                         <div className="text-sm text-gray-400">Year</div>
1025 |                       </div>
1026 |                       <div>
1027 |                         <div className="text-2xl font-bold text-cyan-400 mb-1">6 Mo</div>
1028 |                         <div className="text-sm text-gray-400">Duration</div>
1029 |                       </div>
1030 |                       <div>
1031 |                         <div className="text-2xl font-bold text-green-400 mb-1">5</div>
1032 |                         <div className="text-sm text-gray-400">Team Size</div>
1033 |                       </div>
1034 |                     </div>
1035 |                   </motion.div>
1036 |                 </div>
1037 |               </div>
1038 |             </motion.div>
1039 |           </motion.div>
1040 |         )}
1041 |       </AnimatePresence>
1042 |     </motion.div>
1043 |   )
1044 | }
```

src/components/AdminRoute.tsx
```
1 | 'use client'
2 | 
3 | import { useEffect } from 'react'
4 | import { useRouter } from 'next/navigation'
5 | import { useAuth } from '@/lib/auth'
6 | import { Loader2, Shield } from 'lucide-react'
7 | 
8 | interface AdminRouteProps {
9 |   children: React.ReactNode
10 | }
11 | 
12 | export default function AdminRoute({ children }: AdminRouteProps) {
13 |   const { user, profile, loading, isAdmin } = useAuth()
14 |   const router = useRouter()
15 | 
16 |   useEffect(() => {
17 |     if (!loading && user && profile) {
18 |       if (!isAdmin) {
19 |         router.push('/dashboard')
20 |       }
21 |     } else if (!loading && !user) {
22 |       router.push('/auth/login')
23 |     }
24 |   }, [user, profile, loading, isAdmin, router])
25 | 
26 |   if (loading) {
27 |     return (
28 |       <div className="min-h-screen bg-black flex items-center justify-center">
29 |         <div className="text-center">
30 |           <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
31 |           <p className="text-gray-400">Loading...</p>
32 |         </div>
33 |       </div>
34 |     )
35 |   }
36 | 
37 |   if (!user || !isAdmin) {
38 |     return (
39 |       <div className="min-h-screen bg-black flex items-center justify-center">
40 |         <div className="text-center">
41 |           <Shield className="mx-auto h-16 w-16 text-red-400 mb-4" />
42 |           <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
43 |           <p className="text-gray-400">You need admin privileges to access this page.</p>
44 |         </div>
45 |       </div>
46 |     )
47 |   }
48 | 
49 |   return <>{children}</>
50 | }
```

src/components/ErrorBoundary.tsx
```
1 | 'use client'
2 | 
3 | import React, { Component, ErrorInfo, ReactNode } from 'react'
4 | import { Button } from '@/components/ui/button'
5 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
6 | import { AlertTriangle, RefreshCw } from 'lucide-react'
7 | 
8 | interface Props {
9 |   children: ReactNode
10 |   fallback?: ReactNode
11 | }
12 | 
13 | interface State {
14 |   hasError: boolean
15 |   error?: Error
16 |   errorInfo?: ErrorInfo
17 | }
18 | 
19 | class ErrorBoundary extends Component<Props, State> {
20 |   constructor(props: Props) {
21 |     super(props)
22 |     this.state = { hasError: false }
23 |   }
24 | 
25 |   static getDerivedStateFromError(error: Error): State {
26 |     return {
27 |       hasError: true,
28 |       error
29 |     }
30 |   }
31 | 
32 |   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
33 |     console.error('Error caught by boundary:', error, errorInfo)
34 |     
35 |     // Log error to monitoring service in production
36 |     if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
37 |       // Add your error reporting service here
38 |       // e.g., Sentry, LogRocket, etc.
39 |     }
40 | 
41 |     this.setState({
42 |       error,
43 |       errorInfo
44 |     })
45 |   }
46 | 
47 |   handleReset = () => {
48 |     this.setState({ hasError: false, error: undefined, errorInfo: undefined })
49 |   }
50 | 
51 |   handleReload = () => {
52 |     window.location.reload()
53 |   }
54 | 
55 |   render() {
56 |     if (this.state.hasError) {
57 |       // Custom fallback UI
58 |       if (this.props.fallback) {
59 |         return this.props.fallback
60 |       }
61 | 
62 |       // Default error UI
63 |       return (
64 |         <div className="min-h-screen bg-black flex items-center justify-center p-4">
65 |           <div className="w-full max-w-lg">
66 |             <Card className="bg-gray-900 border-gray-800">
67 |               <CardHeader className="text-center">
68 |                 <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
69 |                   <AlertTriangle className="h-8 w-8 text-white" />
70 |                 </div>
71 |                 <CardTitle className="text-white">Something went wrong</CardTitle>
72 |                 <CardDescription className="text-gray-400">
73 |                   An unexpected error occurred. Our team has been notified.
74 |                 </CardDescription>
75 |               </CardHeader>
76 |               <CardContent className="space-y-4">
77 |                 <div className="bg-gray-800 p-4 rounded-lg">
78 |                   <p className="text-sm text-gray-400 mb-2">
79 |                     If this problem persists, please contact support with the following information:
80 |                   </p>
81 |                   <code className="text-xs text-red-400 block bg-gray-900 p-2 rounded">
82 |                     {this.state.error?.message || 'Unknown error'}
83 |                   </code>
84 |                 </div>
85 | 
86 |                 <div className="flex gap-3">
87 |                   <Button
88 |                     onClick={this.handleReset}
89 |                     variant="outline"
90 |                     className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
91 |                   >
92 |                     <RefreshCw className="w-4 h-4 mr-2" />
93 |                     Try Again
94 |                   </Button>
95 |                   <Button
96 |                     onClick={this.handleReload}
97 |                     className="flex-1 bg-blue-600 hover:bg-blue-700"
98 |                   >
99 |                     Reload Page
100 |                   </Button>
101 |                 </div>
102 | 
103 |                 {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
104 |                   <details className="mt-4">
105 |                     <summary className="text-sm text-gray-400 cursor-pointer hover:text-white">
106 |                       Debug Information (Development Only)
107 |                     </summary>
108 |                     <pre className="text-xs text-gray-500 mt-2 p-2 bg-gray-900 rounded overflow-auto max-h-40">
109 |                       {this.state.error?.stack}
110 |                       {'\n\nComponent Stack:'}
111 |                       {this.state.errorInfo.componentStack}
112 |                     </pre>
113 |                   </details>
114 |                 )}
115 |               </CardContent>
116 |             </Card>
117 |           </div>
118 |         </div>
119 |       )
120 |     }
121 | 
122 |     return this.props.children
123 |   }
124 | }
125 | 
126 | export default ErrorBoundary
```

src/components/LazyComponents.tsx
```
1 | import dynamic from 'next/dynamic'
2 | import { Loader2 } from 'lucide-react'
3 | 
4 | // Loading component for dynamic imports
5 | const LoadingSpinner = () => (
6 |   <div className="flex items-center justify-center min-h-[200px]">
7 |     <div className="text-center">
8 |       <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
9 |       <p className="text-gray-400">Loading...</p>
10 |     </div>
11 |   </div>
12 | )
13 | 
14 | // Lazy load heavy components for better initial page load
15 | export const LazyAdminDashboard = dynamic(
16 |   () => import('@/app/admin/page').then(mod => ({ default: mod.default })),
17 |   {
18 |     loading: () => <LoadingSpinner />,
19 |     ssr: false // Admin dashboard doesn't need SSR
20 |   }
21 | )
22 | 
23 | export const LazyDashboard = dynamic(
24 |   () => import('@/app/dashboard/page').then(mod => ({ default: mod.default })),
25 |   {
26 |     loading: () => <LoadingSpinner />,
27 |     ssr: false // Dashboard doesn't need SSR since it's protected
28 |   }
29 | )
30 | 
31 | // Lazy load auth components (these can be SSR'd for SEO)
32 | export const LazyLoginPage = dynamic(
33 |   () => import('@/app/auth/login/page'),
34 |   {
35 |     loading: () => <LoadingSpinner />
36 |   }
37 | )
38 | 
39 | export const LazySignupPage = dynamic(
40 |   () => import('@/app/auth/signup/page'),
41 |   {
42 |     loading: () => <LoadingSpinner />
43 |   }
44 | )
45 | 
46 | export const LazyForgotPasswordPage = dynamic(
47 |   () => import('@/app/auth/forgot-password/page'),
48 |   {
49 |     loading: () => <LoadingSpinner />
50 |   }
51 | )
52 | 
53 | export const LazyResetPasswordPage = dynamic(
54 |   () => import('@/app/auth/reset-password/page'),
55 |   {
56 |     loading: () => <LoadingSpinner />
57 |   }
58 | )
59 | 
60 | export const LazyConfirmEmailPage = dynamic(
61 |   () => import('@/app/auth/confirm-email/page'),
62 |   {
63 |     loading: () => <LoadingSpinner />
64 |   }
65 | )
66 | 
67 | // Lazy load heavy UI components
68 | export const LazySidebar = dynamic(
69 |   () => import('@/components/Sidebar'),
70 |   {
71 |     loading: () => (
72 |       <div className="w-64 bg-gray-900 border-r border-gray-800">
73 |         <LoadingSpinner />
74 |       </div>
75 |     ),
76 |     ssr: false
77 |   }
78 | )
79 | 
80 | // Future components can be added here as needed
81 | 
82 | // Export loading component for reuse
83 | export { LoadingSpinner }
```

src/components/Logo.tsx
```
1 | import Image from 'next/image'
2 | 
3 | interface LogoProps {
4 |   className?: string
5 |   size?: 'sm' | 'md' | 'lg' | 'xl'
6 |   showText?: boolean
7 | }
8 | 
9 | const sizeMap = {
10 |   sm: { width: 24, height: 24 },
11 |   md: { width: 32, height: 32 },
12 |   lg: { width: 40, height: 40 },
13 |   xl: { width: 48, height: 48 }
14 | }
15 | 
16 | export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
17 |   const { width, height } = sizeMap[size]
18 |   
19 |   return (
20 |     <div className={`flex items-center space-x-2 ${className}`}>
21 |       <Image
22 |         src="/logos/logo-white.svg"
23 |         alt="ANYA SEGEN Logo"
24 |         width={width}
25 |         height={height}
26 |         className="flex-shrink-0"
27 |         priority
28 |       />
29 |       {showText && (
30 |         <h1 className={`font-bold text-white ${
31 |           size === 'sm' ? 'text-lg' : 
32 |           size === 'md' ? 'text-xl' : 
33 |           size === 'lg' ? 'text-2xl' : 
34 |           'text-3xl'
35 |         }`}>
36 |           ANYA SEGEN
37 |         </h1>
38 |       )}
39 |     </div>
40 |   )
41 | }
```

src/components/ProtectedRoute.tsx
```
1 | 'use client'
2 | 
3 | import { useEffect } from 'react'
4 | import { useRouter } from 'next/navigation'
5 | import { useAuth } from '@/lib/auth'
6 | import { Loader2 } from 'lucide-react'
7 | 
8 | interface ProtectedRouteProps {
9 |   children: React.ReactNode
10 | }
11 | 
12 | export default function ProtectedRoute({ children }: ProtectedRouteProps) {
13 |   const { user, loading } = useAuth()
14 |   const router = useRouter()
15 | 
16 |   useEffect(() => {
17 |     if (!loading && !user) {
18 |       router.push('/auth/login')
19 |     }
20 |   }, [user, loading, router])
21 | 
22 |   if (loading) {
23 |     return (
24 |       <div className="min-h-screen bg-black flex items-center justify-center">
25 |         <div className="text-center">
26 |           <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
27 |           <p className="text-gray-400">Loading...</p>
28 |         </div>
29 |       </div>
30 |     )
31 |   }
32 | 
33 |   if (!user) {
34 |     return null
35 |   }
36 | 
37 |   return <>{children}</>
38 | }
```

src/components/Sidebar.tsx
```
1 | 'use client'
2 | 
3 | import { useState } from 'react'
4 | import { Button } from "@/components/ui/button"
5 | import { 
6 |   FileText, 
7 |   Users, 
8 |   Settings, 
9 |   LogOut, 
10 |   Menu, 
11 |   X, 
12 |   Home,
13 |   BookOpen,
14 |   Search,
15 |   Bell,
16 |   User
17 | } from "lucide-react"
18 | import { useAuth } from "@/lib/auth"
19 | import { useRouter } from "next/navigation"
20 | import Logo from "@/components/Logo"
21 | 
22 | interface SidebarProps {
23 |   activeTab: string
24 |   onTabChange: (tab: string) => void
25 |   userRole?: 'admin' | 'user'
26 | }
27 | 
28 | export default function Sidebar({ activeTab, onTabChange, userRole = 'user' }: SidebarProps) {
29 |   const [isCollapsed, setIsCollapsed] = useState(false)
30 |   const { profile, signOut } = useAuth()
31 |   const router = useRouter()
32 | 
33 |   const handleSignOut = async () => {
34 |     await signOut()
35 |     router.push('/')
36 |   }
37 | 
38 |   const userMenuItems = [
39 |     { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
40 |     { id: 'search', label: 'Search', icon: Search },
41 |     { id: 'notifications', label: 'Notifications', icon: Bell },
42 |     { id: 'profile', label: 'My Profile', icon: User },
43 |   ]
44 | 
45 |   const adminMenuItems = [
46 |     { id: 'overview', label: 'Overview', icon: Home },
47 |     { id: 'members', label: 'Team Members', icon: Users },
48 |     { id: 'documents', label: 'Documents', icon: FileText },
49 |     { id: 'settings', label: 'Settings', icon: Settings },
50 |   ]
51 | 
52 |   const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems
53 | 
54 |   return (
55 |     <div className={`bg-gray-900 border-r border-gray-800 h-screen flex flex-col transition-all duration-300 ${
56 |       isCollapsed ? 'w-16' : 'w-64'
57 |     }`}>
58 |       {/* Header */}
59 |       <div className="p-4 border-b border-gray-800">
60 |         <div className="flex items-center justify-between">
61 |           {!isCollapsed && <Logo size="md" />}
62 |           <Button
63 |             variant="ghost"
64 |             size="sm"
65 |             onClick={() => setIsCollapsed(!isCollapsed)}
66 |             className="text-gray-400 hover:text-white"
67 |           >
68 |             {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
69 |           </Button>
70 |         </div>
71 |       </div>
72 | 
73 |       {/* Navigation */}
74 |       <nav className="flex-1 p-4 space-y-2">
75 |         {menuItems.map((item) => {
76 |           const Icon = item.icon
77 |           const isActive = activeTab === item.id
78 |           
79 |           return (
80 |             <button
81 |               key={item.id}
82 |               onClick={() => onTabChange(item.id)}
83 |               className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
84 |                 isActive 
85 |                   ? 'bg-blue-600 text-white' 
86 |                   : 'text-gray-400 hover:text-white hover:bg-gray-800'
87 |               }`}
88 |               title={isCollapsed ? item.label : undefined}
89 |             >
90 |               <Icon className="h-5 w-5 flex-shrink-0" />
91 |               {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
92 |             </button>
93 |           )
94 |         })}
95 |       </nav>
96 | 
97 |       {/* User Info & Sign Out */}
98 |       <div className="p-4 border-t border-gray-800">
99 |         {!isCollapsed && (
100 |           <div className="mb-3">
101 |             <p className="text-sm font-medium text-white">
102 |               {profile?.first_name} {profile?.last_name}
103 |             </p>
104 |             <p className="text-xs text-gray-400 capitalize">{userRole}</p>
105 |           </div>
106 |         )}
107 |         <Button
108 |           onClick={handleSignOut}
109 |           variant="ghost"
110 |           className={`w-full ${isCollapsed ? 'px-2' : ''} text-gray-400 hover:text-white hover:bg-gray-800`}
111 |           title={isCollapsed ? 'Sign Out' : undefined}
112 |         >
113 |           <LogOut className="h-4 w-4" />
114 |           {!isCollapsed && <span className="ml-3">Sign Out</span>}
115 |         </Button>
116 |       </div>
117 |     </div>
118 |   )
119 | }
```

src/components/UserRoute.tsx
```
1 | 'use client'
2 | 
3 | import { useEffect, useState } from 'react'
4 | import { useRouter } from 'next/navigation'
5 | import { useAuth } from '@/lib/auth'
6 | import { Loader2, Users } from 'lucide-react'
7 | 
8 | interface UserRouteProps {
9 |   children: React.ReactNode
10 | }
11 | 
12 | export default function UserRoute({ children }: UserRouteProps) {
13 |   const { user, profile, loading, isAdmin } = useAuth()
14 |   const router = useRouter()
15 |   const [hasRedirected, setHasRedirected] = useState(false)
16 | 
17 |   useEffect(() => {
18 |     // Prevent multiple redirects
19 |     if (hasRedirected || loading) return
20 |     
21 |     console.log('UserRoute check:', { user: !!user, profile: !!profile, isAdmin, loading })
22 |     
23 |     // Only redirect if we have definitive auth state
24 |     if (user && profile && isAdmin) {
25 |       console.log('Redirecting admin user to admin dashboard')
26 |       setHasRedirected(true)
27 |       router.push('/admin')
28 |     } else if (!user) {
29 |       console.log('No user found, redirecting to login')
30 |       setHasRedirected(true)
31 |       router.push('/auth/login')
32 |     }
33 |     // If user exists but no profile yet, wait (don't redirect)
34 |   }, [user, profile, loading, isAdmin, router, hasRedirected])
35 | 
36 |   if (loading) {
37 |     return (
38 |       <div className="min-h-screen bg-black flex items-center justify-center">
39 |         <div className="text-center">
40 |           <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
41 |           <p className="text-gray-400">Loading...</p>
42 |         </div>
43 |       </div>
44 |     )
45 |   }
46 | 
47 |   if (!user) {
48 |     return (
49 |       <div className="min-h-screen bg-black flex items-center justify-center">
50 |         <div className="text-center">
51 |           <Users className="mx-auto h-16 w-16 text-blue-400 mb-4" />
52 |           <h2 className="text-xl font-bold text-white mb-2">Please Sign In</h2>
53 |           <p className="text-gray-400">You need to be logged in to access this page.</p>
54 |         </div>
55 |       </div>
56 |     )
57 |   }
58 | 
59 |   if (isAdmin) {
60 |     return null // Will be redirected to admin
61 |   }
62 | 
63 |   return <>{children}</>
64 | }
```

src/lib/auth.tsx
```
1 | 'use client'
2 | 
3 | import { createContext, useContext, useEffect, useState, useCallback } from 'react'
4 | import { User } from '@supabase/supabase-js'
5 | import { supabase } from './supabase'
6 | 
7 | interface Profile {
8 |   id: string
9 |   email: string
10 |   first_name: string
11 |   last_name: string
12 |   role: string
13 |   department_id: string | null
14 | }
15 | 
16 | interface AuthContextType {
17 |   user: User | null
18 |   profile: Profile | null
19 |   loading: boolean
20 |   isAdmin: boolean
21 |   signIn: (email: string, password: string) => Promise<{ error: any }>
22 |   signUp: (email: string, password: string, firstName: string, lastName: string, departmentName: string) => Promise<{ error: any }>
23 |   signOut: () => Promise<void>
24 |   refreshProfile: () => Promise<void>
25 | }
26 | 
27 | const AuthContext = createContext<AuthContextType | undefined>(undefined)
28 | 
29 | export function AuthProvider({ children }: { children: React.ReactNode }) {
30 |   const [user, setUser] = useState<User | null>(null)
31 |   const [profile, setProfile] = useState<Profile | null>(null)
32 |   const [loading, setLoading] = useState(true)
33 |   
34 |   const isAdmin = profile?.role === 'admin'
35 | 
36 |   // Move refreshProfile inside useEffect to avoid dependency issues
37 |   useEffect(() => {
38 |     let mounted = true
39 |     let isRefreshing = false
40 |     let loadingTimeoutId: NodeJS.Timeout | null = null
41 |     
42 |     const setLoadingWithTimeout = (loading: boolean) => {
43 |       if (!mounted) return
44 |       
45 |       setLoading(loading)
46 |       
47 |       // Clear existing timeout
48 |       if (loadingTimeoutId) {
49 |         clearTimeout(loadingTimeoutId)
50 |       }
51 |       
52 |       // Set new timeout if loading is true
53 |       if (loading) {
54 |         loadingTimeoutId = setTimeout(() => {
55 |           if (mounted) {
56 |             console.log('Loading timeout reached, forcing loading to false')
57 |             setLoading(false)
58 |           }
59 |         }, 5000) // 5 second timeout
60 |       }
61 |     }
62 |     
63 |     const refreshProfile = async (currentUser: User) => {
64 |       if (isRefreshing || !mounted) return
65 |       
66 |       isRefreshing = true
67 |       try {
68 |         const { data, error } = await supabase
69 |           .from('profiles')
70 |           .select('*')
71 |           .eq('id', currentUser.id)
72 |           .maybeSingle()
73 | 
74 |         if (!mounted) return
75 | 
76 |         if (error) {
77 |           console.error('Error fetching profile:', error)
78 |           setProfile(null)
79 |         } else if (data) {
80 |           console.log('Profile loaded successfully:', data)
81 |           setProfile(data)
82 |         } else {
83 |           console.warn('No profile found for user - creating account without profile')
84 |           setProfile(null)
85 |         }
86 |       } catch (err) {
87 |         console.error('Error in refreshProfile:', err)
88 |         if (mounted) {
89 |           setProfile(null)
90 |         }
91 |       } finally {
92 |         isRefreshing = false
93 |       }
94 |     }
95 |     
96 |     // Get initial session
97 |     const getSession = async () => {
98 |       if (!mounted) return
99 |       
100 |       console.log('Getting initial session...')
101 |       setLoadingWithTimeout(true)
102 |       
103 |       try {
104 |         const { data: { session } } = await supabase.auth.getSession()
105 |         const currentUser = session?.user ?? null
106 |         
107 |         if (!mounted) return
108 |         
109 |         console.log('Initial session loaded:', currentUser ? 'user found' : 'no user')
110 |         setUser(currentUser)
111 |         
112 |         if (currentUser) {
113 |           await refreshProfile(currentUser)
114 |         } else {
115 |           setProfile(null)
116 |         }
117 |       } catch (error) {
118 |         console.error('Error getting session:', error)
119 |         if (mounted) {
120 |           setUser(null)
121 |           setProfile(null)
122 |         }
123 |       } finally {
124 |         if (mounted) {
125 |           setLoadingWithTimeout(false)
126 |         }
127 |       }
128 |     }
129 | 
130 |     getSession()
131 | 
132 |     // Listen for auth changes
133 |     const { data: { subscription } } = supabase.auth.onAuthStateChange(
134 |       async (event, session) => {
135 |         if (!mounted) return
136 |         
137 |         console.log('Auth state change:', event, 'User:', session?.user?.id || 'null', 'Loading:', loading)
138 |         
139 |         // Ignore INITIAL_SESSION events to prevent conflicts with getSession()
140 |         if (event === 'INITIAL_SESSION') {
141 |           console.log('Ignoring INITIAL_SESSION event to prevent conflicts')
142 |           return
143 |         }
144 |         
145 |         // Only set loading for actual sign in/out events
146 |         const loadingEvents = ['SIGNED_IN', 'SIGNED_OUT']
147 |         const shouldSetLoading = loadingEvents.includes(event)
148 |         
149 |         if (shouldSetLoading) {
150 |           setLoadingWithTimeout(true)
151 |         }
152 |         
153 |         try {
154 |           const currentUser = session?.user ?? null
155 |           setUser(currentUser)
156 |           
157 |           if (currentUser) {
158 |             await refreshProfile(currentUser)
159 |           } else {
160 |             setProfile(null)
161 |           }
162 |         } catch (error) {
163 |           console.error('Error in auth state change:', error)
164 |           if (mounted) {
165 |             setUser(null)
166 |             setProfile(null)
167 |           }
168 |         } finally {
169 |           if (mounted && shouldSetLoading) {
170 |             setLoadingWithTimeout(false)
171 |           }
172 |         }
173 |       }
174 |     )
175 | 
176 |     return () => {
177 |       mounted = false
178 |       subscription.unsubscribe()
179 |       if (loadingTimeoutId) {
180 |         clearTimeout(loadingTimeoutId)
181 |       }
182 |     }
183 |   }, []) // Remove refreshProfile dependency to prevent infinite loop
184 | 
185 |   // Remove the duplicate useEffect that was causing issues
186 | 
187 |   const signIn = async (email: string, password: string) => {
188 |     const { data, error } = await supabase.auth.signInWithPassword({
189 |       email,
190 |       password,
191 |     })
192 |     
193 |     if (!error && data.session) {
194 |       console.log('SignIn successful, forcing session refresh...')
195 |       // Force a session refresh to ensure auth state is immediately updated
196 |       const { data: { session } } = await supabase.auth.getSession()
197 |       if (session?.user) {
198 |         setUser(session.user)
199 |         // The auth state change listener will handle profile loading
200 |       }
201 |     }
202 |     
203 |     return { error }
204 |   }
205 | 
206 |   const signUp = async (email: string, password: string, firstName: string, lastName: string, departmentName: string) => {
207 |     try {
208 |       // First get the department ID
209 |       const { data: departments, error: deptError } = await supabase
210 |         .from('departments')
211 |         .select('id')
212 |         .eq('name', departmentName)
213 |         .single()
214 | 
215 |       if (deptError) {
216 |         console.error('Department lookup error:', deptError)
217 |         return { error: { message: 'Failed to find department. Please try again.' } }
218 |       }
219 | 
220 |       if (!departments?.id) {
221 |         return { error: { message: 'Invalid department selected. Please try again.' } }
222 |       }
223 | 
224 |       console.log('Signing up user with department:', departments.id)
225 | 
226 |       const { data, error } = await supabase.auth.signUp({
227 |         email,
228 |         password,
229 |         options: {
230 |           data: {
231 |             first_name: firstName,
232 |             last_name: lastName,
233 |             department_id: departments.id,
234 |             department_name: departmentName,
235 |           },
236 |         },
237 |       })
238 | 
239 |       if (error) {
240 |         console.error('Signup error:', error)
241 |         return { error }
242 |       }
243 | 
244 |       console.log('Signup successful:', data)
245 |       return { error: null }
246 |     } catch (err) {
247 |       console.error('Unexpected signup error:', err)
248 |       return { error: { message: 'An unexpected error occurred. Please try again.' } }
249 |     }
250 |   }
251 | 
252 |   const signOut = async () => {
253 |     await supabase.auth.signOut()
254 |   }
255 | 
256 |   // External refreshProfile function that can be called from components
257 |   const externalRefreshProfile = useCallback(async () => {
258 |     if (user) {
259 |       // This will trigger the auth state change and refresh the profile
260 |       const { data: { session } } = await supabase.auth.getSession()
261 |       if (session?.user) {
262 |         // Don't call our internal refreshProfile to avoid loops
263 |         try {
264 |           const { data, error } = await supabase
265 |             .from('profiles')
266 |             .select('*')
267 |             .eq('id', session.user.id)
268 |             .maybeSingle()
269 | 
270 |           if (error) {
271 |             console.error('Error fetching profile:', error)
272 |             setProfile(null)
273 |           } else if (data) {
274 |             setProfile(data)
275 |           } else {
276 |             console.error('No profile found for user')
277 |             setProfile(null)
278 |           }
279 |         } catch (err) {
280 |           console.error('Error in external refreshProfile:', err)
281 |           setProfile(null)
282 |         }
283 |       }
284 |     }
285 |   }, [user])
286 | 
287 |   const value = {
288 |     user,
289 |     profile,
290 |     loading,
291 |     isAdmin,
292 |     signIn,
293 |     signUp,
294 |     signOut,
295 |     refreshProfile: externalRefreshProfile,
296 |   }
297 | 
298 |   return (
299 |     <AuthContext.Provider value={value}>
300 |       {children}
301 |     </AuthContext.Provider>
302 |   )
303 | }
304 | 
305 | export function useAuth() {
306 |   const context = useContext(AuthContext)
307 |   if (context === undefined) {
308 |     throw new Error('useAuth must be used within an AuthProvider')
309 |   }
310 |   return context
311 | }
```

src/lib/errors.ts
```
1 | // Centralized error handling and user-friendly messages
2 | 
3 | export interface AppError {
4 |   message: string
5 |   code?: string
6 |   severity: 'low' | 'medium' | 'high'
7 | }
8 | 
9 | // Generic error messages that don't expose system internals
10 | export const ERROR_MESSAGES = {
11 |   AUTHENTICATION_FAILED: 'Authentication failed. Please check your credentials and try again.',
12 |   UNAUTHORIZED: 'You are not authorized to perform this action.',
13 |   PROFILE_NOT_FOUND: 'User profile not found. Please contact support.',
14 |   VALIDATION_ERROR: 'Please check your input and try again.',
15 |   NETWORK_ERROR: 'Network error. Please check your connection and try again.',
16 |   SERVER_ERROR: 'Something went wrong. Please try again later.',
17 |   SIGNUP_FAILED: 'Account creation failed. Please try again.',
18 |   PASSWORD_WEAK: 'Password must be at least 12 characters long and include uppercase, lowercase, numbers, and special characters.',
19 |   EMAIL_INVALID: 'Please enter a valid email address.',
20 |   REQUIRED_FIELD: 'This field is required.',
21 |   DEPARTMENT_LOAD_ERROR: 'Unable to load departments. Please refresh the page and try again.',
22 |   DOCUMENT_SAVE_ERROR: 'Unable to save document. Please try again.',
23 |   USER_UPDATE_ERROR: 'Unable to update user information. Please try again.',
24 | } as const
25 | 
26 | // Map technical errors to user-friendly messages
27 | export const mapErrorToUserMessage = (error: any): AppError => {
28 |   // Log the actual error for debugging (server-side only)
29 |   if (typeof window === 'undefined') {
30 |     console.error('Technical error:', error)
31 |   }
32 | 
33 |   // Supabase authentication errors
34 |   if (error?.message?.includes('Invalid login credentials')) {
35 |     return {
36 |       message: ERROR_MESSAGES.AUTHENTICATION_FAILED,
37 |       code: 'AUTH_INVALID_CREDENTIALS',
38 |       severity: 'medium'
39 |     }
40 |   }
41 | 
42 |   if (error?.message?.includes('Email not confirmed')) {
43 |     return {
44 |       message: 'Please check your email and click the confirmation link before signing in.',
45 |       code: 'AUTH_EMAIL_NOT_CONFIRMED',
46 |       severity: 'medium'
47 |     }
48 |   }
49 | 
50 |   if (error?.message?.includes('User already registered')) {
51 |     return {
52 |       message: 'An account with this email already exists. Please sign in instead.',
53 |       code: 'AUTH_USER_EXISTS',
54 |       severity: 'low'
55 |     }
56 |   }
57 | 
58 |   // Network errors
59 |   if (error?.name === 'NetworkError' || error?.code === 'NETWORK_ERROR') {
60 |     return {
61 |       message: ERROR_MESSAGES.NETWORK_ERROR,
62 |       code: 'NETWORK_ERROR',
63 |       severity: 'medium'
64 |     }
65 |   }
66 | 
67 |   // Validation errors
68 |   if (error?.code === 'VALIDATION_ERROR' || error?.message?.includes('validation')) {
69 |     return {
70 |       message: ERROR_MESSAGES.VALIDATION_ERROR,
71 |       code: 'VALIDATION_ERROR',
72 |       severity: 'low'
73 |     }
74 |   }
75 | 
76 |   // Permission errors
77 |   if (error?.code === 'PGRST301' || error?.message?.includes('permission')) {
78 |     return {
79 |       message: ERROR_MESSAGES.UNAUTHORIZED,
80 |       code: 'UNAUTHORIZED',
81 |       severity: 'medium'
82 |     }
83 |   }
84 | 
85 |   // Default to generic server error
86 |   return {
87 |     message: ERROR_MESSAGES.SERVER_ERROR,
88 |     code: 'UNKNOWN_ERROR',
89 |     severity: 'high'
90 |   }
91 | }
92 | 
93 | // Input validation helpers
94 | export const validateEmail = (email: string): string | null => {
95 |   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
96 |   if (!email) return ERROR_MESSAGES.REQUIRED_FIELD
97 |   if (!emailRegex.test(email)) return ERROR_MESSAGES.EMAIL_INVALID
98 |   return null
99 | }
100 | 
101 | export const validatePassword = (password: string): string | null => {
102 |   if (!password) return ERROR_MESSAGES.REQUIRED_FIELD
103 |   if (password.length < 12) return ERROR_MESSAGES.PASSWORD_WEAK
104 |   
105 |   // Check for complexity
106 |   const hasUppercase = /[A-Z]/.test(password)
107 |   const hasLowercase = /[a-z]/.test(password)
108 |   const hasNumbers = /\d/.test(password)
109 |   const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
110 |   
111 |   if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSpecialChar) {
112 |     return ERROR_MESSAGES.PASSWORD_WEAK
113 |   }
114 |   
115 |   return null
116 | }
117 | 
118 | export const validateRequired = (value: string, fieldName: string): string | null => {
119 |   if (!value || value.trim().length === 0) {
120 |     return `${fieldName} is required`
121 |   }
122 |   return null
123 | }
124 | 
125 | // Sanitize user input to prevent XSS
126 | export const sanitizeInput = (input: string): string => {
127 |   return input
128 |     .replace(/[<>]/g, '') // Remove potential HTML tags
129 |     .trim()
130 |     .substring(0, 1000) // Limit length
131 | }
132 | 
133 | // Rate limiting helper
134 | export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
135 |   const attempts = new Map<string, { count: number; resetTime: number }>()
136 |   
137 |   return (identifier: string): boolean => {
138 |     const now = Date.now()
139 |     const userAttempts = attempts.get(identifier)
140 |     
141 |     if (!userAttempts || now > userAttempts.resetTime) {
142 |       attempts.set(identifier, { count: 1, resetTime: now + windowMs })
143 |       return true
144 |     }
145 |     
146 |     if (userAttempts.count >= maxAttempts) {
147 |       return false
148 |     }
149 |     
150 |     userAttempts.count++
151 |     return true
152 |   }
153 | }
```

src/lib/supabase.ts
```
1 | import { createClient } from '@supabase/supabase-js'
2 | 
3 | const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
4 | const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
5 | 
6 | export const supabase = createClient(supabaseUrl, supabaseKey)
```

src/lib/utils.ts
```
1 | import { type ClassValue, clsx } from "clsx"
2 | import { twMerge } from "tailwind-merge"
3 | 
4 | export function cn(...inputs: ClassValue[]) {
5 |   return twMerge(clsx(inputs))
6 | }
```

src/app/admin/page.tsx
```
1 | 'use client'
2 | 
3 | import { useEffect, useState } from "react"
4 | import { Button } from "@/components/ui/button"
5 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
6 | import { Users, FileText, Settings, Eye, Trash2, UserPlus } from "lucide-react"
7 | import AdminRoute from "@/components/AdminRoute"
8 | import Sidebar from "@/components/Sidebar"
9 | import AdminDocuments from "@/components/admin/documents/AdminDocuments"
10 | import { useAuth } from "@/lib/auth"
11 | import { supabase } from "@/lib/supabase"
12 | 
13 | interface TeamMember {
14 |   id: string
15 |   email: string
16 |   first_name: string
17 |   last_name: string
18 |   role: string
19 |   created_at: string
20 |   department_name: string
21 | }
22 | 
23 | interface DashboardStats {
24 |   total_members: number
25 |   total_documents: number
26 |   total_departments: number
27 | }
28 | 
29 | 
30 | export default function AdminDashboard() {
31 |   const { user, profile } = useAuth()
32 |   const [activeTab, setActiveTab] = useState('overview')
33 |   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
34 |   const [stats, setStats] = useState<DashboardStats>({ total_members: 0, total_documents: 0, total_departments: 0 })
35 |   const [loading, setLoading] = useState(true)
36 | 
37 |   const fetchTeamMembers = async () => {
38 |     try {
39 |       console.log('Fetching team members...')
40 |       
41 |       // Fetch profiles with department info separately to avoid RLS issues
42 |       const { data: profilesData, error: profilesError } = await supabase
43 |         .from('profiles')
44 |         .select('id, email, first_name, last_name, role, created_at, department_id')
45 |         .order('created_at', { ascending: false })
46 | 
47 |       if (profilesError) {
48 |         console.error('Error fetching profiles:', profilesError)
49 |         return
50 |       }
51 | 
52 |       // Fetch departments
53 |       const { data: departmentsData, error: deptError } = await supabase
54 |         .from('departments')
55 |         .select('id, name')
56 | 
57 |       if (deptError) {
58 |         console.error('Error fetching departments:', deptError)
59 |         return
60 |       }
61 | 
62 |       // Combine the data
63 |       const members = profilesData?.map(member => {
64 |         const department = departmentsData?.find(d => d.id === member.department_id)
65 |         return {
66 |           ...member,
67 |           department_name: department?.name || 'No Department'
68 |         }
69 |       }) || []
70 | 
71 |       console.log('Processed team members:', members)
72 |       setTeamMembers(members)
73 |     } catch (err) {
74 |       console.error('Error in fetchTeamMembers:', err)
75 |     }
76 |   }
77 | 
78 |   const fetchStats = async () => {
79 |     try {
80 |       const [membersResult, documentsResult, departmentsResult] = await Promise.all([
81 |         supabase.from('profiles').select('id', { count: 'exact', head: true }),
82 |         supabase.from('documents').select('id', { count: 'exact', head: true }),
83 |         supabase.from('departments').select('id', { count: 'exact', head: true })
84 |       ])
85 | 
86 |       setStats({
87 |         total_members: membersResult.count || 0,
88 |         total_documents: documentsResult.count || 0,
89 |         total_departments: departmentsResult.count || 0
90 |       })
91 |     } catch (err) {
92 |       console.error('Error fetching stats:', err)
93 |     }
94 |   }
95 | 
96 | 
97 | 
98 | 
99 | 
100 |   useEffect(() => {
101 |     const loadData = async () => {
102 |       try {
103 |         await Promise.all([fetchTeamMembers(), fetchStats()])
104 |       } catch (error) {
105 |         console.error('Error loading admin data:', error)
106 |       } finally {
107 |         setLoading(false)
108 |       }
109 |     }
110 |     loadData()
111 |   }, [])
112 | 
113 |   const renderOverview = () => (
114 |     <div className="space-y-6">
115 |       <div>
116 |         <h2 className="text-2xl font-bold text-white mb-2">Admin Overview</h2>
117 |         <p className="text-gray-400">
118 |           Welcome back, {profile?.first_name}. Here&apos;s an overview of your system.
119 |         </p>
120 |       </div>
121 | 
122 |       {/* Stats Overview */}
123 |       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
124 |         <Card className="bg-gray-800 border-gray-700">
125 |           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
126 |             <CardTitle className="text-sm font-medium text-white">Total Members</CardTitle>
127 |             <Users className="h-4 w-4 text-blue-400" />
128 |           </CardHeader>
129 |           <CardContent>
130 |             <div className="text-2xl font-bold text-white">{stats.total_members}</div>
131 |             <p className="text-xs text-gray-400">Active team members</p>
132 |           </CardContent>
133 |         </Card>
134 | 
135 |         <Card className="bg-gray-800 border-gray-700">
136 |           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
137 |             <CardTitle className="text-sm font-medium text-white">Documents</CardTitle>
138 |             <FileText className="h-4 w-4 text-green-400" />
139 |           </CardHeader>
140 |           <CardContent>
141 |             <div className="text-2xl font-bold text-white">{stats.total_documents}</div>
142 |             <p className="text-xs text-gray-400">Knowledge base articles</p>
143 |           </CardContent>
144 |         </Card>
145 | 
146 |         <Card className="bg-gray-800 border-gray-700">
147 |           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
148 |             <CardTitle className="text-sm font-medium text-white">Departments</CardTitle>
149 |             <Settings className="h-4 w-4 text-purple-400" />
150 |           </CardHeader>
151 |           <CardContent>
152 |             <div className="text-2xl font-bold text-white">{stats.total_departments}</div>
153 |             <p className="text-xs text-gray-400">Active departments</p>
154 |           </CardContent>
155 |         </Card>
156 |       </div>
157 | 
158 |       {/* Recent Activity */}
159 |       <Card className="bg-gray-800 border-gray-700">
160 |         <CardHeader>
161 |           <CardTitle className="text-white">Recent Activity</CardTitle>
162 |           <CardDescription className="text-gray-400">
163 |             Latest team activity and system updates
164 |           </CardDescription>
165 |         </CardHeader>
166 |         <CardContent>
167 |           <div className="space-y-4">
168 |             <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
169 |               <div className="w-2 h-2 bg-green-400 rounded-full"></div>
170 |               <div className="flex-1">
171 |                 <p className="text-white text-sm">New member joined the team</p>
172 |                 <p className="text-gray-400 text-xs">2 minutes ago</p>
173 |               </div>
174 |             </div>
175 |             <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
176 |               <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
177 |               <div className="flex-1">
178 |                 <p className="text-white text-sm">Document updated in Knowledge Base</p>
179 |                 <p className="text-gray-400 text-xs">1 hour ago</p>
180 |               </div>
181 |             </div>
182 |             <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
183 |               <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
184 |               <div className="flex-1">
185 |                 <p className="text-white text-sm">System maintenance completed</p>
186 |                 <p className="text-gray-400 text-xs">3 hours ago</p>
187 |               </div>
188 |             </div>
189 |           </div>
190 |         </CardContent>
191 |       </Card>
192 |     </div>
193 |   )
194 | 
195 |   const renderMembers = () => (
196 |     <div className="space-y-6">
197 |       <div>
198 |         <h2 className="text-2xl font-bold text-white mb-2">Team Members</h2>
199 |         <p className="text-gray-400">Manage all registered team members</p>
200 |       </div>
201 | 
202 |       <Card className="bg-gray-800 border-gray-700">
203 |         <CardHeader>
204 |           <div className="flex items-center justify-between">
205 |             <div>
206 |               <CardTitle className="text-white">Team Members</CardTitle>
207 |               <CardDescription className="text-gray-400">
208 |                 Manage all registered team members
209 |               </CardDescription>
210 |             </div>
211 |             <Button className="bg-blue-600 hover:bg-blue-700">
212 |               <UserPlus className="h-4 w-4 mr-2" />
213 |               Invite Member
214 |             </Button>
215 |           </div>
216 |         </CardHeader>
217 |         <CardContent>
218 |           {loading ? (
219 |             <p className="text-gray-400">Loading team members...</p>
220 |           ) : teamMembers.length === 0 ? (
221 |             <div className="text-center py-8">
222 |               <Users className="mx-auto h-16 w-16 text-gray-500 mb-4" />
223 |               <p className="text-gray-400">No team members found</p>
224 |               <p className="text-gray-500 text-sm">Team members will appear here once they sign up</p>
225 |             </div>
226 |           ) : (
227 |             <div className="space-y-4">
228 |               {teamMembers.map((member) => (
229 |                 <div key={member.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
230 |                   <div className="flex items-center space-x-4">
231 |                     <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
232 |                       <span className="text-white font-semibold">
233 |                         {member.first_name.charAt(0)}{member.last_name.charAt(0)}
234 |                       </span>
235 |                     </div>
236 |                     <div>
237 |                       <h4 className="text-white font-medium">
238 |                         {member.first_name} {member.last_name}
239 |                       </h4>
240 |                       <p className="text-gray-400 text-sm">{member.email}</p>
241 |                       <p className="text-gray-500 text-xs">
242 |                         {member.department_name} • {member.role}
243 |                       </p>
244 |                     </div>
245 |                   </div>
246 |                   <div className="flex items-center space-x-2">
247 |                     <Button variant="outline" size="sm" className="text-white border-gray-600">
248 |                       <Eye className="h-4 w-4" />
249 |                     </Button>
250 |                     <Button variant="outline" size="sm" className="text-red-400 border-red-600 hover:bg-red-600">
251 |                       <Trash2 className="h-4 w-4" />
252 |                     </Button>
253 |                   </div>
254 |                 </div>
255 |               ))}
256 |             </div>
257 |           )}
258 |         </CardContent>
259 |       </Card>
260 |     </div>
261 |   )
262 | 
263 | 
264 |   const renderSettings = () => (
265 |     <div className="space-y-6">
266 |       <div>
267 |         <h2 className="text-2xl font-bold text-white mb-2">System Settings</h2>
268 |         <p className="text-gray-400">Configure system-wide settings and preferences</p>
269 |       </div>
270 | 
271 |       <Card className="bg-gray-800 border-gray-700">
272 |         <CardHeader>
273 |           <CardTitle className="text-white">System Settings</CardTitle>
274 |           <CardDescription className="text-gray-400">
275 |             Configure system-wide settings and preferences
276 |           </CardDescription>
277 |         </CardHeader>
278 |         <CardContent>
279 |           <p className="text-gray-400">Settings interface coming soon...</p>
280 |         </CardContent>
281 |       </Card>
282 |     </div>
283 |   )
284 | 
285 |   const renderContent = () => {
286 |     switch (activeTab) {
287 |       case 'overview':
288 |         return renderOverview()
289 |       case 'members':
290 |         return renderMembers()
291 |       case 'documents':
292 |         return <AdminDocuments user={user} />
293 |       case 'settings':
294 |         return renderSettings()
295 |       default:
296 |         return renderOverview()
297 |     }
298 |   }
299 | 
300 |   return (
301 |     <AdminRoute>
302 |       <div className="flex h-screen bg-black">
303 |         <Sidebar 
304 |           activeTab={activeTab} 
305 |           onTabChange={setActiveTab}
306 |           userRole="admin"
307 |         />
308 |         
309 |         {/* Main Content */}
310 |         <div className="flex-1 overflow-auto">
311 |           {activeTab === 'documents' ? (
312 |             <div className="h-full">
313 |               {renderContent()}
314 |             </div>
315 |           ) : (
316 |             <div className="p-8">
317 |               {renderContent()}
318 |             </div>
319 |           )}
320 |         </div>
321 |       </div>
322 |     </AdminRoute>
323 |   )
324 | }
```

src/app/dashboard/page.tsx
```
1 | 'use client'
2 | 
3 | import { useEffect, useState, useCallback } from "react"
4 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
5 | import { Input } from "@/components/ui/input"
6 | import { Button } from "@/components/ui/button"
7 | import { FileText, Search, Bell, Eye, Clock, BookOpen, ArrowLeft } from "lucide-react"
8 | import UserRoute from "@/components/UserRoute"
9 | import Sidebar from "@/components/Sidebar"
10 | import { useAuth } from "@/lib/auth"
11 | import { supabase } from "@/lib/supabase"
12 | 
13 | interface Document {
14 |   id: string
15 |   title: string
16 |   content: string
17 |   document_type: string
18 |   tags: string[]
19 |   created_at: string
20 |   department_name: string
21 | }
22 | 
23 | export default function UserDashboard() {
24 |   const { profile } = useAuth()
25 |   const [activeTab, setActiveTab] = useState('knowledge-base')
26 |   const [documents, setDocuments] = useState<Document[]>([])
27 |   const [searchQuery, setSearchQuery] = useState('')
28 |   const [loading, setLoading] = useState(true)
29 |   const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
30 |   const [departmentName, setDepartmentName] = useState<string>('')
31 | 
32 |   const fetchDocuments = useCallback(async () => {
33 |     if (!profile?.department_id) {
34 |       console.log('No department_id found for user profile:', profile)
35 |       setLoading(false)
36 |       return
37 |     }
38 |     
39 |     try {
40 |       // First get department name
41 |       const { data: deptData } = await supabase
42 |         .from('departments')
43 |         .select('name')
44 |         .eq('id', profile.department_id)
45 |         .single()
46 | 
47 |       const deptName = deptData?.name || 'Unknown'
48 |       setDepartmentName(deptName)
49 | 
50 |       // Then get documents
51 |       const { data, error } = await supabase
52 |         .from('documents')
53 |         .select(`
54 |           id,
55 |           title,
56 |           content,
57 |           document_type,
58 |           tags,
59 |           created_at
60 |         `)
61 |         .eq('department_id', profile.department_id)
62 |         .eq('is_published', true)
63 |         .order('created_at', { ascending: false })
64 | 
65 |       if (error) {
66 |         console.error('Error fetching documents:', error)
67 |       } else {
68 |         const docsWithDept = data?.map(doc => ({
69 |           ...doc,
70 |           department_name: deptName
71 |         })) || []
72 |         setDocuments(docsWithDept)
73 |       }
74 |     } catch (err) {
75 |       console.error('Error in fetchDocuments:', err)
76 |     } finally {
77 |       setLoading(false)
78 |     }
79 |   }, [profile])
80 | 
81 |   useEffect(() => {
82 |     if (profile?.department_id) {
83 |       fetchDocuments()
84 |     }
85 |   }, [profile?.department_id, fetchDocuments])
86 | 
87 |   const filteredDocuments = documents.filter(doc =>
88 |     doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
89 |     doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
90 |     doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
91 |   )
92 | 
93 |   const renderKnowledgeBase = () => {
94 |     if (selectedDocument) {
95 |       return (
96 |         <div className="space-y-6">
97 |           <div className="flex items-center space-x-4">
98 |             <Button 
99 |               variant="outline" 
100 |               onClick={() => setSelectedDocument(null)}
101 |               className="text-white border-gray-600 hover:bg-gray-700"
102 |             >
103 |               <ArrowLeft className="h-4 w-4 mr-2" />
104 |               Back to Documents
105 |             </Button>
106 |             <div>
107 |               <h2 className="text-2xl font-bold text-white">{selectedDocument.title}</h2>
108 |               <p className="text-gray-400">
109 |                 {selectedDocument.document_type} • {selectedDocument.department_name} • {new Date(selectedDocument.created_at).toLocaleDateString()}
110 |               </p>
111 |             </div>
112 |           </div>
113 | 
114 |           <Card className="bg-gray-800 border-gray-700">
115 |             <CardContent className="p-8">
116 |               <div className="prose prose-invert max-w-none">
117 |                 <div className="text-white whitespace-pre-wrap leading-relaxed">
118 |                   {selectedDocument.content}
119 |                 </div>
120 |               </div>
121 |               
122 |               {selectedDocument.tags && selectedDocument.tags.length > 0 && (
123 |                 <div className="mt-8 pt-6 border-t border-gray-700">
124 |                   <h4 className="text-white font-medium mb-3">Tags</h4>
125 |                   <div className="flex flex-wrap gap-2">
126 |                     {selectedDocument.tags.map((tag, index) => (
127 |                       <span
128 |                         key={index}
129 |                         className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full"
130 |                       >
131 |                         {tag}
132 |                       </span>
133 |                     ))}
134 |                   </div>
135 |                 </div>
136 |               )}
137 |             </CardContent>
138 |           </Card>
139 |         </div>
140 |       )
141 |     }
142 | 
143 |     return (
144 |       <div className="space-y-6">
145 |         <div>
146 |           <h2 className="text-2xl font-bold text-white mb-2">Knowledge Base</h2>
147 |           <p className="text-gray-400">
148 |             Access SOPs and documentation for your department: {departmentName}
149 |           </p>
150 |         </div>
151 | 
152 |       {/* Search */}
153 |       <div className="relative">
154 |         <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
155 |         <Input
156 |           placeholder="Search documents, SOPs, and procedures..."
157 |           value={searchQuery}
158 |           onChange={(e) => setSearchQuery(e.target.value)}
159 |           className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
160 |         />
161 |       </div>
162 | 
163 |       {/* Documents Grid */}
164 |       {loading ? (
165 |         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
166 |           {[1, 2, 3].map(i => (
167 |             <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
168 |               <CardHeader>
169 |                 <div className="h-4 bg-gray-700 rounded w-3/4"></div>
170 |                 <div className="h-3 bg-gray-700 rounded w-1/2"></div>
171 |               </CardHeader>
172 |               <CardContent>
173 |                 <div className="space-y-2">
174 |                   <div className="h-3 bg-gray-700 rounded"></div>
175 |                   <div className="h-3 bg-gray-700 rounded w-2/3"></div>
176 |                 </div>
177 |               </CardContent>
178 |             </Card>
179 |           ))}
180 |         </div>
181 |       ) : filteredDocuments.length === 0 ? (
182 |         <Card className="bg-gray-800 border-gray-700">
183 |           <CardContent className="text-center py-12">
184 |             <BookOpen className="mx-auto h-16 w-16 text-gray-500 mb-4" />
185 |             <h3 className="text-lg font-semibold text-white mb-2">
186 |               {searchQuery ? 'No documents found' : 'No documents available'}
187 |             </h3>
188 |             <p className="text-gray-400">
189 |               {searchQuery 
190 |                 ? 'Try adjusting your search terms'
191 |                 : 'Documents for your department will appear here when available'
192 |               }
193 |             </p>
194 |           </CardContent>
195 |         </Card>
196 |       ) : (
197 |         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
198 |           {filteredDocuments.map((doc) => (
199 |             <Card key={doc.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
200 |               <CardHeader>
201 |                 <div className="flex items-start justify-between">
202 |                   <div className="flex-1">
203 |                     <CardTitle className="text-white text-lg">{doc.title}</CardTitle>
204 |                     <CardDescription className="text-gray-400 capitalize">
205 |                       {doc.document_type} • {doc.department_name}
206 |                     </CardDescription>
207 |                   </div>
208 |                   <FileText className="h-5 w-5 text-blue-400 flex-shrink-0" />
209 |                 </div>
210 |               </CardHeader>
211 |               <CardContent>
212 |                 <p className="text-gray-300 text-sm mb-4 line-clamp-3">
213 |                   {doc.content?.substring(0, 120)}...
214 |                 </p>
215 |                 
216 |                 {/* Tags */}
217 |                 {doc.tags && doc.tags.length > 0 && (
218 |                   <div className="flex flex-wrap gap-1 mb-4">
219 |                     {doc.tags.slice(0, 3).map((tag, index) => (
220 |                       <span
221 |                         key={index}
222 |                         className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 rounded"
223 |                       >
224 |                         {tag}
225 |                       </span>
226 |                     ))}
227 |                   </div>
228 |                 )}
229 | 
230 |                 <div className="flex items-center justify-between">
231 |                   <div className="flex items-center text-xs text-gray-500">
232 |                     <Clock className="h-3 w-3 mr-1" />
233 |                     {new Date(doc.created_at).toLocaleDateString()}
234 |                   </div>
235 |                   <div className="flex space-x-2">
236 |                     <Button 
237 |                       size="sm" 
238 |                       variant="outline" 
239 |                       onClick={() => setSelectedDocument(doc)}
240 |                       className="text-white border-gray-600 hover:bg-gray-700"
241 |                     >
242 |                       <Eye className="h-3 w-3 mr-1" />
243 |                       View
244 |                     </Button>
245 |                   </div>
246 |                 </div>
247 |               </CardContent>
248 |             </Card>
249 |           ))}
250 |         </div>
251 |       )}
252 |     </div>
253 |     )
254 |   }
255 | 
256 |   const renderSearch = () => (
257 |     <div className="space-y-6">
258 |       <h2 className="text-2xl font-bold text-white">Search</h2>
259 |       <p className="text-gray-400">Advanced search across all available documents</p>
260 |       {/* Advanced search interface */}
261 |     </div>
262 |   )
263 | 
264 |   const renderNotifications = () => (
265 |     <div className="space-y-6">
266 |       <h2 className="text-2xl font-bold text-white">Notifications</h2>
267 |       <Card className="bg-gray-800 border-gray-700">
268 |         <CardContent className="text-center py-12">
269 |           <Bell className="mx-auto h-16 w-16 text-gray-500 mb-4" />
270 |           <p className="text-gray-400">No new notifications</p>
271 |         </CardContent>
272 |       </Card>
273 |     </div>
274 |   )
275 | 
276 |   const renderProfile = () => (
277 |     <div className="space-y-6">
278 |       <h2 className="text-2xl font-bold text-white">My Profile</h2>
279 |       <Card className="bg-gray-800 border-gray-700">
280 |         <CardHeader>
281 |           <CardTitle className="text-white">Profile Information</CardTitle>
282 |         </CardHeader>
283 |         <CardContent className="space-y-4">
284 |           <div>
285 |             <label className="text-sm text-gray-400">Name</label>
286 |             <p className="text-white">{profile?.first_name} {profile?.last_name}</p>
287 |           </div>
288 |           <div>
289 |             <label className="text-sm text-gray-400">Email</label>
290 |             <p className="text-white">{profile?.email}</p>
291 |           </div>
292 |           <div>
293 |             <label className="text-sm text-gray-400">Department</label>
294 |             <p className="text-white">{departmentName || 'Loading...'}</p>
295 |           </div>
296 |           <div>
297 |             <label className="text-sm text-gray-400">Role</label>
298 |             <p className="text-white capitalize">{profile?.role}</p>
299 |           </div>
300 |         </CardContent>
301 |       </Card>
302 |     </div>
303 |   )
304 | 
305 |   const renderContent = () => {
306 |     switch (activeTab) {
307 |       case 'knowledge-base':
308 |         return renderKnowledgeBase()
309 |       case 'search':
310 |         return renderSearch()
311 |       case 'notifications':
312 |         return renderNotifications()
313 |       case 'profile':
314 |         return renderProfile()
315 |       default:
316 |         return renderKnowledgeBase()
317 |     }
318 |   }
319 | 
320 |   return (
321 |     <UserRoute>
322 |       <div className="flex h-screen bg-black">
323 |         <Sidebar 
324 |           activeTab={activeTab} 
325 |           onTabChange={setActiveTab}
326 |           userRole="user"
327 |         />
328 |         
329 |         {/* Main Content */}
330 |         <div className="flex-1 overflow-auto">
331 |           <div className="p-8">
332 |             {renderContent()}
333 |           </div>
334 |         </div>
335 |       </div>
336 |     </UserRoute>
337 |   )
338 | }
```

src/app/test-styles/page.tsx
```
1 | export default function TestStyles() {
2 |   return (
3 |     <div className="min-h-screen bg-slate-900 text-white p-8">
4 |       <h1 className="text-4xl font-bold mb-4 text-blue-400">Tailwind CSS Test</h1>
5 |       <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
6 |         <p className="text-slate-300 mb-4">
7 |           If you can see this styled properly, Tailwind CSS is working!
8 |         </p>
9 |         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
10 |           Test Button
11 |         </button>
12 |       </div>
13 |     </div>
14 |   )
15 | }
```

src/components/ui/button.tsx
```
1 | import * as React from "react"
2 | import { Slot } from "@radix-ui/react-slot"
3 | import { cva, type VariantProps } from "class-variance-authority"
4 | 
5 | import { cn } from "@/lib/utils"
6 | 
7 | const buttonVariants = cva(
8 |   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
9 |   {
10 |     variants: {
11 |       variant: {
12 |         default: "bg-primary text-primary-foreground hover:bg-primary/90",
13 |         destructive:
14 |           "bg-destructive text-destructive-foreground hover:bg-destructive/90",
15 |         outline:
16 |           "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
17 |         secondary:
18 |           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
19 |         ghost: "hover:bg-accent hover:text-accent-foreground",
20 |         link: "text-primary underline-offset-4 hover:underline",
21 |       },
22 |       size: {
23 |         default: "h-10 px-4 py-2",
24 |         sm: "h-9 rounded-md px-3",
25 |         lg: "h-11 rounded-md px-8",
26 |         icon: "h-10 w-10",
27 |       },
28 |     },
29 |     defaultVariants: {
30 |       variant: "default",
31 |       size: "default",
32 |     },
33 |   }
34 | )
35 | 
36 | export interface ButtonProps
37 |   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
38 |     VariantProps<typeof buttonVariants> {
39 |   asChild?: boolean
40 | }
41 | 
42 | const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
43 |   ({ className, variant, size, asChild = false, ...props }, ref) => {
44 |     const Comp = asChild ? Slot : "button"
45 |     return (
46 |       <Comp
47 |         className={cn(buttonVariants({ variant, size, className }))}
48 |         ref={ref}
49 |         {...props}
50 |       />
51 |     )
52 |   }
53 | )
54 | Button.displayName = "Button"
55 | 
56 | export { Button, buttonVariants }
```

src/components/ui/card.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | const Card = React.forwardRef<
6 |   HTMLDivElement,
7 |   React.HTMLAttributes<HTMLDivElement>
8 | >(({ className, ...props }, ref) => (
9 |   <div
10 |     ref={ref}
11 |     className={cn(
12 |       "rounded-lg border bg-card text-card-foreground shadow-sm",
13 |       className
14 |     )}
15 |     {...props}
16 |   />
17 | ))
18 | Card.displayName = "Card"
19 | 
20 | const CardHeader = React.forwardRef<
21 |   HTMLDivElement,
22 |   React.HTMLAttributes<HTMLDivElement>
23 | >(({ className, ...props }, ref) => (
24 |   <div
25 |     ref={ref}
26 |     className={cn("flex flex-col space-y-1.5 p-6", className)}
27 |     {...props}
28 |   />
29 | ))
30 | CardHeader.displayName = "CardHeader"
31 | 
32 | const CardTitle = React.forwardRef<
33 |   HTMLParagraphElement,
34 |   React.HTMLAttributes<HTMLHeadingElement>
35 | >(({ className, ...props }, ref) => (
36 |   <h3
37 |     ref={ref}
38 |     className={cn(
39 |       "text-2xl font-semibold leading-none tracking-tight",
40 |       className
41 |     )}
42 |     {...props}
43 |   />
44 | ))
45 | CardTitle.displayName = "CardTitle"
46 | 
47 | const CardDescription = React.forwardRef<
48 |   HTMLParagraphElement,
49 |   React.HTMLAttributes<HTMLParagraphElement>
50 | >(({ className, ...props }, ref) => (
51 |   <p
52 |     ref={ref}
53 |     className={cn("text-sm text-muted-foreground", className)}
54 |     {...props}
55 |   />
56 | ))
57 | CardDescription.displayName = "CardDescription"
58 | 
59 | const CardContent = React.forwardRef<
60 |   HTMLDivElement,
61 |   React.HTMLAttributes<HTMLDivElement>
62 | >(({ className, ...props }, ref) => (
63 |   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
64 | ))
65 | CardContent.displayName = "CardContent"
66 | 
67 | const CardFooter = React.forwardRef<
68 |   HTMLDivElement,
69 |   React.HTMLAttributes<HTMLDivElement>
70 | >(({ className, ...props }, ref) => (
71 |   <div
72 |     ref={ref}
73 |     className={cn("flex items-center p-6 pt-0", className)}
74 |     {...props}
75 |   />
76 | ))
77 | CardFooter.displayName = "CardFooter"
78 | 
79 | export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

src/components/ui/input.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | type InputProps = React.InputHTMLAttributes<HTMLInputElement>
6 | 
7 | const Input = React.forwardRef<HTMLInputElement, InputProps>(
8 |   ({ className, type, ...props }, ref) => {
9 |     return (
10 |       <input
11 |         type={type}
12 |         className={cn(
13 |           "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
14 |           className
15 |         )}
16 |         ref={ref}
17 |         {...props}
18 |       />
19 |     )
20 |   }
21 | )
22 | Input.displayName = "Input"
23 | 
24 | export { Input }
```

src/components/ui/label.tsx
```
1 | import * as React from "react"
2 | import * as LabelPrimitive from "@radix-ui/react-label"
3 | import { cva, type VariantProps } from "class-variance-authority"
4 | 
5 | import { cn } from "@/lib/utils"
6 | 
7 | const labelVariants = cva(
8 |   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
9 | )
10 | 
11 | const Label = React.forwardRef<
12 |   React.ElementRef<typeof LabelPrimitive.Root>,
13 |   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
14 |     VariantProps<typeof labelVariants>
15 | >(({ className, ...props }, ref) => (
16 |   <LabelPrimitive.Root
17 |     ref={ref}
18 |     className={cn(labelVariants(), className)}
19 |     {...props}
20 |   />
21 | ))
22 | Label.displayName = LabelPrimitive.Root.displayName
23 | 
24 | export { Label }
```

src/components/ui/loading.tsx
```
1 | import { Loader2 } from "lucide-react"
2 | import { cn } from "@/lib/utils"
3 | 
4 | interface LoadingProps {
5 |   size?: "sm" | "md" | "lg"
6 |   text?: string
7 |   className?: string
8 |   fullScreen?: boolean
9 | }
10 | 
11 | const sizeClasses = {
12 |   sm: "h-4 w-4",
13 |   md: "h-8 w-8", 
14 |   lg: "h-12 w-12"
15 | }
16 | 
17 | export function Loading({ 
18 |   size = "md", 
19 |   text, 
20 |   className,
21 |   fullScreen = false 
22 | }: LoadingProps) {
23 |   const content = (
24 |     <div className={cn(
25 |       "flex flex-col items-center justify-center",
26 |       fullScreen && "min-h-screen",
27 |       className
28 |     )}>
29 |       <Loader2 className={cn(
30 |         "animate-spin text-blue-400 mb-2",
31 |         sizeClasses[size]
32 |       )} />
33 |       {text && (
34 |         <p className={cn(
35 |           "text-gray-400",
36 |           size === "sm" && "text-sm",
37 |           size === "lg" && "text-lg"
38 |         )}>
39 |           {text}
40 |         </p>
41 |       )}
42 |     </div>
43 |   )
44 | 
45 |   if (fullScreen) {
46 |     return (
47 |       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
48 |         {content}
49 |       </div>
50 |     )
51 |   }
52 | 
53 |   return content
54 | }
55 | 
56 | // Skeleton loading components
57 | export function SkeletonCard() {
58 |   return (
59 |     <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 animate-pulse">
60 |       <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
61 |       <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
62 |       <div className="h-3 bg-gray-700 rounded w-2/3"></div>
63 |     </div>
64 |   )
65 | }
66 | 
67 | export function SkeletonTable() {
68 |   return (
69 |     <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 animate-pulse">
70 |       <div className="space-y-3">
71 |         {[...Array(5)].map((_, i) => (
72 |           <div key={i} className="flex space-x-4">
73 |             <div className="h-4 bg-gray-700 rounded w-1/4"></div>
74 |             <div className="h-4 bg-gray-700 rounded w-1/3"></div>
75 |             <div className="h-4 bg-gray-700 rounded w-1/4"></div>
76 |             <div className="h-4 bg-gray-700 rounded w-1/6"></div>
77 |           </div>
78 |         ))}
79 |       </div>
80 |     </div>
81 |   )
82 | }
83 | 
84 | export function SkeletonForm() {
85 |   return (
86 |     <div className="space-y-4 animate-pulse">
87 |       {[...Array(4)].map((_, i) => (
88 |         <div key={i} className="space-y-2">
89 |           <div className="h-4 bg-gray-700 rounded w-1/4"></div>
90 |           <div className="h-10 bg-gray-700 rounded w-full"></div>
91 |         </div>
92 |       ))}
93 |     </div>
94 |   )
95 | }
```

src/components/ui/select.tsx
```
1 | import * as React from "react"
2 | import * as SelectPrimitive from "@radix-ui/react-select"
3 | import { Check, ChevronDown, ChevronUp } from "lucide-react"
4 | 
5 | import { cn } from "@/lib/utils"
6 | 
7 | const Select = SelectPrimitive.Root
8 | 
9 | const SelectGroup = SelectPrimitive.Group
10 | 
11 | const SelectValue = SelectPrimitive.Value
12 | 
13 | const SelectTrigger = React.forwardRef<
14 |   React.ElementRef<typeof SelectPrimitive.Trigger>,
15 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
16 | >(({ className, children, ...props }, ref) => (
17 |   <SelectPrimitive.Trigger
18 |     ref={ref}
19 |     className={cn(
20 |       "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
21 |       className
22 |     )}
23 |     {...props}
24 |   >
25 |     {children}
26 |     <SelectPrimitive.Icon asChild>
27 |       <ChevronDown className="h-4 w-4 opacity-50" />
28 |     </SelectPrimitive.Icon>
29 |   </SelectPrimitive.Trigger>
30 | ))
31 | SelectTrigger.displayName = SelectPrimitive.Trigger.displayName
32 | 
33 | const SelectScrollUpButton = React.forwardRef<
34 |   React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
35 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
36 | >(({ className, ...props }, ref) => (
37 |   <SelectPrimitive.ScrollUpButton
38 |     ref={ref}
39 |     className={cn(
40 |       "flex cursor-default items-center justify-center py-1",
41 |       className
42 |     )}
43 |     {...props}
44 |   >
45 |     <ChevronUp className="h-4 w-4" />
46 |   </SelectPrimitive.ScrollUpButton>
47 | ))
48 | SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName
49 | 
50 | const SelectScrollDownButton = React.forwardRef<
51 |   React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
52 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
53 | >(({ className, ...props }, ref) => (
54 |   <SelectPrimitive.ScrollDownButton
55 |     ref={ref}
56 |     className={cn(
57 |       "flex cursor-default items-center justify-center py-1",
58 |       className
59 |     )}
60 |     {...props}
61 |   >
62 |     <ChevronDown className="h-4 w-4" />
63 |   </SelectPrimitive.ScrollDownButton>
64 | ))
65 | SelectScrollDownButton.displayName =
66 |   SelectPrimitive.ScrollDownButton.displayName
67 | 
68 | const SelectContent = React.forwardRef<
69 |   React.ElementRef<typeof SelectPrimitive.Content>,
70 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
71 | >(({ className, children, position = "popper", ...props }, ref) => (
72 |   <SelectPrimitive.Portal>
73 |     <SelectPrimitive.Content
74 |       ref={ref}
75 |       className={cn(
76 |         "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
77 |         position === "popper" &&
78 |           "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
79 |         className
80 |       )}
81 |       position={position}
82 |       {...props}
83 |     >
84 |       <SelectScrollUpButton />
85 |       <SelectPrimitive.Viewport
86 |         className={cn(
87 |           "p-1",
88 |           position === "popper" &&
89 |             "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
90 |         )}
91 |       >
92 |         {children}
93 |       </SelectPrimitive.Viewport>
94 |       <SelectScrollDownButton />
95 |     </SelectPrimitive.Content>
96 |   </SelectPrimitive.Portal>
97 | ))
98 | SelectContent.displayName = SelectPrimitive.Content.displayName
99 | 
100 | const SelectLabel = React.forwardRef<
101 |   React.ElementRef<typeof SelectPrimitive.Label>,
102 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
103 | >(({ className, ...props }, ref) => (
104 |   <SelectPrimitive.Label
105 |     ref={ref}
106 |     className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
107 |     {...props}
108 |   />
109 | ))
110 | SelectLabel.displayName = SelectPrimitive.Label.displayName
111 | 
112 | const SelectItem = React.forwardRef<
113 |   React.ElementRef<typeof SelectPrimitive.Item>,
114 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
115 | >(({ className, children, ...props }, ref) => (
116 |   <SelectPrimitive.Item
117 |     ref={ref}
118 |     className={cn(
119 |       "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
120 |       className
121 |     )}
122 |     {...props}
123 |   >
124 |     <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
125 |       <SelectPrimitive.ItemIndicator>
126 |         <Check className="h-4 w-4" />
127 |       </SelectPrimitive.ItemIndicator>
128 |     </span>
129 | 
130 |     <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
131 |   </SelectPrimitive.Item>
132 | ))
133 | SelectItem.displayName = SelectPrimitive.Item.displayName
134 | 
135 | const SelectSeparator = React.forwardRef<
136 |   React.ElementRef<typeof SelectPrimitive.Separator>,
137 |   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
138 | >(({ className, ...props }, ref) => (
139 |   <SelectPrimitive.Separator
140 |     ref={ref}
141 |     className={cn("-mx-1 my-1 h-px bg-muted", className)}
142 |     {...props}
143 |   />
144 | ))
145 | SelectSeparator.displayName = SelectPrimitive.Separator.displayName
146 | 
147 | export {
148 |   Select,
149 |   SelectGroup,
150 |   SelectValue,
151 |   SelectTrigger,
152 |   SelectContent,
153 |   SelectLabel,
154 |   SelectItem,
155 |   SelectSeparator,
156 |   SelectScrollUpButton,
157 |   SelectScrollDownButton,
158 | }
```

src/components/ui/tabs.tsx
```
1 | import * as React from "react"
2 | import * as TabsPrimitive from "@radix-ui/react-tabs"
3 | 
4 | import { cn } from "@/lib/utils"
5 | 
6 | const Tabs = TabsPrimitive.Root
7 | 
8 | const TabsList = React.forwardRef<
9 |   React.ElementRef<typeof TabsPrimitive.List>,
10 |   React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
11 | >(({ className, ...props }, ref) => (
12 |   <TabsPrimitive.List
13 |     ref={ref}
14 |     className={cn(
15 |       "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
16 |       className
17 |     )}
18 |     {...props}
19 |   />
20 | ))
21 | TabsList.displayName = TabsPrimitive.List.displayName
22 | 
23 | const TabsTrigger = React.forwardRef<
24 |   React.ElementRef<typeof TabsPrimitive.Trigger>,
25 |   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
26 | >(({ className, ...props }, ref) => (
27 |   <TabsPrimitive.Trigger
28 |     ref={ref}
29 |     className={cn(
30 |       "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
31 |       className
32 |     )}
33 |     {...props}
34 |   />
35 | ))
36 | TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
37 | 
38 | const TabsContent = React.forwardRef<
39 |   React.ElementRef<typeof TabsPrimitive.Content>,
40 |   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
41 | >(({ className, ...props }, ref) => (
42 |   <TabsPrimitive.Content
43 |     ref={ref}
44 |     className={cn(
45 |       "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
46 |       className
47 |     )}
48 |     {...props}
49 |   />
50 | ))
51 | TabsContent.displayName = TabsPrimitive.Content.displayName
52 | 
53 | export { Tabs, TabsList, TabsTrigger, TabsContent }
```

src/components/ui/textarea.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>
6 | 
7 | const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
8 |   ({ className, ...props }, ref) => {
9 |     return (
10 |       <textarea
11 |         className={cn(
12 |           "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
13 |           className
14 |         )}
15 |         ref={ref}
16 |         {...props}
17 |       />
18 |     )
19 |   }
20 | )
21 | Textarea.displayName = "Textarea"
22 | 
23 | export { Textarea }
```

src/hooks/admin/useDepartments.ts
```
1 | 'use client'
2 | 
3 | import { useState, useEffect, useCallback } from 'react'
4 | import { supabase } from '@/lib/supabase'
5 | 
6 | interface Department {
7 |   id: string
8 |   name: string
9 | }
10 | 
11 | export function useDepartments() {
12 |   const [departments, setDepartments] = useState<Department[]>([])
13 |   const [loading, setLoading] = useState(true)
14 | 
15 |   const fetchDepartments = useCallback(async () => {
16 |     try {
17 |       setLoading(true)
18 |       
19 |       const { data, error } = await supabase
20 |         .from('departments')
21 |         .select('id, name')
22 |         .order('name', { ascending: true })
23 | 
24 |       if (error) {
25 |         console.error('Error fetching departments:', error)
26 |         return
27 |       }
28 | 
29 |       setDepartments(data || [])
30 |     } catch (error) {
31 |       console.error('Error in fetchDepartments:', error)
32 |     } finally {
33 |       setLoading(false)
34 |     }
35 |   }, [])
36 | 
37 |   useEffect(() => {
38 |     fetchDepartments()
39 |   }, [fetchDepartments])
40 | 
41 |   return {
42 |     departments,
43 |     loading,
44 |     refetch: fetchDepartments
45 |   }
46 | }
```

src/hooks/admin/useDocuments.ts
```
1 | 'use client'
2 | 
3 | import { useState, useEffect, useCallback } from 'react'
4 | import { supabase } from '@/lib/supabase'
5 | 
6 | interface Document {
7 |   id: string
8 |   title: string
9 |   content: string
10 |   department_id: string
11 |   document_type: string
12 |   tags: string[]
13 |   is_published: boolean
14 |   created_at: string
15 |   department_name?: string
16 | }
17 | 
18 | interface CreateDocumentData {
19 |   title: string
20 |   content: string
21 |   department_id: string
22 |   document_type: string
23 |   tags: string[]
24 |   is_published: boolean
25 |   created_by: string
26 | }
27 | 
28 | interface UpdateDocumentData {
29 |   title: string
30 |   content: string
31 |   department_id: string
32 |   document_type: string
33 |   tags: string[]
34 |   is_published: boolean
35 | }
36 | 
37 | export function useDocuments() {
38 |   const [documents, setDocuments] = useState<Document[]>([])
39 |   const [loading, setLoading] = useState(true)
40 | 
41 |   const fetchDocuments = useCallback(async () => {
42 |     try {
43 |       setLoading(true)
44 |       
45 |       // Fetch documents
46 |       const { data: documentsData, error: documentsError } = await supabase
47 |         .from('documents')
48 |         .select(`
49 |           id,
50 |           title,
51 |           content,
52 |           department_id,
53 |           document_type,
54 |           tags,
55 |           is_published,
56 |           created_at
57 |         `)
58 |         .order('created_at', { ascending: false })
59 | 
60 |       if (documentsError) {
61 |         console.error('Error fetching documents:', documentsError)
62 |         return
63 |       }
64 | 
65 |       // Fetch departments to add department names
66 |       const { data: departmentsData, error: departmentsError } = await supabase
67 |         .from('departments')
68 |         .select('id, name')
69 | 
70 |       if (departmentsError) {
71 |         console.error('Error fetching departments:', departmentsError)
72 |         setDocuments(documentsData || [])
73 |         return
74 |       }
75 | 
76 |       // Map department names to documents
77 |       const documentsWithDept = documentsData?.map(doc => ({
78 |         ...doc,
79 |         department_name: departmentsData?.find(dept => dept.id === doc.department_id)?.name || 'Unknown'
80 |       })) || []
81 | 
82 |       setDocuments(documentsWithDept)
83 |     } catch (error) {
84 |       console.error('Error in fetchDocuments:', error)
85 |     } finally {
86 |       setLoading(false)
87 |     }
88 |   }, [])
89 | 
90 |   const createDocument = async (docData: CreateDocumentData): Promise<Document | null> => {
91 |     try {
92 |       const { data, error } = await supabase
93 |         .from('documents')
94 |         .insert([docData])
95 |         .select()
96 | 
97 |       if (error) {
98 |         console.error('Error creating document:', error)
99 |         throw error
100 |       }
101 | 
102 |       if (data && data[0]) {
103 |         // Refresh documents list
104 |         await fetchDocuments()
105 |         return data[0]
106 |       }
107 | 
108 |       return null
109 |     } catch (error) {
110 |       console.error('Error in createDocument:', error)
111 |       throw error
112 |     }
113 |   }
114 | 
115 |   const updateDocument = async (id: string, updateData: UpdateDocumentData): Promise<boolean> => {
116 |     try {
117 |       const { error } = await supabase
118 |         .from('documents')
119 |         .update(updateData)
120 |         .eq('id', id)
121 | 
122 |       if (error) {
123 |         console.error('Error updating document:', error)
124 |         throw error
125 |       }
126 | 
127 |       // Refresh documents list
128 |       await fetchDocuments()
129 |       return true
130 |     } catch (error) {
131 |       console.error('Error in updateDocument:', error)
132 |       throw error
133 |     }
134 |   }
135 | 
136 |   const deleteDocument = async (id: string): Promise<boolean> => {
137 |     try {
138 |       const { error } = await supabase
139 |         .from('documents')
140 |         .delete()
141 |         .eq('id', id)
142 | 
143 |       if (error) {
144 |         console.error('Error deleting document:', error)
145 |         throw error
146 |       }
147 | 
148 |       // Refresh documents list
149 |       await fetchDocuments()
150 |       return true
151 |     } catch (error) {
152 |       console.error('Error in deleteDocument:', error)
153 |       throw error
154 |     }
155 |   }
156 | 
157 |   useEffect(() => {
158 |     fetchDocuments()
159 |   }, [fetchDocuments])
160 | 
161 |   return {
162 |     documents,
163 |     loading,
164 |     createDocument,
165 |     updateDocument,
166 |     deleteDocument,
167 |     refetch: fetchDocuments
168 |   }
169 | }
```

src/app/api/documents/route.ts
```
1 | import { createServerClient } from '@supabase/ssr'
2 | import { NextRequest, NextResponse } from 'next/server'
3 | import { cookies } from 'next/headers'
4 | 
5 | const createSupabaseServer = async () => {
6 |   const cookieStore = await cookies()
7 |   
8 |   return createServerClient(
9 |     process.env.NEXT_PUBLIC_SUPABASE_URL!,
10 |     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
11 |     {
12 |       cookies: {
13 |         get(name: string) {
14 |           return cookieStore.get(name)?.value
15 |         },
16 |       },
17 |     }
18 |   )
19 | }
20 | 
21 | // Input validation
22 | const validateDocumentInput = (data: { title?: string; content?: string; document_type?: string }) => {
23 |   const errors: string[] = []
24 |   
25 |   if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
26 |     errors.push('Title is required')
27 |   }
28 |   
29 |   if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
30 |     errors.push('Content is required')
31 |   }
32 |   
33 |   if (!data.document_type || typeof data.document_type !== 'string') {
34 |     errors.push('Document type is required')
35 |   }
36 |   
37 |   if (data.title && data.title.length > 200) {
38 |     errors.push('Title must be less than 200 characters')
39 |   }
40 |   
41 |   return errors
42 | }
43 | 
44 | export async function GET() {
45 |   try {
46 |     const supabase = await createSupabaseServer()
47 |     
48 |     // Get the session
49 |     const { data: { session }, error: sessionError } = await supabase.auth.getSession()
50 |     
51 |     if (sessionError || !session?.user) {
52 |       return NextResponse.json(
53 |         { error: 'Unauthorized' },
54 |         { status: 401 }
55 |       )
56 |     }
57 | 
58 |     // Get user profile to determine access level
59 |     const { data: profile } = await supabase
60 |       .from('profiles')
61 |       .select('role, department_id')
62 |       .eq('id', session.user.id)
63 |       .single()
64 | 
65 |     if (!profile) {
66 |       return NextResponse.json(
67 |         { error: 'Profile not found' },
68 |         { status: 404 }
69 |       )
70 |     }
71 | 
72 |     // Build query based on user role
73 |     let query = supabase
74 |       .from('documents')
75 |       .select('*')
76 |       .eq('is_published', true)
77 | 
78 |     // Non-admin users can only see documents from their department
79 |     if (profile.role !== 'admin' && profile.department_id) {
80 |       query = query.eq('department_id', profile.department_id)
81 |     }
82 | 
83 |     const { data: documents, error } = await query.order('created_at', { ascending: false })
84 | 
85 |     if (error) {
86 |       console.error('Database error:', error)
87 |       return NextResponse.json(
88 |         { error: 'Failed to fetch documents' },
89 |         { status: 500 }
90 |       )
91 |     }
92 | 
93 |     return NextResponse.json({ documents })
94 |   } catch (error) {
95 |     console.error('API error:', error)
96 |     return NextResponse.json(
97 |       { error: 'Internal server error' },
98 |       { status: 500 }
99 |     )
100 |   }
101 | }
102 | 
103 | export async function POST(request: NextRequest) {
104 |   try {
105 |     const supabase = await createSupabaseServer()
106 |     
107 |     // Get the session
108 |     const { data: { session }, error: sessionError } = await supabase.auth.getSession()
109 |     
110 |     if (sessionError || !session?.user) {
111 |       return NextResponse.json(
112 |         { error: 'Unauthorized' },
113 |         { status: 401 }
114 |       )
115 |     }
116 | 
117 |     // Get user profile to check permissions
118 |     const { data: profile } = await supabase
119 |       .from('profiles')
120 |       .select('role, department_id')
121 |       .eq('id', session.user.id)
122 |       .single()
123 | 
124 |     if (!profile) {
125 |       return NextResponse.json(
126 |         { error: 'Profile not found' },
127 |         { status: 404 }
128 |       )
129 |     }
130 | 
131 |     // Only admins can create documents for now
132 |     if (profile.role !== 'admin') {
133 |       return NextResponse.json(
134 |         { error: 'Insufficient permissions' },
135 |         { status: 403 }
136 |       )
137 |     }
138 | 
139 |     const body = await request.json()
140 |     
141 |     // Validate input
142 |     const validationErrors = validateDocumentInput(body)
143 |     if (validationErrors.length > 0) {
144 |       return NextResponse.json(
145 |         { error: 'Validation failed', details: validationErrors },
146 |         { status: 400 }
147 |       )
148 |     }
149 | 
150 |     // Sanitize and prepare data
151 |     const documentData = {
152 |       title: body.title.trim(),
153 |       content: body.content.trim(),
154 |       document_type: body.document_type,
155 |       department_id: body.department_id || null,
156 |       tags: Array.isArray(body.tags) ? body.tags.filter((tag: unknown) => typeof tag === 'string') : [],
157 |       is_published: Boolean(body.is_published),
158 |       created_by: session.user.id, // Server-controlled, not client input
159 |     }
160 | 
161 |     const { data: document, error } = await supabase
162 |       .from('documents')
163 |       .insert([documentData])
164 |       .select()
165 |       .single()
166 | 
167 |     if (error) {
168 |       console.error('Database error:', error)
169 |       return NextResponse.json(
170 |         { error: 'Failed to create document' },
171 |         { status: 500 }
172 |       )
173 |     }
174 | 
175 |     return NextResponse.json({ document }, { status: 201 })
176 |   } catch (error) {
177 |     console.error('API error:', error)
178 |     return NextResponse.json(
179 |       { error: 'Internal server error' },
180 |       { status: 500 }
181 |     )
182 |   }
183 | }
```

src/app/auth/confirm-email/page.tsx
```
1 | 'use client'
2 | 
3 | import { useState, useEffect, Suspense } from "react"
4 | import { useRouter, useSearchParams } from "next/navigation"
5 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
6 | import { Button } from "@/components/ui/button"
7 | import { Mail, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react"
8 | import Link from "next/link"
9 | import Logo from "@/components/Logo"
10 | import { supabase } from "@/lib/supabase"
11 | import { mapErrorToUserMessage } from "@/lib/errors"
12 | 
13 | function ConfirmEmailContent() {
14 |   const [verificationStatus, setVerificationStatus] = useState<'pending' | 'loading' | 'success' | 'error'>('pending')
15 |   const [error, setError] = useState("")
16 |   const [resendLoading, setResendLoading] = useState(false)
17 |   const [resendMessage, setResendMessage] = useState("")
18 |   
19 |   const router = useRouter()
20 |   const searchParams = useSearchParams()
21 |   
22 |   // Check for verification tokens/codes in URL
23 |   useEffect(() => {
24 |     const checkVerification = async () => {
25 |       // Check if we have verification parameters
26 |       const accessToken = searchParams.get('access_token')
27 |       const refreshToken = searchParams.get('refresh_token')
28 |       const type = searchParams.get('type')
29 |       
30 |       if (accessToken && refreshToken && type === 'signup') {
31 |         setVerificationStatus('loading')
32 |         
33 |         try {
34 |           // Set the session with the tokens
35 |           const { data: { session }, error } = await supabase.auth.setSession({
36 |             access_token: accessToken,
37 |             refresh_token: refreshToken
38 |           })
39 |           
40 |           if (error) {
41 |             console.error('Verification error:', error)
42 |             const userError = mapErrorToUserMessage(error)
43 |             setError(userError.message)
44 |             setVerificationStatus('error')
45 |           } else if (session) {
46 |             setVerificationStatus('success')
47 |             // Redirect to dashboard after successful verification
48 |             setTimeout(() => {
49 |               router.push('/dashboard')
50 |             }, 3000)
51 |           } else {
52 |             setError('Verification failed. Please try again.')
53 |             setVerificationStatus('error')
54 |           }
55 |         } catch (err) {
56 |           console.error('Verification error:', err)
57 |           const userError = mapErrorToUserMessage(err)
58 |           setError(userError.message)
59 |           setVerificationStatus('error')
60 |         }
61 |       }
62 |       // If no verification params, stay in pending state (user just signed up)
63 |     }
64 |     
65 |     checkVerification()
66 |   }, [searchParams, router])
67 | 
68 |   const handleResendVerification = async () => {
69 |     setResendLoading(true)
70 |     setResendMessage("")
71 |     setError("")
72 |     
73 |     try {
74 |       // We can't resend without email, so guide user to sign up again
75 |       setResendMessage("Please try signing up again to receive a new verification email.")
76 |     } catch (err) {
77 |       const userError = mapErrorToUserMessage(err)
78 |       setError(userError.message)
79 |     } finally {
80 |       setResendLoading(false)
81 |     }
82 |   }
83 | 
84 |   // Show verification in progress
85 |   if (verificationStatus === 'loading') {
86 |     return (
87 |       <div className="min-h-screen bg-black flex items-center justify-center p-4">
88 |         <div className="w-full max-w-md">
89 |           <div className="text-center mb-8">
90 |             <div className="flex justify-center mb-4">
91 |               <Logo size="lg" />
92 |             </div>
93 |           </div>
94 | 
95 |           <Card className="bg-gray-900 border-gray-800">
96 |             <CardHeader className="text-center">
97 |               <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
98 |                 <Loader2 className="h-8 w-8 text-white animate-spin" />
99 |               </div>
100 |               <CardTitle className="text-white">Verifying Your Email</CardTitle>
101 |               <CardDescription className="text-gray-400">
102 |                 Please wait while we verify your email address...
103 |               </CardDescription>
104 |             </CardHeader>
105 |           </Card>
106 |         </div>
107 |       </div>
108 |     )
109 |   }
110 | 
111 |   // Show verification success
112 |   if (verificationStatus === 'success') {
113 |     return (
114 |       <div className="min-h-screen bg-black flex items-center justify-center p-4">
115 |         <div className="w-full max-w-md">
116 |           <div className="text-center mb-8">
117 |             <div className="flex justify-center mb-4">
118 |               <Logo size="lg" />
119 |             </div>
120 |           </div>
121 | 
122 |           <Card className="bg-gray-900 border-gray-800">
123 |             <CardHeader className="text-center">
124 |               <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
125 |                 <CheckCircle className="h-8 w-8 text-white" />
126 |               </div>
127 |               <CardTitle className="text-white">Email Verified!</CardTitle>
128 |               <CardDescription className="text-gray-400">
129 |                 Your email has been successfully verified
130 |               </CardDescription>
131 |             </CardHeader>
132 |             <CardContent className="text-center space-y-4">
133 |               <p className="text-gray-300">
134 |                 Welcome to ANYA SEGEN! Your account is now active and you can start using the platform.
135 |               </p>
136 |               
137 |               <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
138 |                 <p className="text-green-300 text-sm">
139 |                   You will be redirected to your dashboard in a few seconds...
140 |                 </p>
141 |               </div>
142 | 
143 |               <div className="pt-4">
144 |                 <Button 
145 |                   onClick={() => router.push('/dashboard')}
146 |                   className="bg-blue-600 hover:bg-blue-700"
147 |                 >
148 |                   Go to Dashboard
149 |                 </Button>
150 |               </div>
151 |             </CardContent>
152 |           </Card>
153 |         </div>
154 |       </div>
155 |     )
156 |   }
157 | 
158 |   // Show verification error
159 |   if (verificationStatus === 'error') {
160 |     return (
161 |       <div className="min-h-screen bg-black flex items-center justify-center p-4">
162 |         <div className="w-full max-w-md">
163 |           <div className="text-center mb-8">
164 |             <div className="flex justify-center mb-4">
165 |               <Logo size="lg" />
166 |             </div>
167 |           </div>
168 | 
169 |           <Card className="bg-gray-900 border-gray-800">
170 |             <CardHeader className="text-center">
171 |               <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
172 |                 <XCircle className="h-8 w-8 text-white" />
173 |               </div>
174 |               <CardTitle className="text-white">Verification Failed</CardTitle>
175 |               <CardDescription className="text-gray-400">
176 |                 We couldn&apos;t verify your email address
177 |               </CardDescription>
178 |             </CardHeader>
179 |             <CardContent className="text-center space-y-4">
180 |               {error && (
181 |                 <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md">
182 |                   {error}
183 |                 </div>
184 |               )}
185 |               
186 |               <p className="text-gray-300">
187 |                 This verification link may have expired or is invalid. Please try signing up again.
188 |               </p>
189 | 
190 |               <div className="space-y-2">
191 |                 <Button 
192 |                   onClick={handleResendVerification}
193 |                   disabled={resendLoading}
194 |                   variant="outline"
195 |                   className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
196 |                 >
197 |                   {resendLoading ? (
198 |                     <>
199 |                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
200 |                       Processing...
201 |                     </>
202 |                   ) : (
203 |                     <>
204 |                       <RefreshCw className="mr-2 h-4 w-4" />
205 |                       Get Help
206 |                     </>
207 |                   )}
208 |                 </Button>
209 |                 
210 |                 {resendMessage && (
211 |                   <p className="text-blue-400 text-sm">{resendMessage}</p>
212 |                 )}
213 |               </div>
214 | 
215 |               <div className="pt-4">
216 |                 <Link 
217 |                   href="/auth/signup" 
218 |                   className="text-blue-400 hover:text-blue-300 text-sm"
219 |                 >
220 |                   Try signing up again
221 |                 </Link>
222 |               </div>
223 |             </CardContent>
224 |           </Card>
225 |         </div>
226 |       </div>
227 |     )
228 |   }
229 | 
230 |   // Default pending state (user just signed up)
231 |   return (
232 |     <div className="min-h-screen bg-black flex items-center justify-center p-4">
233 |       <div className="w-full max-w-md">
234 |         <div className="text-center mb-8">
235 |           <div className="flex justify-center mb-4">
236 |             <Logo size="lg" />
237 |           </div>
238 |         </div>
239 | 
240 |         <Card className="bg-gray-900 border-gray-800">
241 |           <CardHeader className="text-center">
242 |             <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
243 |               <Mail className="h-8 w-8 text-white" />
244 |             </div>
245 |             <CardTitle className="text-white">Check Your Email</CardTitle>
246 |             <CardDescription className="text-gray-400">
247 |               We&apos;ve sent you a verification link
248 |             </CardDescription>
249 |           </CardHeader>
250 |           <CardContent className="text-center space-y-4">
251 |             <p className="text-gray-300">
252 |               We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to complete your registration.
253 |             </p>
254 |             
255 |             <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
256 |               <p className="text-blue-300 text-sm">
257 |                 <strong>Didn&apos;t receive the email?</strong><br />
258 |                 Check your spam folder or try signing up again.
259 |               </p>
260 |             </div>
261 | 
262 |             <div className="space-y-2">
263 |               <Button 
264 |                 onClick={handleResendVerification}
265 |                 disabled={resendLoading}
266 |                 variant="outline"
267 |                 className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
268 |               >
269 |                 {resendLoading ? (
270 |                   <>
271 |                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
272 |                     Processing...
273 |                   </>
274 |                 ) : (
275 |                   <>
276 |                     <RefreshCw className="mr-2 h-4 w-4" />
277 |                     Need Help?
278 |                   </>
279 |                 )}
280 |               </Button>
281 |               
282 |               {resendMessage && (
283 |                 <p className="text-blue-400 text-sm">{resendMessage}</p>
284 |               )}
285 |             </div>
286 | 
287 |             <div className="pt-4">
288 |               <Link 
289 |                 href="/auth/login" 
290 |                 className="text-blue-400 hover:text-blue-300 text-sm"
291 |               >
292 |                 Back to Sign In
293 |               </Link>
294 |             </div>
295 |           </CardContent>
296 |         </Card>
297 | 
298 |         <div className="text-center mt-8">
299 |           <Link href="/" className="text-gray-400 hover:text-white text-sm">
300 |             ← Back to home
301 |           </Link>
302 |         </div>
303 |       </div>
304 |     </div>
305 |   )
306 | }
307 | 
308 | export default function ConfirmEmailPage() {
309 |   return (
310 |     <Suspense fallback={
311 |       <div className="min-h-screen bg-black flex items-center justify-center">
312 |         <div className="text-center">
313 |           <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
314 |           <p className="text-gray-400">Loading...</p>
315 |         </div>
316 |       </div>
317 |     }>
318 |       <ConfirmEmailContent />
319 |     </Suspense>
320 |   )
321 | }
```

src/app/auth/login/page.tsx
```
1 | 'use client'
2 | 
3 | import { useState, useEffect } from "react"
4 | import { useRouter } from "next/navigation"
5 | import { Button } from "@/components/ui/button"
6 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
7 | import { Input } from "@/components/ui/input"
8 | import { Label } from "@/components/ui/label"
9 | import { Eye, EyeOff, Loader2 } from "lucide-react"
10 | import Link from "next/link"
11 | import { useAuth } from "@/lib/auth"
12 | import Logo from "@/components/Logo"
13 | import { mapErrorToUserMessage, validateEmail, validateRequired } from "@/lib/errors"
14 | 
15 | export default function LoginPage() {
16 |   const [email, setEmail] = useState("")
17 |   const [password, setPassword] = useState("")
18 |   const [showPassword, setShowPassword] = useState(false)
19 |   const [loading, setLoading] = useState(false)
20 |   const [error, setError] = useState("")
21 |   
22 |   const { signIn, user } = useAuth()
23 |   const router = useRouter()
24 | 
25 |   // Handle redirect when user is authenticated
26 |   useEffect(() => {
27 |     console.log('useEffect triggered - user:', !!user, 'loading:', loading)
28 |     if (user && !loading) {
29 |       console.log('User authenticated, redirecting to dashboard...')
30 |       // Re-enable redirect now that we've broken the middleware loop
31 |       window.location.href = '/dashboard'
32 |     }
33 |   }, [user, loading, router])
34 | 
35 |   const handleSubmit = async (e: React.FormEvent) => {
36 |     e.preventDefault()
37 |     setLoading(true)
38 |     setError("")
39 | 
40 |     // Client-side validation
41 |     const emailError = validateEmail(email)
42 |     const passwordError = validateRequired(password, "Password")
43 | 
44 |     if (emailError) {
45 |       setError(emailError)
46 |       setLoading(false)
47 |       return
48 |     }
49 | 
50 |     if (passwordError) {
51 |       setError(passwordError)
52 |       setLoading(false)
53 |       return
54 |     }
55 | 
56 |     try {
57 |       console.log('Starting sign in...')
58 |       
59 |       // Use the signIn method from AuthProvider for better state management
60 |       const { error: authError } = await signIn(email, password)
61 |       
62 |       if (authError) {
63 |         console.error('Sign in error:', authError)
64 |         const userError = mapErrorToUserMessage(authError)
65 |         setError(userError.message)
66 |         setLoading(false)
67 |       } else {
68 |         console.log('Sign in successful, waiting for auth state...')
69 |         // Reset loading state so useEffect can trigger redirect
70 |         setLoading(false)
71 |       }
72 |     } catch (error) {
73 |       console.error('Sign in catch error:', error)
74 |       const userError = mapErrorToUserMessage(error)
75 |       setError(userError.message)
76 |       setLoading(false)
77 |     }
78 |   }
79 | 
80 |   return (
81 |     <div className="min-h-screen bg-black flex items-center justify-center p-4">
82 |       <div className="w-full max-w-md">
83 |         <div className="text-center mb-8">
84 |           <div className="flex justify-center mb-4">
85 |             <Logo size="lg" />
86 |           </div>
87 |           <p className="text-gray-400">Welcome back to your knowledge hub</p>
88 |         </div>
89 | 
90 |         <Card className="bg-gray-900 border-gray-800">
91 |           <CardHeader>
92 |             <CardTitle className="text-white">Sign In</CardTitle>
93 |             <CardDescription className="text-gray-400">
94 |               Enter your credentials to access your account
95 |             </CardDescription>
96 |           </CardHeader>
97 |           <CardContent>
98 |             <form onSubmit={handleSubmit} className="space-y-4">
99 |               {error && (
100 |                 <div className="bg-red-900/50 border border-red-800 text-red-400 px-4 py-3 rounded-md text-sm">
101 |                   {error}
102 |                 </div>
103 |               )}
104 |               
105 |               <div className="space-y-2">
106 |                 <Label htmlFor="email" className="text-white">Email</Label>
107 |                 <Input
108 |                   id="email"
109 |                   type="email"
110 |                   placeholder="Enter your email"
111 |                   value={email}
112 |                   onChange={(e) => setEmail(e.target.value)}
113 |                   className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
114 |                   required
115 |                 />
116 |               </div>
117 |               
118 |               <div className="space-y-2">
119 |                 <Label htmlFor="password" className="text-white">Password</Label>
120 |                 <div className="relative">
121 |                   <Input
122 |                     id="password"
123 |                     type={showPassword ? "text" : "password"}
124 |                     placeholder="Enter your password"
125 |                     value={password}
126 |                     onChange={(e) => setPassword(e.target.value)}
127 |                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
128 |                     required
129 |                   />
130 |                   <button
131 |                     type="button"
132 |                     onClick={() => setShowPassword(!showPassword)}
133 |                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
134 |                   >
135 |                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
136 |                   </button>
137 |                 </div>
138 |               </div>
139 |               
140 |               <div className="flex items-center justify-between">
141 |                 <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
142 |                   Forgot password?
143 |                 </Link>
144 |               </div>
145 |               
146 |               <Button 
147 |                 type="submit" 
148 |                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50" 
149 |                 disabled={loading}
150 |               >
151 |                 {loading ? (
152 |                   <>
153 |                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
154 |                     Signing in...
155 |                   </>
156 |                 ) : (
157 |                   "Sign In"
158 |                 )}
159 |               </Button>
160 |               
161 |               <div className="text-center">
162 |                 <p className="text-sm text-gray-400">
163 |                   Don&apos;t have an account?{" "}
164 |                   <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300">
165 |                     Sign up
166 |                   </Link>
167 |                 </p>
168 |               </div>
169 |             </form>
170 |           </CardContent>
171 |         </Card>
172 | 
173 |         <div className="text-center mt-8">
174 |           <Link href="/" className="text-gray-400 hover:text-white text-sm">
175 |             ← Back to home
176 |           </Link>
177 |         </div>
178 |       </div>
179 |     </div>
180 |   )
181 | }
```

src/app/auth/signup/page.tsx
```
1 | 'use client'
2 | 
3 | import { useState, useEffect } from "react"
4 | import { useRouter } from "next/navigation"
5 | import { Button } from "@/components/ui/button"
6 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
7 | import { Input } from "@/components/ui/input"
8 | import { Label } from "@/components/ui/label"
9 | import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
10 | import { Eye, EyeOff, Loader2, RefreshCw, AlertCircle } from "lucide-react"
11 | import Link from "next/link"
12 | import { useAuth } from "@/lib/auth"
13 | import { supabase } from "@/lib/supabase"
14 | import Logo from "@/components/Logo"
15 | import { ERROR_MESSAGES } from "@/lib/errors"
16 | 
17 | interface Department {
18 |   id: string
19 |   name: string
20 | }
21 | 
22 | export default function SignupPage() {
23 |   const [firstName, setFirstName] = useState("")
24 |   const [lastName, setLastName] = useState("")
25 |   const [email, setEmail] = useState("")
26 |   const [departmentId, setDepartmentId] = useState("")
27 |   const [password, setPassword] = useState("")
28 |   const [confirmPassword, setConfirmPassword] = useState("")
29 |   const [showPassword, setShowPassword] = useState(false)
30 |   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
31 |   const [loading, setLoading] = useState(false)
32 |   const [error, setError] = useState("")
33 |   const [departments, setDepartments] = useState<Department[]>([])
34 |   const [departmentsLoading, setDepartmentsLoading] = useState(true)
35 |   const [departmentsError, setDepartmentsError] = useState("")
36 |   
37 |   const { signUp } = useAuth()
38 |   const router = useRouter()
39 | 
40 |   // Fetch departments function
41 |   const fetchDepartments = async () => {
42 |     setDepartmentsLoading(true)
43 |     setDepartmentsError("")
44 |     
45 |     try {
46 |       const { data, error } = await supabase
47 |         .from('departments')
48 |         .select('id, name')
49 |         .neq('name', 'Admin') // Exclude Admin department from signup
50 |         .order('name')
51 |       
52 |       if (error) {
53 |         console.error('Error fetching departments:', error)
54 |         setDepartmentsError(ERROR_MESSAGES.DEPARTMENT_LOAD_ERROR)
55 |       } else {
56 |         setDepartments(data || [])
57 |         if (data && data.length === 0) {
58 |           setDepartmentsError("No departments available. Please contact support.")
59 |         }
60 |       }
61 |     } catch (err) {
62 |       console.error('Error fetching departments:', err)
63 |       setDepartmentsError(ERROR_MESSAGES.DEPARTMENT_LOAD_ERROR)
64 |     } finally {
65 |       setDepartmentsLoading(false)
66 |     }
67 |   }
68 | 
69 |   // Fetch departments on component mount
70 |   useEffect(() => {
71 |     fetchDepartments()
72 |   }, [])
73 | 
74 |   const handleSubmit = async (e: React.FormEvent) => {
75 |     e.preventDefault()
76 |     setLoading(true)
77 |     setError("")
78 | 
79 |     // Validation
80 |     if (!firstName || !lastName || !email || !departmentId || !password || !confirmPassword) {
81 |       setError("Please fill in all fields")
82 |       setLoading(false)
83 |       return
84 |     }
85 | 
86 |     if (password !== confirmPassword) {
87 |       setError("Passwords do not match")
88 |       setLoading(false)
89 |       return
90 |     }
91 | 
92 |     if (password.length < 6) {
93 |       setError("Password must be at least 6 characters")
94 |       setLoading(false)
95 |       return
96 |     }
97 | 
98 |     const selectedDepartment = departments.find(d => d.id === departmentId)
99 |     
100 |     if (!selectedDepartment) {
101 |       setError("Please select a valid department")
102 |       setLoading(false)
103 |       return
104 |     }
105 | 
106 |     console.log('Selected department:', selectedDepartment)
107 |     
108 |     const { error: authError } = await signUp(
109 |       email, 
110 |       password, 
111 |       firstName, 
112 |       lastName, 
113 |       selectedDepartment.name
114 |     )
115 |     
116 |     if (authError) {
117 |       console.error('Auth error from signup:', authError)
118 |       setError(authError.message || "Database error saving new user")
119 |       setLoading(false)
120 |     } else {
121 |       console.log('Signup completed successfully')
122 |       // Show success message or redirect to confirmation page
123 |       router.push("/auth/confirm-email")
124 |     }
125 |   }
126 | 
127 |   return (
128 |     <div className="min-h-screen bg-black flex items-center justify-center p-4">
129 |       <div className="w-full max-w-md">
130 |         <div className="text-center mb-8">
131 |           <div className="flex justify-center mb-4">
132 |             <Logo size="lg" />
133 |           </div>
134 |           <p className="text-gray-400">Join your team&apos;s knowledge management system</p>
135 |         </div>
136 | 
137 |         <Card className="bg-gray-900 border-gray-800">
138 |           <CardHeader>
139 |             <CardTitle className="text-white">Create Account</CardTitle>
140 |             <CardDescription className="text-gray-400">
141 |               Sign up to start managing your team&apos;s knowledge
142 |             </CardDescription>
143 |           </CardHeader>
144 |           <CardContent>
145 |             <form onSubmit={handleSubmit} className="space-y-4">
146 |               {error && (
147 |                 <div className="bg-red-900/50 border border-red-800 text-red-400 px-4 py-3 rounded-md text-sm">
148 |                   {error}
149 |                 </div>
150 |               )}
151 |               
152 |               <div className="grid grid-cols-2 gap-4">
153 |                 <div className="space-y-2">
154 |                   <Label htmlFor="firstName" className="text-white">First Name</Label>
155 |                   <Input
156 |                     id="firstName"
157 |                     placeholder="John"
158 |                     value={firstName}
159 |                     onChange={(e) => setFirstName(e.target.value)}
160 |                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
161 |                     required
162 |                   />
163 |                 </div>
164 |                 <div className="space-y-2">
165 |                   <Label htmlFor="lastName" className="text-white">Last Name</Label>
166 |                   <Input
167 |                     id="lastName"
168 |                     placeholder="Doe"
169 |                     value={lastName}
170 |                     onChange={(e) => setLastName(e.target.value)}
171 |                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
172 |                     required
173 |                   />
174 |                 </div>
175 |               </div>
176 |               
177 |               <div className="space-y-2">
178 |                 <Label htmlFor="email" className="text-white">Email</Label>
179 |                 <Input
180 |                   id="email"
181 |                   type="email"
182 |                   placeholder="john@company.com"
183 |                   value={email}
184 |                   onChange={(e) => setEmail(e.target.value)}
185 |                   className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
186 |                   required
187 |                 />
188 |               </div>
189 |               
190 |               <div className="space-y-2">
191 |                 <Label htmlFor="department" className="text-white">Department</Label>
192 |                 
193 |                 {departmentsError && (
194 |                   <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md flex items-center justify-between">
195 |                     <div className="flex items-center">
196 |                       <AlertCircle className="w-4 h-4 mr-2" />
197 |                       {departmentsError}
198 |                     </div>
199 |                     <Button
200 |                       type="button"
201 |                       variant="outline"
202 |                       size="sm"
203 |                       onClick={fetchDepartments}
204 |                       disabled={departmentsLoading}
205 |                       className="ml-2 h-8 px-3 text-xs border-red-400 text-red-400 hover:bg-red-900/20"
206 |                     >
207 |                       {departmentsLoading ? (
208 |                         <Loader2 className="w-3 h-3 animate-spin" />
209 |                       ) : (
210 |                         <>
211 |                           <RefreshCw className="w-3 h-3 mr-1" />
212 |                           Retry
213 |                         </>
214 |                       )}
215 |                     </Button>
216 |                   </div>
217 |                 )}
218 |                 
219 |                 <Select 
220 |                   value={departmentId} 
221 |                   onValueChange={setDepartmentId} 
222 |                   disabled={departmentsLoading || departmentsError !== "" || departments.length === 0}
223 |                 >
224 |                   <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 data-[placeholder]:text-gray-500">
225 |                     <SelectValue placeholder={
226 |                       departmentsLoading 
227 |                         ? "Loading departments..." 
228 |                         : departmentsError 
229 |                         ? "Please retry loading departments"
230 |                         : departments.length === 0
231 |                         ? "No departments available"
232 |                         : "Select your department"
233 |                     } />
234 |                   </SelectTrigger>
235 |                   <SelectContent className="bg-gray-800 border-gray-700 text-white z-50">
236 |                     {departments.length > 0 ? (
237 |                       departments.map((dept) => (
238 |                         <SelectItem 
239 |                           key={dept.id} 
240 |                           value={dept.id}
241 |                           className="text-white focus:bg-gray-700 focus:text-white cursor-pointer"
242 |                         >
243 |                           {dept.name}
244 |                         </SelectItem>
245 |                       ))
246 |                     ) : departmentsLoading ? (
247 |                       <SelectItem value="loading" disabled className="text-gray-500">
248 |                         <div className="flex items-center">
249 |                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
250 |                           Loading departments...
251 |                         </div>
252 |                       </SelectItem>
253 |                     ) : (
254 |                       <SelectItem value="empty" disabled className="text-gray-500">
255 |                         No departments available
256 |                       </SelectItem>
257 |                     )}
258 |                   </SelectContent>
259 |                 </Select>
260 |                 
261 |                 {departmentsLoading && !departmentsError && (
262 |                   <p className="text-sm text-gray-500 flex items-center">
263 |                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
264 |                     Loading departments from database...
265 |                   </p>
266 |                 )}
267 |               </div>
268 |               
269 |               <div className="space-y-2">
270 |                 <Label htmlFor="password" className="text-white">Password</Label>
271 |                 <div className="relative">
272 |                   <Input
273 |                     id="password"
274 |                     type={showPassword ? "text" : "password"}
275 |                     placeholder="Create a secure password"
276 |                     value={password}
277 |                     onChange={(e) => setPassword(e.target.value)}
278 |                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
279 |                     required
280 |                     minLength={6}
281 |                   />
282 |                   <button
283 |                     type="button"
284 |                     onClick={() => setShowPassword(!showPassword)}
285 |                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
286 |                   >
287 |                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
288 |                   </button>
289 |                 </div>
290 |               </div>
291 |               
292 |               <div className="space-y-2">
293 |                 <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
294 |                 <div className="relative">
295 |                   <Input
296 |                     id="confirmPassword"
297 |                     type={showConfirmPassword ? "text" : "password"}
298 |                     placeholder="Confirm your password"
299 |                     value={confirmPassword}
300 |                     onChange={(e) => setConfirmPassword(e.target.value)}
301 |                     className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
302 |                     required
303 |                   />
304 |                   <button
305 |                     type="button"
306 |                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
307 |                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
308 |                   >
309 |                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
310 |                   </button>
311 |                 </div>
312 |               </div>
313 |               
314 |               <Button 
315 |                 type="submit" 
316 |                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50" 
317 |                 disabled={loading}
318 |               >
319 |                 {loading ? (
320 |                   <>
321 |                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
322 |                     Creating account...
323 |                   </>
324 |                 ) : (
325 |                   "Create Account"
326 |                 )}
327 |               </Button>
328 |               
329 |               <div className="text-center">
330 |                 <p className="text-sm text-gray-400">
331 |                   Already have an account?{" "}
332 |                   <Link href="/auth/login" className="text-blue-400 hover:text-blue-300">
333 |                     Sign in
334 |                   </Link>
335 |                 </p>
336 |               </div>
337 |             </form>
338 |           </CardContent>
339 |         </Card>
340 | 
341 |         <div className="text-center mt-8">
342 |           <Link href="/" className="text-gray-400 hover:text-white text-sm">
343 |             ← Back to home
344 |           </Link>
345 |         </div>
346 |       </div>
347 |     </div>
348 |   )
349 | }
```

src/components/admin/documents/AdminDocuments.tsx
```
1 | 'use client'
2 | 
3 | import { useState } from "react"
4 | import { Button } from "@/components/ui/button"
5 | import { Input } from "@/components/ui/input"
6 | import { Label } from "@/components/ui/label"
7 | import { Textarea } from "@/components/ui/textarea"
8 | import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
9 | import { 
10 |   FileText, 
11 |   Edit3, 
12 |   Save, 
13 |   X, 
14 |   Search, 
15 |   ChevronRight, 
16 |   Calendar, 
17 |   Tag, 
18 |   Type, 
19 |   Hash, 
20 |   Building2, 
21 |   CheckCircle2, 
22 |   AlertCircle, 
23 |   Filter, 
24 |   SortAsc, 
25 |   SortDesc, 
26 |   Plus, 
27 |   Trash2 
28 | } from "lucide-react"
29 | import { useDocuments } from "@/hooks/admin/useDocuments"
30 | import { useDepartments } from "@/hooks/admin/useDepartments"
31 | 
32 | interface AdminDocumentsProps {
33 |   user: any
34 | }
35 | 
36 | export default function AdminDocuments({ user }: AdminDocumentsProps) {
37 |   const { documents, loading, createDocument, updateDocument, deleteDocument } = useDocuments()
38 |   const { departments } = useDepartments()
39 |   
40 |   const [selectedDoc, setSelectedDoc] = useState<any>(null)
41 |   const [isEditMode, setIsEditMode] = useState(false)
42 |   const [isCreatingDoc, setIsCreatingDoc] = useState(false)
43 |   const [editingDoc, setEditingDoc] = useState<any>(null)
44 |   const [newDoc, setNewDoc] = useState({
45 |     title: '',
46 |     content: '',
47 |     department_id: '',
48 |     document_type: 'sop',
49 |     tags: '',
50 |     is_published: false
51 |   })
52 |   const [searchQuery, setSearchQuery] = useState('')
53 |   const [filters, setFilters] = useState({
54 |     department: 'all',
55 |     type: 'all',
56 |     status: 'all',
57 |     sortBy: 'created_at',
58 |     sortOrder: 'desc' as 'asc' | 'desc'
59 |   })
60 |   const [showFilters, setShowFilters] = useState(false)
61 | 
62 |   const handleCreateDocument = async () => {
63 |     if (!newDoc.title || !newDoc.content || !newDoc.department_id) return
64 | 
65 |     try {
66 |       const docData = {
67 |         title: newDoc.title,
68 |         content: newDoc.content,
69 |         department_id: newDoc.department_id,
70 |         document_type: newDoc.document_type,
71 |         tags: newDoc.tags ? newDoc.tags.split(',').map(tag => tag.trim()) : [],
72 |         is_published: newDoc.is_published,
73 |         created_by: user.id
74 |       }
75 | 
76 |       const createdDoc = await createDocument(docData)
77 |       
78 |       if (createdDoc) {
79 |         setIsCreatingDoc(false)
80 |         setNewDoc({
81 |           title: '',
82 |           content: '',
83 |           department_id: '',
84 |           document_type: 'sop',
85 |           tags: '',
86 |           is_published: false
87 |         })
88 |         setSelectedDoc(createdDoc)
89 |       }
90 |     } catch (error) {
91 |       console.error('Error creating document:', error)
92 |       alert('Error creating document')
93 |     }
94 |   }
95 | 
96 |   const handleUpdateDocument = async () => {
97 |     if (!selectedDoc || !editingDoc) return
98 | 
99 |     try {
100 |       const updatedDoc = { ...selectedDoc, ...editingDoc }
101 |       const success = await updateDocument(selectedDoc.id, {
102 |         title: updatedDoc.title,
103 |         content: updatedDoc.content,
104 |         department_id: updatedDoc.department_id,
105 |         document_type: updatedDoc.document_type,
106 |         tags: updatedDoc.tags,
107 |         is_published: updatedDoc.is_published
108 |       })
109 | 
110 |       if (success) {
111 |         setEditingDoc(null)
112 |         setIsEditMode(false)
113 |         setSelectedDoc(updatedDoc)
114 |       }
115 |     } catch (error) {
116 |       console.error('Error updating document:', error)
117 |       alert('Error updating document')
118 |     }
119 |   }
120 | 
121 |   const handleDeleteDocument = async (id: string) => {
122 |     if (!confirm('Are you sure you want to delete this document?')) return
123 | 
124 |     try {
125 |       const success = await deleteDocument(id)
126 |       if (success) {
127 |         setSelectedDoc(null)
128 |       }
129 |     } catch (error) {
130 |       console.error('Error deleting document:', error)
131 |       alert('Error deleting document')
132 |     }
133 |   }
134 | 
135 |   // Apply filters
136 |   const filteredDocuments = documents.filter(doc => {
137 |     const matchesSearch = searchQuery === '' || 
138 |       doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
139 |       doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
140 |       doc.department_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
141 |       (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
142 | 
143 |     const matchesDepartment = filters.department === 'all' || doc.department_id === filters.department
144 |     const matchesType = filters.type === 'all' || doc.document_type === filters.type
145 |     const matchesStatus = filters.status === 'all' || 
146 |       (filters.status === 'published' && doc.is_published) ||
147 |       (filters.status === 'draft' && !doc.is_published)
148 | 
149 |     return matchesSearch && matchesDepartment && matchesType && matchesStatus
150 |   })
151 | 
152 |   // Apply sorting
153 |   filteredDocuments.sort((a, b) => {
154 |     let aValue, bValue
155 | 
156 |     switch (filters.sortBy) {
157 |       case 'title':
158 |         aValue = a.title.toLowerCase()
159 |         bValue = b.title.toLowerCase()
160 |         break
161 |       case 'department':
162 |         aValue = a.department_name?.toLowerCase() || ''
163 |         bValue = b.department_name?.toLowerCase() || ''
164 |         break
165 |       case 'type':
166 |         aValue = a.document_type
167 |         bValue = b.document_type
168 |         break
169 |       case 'created_at':
170 |       default:
171 |         aValue = new Date(a.created_at).getTime()
172 |         bValue = new Date(b.created_at).getTime()
173 |         break
174 |     }
175 | 
176 |     if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
177 |     if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
178 |     return 0
179 |   })
180 | 
181 |   // Get active filter count for badge
182 |   const activeFilterCount = Object.entries(filters).filter(([key, value]) => 
183 |     key !== 'sortBy' && key !== 'sortOrder' && value !== 'all'
184 |   ).length
185 | 
186 |   return (
187 |     <div className="flex h-full">
188 |       {/* Center Panel - Documents List */}
189 |       <div className="flex-1 flex flex-col max-w-md border-r border-gray-700">
190 |         {/* Header */}
191 |         <div className="p-6 border-b border-gray-700">
192 |           <div className="flex items-center justify-between mb-4">
193 |             <div>
194 |               <h2 className="text-xl font-bold text-white">Knowledge Base</h2>
195 |               <p className="text-gray-400 text-sm">
196 |                 {filteredDocuments.length} of {documents.length} documents
197 |               </p>
198 |             </div>
199 |             <Button 
200 |               onClick={() => {
201 |                 setIsCreatingDoc(true)
202 |                 setSelectedDoc(null)
203 |                 setIsEditMode(false)
204 |               }}
205 |               size="sm"
206 |               className="bg-blue-600 hover:bg-blue-700"
207 |             >
208 |               <Plus className="h-4 w-4" />
209 |             </Button>
210 |           </div>
211 |           
212 |           {/* Search */}
213 |           <div className="relative mb-4">
214 |             <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
215 |             <Input
216 |               placeholder="Search documents, content, tags..."
217 |               value={searchQuery}
218 |               onChange={(e) => setSearchQuery(e.target.value)}
219 |               className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
220 |             />
221 |           </div>
222 | 
223 |           {/* Filter Controls */}
224 |           <div className="flex items-center justify-between">
225 |             <div className="flex items-center space-x-2">
226 |               <Button
227 |                 variant="outline"
228 |                 size="sm"
229 |                 onClick={() => setShowFilters(!showFilters)}
230 |                 className="text-white border-gray-600 hover:bg-gray-700"
231 |               >
232 |                 <Filter className="h-4 w-4 mr-2" />
233 |                 Filters
234 |                 {activeFilterCount > 0 && (
235 |                   <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded-full">
236 |                     {activeFilterCount}
237 |                   </span>
238 |                 )}
239 |               </Button>
240 |               
241 |               {/* Quick Sort */}
242 |               <div className="flex items-center space-x-1">
243 |                 <Select 
244 |                   value={filters.sortBy} 
245 |                   onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
246 |                 >
247 |                   <SelectTrigger className="w-auto h-8 bg-gray-800 border-gray-600 text-white text-xs">
248 |                     <SelectValue />
249 |                   </SelectTrigger>
250 |                   <SelectContent className="bg-gray-800 border-gray-600">
251 |                     <SelectItem value="created_at" className="text-white">Date</SelectItem>
252 |                     <SelectItem value="title" className="text-white">Title</SelectItem>
253 |                     <SelectItem value="department" className="text-white">Department</SelectItem>
254 |                     <SelectItem value="type" className="text-white">Type</SelectItem>
255 |                   </SelectContent>
256 |                 </Select>
257 |                 
258 |                 <Button
259 |                   variant="ghost"
260 |                   size="sm"
261 |                   onClick={() => setFilters(prev => ({ 
262 |                     ...prev, 
263 |                     sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
264 |                   }))}
265 |                   className="h-8 w-8 p-0 text-gray-400 hover:text-white"
266 |                 >
267 |                   {filters.sortOrder === 'asc' ? 
268 |                     <SortAsc className="h-4 w-4" /> : 
269 |                     <SortDesc className="h-4 w-4" />
270 |                   }
271 |                 </Button>
272 |               </div>
273 |             </div>
274 | 
275 |             {/* Clear Filters */}
276 |             {activeFilterCount > 0 && (
277 |               <Button
278 |                 variant="ghost"
279 |                 size="sm"
280 |                 onClick={() => setFilters(prev => ({
281 |                   ...prev,
282 |                   department: 'all',
283 |                   type: 'all',
284 |                   status: 'all'
285 |                 }))}
286 |                 className="text-gray-400 hover:text-white text-xs"
287 |               >
288 |                 Clear filters
289 |               </Button>
290 |             )}
291 |           </div>
292 | 
293 |           {/* Filter Panel */}
294 |           {showFilters && (
295 |             <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 space-y-4">
296 |               <div className="grid grid-cols-1 gap-4">
297 |                 {/* Department Filter */}
298 |                 <div className="space-y-2">
299 |                   <Label className="text-white text-sm font-medium">Department</Label>
300 |                   <Select 
301 |                     value={filters.department} 
302 |                     onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}
303 |                   >
304 |                     <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-sm">
305 |                       <SelectValue />
306 |                     </SelectTrigger>
307 |                     <SelectContent className="bg-gray-800 border-gray-600">
308 |                       <SelectItem value="all" className="text-white">All Departments</SelectItem>
309 |                       {departments.map((dept) => (
310 |                         <SelectItem key={dept.id} value={dept.id} className="text-white">
311 |                           {dept.name}
312 |                         </SelectItem>
313 |                       ))}
314 |                     </SelectContent>
315 |                   </Select>
316 |                 </div>
317 | 
318 |                 {/* Type and Status Filters */}
319 |                 <div className="grid grid-cols-2 gap-4">
320 |                   <div className="space-y-2">
321 |                     <Label className="text-white text-sm font-medium">Type</Label>
322 |                     <Select 
323 |                       value={filters.type} 
324 |                       onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
325 |                     >
326 |                       <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-sm">
327 |                         <SelectValue />
328 |                       </SelectTrigger>
329 |                       <SelectContent className="bg-gray-800 border-gray-600">
330 |                         <SelectItem value="all" className="text-white">All Types</SelectItem>
331 |                         <SelectItem value="sop" className="text-white">📋 SOP</SelectItem>
332 |                         <SelectItem value="guide" className="text-white">📖 Guide</SelectItem>
333 |                         <SelectItem value="policy" className="text-white">📜 Policy</SelectItem>
334 |                         <SelectItem value="procedure" className="text-white">⚙️ Procedure</SelectItem>
335 |                       </SelectContent>
336 |                     </Select>
337 |                   </div>
338 | 
339 |                   <div className="space-y-2">
340 |                     <Label className="text-white text-sm font-medium">Status</Label>
341 |                     <Select 
342 |                       value={filters.status} 
343 |                       onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
344 |                     >
345 |                       <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-sm">
346 |                         <SelectValue />
347 |                       </SelectTrigger>
348 |                       <SelectContent className="bg-gray-800 border-gray-600">
349 |                         <SelectItem value="all" className="text-white">All Status</SelectItem>
350 |                         <SelectItem value="published" className="text-white">🟢 Published</SelectItem>
351 |                         <SelectItem value="draft" className="text-white">🟡 Draft</SelectItem>
352 |                       </SelectContent>
353 |                     </Select>
354 |                   </div>
355 |                 </div>
356 |               </div>
357 |             </div>
358 |           )}
359 |         </div>
360 | 
361 |         {/* Quick Filter Chips */}
362 |         {(activeFilterCount > 0 || searchQuery) && (
363 |           <div className="px-6 py-3 border-b border-gray-700 bg-gray-800/30">
364 |             <div className="flex flex-wrap gap-2">
365 |               {searchQuery && (
366 |                 <div className="flex items-center space-x-1 px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs border border-blue-600/30">
367 |                   <Search className="h-3 w-3" />
368 |                   <span>&quot;{searchQuery}&quot;</span>
369 |                   <button
370 |                     onClick={() => setSearchQuery('')}
371 |                     className="hover:bg-blue-600/30 rounded-full p-0.5"
372 |                   >
373 |                     <X className="h-3 w-3" />
374 |                   </button>
375 |                 </div>
376 |               )}
377 |               
378 |               {filters.department !== 'all' && (
379 |                 <div className="flex items-center space-x-1 px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs border border-purple-600/30">
380 |                   <Building2 className="h-3 w-3" />
381 |                   <span>{departments.find(d => d.id === filters.department)?.name}</span>
382 |                   <button
383 |                     onClick={() => setFilters(prev => ({ ...prev, department: 'all' }))}
384 |                     className="hover:bg-purple-600/30 rounded-full p-0.5"
385 |                   >
386 |                     <X className="h-3 w-3" />
387 |                   </button>
388 |                 </div>
389 |               )}
390 |               
391 |               {filters.type !== 'all' && (
392 |                 <div className="flex items-center space-x-1 px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs border border-green-600/30">
393 |                   <Type className="h-3 w-3" />
394 |                   <span>{filters.type.toUpperCase()}</span>
395 |                   <button
396 |                     onClick={() => setFilters(prev => ({ ...prev, type: 'all' }))}
397 |                     className="hover:bg-green-600/30 rounded-full p-0.5"
398 |                   >
399 |                     <X className="h-3 w-3" />
400 |                   </button>
401 |                 </div>
402 |               )}
403 |               
404 |               {filters.status !== 'all' && (
405 |                 <div className="flex items-center space-x-1 px-2 py-1 bg-orange-600/20 text-orange-400 rounded-full text-xs border border-orange-600/30">
406 |                   <div className={`w-2 h-2 rounded-full ${filters.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
407 |                   <span>{filters.status === 'published' ? 'Published' : 'Draft'}</span>
408 |                   <button
409 |                     onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}
410 |                     className="hover:bg-orange-600/30 rounded-full p-0.5"
411 |                   >
412 |                     <X className="h-3 w-3" />
413 |                   </button>
414 |                 </div>
415 |               )}
416 |             </div>
417 |           </div>
418 |         )}
419 | 
420 |         {/* Documents List */}
421 |         <div className="flex-1 overflow-y-auto">
422 |           {loading ? (
423 |             <div className="p-6">
424 |               <p className="text-gray-400">Loading documents...</p>
425 |             </div>
426 |           ) : filteredDocuments.length === 0 ? (
427 |             <div className="p-6 text-center">
428 |               <FileText className="mx-auto h-12 w-12 text-gray-500 mb-3" />
429 |               <p className="text-gray-400 mb-1">
430 |                 {documents.length === 0 ? 'No documents yet' : 'No matches found'}
431 |               </p>
432 |               <p className="text-gray-500 text-sm mb-4">
433 |                 {documents.length === 0 
434 |                   ? 'Create your first document to get started' 
435 |                   : 'Try adjusting your search terms or filters'
436 |                 }
437 |               </p>
438 |               {documents.length > 0 && (activeFilterCount > 0 || searchQuery) && (
439 |                 <div className="flex flex-col space-y-2">
440 |                   {searchQuery && (
441 |                     <Button
442 |                       variant="outline"
443 |                       size="sm"
444 |                       onClick={() => setSearchQuery('')}
445 |                       className="text-white border-gray-600 hover:bg-gray-700"
446 |                     >
447 |                       Clear search
448 |                     </Button>
449 |                   )}
450 |                   {activeFilterCount > 0 && (
451 |                     <Button
452 |                       variant="outline"
453 |                       size="sm"
454 |                       onClick={() => setFilters(prev => ({
455 |                         ...prev,
456 |                         department: 'all',
457 |                         type: 'all',
458 |                         status: 'all'
459 |                       }))}
460 |                       className="text-white border-gray-600 hover:bg-gray-700"
461 |                     >
462 |                       Clear all filters
463 |                     </Button>
464 |                   )}
465 |                 </div>
466 |               )}
467 |             </div>
468 |           ) : (
469 |             <div className="divide-y divide-gray-700">
470 |               {filteredDocuments.map((doc) => (
471 |                 <div
472 |                   key={doc.id}
473 |                   onClick={() => {
474 |                     setSelectedDoc(doc)
475 |                     setIsCreatingDoc(false)
476 |                     setIsEditMode(false)
477 |                   }}
478 |                   className={`p-4 cursor-pointer hover:bg-gray-800 transition-colors ${
479 |                     selectedDoc?.id === doc.id ? 'bg-gray-800 border-r-2 border-blue-500' : ''
480 |                   }`}
481 |                 >
482 |                   <div className="flex items-start justify-between">
483 |                     <div className="flex-1 min-w-0">
484 |                       <div className="flex items-center space-x-2 mb-1">
485 |                         <h3 className="font-medium text-white truncate text-sm">
486 |                           {doc.title}
487 |                         </h3>
488 |                         <span className={`px-1.5 py-0.5 text-xs rounded ${
489 |                           doc.is_published 
490 |                             ? 'bg-green-600/20 text-green-400 border border-green-600/30' 
491 |                             : 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
492 |                         }`}>
493 |                           {doc.is_published ? 'Live' : 'Draft'}
494 |                         </span>
495 |                       </div>
496 |                       
497 |                       <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
498 |                         <span className="bg-gray-700 px-1.5 py-0.5 rounded">
499 |                           {doc.document_type}
500 |                         </span>
501 |                         <span>•</span>
502 |                         <span>{doc.department_name}</span>
503 |                       </div>
504 |                       
505 |                       <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">
506 |                         {doc.content.substring(0, 100)}...
507 |                       </p>
508 |                       
509 |                       <div className="flex items-center justify-between mt-2">
510 |                         <div className="flex items-center space-x-1 text-xs text-gray-500">
511 |                           <Calendar className="h-3 w-3" />
512 |                           <span>{new Date(doc.created_at).toLocaleDateString()}</span>
513 |                         </div>
514 |                         {doc.tags && doc.tags.length > 0 && (
515 |                           <div className="flex items-center space-x-1 text-xs text-gray-500">
516 |                             <Tag className="h-3 w-3" />
517 |                             <span>{doc.tags.length}</span>
518 |                           </div>
519 |                         )}
520 |                       </div>
521 |                     </div>
522 |                     <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0 ml-2" />
523 |                   </div>
524 |                 </div>
525 |               ))}
526 |             </div>
527 |           )}
528 |         </div>
529 |       </div>
530 | 
531 |       {/* Right Panel - Document Editor/Viewer (Artifact-style) */}
532 |       <div className="flex-1 flex flex-col bg-gray-900">
533 |         {selectedDoc || isCreatingDoc ? (
534 |           <>
535 |             {/* Editor Header */}
536 |             <div className="p-4 border-b border-gray-700 bg-gray-800">
537 |               <div className="flex items-center justify-between">
538 |                 <div className="flex items-center space-x-3">
539 |                   <div className={`w-2 h-2 rounded-full ${
540 |                     isEditMode || isCreatingDoc ? 'bg-orange-500 animate-pulse' : 'bg-blue-500'
541 |                   }`}></div>
542 |                   <span className="text-white font-medium">
543 |                     {isCreatingDoc ? 'New Document' : selectedDoc?.title}
544 |                   </span>
545 |                   {(isEditMode || isCreatingDoc) && (
546 |                     <span className="px-2 py-1 text-xs rounded bg-orange-600/20 text-orange-400 border border-orange-600/30">
547 |                       {editingDoc ? 'Unsaved Changes' : 'Editing'}
548 |                     </span>
549 |                   )}
550 |                   {selectedDoc && !isEditMode && !isCreatingDoc && (
551 |                     <span className={`px-2 py-1 text-xs rounded ${
552 |                       selectedDoc.is_published 
553 |                         ? 'bg-green-600/20 text-green-400' 
554 |                         : 'bg-yellow-600/20 text-yellow-400'
555 |                     }`}>
556 |                       {selectedDoc.is_published ? 'Published' : 'Draft'}
557 |                     </span>
558 |                   )}
559 |                 </div>
560 |                 
561 |                 <div className="flex items-center space-x-2">
562 |                   {selectedDoc && !isEditMode && !isCreatingDoc && (
563 |                     <Button
564 |                       size="sm"
565 |                       variant="outline"
566 |                       onClick={() => {
567 |                         setIsEditMode(true)
568 |                         setEditingDoc(null)
569 |                       }}
570 |                       className="text-white border-gray-600 hover:bg-gray-700"
571 |                     >
572 |                       <Edit3 className="h-4 w-4 mr-1" />
573 |                       Edit
574 |                     </Button>
575 |                   )}
576 |                   
577 |                   {(isEditMode || isCreatingDoc) && (
578 |                     <div className="flex items-center space-x-2">
579 |                       {editingDoc && (
580 |                         <div className="flex items-center space-x-1 text-xs text-orange-400 mr-2">
581 |                           <AlertCircle className="h-3 w-3" />
582 |                           <span>Unsaved</span>
583 |                         </div>
584 |                       )}
585 |                       
586 |                       <Button
587 |                         size="sm"
588 |                         onClick={isCreatingDoc ? handleCreateDocument : handleUpdateDocument}
589 |                         className="bg-green-600 hover:bg-green-700 transition-colors"
590 |                         disabled={isCreatingDoc && (!newDoc.title || !newDoc.content || !newDoc.department_id)}
591 |                       >
592 |                         <Save className="h-4 w-4 mr-1" />
593 |                         {isCreatingDoc ? 'Create' : 'Save Changes'}
594 |                       </Button>
595 |                       <Button
596 |                         size="sm"
597 |                         variant="outline"
598 |                         onClick={() => {
599 |                           if (editingDoc && window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
600 |                             setIsEditMode(false)
601 |                             setIsCreatingDoc(false)
602 |                             setEditingDoc(null)
603 |                           } else if (!editingDoc) {
604 |                             setIsEditMode(false)
605 |                             setIsCreatingDoc(false)
606 |                             setEditingDoc(null)
607 |                           }
608 |                         }}
609 |                         className="text-white border-gray-600 hover:bg-gray-700"
610 |                       >
611 |                         Cancel
612 |                       </Button>
613 |                     </div>
614 |                   )}
615 |                   
616 |                   {selectedDoc && !isEditMode && !isCreatingDoc && (
617 |                     <Button
618 |                       size="sm"
619 |                       variant="outline"
620 |                       onClick={() => {
621 |                         if (window.confirm(`Are you sure you want to delete "${selectedDoc.title}"? This action cannot be undone.`)) {
622 |                           handleDeleteDocument(selectedDoc.id)
623 |                         }
624 |                       }}
625 |                       className="text-red-400 border-red-600 hover:bg-red-600"
626 |                     >
627 |                       <Trash2 className="h-4 w-4" />
628 |                     </Button>
629 |                   )}
630 |                 </div>
631 |               </div>
632 |             </div>
633 | 
634 |             {/* Editor Content */}
635 |             <div className="flex-1 overflow-hidden">
636 |               {isCreatingDoc ? (
637 |                 <div className="h-full p-6 overflow-y-auto">
638 |                   <div className="max-w-4xl space-y-6">
639 |                     <div className="grid grid-cols-2 gap-4">
640 |                       <div className="space-y-2">
641 |                         <Label className="text-white">Title *</Label>
642 |                         <Input
643 |                           value={newDoc.title}
644 |                           onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
645 |                           placeholder="Enter document title"
646 |                           className="bg-gray-800 border-gray-600 text-white"
647 |                         />
648 |                       </div>
649 |                       <div className="space-y-2">
650 |                         <Label className="text-white">Department *</Label>
651 |                         <Select value={newDoc.department_id} onValueChange={(value) => setNewDoc({ ...newDoc, department_id: value })}>
652 |                           <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
653 |                             <SelectValue placeholder="Select department" />
654 |                           </SelectTrigger>
655 |                           <SelectContent className="bg-gray-800 border-gray-600">
656 |                             {departments.map((dept) => (
657 |                               <SelectItem key={dept.id} value={dept.id} className="text-white">
658 |                                 {dept.name}
659 |                               </SelectItem>
660 |                             ))}
661 |                           </SelectContent>
662 |                         </Select>
663 |                       </div>
664 |                     </div>
665 |                     
666 |                     <div className="grid grid-cols-2 gap-4">
667 |                       <div className="space-y-2">
668 |                         <Label className="text-white">Type</Label>
669 |                         <Select value={newDoc.document_type} onValueChange={(value) => setNewDoc({ ...newDoc, document_type: value })}>
670 |                           <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
671 |                             <SelectValue />
672 |                           </SelectTrigger>
673 |                           <SelectContent className="bg-gray-800 border-gray-600">
674 |                             <SelectItem value="sop" className="text-white">SOP</SelectItem>
675 |                             <SelectItem value="guide" className="text-white">Guide</SelectItem>
676 |                             <SelectItem value="policy" className="text-white">Policy</SelectItem>
677 |                             <SelectItem value="procedure" className="text-white">Procedure</SelectItem>
678 |                           </SelectContent>
679 |                         </Select>
680 |                       </div>
681 |                       <div className="space-y-2">
682 |                         <Label className="text-white">Tags</Label>
683 |                         <Input
684 |                           value={newDoc.tags}
685 |                           onChange={(e) => setNewDoc({ ...newDoc, tags: e.target.value })}
686 |                           placeholder="Enter tags separated by commas"
687 |                           className="bg-gray-800 border-gray-600 text-white"
688 |                         />
689 |                       </div>
690 |                     </div>
691 | 
692 |                     <div className="space-y-2">
693 |                       <Label className="text-white">Content *</Label>
694 |                       <Textarea
695 |                         value={newDoc.content}
696 |                         onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
697 |                         placeholder="Write your content here... Use markdown for formatting."
698 |                         className="bg-gray-800 border-gray-600 text-white min-h-[400px] resize-none font-mono"
699 |                       />
700 |                     </div>
701 | 
702 |                     <div className="flex items-center space-x-2">
703 |                       <input
704 |                         type="checkbox"
705 |                         id="new-published"
706 |                         checked={newDoc.is_published}
707 |                         onChange={(e) => setNewDoc({ ...newDoc, is_published: e.target.checked })}
708 |                         className="rounded border-gray-600 bg-gray-800"
709 |                       />
710 |                       <Label htmlFor="new-published" className="text-white">Publish immediately</Label>
711 |                     </div>
712 |                   </div>
713 |                 </div>
714 |               ) : isEditMode && selectedDoc ? (
715 |                 <div className="h-full flex flex-col">
716 |                   {/* Edit Mode Header */}
717 |                   <div className="p-6 border-b border-gray-700 bg-gray-800/50">
718 |                     <div className="flex items-center space-x-3 mb-4">
719 |                       <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
720 |                         <Edit3 className="h-4 w-4 text-white" />
721 |                       </div>
722 |                       <div>
723 |                         <h3 className="text-lg font-semibold text-white">Edit Document</h3>
724 |                         <p className="text-sm text-gray-400">Make changes to &quot;{selectedDoc.title}&quot;</p>
725 |                       </div>
726 |                     </div>
727 |                     
728 |                     {/* Quick Status Indicators */}
729 |                     <div className="flex items-center space-x-4 text-sm">
730 |                       <div className="flex items-center space-x-2">
731 |                         <div className={`w-2 h-2 rounded-full ${
732 |                           (editingDoc?.is_published ?? selectedDoc.is_published) 
733 |                             ? 'bg-green-500' 
734 |                             : 'bg-yellow-500'
735 |                         }`}></div>
736 |                         <span className="text-gray-400">
737 |                           Status: {(editingDoc?.is_published ?? selectedDoc.is_published) ? 'Published' : 'Draft'}
738 |                         </span>
739 |                       </div>
740 |                       <div className="flex items-center space-x-2">
741 |                         <Building2 className="h-3 w-3 text-gray-500" />
742 |                         <span className="text-gray-400">
743 |                           {departments.find(d => d.id === (editingDoc?.department_id || selectedDoc.department_id))?.name}
744 |                         </span>
745 |                       </div>
746 |                     </div>
747 |                   </div>
748 | 
749 |                   {/* Edit Form */}
750 |                   <div className="flex-1 p-6 overflow-y-auto">
751 |                     <div className="max-w-4xl space-y-8">
752 |                       {/* Basic Information */}
753 |                       <div className="space-y-6">
754 |                         <div className="flex items-center space-x-2 mb-4">
755 |                           <Type className="h-5 w-5 text-blue-400" />
756 |                           <h4 className="text-white font-medium">Basic Information</h4>
757 |                         </div>
758 |                         
759 |                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
760 |                           <div className="space-y-3">
761 |                             <Label className="text-white font-medium flex items-center space-x-2">
762 |                               <span>Document Title</span>
763 |                               <span className="text-red-400">*</span>
764 |                             </Label>
765 |                             <Input
766 |                               value={editingDoc?.title || selectedDoc.title}
767 |                               onChange={(e) => setEditingDoc({ 
768 |                                 ...selectedDoc, 
769 |                                 ...editingDoc, 
770 |                                 title: e.target.value 
771 |                               })}
772 |                               placeholder="Enter a descriptive title"
773 |                               className="bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
774 |                             />
775 |                             <p className="text-xs text-gray-500">Choose a clear, descriptive title for easy searching</p>
776 |                           </div>
777 |                           
778 |                           <div className="space-y-3">
779 |                             <Label className="text-white font-medium flex items-center space-x-2">
780 |                               <span>Department</span>
781 |                               <span className="text-red-400">*</span>
782 |                             </Label>
783 |                             <Select 
784 |                               value={editingDoc?.department_id || selectedDoc.department_id} 
785 |                               onValueChange={(value) => setEditingDoc({ 
786 |                                 ...selectedDoc, 
787 |                                 ...editingDoc, 
788 |                                 department_id: value 
789 |                               })}
790 |                             >
791 |                               <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-blue-500">
792 |                                 <SelectValue />
793 |                               </SelectTrigger>
794 |                               <SelectContent className="bg-gray-800 border-gray-600">
795 |                                 {departments.map((dept) => (
796 |                                   <SelectItem key={dept.id} value={dept.id} className="text-white focus:bg-gray-700">
797 |                                     {dept.name}
798 |                                   </SelectItem>
799 |                                 ))}
800 |                               </SelectContent>
801 |                             </Select>
802 |                             <p className="text-xs text-gray-500">Select the department this document belongs to</p>
803 |                           </div>
804 |                         </div>
805 | 
806 |                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
807 |                           <div className="space-y-3">
808 |                             <Label className="text-white font-medium">Document Type</Label>
809 |                             <Select 
810 |                               value={editingDoc?.document_type || selectedDoc.document_type} 
811 |                               onValueChange={(value) => setEditingDoc({ 
812 |                                 ...selectedDoc, 
813 |                                 ...editingDoc, 
814 |                                 document_type: value 
815 |                               })}
816 |                             >
817 |                               <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-blue-500">
818 |                                 <SelectValue />
819 |                               </SelectTrigger>
820 |                               <SelectContent className="bg-gray-800 border-gray-600">
821 |                                 <SelectItem value="sop" className="text-white focus:bg-gray-700">
822 |                                   📋 Standard Operating Procedure
823 |                                 </SelectItem>
824 |                                 <SelectItem value="guide" className="text-white focus:bg-gray-700">
825 |                                   📖 Guide
826 |                                 </SelectItem>
827 |                                 <SelectItem value="policy" className="text-white focus:bg-gray-700">
828 |                                   📜 Policy
829 |                                 </SelectItem>
830 |                                 <SelectItem value="procedure" className="text-white focus:bg-gray-700">
831 |                                   ⚙️ Procedure
832 |                                 </SelectItem>
833 |                               </SelectContent>
834 |                             </Select>
835 |                             <p className="text-xs text-gray-500">Categorize your document for better organization</p>
836 |                           </div>
837 | 
838 |                           <div className="space-y-3">
839 |                             <Label className="text-white font-medium flex items-center space-x-2">
840 |                               <Hash className="h-4 w-4" />
841 |                               <span>Tags</span>
842 |                             </Label>
843 |                             <Input
844 |                               value={editingDoc?.tags ? (Array.isArray(editingDoc.tags) ? editingDoc.tags.join(', ') : editingDoc.tags) : (Array.isArray(selectedDoc.tags) ? selectedDoc.tags.join(', ') : '')}
845 |                               onChange={(e) => setEditingDoc({ 
846 |                                 ...selectedDoc, 
847 |                                 ...editingDoc, 
848 |                                 tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
849 |                               })}
850 |                               placeholder="training, onboarding, safety"
851 |                               className="bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
852 |                             />
853 |                             <p className="text-xs text-gray-500">Add comma-separated tags for better searchability</p>
854 |                           </div>
855 |                         </div>
856 |                       </div>
857 | 
858 |                       {/* Content Section */}
859 |                       <div className="space-y-6">
860 |                         <div className="flex items-center space-x-2">
861 |                           <FileText className="h-5 w-5 text-blue-400" />
862 |                           <h4 className="text-white font-medium">Document Content</h4>
863 |                         </div>
864 |                         
865 |                         <div className="space-y-3">
866 |                           <Label className="text-white font-medium flex items-center space-x-2">
867 |                             <span>Content</span>
868 |                             <span className="text-red-400">*</span>
869 |                           </Label>
870 |                           <div className="relative">
871 |                             <Textarea
872 |                               value={editingDoc?.content || selectedDoc.content}
873 |                               onChange={(e) => setEditingDoc({ 
874 |                                 ...selectedDoc, 
875 |                                 ...editingDoc, 
876 |                                 content: e.target.value 
877 |                               })}
878 |                               placeholder="Write your document content here... 
879 | 
880 | You can use markdown formatting:
881 | - **Bold text**
882 | - *Italic text*  
883 | - # Headers
884 | - - Bullet points
885 | - 1. Numbered lists"
886 |                               className="bg-gray-800 border-gray-600 text-white min-h-[500px] resize-none font-mono text-sm leading-relaxed focus:border-blue-500 focus:ring-blue-500/20"
887 |                             />
888 |                             <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-gray-900/80 px-2 py-1 rounded">
889 |                               {(editingDoc?.content || selectedDoc.content)?.length || 0} characters
890 |                             </div>
891 |                           </div>
892 |                           <p className="text-xs text-gray-500">
893 |                             Use markdown formatting for rich text. Preview will be shown to users.
894 |                           </p>
895 |                         </div>
896 |                       </div>
897 | 
898 |                       {/* Publishing Options */}
899 |                       <div className="space-y-6">
900 |                         <div className="flex items-center space-x-2">
901 |                           <CheckCircle2 className="h-5 w-5 text-blue-400" />
902 |                           <h4 className="text-white font-medium">Publishing Options</h4>
903 |                         </div>
904 |                         
905 |                         <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
906 |                           <div className="flex items-start space-x-3">
907 |                             <input
908 |                               type="checkbox"
909 |                               id="edit-published"
910 |                               checked={editingDoc?.is_published ?? selectedDoc.is_published}
911 |                               onChange={(e) => setEditingDoc({ 
912 |                                 ...selectedDoc, 
913 |                                 ...editingDoc, 
914 |                                 is_published: e.target.checked 
915 |                               })}
916 |                               className="mt-1 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
917 |                             />
918 |                             <div className="flex-1">
919 |                               <Label htmlFor="edit-published" className="text-white font-medium cursor-pointer">
920 |                                 Publish Document
921 |                               </Label>
922 |                               <p className="text-sm text-gray-400 mt-1">
923 |                                 {(editingDoc?.is_published ?? selectedDoc.is_published) 
924 |                                   ? "This document is visible to all users in the selected department" 
925 |                                   : "Save as draft - only administrators can see unpublished documents"
926 |                                 }
927 |                               </p>
928 |                               {(editingDoc?.is_published ?? selectedDoc.is_published) && (
929 |                                 <div className="flex items-center space-x-2 mt-2 text-xs text-green-400">
930 |                                   <CheckCircle2 className="h-3 w-3" />
931 |                                   <span>Users can access this document immediately after saving</span>
932 |                                 </div>
933 |                               )}
934 |                             </div>
935 |                           </div>
936 |                         </div>
937 |                       </div>
938 |                     </div>
939 |                   </div>
940 |                 </div>
941 |               ) : selectedDoc ? (
942 |                 <div className="h-full p-6 overflow-y-auto">
943 |                   <div className="max-w-4xl">
944 |                     <div className="mb-6 pb-4 border-b border-gray-700">
945 |                       <div className="flex items-start justify-between mb-3">
946 |                         <h1 className="text-2xl font-bold text-white">{selectedDoc.title}</h1>
947 |                       </div>
948 |                       <div className="flex items-center space-x-4 text-sm text-gray-400">
949 |                         <span className="bg-gray-800 px-2 py-1 rounded">
950 |                           {selectedDoc.document_type}
951 |                         </span>
952 |                         <span>{selectedDoc.department_name}</span>
953 |                         <span>•</span>
954 |                         <span>{new Date(selectedDoc.created_at).toLocaleDateString()}</span>
955 |                       </div>
956 |                       {selectedDoc.tags && selectedDoc.tags.length > 0 && (
957 |                         <div className="flex flex-wrap gap-2 mt-3">
958 |                           {selectedDoc.tags.map((tag: string, index: number) => (
959 |                             <span key={index} className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 rounded">
960 |                               {tag}
961 |                             </span>
962 |                           ))}
963 |                         </div>
964 |                       )}
965 |                     </div>
966 |                     <div className="prose prose-invert max-w-none">
967 |                       <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
968 |                         {selectedDoc.content}
969 |                       </div>
970 |                     </div>
971 |                   </div>
972 |                 </div>
973 |               ) : null}
974 |             </div>
975 |           </>
976 |         ) : (
977 |           <div className="flex-1 flex items-center justify-center">
978 |             <div className="text-center">
979 |               <FileText className="mx-auto h-16 w-16 text-gray-600 mb-4" />
980 |               <h3 className="text-xl font-medium text-white mb-2">Select a document</h3>
981 |               <p className="text-gray-400 mb-4">Choose a document from the list to view or edit</p>
982 |               <Button
983 |                 onClick={() => {
984 |                   setIsCreatingDoc(true)
985 |                   setSelectedDoc(null)
986 |                 }}
987 |                 className="bg-blue-600 hover:bg-blue-700"
988 |               >
989 |                 <Plus className="h-4 w-4 mr-2" />
990 |                 Create New Document
991 |               </Button>
992 |             </div>
993 |           </div>
994 |         )}
995 |       </div>
996 |     </div>
997 |   )
998 | }
```

src/app/api/admin/users/route.ts
```
1 | import { createServerClient } from '@supabase/ssr'
2 | import { NextRequest, NextResponse } from 'next/server'
3 | import { cookies } from 'next/headers'
4 | 
5 | const createSupabaseServer = async () => {
6 |   const cookieStore = await cookies()
7 |   
8 |   return createServerClient(
9 |     process.env.NEXT_PUBLIC_SUPABASE_URL!,
10 |     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
11 |     {
12 |       cookies: {
13 |         get(name: string) {
14 |           return cookieStore.get(name)?.value
15 |         },
16 |       },
17 |     }
18 |   )
19 | }
20 | 
21 | // Middleware to check admin permissions
22 | const checkAdminPermissions = async (supabase: ReturnType<typeof createServerClient>, userId: string) => {
23 |   const { data: profile } = await supabase
24 |     .from('profiles')
25 |     .select('role')
26 |     .eq('id', userId)
27 |     .single()
28 | 
29 |   return profile?.role === 'admin'
30 | }
31 | 
32 | export async function GET() {
33 |   try {
34 |     const supabase = await createSupabaseServer()
35 |     
36 |     // Get the session
37 |     const { data: { session }, error: sessionError } = await supabase.auth.getSession()
38 |     
39 |     if (sessionError || !session?.user) {
40 |       return NextResponse.json(
41 |         { error: 'Unauthorized' },
42 |         { status: 401 }
43 |       )
44 |     }
45 | 
46 |     // Check admin permissions
47 |     const isAdmin = await checkAdminPermissions(supabase, session.user.id)
48 |     if (!isAdmin) {
49 |       return NextResponse.json(
50 |         { error: 'Insufficient permissions - Admin access required' },
51 |         { status: 403 }
52 |       )
53 |     }
54 | 
55 |     // Get all users with their profiles and departments
56 |     const { data: users, error } = await supabase
57 |       .from('profiles')
58 |       .select(`
59 |         *,
60 |         departments (
61 |           id,
62 |           name
63 |         )
64 |       `)
65 |       .order('created_at', { ascending: false })
66 | 
67 |     if (error) {
68 |       console.error('Database error:', error)
69 |       return NextResponse.json(
70 |         { error: 'Failed to fetch users' },
71 |         { status: 500 }
72 |       )
73 |     }
74 | 
75 |     return NextResponse.json({ users })
76 |   } catch (error) {
77 |     console.error('API error:', error)
78 |     return NextResponse.json(
79 |       { error: 'Internal server error' },
80 |       { status: 500 }
81 |     )
82 |   }
83 | }
84 | 
85 | export async function PATCH(request: NextRequest) {
86 |   try {
87 |     const supabase = await createSupabaseServer()
88 |     
89 |     // Get the session
90 |     const { data: { session }, error: sessionError } = await supabase.auth.getSession()
91 |     
92 |     if (sessionError || !session?.user) {
93 |       return NextResponse.json(
94 |         { error: 'Unauthorized' },
95 |         { status: 401 }
96 |       )
97 |     }
98 | 
99 |     // Check admin permissions
100 |     const isAdmin = await checkAdminPermissions(supabase, session.user.id)
101 |     if (!isAdmin) {
102 |       return NextResponse.json(
103 |         { error: 'Insufficient permissions - Admin access required' },
104 |         { status: 403 }
105 |       )
106 |     }
107 | 
108 |     const body = await request.json()
109 |     const { userId, updates } = body
110 | 
111 |     if (!userId || !updates) {
112 |       return NextResponse.json(
113 |         { error: 'Missing required fields: userId and updates' },
114 |         { status: 400 }
115 |       )
116 |     }
117 | 
118 |     // Validate allowed updates
119 |     const allowedFields = ['role', 'department_id', 'first_name', 'last_name']
120 |     const sanitizedUpdates: Record<string, unknown> = {}
121 |     
122 |     for (const [key, value] of Object.entries(updates)) {
123 |       if (allowedFields.includes(key)) {
124 |         sanitizedUpdates[key] = value
125 |       }
126 |     }
127 | 
128 |     if (Object.keys(sanitizedUpdates).length === 0) {
129 |       return NextResponse.json(
130 |         { error: 'No valid fields to update' },
131 |         { status: 400 }
132 |       )
133 |     }
134 | 
135 |     // Validate role if being updated
136 |     if (sanitizedUpdates.role && !['admin', 'user'].includes(sanitizedUpdates.role as string)) {
137 |       return NextResponse.json(
138 |         { error: 'Invalid role. Must be either "admin" or "user"' },
139 |         { status: 400 }
140 |       )
141 |     }
142 | 
143 |     // Prevent admin from removing their own admin role
144 |     if (sanitizedUpdates.role === 'user' && userId === session.user.id) {
145 |       return NextResponse.json(
146 |         { error: 'Cannot remove your own admin privileges' },
147 |         { status: 400 }
148 |       )
149 |     }
150 | 
151 |     const { data: updatedUser, error } = await supabase
152 |       .from('profiles')
153 |       .update(sanitizedUpdates)
154 |       .eq('id', userId)
155 |       .select()
156 |       .single()
157 | 
158 |     if (error) {
159 |       console.error('Database error:', error)
160 |       return NextResponse.json(
161 |         { error: 'Failed to update user' },
162 |         { status: 500 }
163 |       )
164 |     }
165 | 
166 |     return NextResponse.json({ user: updatedUser })
167 |   } catch (error) {
168 |     console.error('API error:', error)
169 |     return NextResponse.json(
170 |       { error: 'Internal server error' },
171 |       { status: 500 }
172 |     )
173 |   }
174 | }
```

src/app/api/auth/profile/route.ts
```
1 | import { createServerClient } from '@supabase/ssr'
2 | import { NextResponse } from 'next/server'
3 | import { cookies } from 'next/headers'
4 | 
5 | const createSupabaseServer = async () => {
6 |   const cookieStore = await cookies()
7 |   
8 |   return createServerClient(
9 |     process.env.NEXT_PUBLIC_SUPABASE_URL!,
10 |     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
11 |     {
12 |       cookies: {
13 |         get(name: string) {
14 |           return cookieStore.get(name)?.value
15 |         },
16 |       },
17 |     }
18 |   )
19 | }
20 | 
21 | export async function GET() {
22 |   try {
23 |     const supabase = await createSupabaseServer()
24 |     
25 |     // Get the session
26 |     const { data: { session }, error: sessionError } = await supabase.auth.getSession()
27 |     
28 |     if (sessionError || !session?.user) {
29 |       return NextResponse.json(
30 |         { error: 'Unauthorized' },
31 |         { status: 401 }
32 |       )
33 |     }
34 | 
35 |     // Get user profile
36 |     const { data: profile, error } = await supabase
37 |       .from('profiles')
38 |       .select('*')
39 |       .eq('id', session.user.id)
40 |       .single()
41 | 
42 |     if (error) {
43 |       console.error('Database error:', error)
44 |       return NextResponse.json(
45 |         { error: 'Failed to fetch profile' },
46 |         { status: 500 }
47 |       )
48 |     }
49 | 
50 |     if (!profile) {
51 |       return NextResponse.json(
52 |         { error: 'Profile not found' },
53 |         { status: 404 }
54 |       )
55 |     }
56 | 
57 |     return NextResponse.json({ profile })
58 |   } catch (error) {
59 |     console.error('API error:', error)
60 |     return NextResponse.json(
61 |       { error: 'Internal server error' },
62 |       { status: 500 }
63 |     )
64 |   }
65 | }
```
