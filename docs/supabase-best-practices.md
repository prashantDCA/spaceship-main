# Supabase Best Practices for Next.js Applications

## Overview

This document outlines comprehensive best practices for using Supabase with Next.js applications, providing a standardized approach that should be followed in all projects to ensure reliability, performance, and maintainability.

## Core Principles

### 1. **Server-First Architecture**
- All database operations should run on the server
- Client-side operations only for real-time features when absolutely necessary
- Use Next.js Server Actions for all CRUD operations

### 2. **Separation of Concerns**
- Database logic in server actions
- UI logic in components
- Authentication handled by middleware
- Type safety throughout the application

### 3. **Error Handling First**
- Comprehensive error handling at every level
- User-friendly error messages
- Proper logging and monitoring
- Graceful degradation

## Project Structure

```
src/
├── app/
│   ├── actions/           # Server Actions (Database operations)
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── documents.ts
│   │   └── admin-*.ts
│   ├── api/              # API routes (only when Server Actions aren't sufficient)
│   └── middleware.ts     # Authentication and route protection
├── components/           # UI Components (no direct database calls)
├── lib/
│   ├── supabase/
│   │   ├── client.ts     # Client-side Supabase (minimal usage)
│   │   ├── server.ts     # Server-side Supabase (primary)
│   │   └── middleware.ts # Middleware Supabase
│   ├── auth.tsx          # Auth context (minimal state management)
│   └── types.ts          # TypeScript types
└── hooks/               # Custom hooks (no database operations)
```

## 1. Supabase Client Configuration

### Server Client (Primary)
```typescript
// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => 
              cookieStore.set(name, value, options)
            );
          } catch {
            // Handle server component context gracefully
          }
        },
      },
    }
  );
};
```

### Client Client (Minimal Usage)
```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// Only use for:
// - Real-time subscriptions
// - Client-side auth state (minimal)
// - File uploads with progress tracking
```

### Middleware Client
```typescript
// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => 
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  
  // Simple, efficient route protection
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return supabaseResponse;
}
```

## 2. Server Actions Pattern

### Standard Server Action Structure
```typescript
// src/app/actions/example.ts
'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidateTag } from 'next/cache';

// Types should be exported and shared
export interface ExampleData {
  id: string;
  name: string;
  created_at: string;
}

export interface CreateExamplePayload {
  name: string;
  description?: string;
}

// Standard response format
export type ActionResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};

// Helper function for consistent client creation
async function getSupabaseClient() {
  return await createClient();
}

// Fetch operations
export async function fetchExamples(): Promise<ActionResponse<ExampleData[]>> {
  try {
    console.log('Server Action: Fetching examples...');
    const supabase = await getSupabaseClient();
    
    const { data, error } = await supabase
      .from('examples')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching examples:', error);
      return { data: null, error: error.message, success: false };
    }

    console.log('Server Action: Examples fetched successfully:', data?.length || 0);
    return { data: data || [], error: null, success: true };
  } catch (error) {
    console.error('Server Action: Error in fetchExamples:', error);
    return { data: null, error: 'Failed to fetch examples', success: false };
  }
}

// Create operations
export async function createExample(
  payload: CreateExamplePayload
): Promise<ActionResponse<ExampleData>> {
  try {
    console.log('Server Action: Creating example...', payload);
    const supabase = await getSupabaseClient();
    
    const { data, error } = await supabase
      .from('examples')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating example:', error);
      return { data: null, error: error.message, success: false };
    }

    console.log('Server Action: Example created successfully');
    revalidateTag('examples'); // Cache invalidation
    return { data, error: null, success: true };
  } catch (error) {
    console.error('Server Action: Error in createExample:', error);
    return { data: null, error: 'Failed to create example', success: false };
  }
}

// Update operations
export async function updateExample(
  id: string,
  payload: Partial<CreateExamplePayload>
): Promise<ActionResponse<ExampleData>> {
  try {
    console.log('Server Action: Updating example...', { id, payload });
    const supabase = await getSupabaseClient();
    
    const { data, error } = await supabase
      .from('examples')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating example:', error);
      return { data: null, error: error.message, success: false };
    }

    console.log('Server Action: Example updated successfully');
    revalidateTag('examples');
    return { data, error: null, success: true };
  } catch (error) {
    console.error('Server Action: Error in updateExample:', error);
    return { data: null, error: 'Failed to update example', success: false };
  }
}

// Delete operations
export async function deleteExample(id: string): Promise<ActionResponse<null>> {
  try {
    console.log('Server Action: Deleting example...', { id });
    const supabase = await getSupabaseClient();
    
    const { error } = await supabase
      .from('examples')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting example:', error);
      return { data: null, error: error.message, success: false };
    }

    console.log('Server Action: Example deleted successfully');
    revalidateTag('examples');
    return { data: null, error: null, success: true };
  } catch (error) {
    console.error('Server Action: Error in deleteExample:', error);
    return { data: null, error: 'Failed to delete example', success: false };
  }
}
```

## 3. Component Integration Pattern

### Standard Component with Server Actions
```typescript
// src/components/ExampleComponent.tsx
'use client';

import React from 'react';
import { useAuth } from '@/lib/auth';
import { 
  fetchExamples, 
  createExample, 
  updateExample, 
  deleteExample,
  type ExampleData,
  type CreateExamplePayload 
} from '@/app/actions/example';

export default function ExampleComponent() {
  const { user } = useAuth();
  const [examples, setExamples] = React.useState<ExampleData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch data function
  const fetchExamplesData = React.useCallback(async () => {
    try {
      const result = await fetchExamples();
      if (!result.success) {
        setError(result.error);
        return;
      }
      setExamples(result.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching examples:', error);
      setError('Failed to fetch examples');
    }
  }, []);

  // Load data on mount
  React.useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    
    const fetchWithRetry = async () => {
      try {
        if (user) {
          await fetchExamplesData();
        } else if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchWithRetry, 1000 * retryCount);
        } else {
          setError('Authentication required');
        }
      } catch (error) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchWithRetry, 1000 * retryCount);
        } else {
          setError('Failed to load data');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchWithRetry();
  }, [user, fetchExamplesData]);

  // Create handler
  const handleCreate = React.useCallback(async (payload: CreateExamplePayload) => {
    try {
      const result = await createExample(payload);
      if (!result.success) {
        setError(result.error);
        return;
      }
      await fetchExamplesData(); // Refresh data
      setError(null);
    } catch (error) {
      console.error('Error creating example:', error);
      setError('Failed to create example');
    }
  }, [fetchExamplesData]);

  // Update handler
  const handleUpdate = React.useCallback(async (id: string, payload: Partial<CreateExamplePayload>) => {
    try {
      const result = await updateExample(id, payload);
      if (!result.success) {
        setError(result.error);
        return;
      }
      await fetchExamplesData(); // Refresh data
      setError(null);
    } catch (error) {
      console.error('Error updating example:', error);
      setError('Failed to update example');
    }
  }, [fetchExamplesData]);

  // Delete handler
  const handleDelete = React.useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this example?')) return;
    
    try {
      const result = await deleteExample(id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      await fetchExamplesData(); // Refresh data
      setError(null);
    } catch (error) {
      console.error('Error deleting example:', error);
      setError('Failed to delete example');
    }
  }, [fetchExamplesData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}
```

## 4. Authentication Best Practices

### Simplified Auth Context
```typescript
// src/lib/auth.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_OUT') {
          router.push('/auth/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## 5. Database Schema Best Practices

### Table Structure
```sql
-- Enable Row Level Security
ALTER TABLE examples ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own examples" ON examples
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create examples" ON examples
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own examples" ON examples
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own examples" ON examples
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_examples_user_id ON examples(user_id);
CREATE INDEX idx_examples_created_at ON examples(created_at);
```

### Profile Management
```sql
-- Auto-create profiles on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 6. Error Handling Strategy

### Server Action Error Handling
```typescript
// Consistent error response format
export type ErrorResponse = {
  code: string;
  message: string;
  details?: any;
};

// Error handling utility
export function handleSupabaseError(error: any): ErrorResponse {
  if (error.code === 'PGRST116') {
    return {
      code: 'NOT_FOUND',
      message: 'Record not found',
    };
  }
  
  if (error.code === '23505') {
    return {
      code: 'DUPLICATE_KEY',
      message: 'A record with this information already exists',
    };
  }
  
  return {
    code: 'DATABASE_ERROR',
    message: error.message || 'An unexpected error occurred',
    details: error,
  };
}
```

### Client Error Handling
```typescript
// Error boundary for React components
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>Please try refreshing the page</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## 7. Performance Optimization

### Caching Strategy
```typescript
// Server action with caching
export async function fetchExamplesWithCache(): Promise<ActionResponse<ExampleData[]>> {
  try {
    const supabase = await getSupabaseClient();
    
    const { data, error } = await supabase
      .from('examples')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message, success: false };
    }

    // Cache the result
    unstable_cache(
      async () => data,
      ['examples'],
      {
        tags: ['examples'],
        revalidate: 60, // 1 minute
      }
    );

    return { data: data || [], error: null, success: true };
  } catch (error) {
    return { data: null, error: 'Failed to fetch examples', success: false };
  }
}
```

### Pagination Pattern
```typescript
export async function fetchExamplesPaginated(
  page: number = 1,
  limit: number = 10
): Promise<ActionResponse<{ data: ExampleData[]; total: number; hasMore: boolean }>> {
  try {
    const supabase = await getSupabaseClient();
    const offset = (page - 1) * limit;
    
    const [dataQuery, countQuery] = await Promise.all([
      supabase
        .from('examples')
        .select('*')
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false }),
      supabase
        .from('examples')
        .select('*', { count: 'exact', head: true })
    ]);

    if (dataQuery.error) {
      return { data: null, error: dataQuery.error.message, success: false };
    }

    const total = countQuery.count || 0;
    const hasMore = offset + limit < total;

    return {
      data: {
        data: dataQuery.data || [],
        total,
        hasMore,
      },
      error: null,
      success: true,
    };
  } catch (error) {
    return { data: null, error: 'Failed to fetch examples', success: false };
  }
}
```

## 8. Testing Strategy

### Server Action Testing
```typescript
// __tests__/actions/example.test.ts
import { fetchExamples, createExample } from '@/app/actions/example';
import { createClient } from '@/lib/supabase/server';

jest.mock('@/lib/supabase/server');

describe('Example Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch examples successfully', async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({
        data: [{ id: '1', name: 'Test' }],
        error: null,
      }),
    };

    (createClient as jest.Mock).mockResolvedValue(mockSupabase);

    const result = await fetchExamples();

    expect(result.success).toBe(true);
    expect(result.data).toEqual([{ id: '1', name: 'Test' }]);
    expect(result.error).toBeNull();
  });

  it('should handle errors gracefully', async () => {
    const mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      }),
    };

    (createClient as jest.Mock).mockResolvedValue(mockSupabase);

    const result = await fetchExamples();

    expect(result.success).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBe('Database error');
  });
});
```

## 9. Security Checklist

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # Server-only
```

### Row Level Security
- ✅ Enable RLS on all tables
- ✅ Create appropriate policies
- ✅ Test policies thoroughly
- ✅ Use auth.uid() for user identification
- ✅ Validate all inputs server-side

### API Security
- ✅ Use server actions instead of API routes when possible
- ✅ Validate all inputs with Zod or similar
- ✅ Implement rate limiting
- ✅ Use HTTPS in production
- ✅ Sanitize all user inputs

## 10. Deployment Checklist

### Pre-deployment
- ✅ Run type checking: `npm run type-check`
- ✅ Run linting: `npm run lint`
- ✅ Run tests: `npm run test`
- ✅ Build successfully: `npm run build`
- ✅ Check environment variables
- ✅ Verify database policies

### Post-deployment
- ✅ Test authentication flow
- ✅ Verify all CRUD operations
- ✅ Check error handling
- ✅ Monitor performance
- ✅ Test in different browsers

## Conclusion

Following these best practices ensures:

1. **Reliability**: Server-side operations eliminate client-side connection issues
2. **Performance**: Optimized database queries and caching strategies
3. **Security**: Proper authentication and authorization
4. **Maintainability**: Consistent patterns and error handling
5. **Scalability**: Efficient data fetching and state management

## Quick Reference

### Do's ✅
- Use server actions for all database operations
- Implement comprehensive error handling
- Use TypeScript for type safety
- Enable Row Level Security
- Cache frequently accessed data
- Test all database operations
- Use middleware for authentication
- Implement proper pagination
- Log all server actions
- Use consistent response formats

### Don'ts ❌
- Don't use client-side Supabase for critical operations
- Don't ignore error handling
- Don't expose sensitive data
- Don't skip RLS policies
- Don't use direct API routes when server actions work
- Don't forget to revalidate cache
- Don't implement complex auth logic client-side
- Don't skip input validation
- Don't use hard-coded values
- Don't forget to test edge cases

This guide should be referenced for all future Supabase implementations to ensure consistent, reliable, and performant applications.