# Client Management Feature - Security-Hardened PRD
## ANYA SEGEN Knowledge Management System

**Version**: 2.0 (Security-Hardened)  
**Date**: January 2025  
**Feature**: Client Management Module  
**Integration**: Next.js 15 + Supabase + TypeScript  
**Security Level**: Production-Ready with Department Isolation

---

## 🚨 CRITICAL SECURITY FIXES REQUIRED FIRST

### **BEFORE implementing Client Management, these security vulnerabilities MUST be fixed:**

#### 1. **Authentication Bypass (CRITICAL)**
```typescript
// CURRENT ISSUE: middleware.ts lines 90-93 commented out
// if (!session && isProtectedRoute) {
//   console.log('Redirecting unauthenticated user to login')
//   return NextResponse.redirect(new URL('/auth/login', req.url))
// }

// FIX REQUIRED: Re-enable and fix redirect loop
if (!session && isProtectedRoute && !isAuthRoute) {
  return NextResponse.redirect(new URL('/auth/login', req.url))
}
```

#### 2. **Hard-coded Admin Access (HIGH)**
```sql
-- CURRENT ISSUE: Hard-coded email in RLS policies
CREATE POLICY "Allow admin full access" ON profiles
  FOR ALL USING ((auth.jwt() ->> 'email'::text) = 'anyasegen.tech@gmail.com'::text);

-- FIX REQUIRED: Use role-based access
CREATE POLICY "Allow admin full access" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

#### 3. **Inconsistent Authorization Patterns**
```sql
-- STANDARDIZE ALL RLS POLICIES TO USE:
EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
-- INSTEAD OF MIXED PATTERNS WITH JWT CLAIMS
```

---

## 1. Executive Summary

The Client Management feature extends ANYA SEGEN with **secure, department-isolated** client information management. This implementation prioritizes **security, data isolation, and seamless integration** with existing architecture.

### Core Objectives
- **Secure client data management** with department-level isolation
- **Role-based access control** following established patterns
- **Audit trail for all operations** ensuring compliance
- **Seamless integration** with existing knowledge management system
- **Production-ready security** addressing current vulnerabilities

---

## 2. Security Architecture

### 2.1 Department Isolation Model

```sql
-- All client data MUST be scoped to departments
CREATE POLICY "Department isolation for clients" ON clients
  FOR ALL USING (
    department_id IN (
      SELECT department_id FROM profiles WHERE id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 2.2 Role-Based Access Matrix

| Operation | Admin | User (Same Dept) | User (Other Dept) |
|-----------|-------|------------------|-------------------|
| View Clients | ✅ All | ✅ Department Only | ❌ No Access |
| Create Client | ✅ Yes | ❌ No | ❌ No |
| Edit Client | ✅ Yes | ❌ No | ❌ No |
| Delete Client | ✅ Yes | ❌ No | ❌ No |
| View Activity Log | ✅ All | ✅ Department Only | ❌ No Access |

### 2.3 Audit Requirements

```sql
-- ALL client operations must be logged
CREATE TABLE client_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  operation VARCHAR(50) NOT NULL, -- CREATE, UPDATE, DELETE, VIEW
  user_id UUID REFERENCES profiles(id),
  department_id UUID REFERENCES departments(id),
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  performed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Simplified Database Schema (Security-First)

### 3.1 Core Tables

```sql
-- Clients table with mandatory department assignment
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Information (REQUIRED)
  name VARCHAR(255) NOT NULL,
  client_type VARCHAR(50) NOT NULL CHECK (client_type IN ('politician', 'corporate', 'ngo', 'government_body')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'prospect', 'archived')),
  
  -- Contact Information
  primary_email VARCHAR(255),
  primary_phone VARCHAR(50),
  address TEXT,
  
  -- Security & Relationships (MANDATORY)
  department_id UUID NOT NULL REFERENCES departments(id),
  created_by UUID NOT NULL REFERENCES profiles(id),
  account_manager_id UUID REFERENCES profiles(id),
  
  -- Metadata
  tags TEXT[] DEFAULT '{}',
  notes TEXT, -- Internal notes only
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'B')
  ) STORED
);

-- Contact persons for clients
CREATE TABLE client_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  role_title VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client guidelines (Do's and Don'ts)
CREATE TABLE client_guidelines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  guideline_type VARCHAR(10) NOT NULL CHECK (guideline_type IN ('do', 'dont')),
  category VARCHAR(100) NOT NULL, -- communication, topics, branding, events
  guideline TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Simplified client documents
CREATE TABLE client_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  document_type VARCHAR(100) NOT NULL, -- brief, guidelines, background, etc.
  content TEXT, -- For text content
  file_url TEXT, -- For uploaded files (future feature)
  uploaded_by UUID NOT NULL REFERENCES profiles(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client activity audit log
CREATE TABLE client_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- created, updated, viewed, document_added, etc.
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  user_id UUID NOT NULL REFERENCES profiles(id),
  department_id UUID NOT NULL REFERENCES departments(id),
  ip_address INET,
  performed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 Security Indexes

```sql
-- Performance + Security indexes
CREATE INDEX idx_clients_department_security ON clients(department_id, status);
CREATE INDEX idx_clients_search_security ON clients USING GIN(search_vector);
CREATE INDEX idx_client_activities_audit ON client_activities(client_id, performed_at DESC);
CREATE INDEX idx_client_activities_user ON client_activities(user_id, performed_at DESC);
```

### 3.3 Row Level Security Policies

```sql
-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_activities ENABLE ROW LEVEL SECURITY;

-- STANDARDIZED RLS POLICIES (using consistent pattern)

-- Clients table policies
CREATE POLICY "Clients department isolation" ON clients
  FOR ALL USING (
    department_id IN (
      SELECT department_id FROM profiles WHERE id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients creation by admins only" ON clients
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Client contacts inherit client permissions
CREATE POLICY "Client contacts inherit permissions" ON client_contacts
  FOR ALL USING (
    client_id IN (
      SELECT id FROM clients WHERE (
        department_id IN (
          SELECT department_id FROM profiles WHERE id = auth.uid()
        ) OR 
        EXISTS (
          SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
        )
      )
    )
  );

-- Similar policies for other tables following same pattern
-- ... (guidelines, documents, activities)
```

---

## 4. Secure API Design

### 4.1 API Routes with Server-Side Authorization

```typescript
// app/api/clients/route.ts
import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createServerClient(/*...*/)
  
  // Server-side auth check
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Get user profile for department/role check
  const { data: profile } = await supabase
    .from('profiles')
    .select('department_id, role')
    .eq('id', session.user.id)
    .single()
    
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 403 })
  }
  
  // Department-scoped query (RLS will enforce, but explicit is better)
  let query = supabase.from('clients').select('*')
  
  if (profile.role !== 'admin') {
    query = query.eq('department_id', profile.department_id)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
  
  return NextResponse.json({ clients: data })
}

export async function POST(request: NextRequest) {
  // Similar server-side auth + validation
  // Log activity to client_activities table
}
```

### 4.2 Secure Hook Implementation

```typescript
// lib/hooks/useClients.ts
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export function useClients() {
  const { user, profile } = useAuth()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  
  const fetchClients = useCallback(async () => {
    if (!user || !profile) return
    
    // Client-side auth check (backup - server has primary responsibility)
    if (!profile.department_id && profile.role !== 'admin') {
      console.error('User has no department access')
      return
    }
    
    try {
      // Use API route for secure data fetching
      const response = await fetch('/api/clients')
      if (!response.ok) {
        throw new Error('Failed to fetch clients')
      }
      
      const { clients } = await response.json()
      setClients(clients)
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }, [user, profile])
  
  // Log client view activity
  const logActivity = async (clientId: string, activityType: string) => {
    await fetch('/api/clients/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        activity_type: activityType,
        description: `Client ${activityType}`,
        ip_address: await getClientIP() // Helper function
      })
    })
  }
  
  return { clients, loading, fetchClients, logActivity }
}
```

---

## 5. Component Integration (Following Existing Patterns)

### 5.1 AdminClients Component Structure

```typescript
// components/admin/clients/AdminClients.tsx
// Follow EXACT same pattern as AdminDocuments.tsx

interface Client {
  id: string
  name: string
  client_type: 'politician' | 'corporate' | 'ngo' | 'government_body'
  status: 'active' | 'inactive' | 'prospect' | 'archived'
  primary_email: string
  primary_phone: string
  department_id: string
  department_name: string
  account_manager_name?: string
  tags: string[]
  created_at: string
  updated_at: string
}

export default function AdminClients({ user }: { user: User | null }) {
  // Follow AdminDocuments.tsx patterns:
  // - Three-panel layout (sidebar filters, list, detail/edit)
  // - Search and filtering
  // - CRUD operations with forms
  // - Loading states and error handling
  // - Real-time updates
}
```

### 5.2 Required UI Components (Missing)

```typescript
// components/ui/table.tsx - REQUIRED
// components/ui/dialog.tsx - REQUIRED  
// components/ui/badge.tsx - REQUIRED
// components/ui/tooltip.tsx - OPTIONAL

// Follow shadcn/ui patterns exactly
```

### 5.3 Sidebar Integration

```typescript
// components/Sidebar.tsx - ADD to adminMenuItems
const adminMenuItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'members', label: 'Team Members', icon: Users },
  { id: 'clients', label: 'Clients', icon: Building2 }, // ADD THIS
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
]
```

---

## 6. Implementation Phases (Security-First)

### **Phase 1: Security Foundation (CRITICAL - Week 1)**
🚨 **MUST COMPLETE BEFORE ANY NEW FEATURES**

1. **Fix middleware authentication bypass**
   - Re-enable protected route middleware
   - Fix redirect loop issues
   - Test thoroughly

2. **Standardize RLS policies**
   - Remove hard-coded admin email
   - Use consistent role-based access pattern
   - Update all existing policies

3. **Implement department isolation**
   - Ensure all data access is department-scoped
   - Add server-side authorization to existing APIs
   - Test cross-department access prevention

4. **Enable security features**
   - Turn on leaked password protection
   - Fix database function security
   - Add rate limiting

### **Phase 2: Client Management Schema (Week 2)**

1. **Create database tables**
   - Implement client management schema
   - Add all RLS policies
   - Create security indexes

2. **Implement audit logging**
   - Add client activity tracking
   - Log all CRUD operations
   - Include IP address and user agent

### **Phase 3: API Layer (Week 3)**

1. **Create secure API routes**
   - Implement server-side authorization
   - Add input validation
   - Include comprehensive error handling

2. **Create data hooks**
   - Follow useDocuments pattern
   - Add activity logging
   - Implement optimistic updates

### **Phase 4: UI Components (Week 4)**

1. **Add missing UI components**
   - Table, Dialog, Badge components
   - Follow shadcn/ui patterns exactly

2. **Create AdminClients component**
   - Follow AdminDocuments structure exactly
   - Three-panel layout
   - Search and filtering

### **Phase 5: Integration & Testing (Week 5)**

1. **Integration testing**
   - Test all security boundaries
   - Verify department isolation
   - Check authorization workflows

2. **Performance testing**
   - Test with realistic data volumes
   - Verify index performance
   - Check query optimization

---

## 7. Security Testing Requirements

### 7.1 Authorization Testing

```typescript
// Test cases REQUIRED before production:
// 1. User cannot access other department's clients
// 2. Non-admin cannot create/edit clients  
// 3. All operations properly logged
// 4. RLS policies prevent data leakage
// 5. API routes enforce server-side auth
// 6. Client-side role checks are backed by server-side validation
```

### 7.2 Data Isolation Testing

```typescript
// Department isolation tests:
// 1. User A (Dept 1) cannot see User B's (Dept 2) clients
// 2. Search results are department-scoped
// 3. Activity logs are department-scoped
// 4. Admin can see all departments
```

---

## 8. Success Metrics

### 8.1 Security Metrics
- **Zero cross-department data access incidents**
- **100% of operations logged in audit trail**
- **All authorization checks pass security testing**
- **No client-side security bypasses possible**

### 8.2 Performance Metrics  
- **Client list loads in <2 seconds**
- **Search responds in <500ms**
- **No N+1 query problems**
- **Database indexes optimized**

### 8.3 Integration Metrics
- **Zero existing functionality broken**
- **UI follows established patterns 100%**
- **Component reuse maximized**
- **No security regressions**

---

## 9. Key Differences from Original PRD

### **Security Enhancements:**
- Added mandatory department isolation
- Standardized RLS policies  
- Implemented comprehensive audit logging
- Added server-side authorization requirements
- Removed client-side security reliance

### **Simplified Scope:**
- Removed complex social media tracking (phase 2 feature)
- Simplified initial document management
- Focused on core CRUD operations
- Reduced complexity for initial implementation

### **Integration Focus:**
- Follows existing AdminDocuments patterns exactly
- Reuses established hook patterns
- Maintains consistent UI/UX
- Preserves existing architecture

### **Production-Ready Security:**
- Addresses all identified vulnerabilities
- Implements proper access controls
- Adds comprehensive logging
- Includes security testing requirements

---

## 10. Risk Mitigation

### **High-Risk Areas:**
1. **Department data leakage** - Mitigated by strict RLS policies
2. **Authorization bypass** - Mitigated by server-side checks
3. **Performance issues** - Mitigated by proper indexing
4. **Integration breaking existing features** - Mitigated by following established patterns

### **Monitoring Requirements:**
- Database query performance monitoring
- Security event logging
- Failed authorization attempt tracking
- Department isolation verification

---

This security-hardened PRD prioritizes **security, data isolation, and seamless integration** over feature completeness for the initial release. The client management feature will be production-ready and secure from day one.