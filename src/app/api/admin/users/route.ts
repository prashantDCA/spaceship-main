import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const createSupabaseServer = async () => {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

// Middleware to check admin permissions
const checkAdminPermissions = async (supabase: ReturnType<typeof createServerClient>, userId: string) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  return profile?.role === 'admin'
}

export async function GET() {
  try {
    const supabase = await createSupabaseServer()
    
    // Get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check admin permissions
    const isAdmin = await checkAdminPermissions(supabase, session.user.id)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Insufficient permissions - Admin access required' },
        { status: 403 }
      )
    }

    // Get all users with their profiles and departments
    const { data: users, error } = await supabase
      .from('profiles')
      .select(`
        *,
        departments (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      )
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer()
    
    // Get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check admin permissions
    const isAdmin = await checkAdminPermissions(supabase, session.user.id)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Insufficient permissions - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId, updates } = body

    if (!userId || !updates) {
      return NextResponse.json(
        { error: 'Missing required fields: userId and updates' },
        { status: 400 }
      )
    }

    // Validate allowed updates
    const allowedFields = ['role', 'department_id', 'first_name', 'last_name']
    const sanitizedUpdates: Record<string, unknown> = {}
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        sanitizedUpdates[key] = value
      }
    }

    if (Object.keys(sanitizedUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    // Validate role if being updated
    if (sanitizedUpdates.role && !['admin', 'user'].includes(sanitizedUpdates.role as string)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be either "admin" or "user"' },
        { status: 400 }
      )
    }

    // Prevent admin from removing their own admin role
    if (sanitizedUpdates.role === 'user' && userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot remove your own admin privileges' },
        { status: 400 }
      )
    }

    const { data: updatedUser, error } = await supabase
      .from('profiles')
      .update(sanitizedUpdates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}