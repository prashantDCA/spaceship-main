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

// Input validation
const validateDocumentInput = (data: { title?: string; content?: string; document_type?: string }) => {
  const errors: string[] = []
  
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required')
  }
  
  if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
    errors.push('Content is required')
  }
  
  if (!data.document_type || typeof data.document_type !== 'string') {
    errors.push('Document type is required')
  }
  
  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }
  
  return errors
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

    // Get user profile to determine access level
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, department_id')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Build query based on user role
    let query = supabase
      .from('documents')
      .select('*')
      .eq('is_published', true)

    // Non-admin users can only see documents from their department
    if (profile.role !== 'admin' && profile.department_id) {
      query = query.eq('department_id', profile.department_id)
    }

    const { data: documents, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch documents' },
        { status: 500 }
      )
    }

    return NextResponse.json({ documents })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    // Get user profile to check permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, department_id')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Only admins can create documents for now
    if (profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validationErrors = validateDocumentInput(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      )
    }

    // Sanitize and prepare data
    const documentData = {
      title: body.title.trim(),
      content: body.content.trim(),
      document_type: body.document_type,
      department_id: body.department_id || null,
      tags: Array.isArray(body.tags) ? body.tags.filter((tag: unknown) => typeof tag === 'string') : [],
      is_published: Boolean(body.is_published),
      created_by: session.user.id, // Server-controlled, not client input
    }

    const { data: document, error } = await supabase
      .from('documents')
      .insert([documentData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create document' },
        { status: 500 }
      )
    }

    return NextResponse.json({ document }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}