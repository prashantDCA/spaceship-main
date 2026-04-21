import { createClient as createBrowserClient } from '@/lib/supabase/client'

// Client-side Supabase client for browser usage
export const supabase = createBrowserClient()

// Legacy client for backward compatibility
export const supabaseClient = createBrowserClient()

// Server-side client factory - import and use only in server components
export const createServerClient = async () => {
  const { cookies } = await import('next/headers')
  const { createClient } = await import('@/lib/supabase/server')
  const cookieStore = await cookies()
  return createClient(cookieStore)
}