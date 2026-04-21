import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for client updates
const updateClientSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  client_type: z.enum(['politician', 'corporate', 'ngo', 'government_body', 'startup', 'nonprofit']).optional(),
  status: z.enum(['active', 'inactive', 'prospect', 'archived', 'on_hold']).optional(),
  display_name: z.string().max(255).optional().nullable(),
  primary_email: z.string().email().optional().or(z.literal('')).nullable(),
  primary_phone: z.string().max(50).optional().nullable(),
  website_url: z.string().url().optional().or(z.literal('')).nullable(),
  address: z.string().optional().nullable(),
  industry: z.string().max(255).optional().nullable(),
  company_size: z.string().max(50).optional().nullable(),
  annual_budget_range: z.string().max(100).optional().nullable(),
  account_manager_id: z.string().uuid().optional().nullable(),
  tags: z.array(z.string()).optional(),
  internal_notes: z.string().optional().nullable(),
  client_brief: z.string().optional().nullable(),
  // Social media fields
  social_instagram: z.string().optional().nullable(),
  social_twitter: z.string().optional().nullable(),
  social_youtube: z.string().optional().nullable(),
  social_linkedin: z.string().optional().nullable(),
  social_facebook: z.string().optional().nullable(),
  social_tiktok: z.string().optional().nullable(),
})

// Helper function to log client activity
async function logClientActivity(
  supabase: any,
  clientId: string,
  activityType: string,
  description: string,
  userId: string,
  departmentId: string,
  entityType: string = 'client',
  oldValues: any = {},
  newValues: any = {},
  req?: NextRequest
) {
  try {
    const clientIP = req?.headers.get('x-forwarded-for') || req?.headers.get('x-real-ip') || null
    const userAgent = req?.headers.get('user-agent') || null

    await supabase.from('client_activities').insert({
      client_id: clientId,
      activity_type: activityType,
      entity_type: entityType,
      entity_id: clientId,
      description,
      old_values: oldValues,
      new_values: newValues,
      user_id: userId,
      department_id: departmentId,
      ip_address: clientIP,
      user_agent: userAgent,
    })
  } catch (error) {
    console.error('Failed to log client activity:', error)
  }
}

// Helper function to get user profile
async function getUserProfile(supabase: any, userId: string) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, department_id, role, first_name, last_name')
    .eq('id', userId)
    .single()

  if (error || !profile) {
    throw new Error('Profile not found')
  }

  return profile
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
        },
      }
    )

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile
    const profile = await getUserProfile(supabase, session.user.id)

    // Get client with related data
    const { data: client, error } = await supabase
      .from('clients')
      .select(`
        *,
        department:departments(id, name),
        account_manager:profiles!clients_account_manager_id_fkey(id, first_name, last_name, email),
        created_by_user:profiles!clients_created_by_fkey(id, first_name, last_name),
        client_department_assignments(
          id,
          department:departments(id, name),
          role,
          assigned_at
        ),
        client_team_assignments(
          id,
          user:profiles(id, first_name, last_name, email),
          role,
          can_edit_client,
          can_view_budget,
          assigned_at
        ),
        client_contacts(
          id,
          name,
          title,
          email,
          phone,
          is_primary,
          is_decision_maker,
          notes
        ),
        client_projects(
          id,
          project_name,
          project_type,
          status,
          start_date,
          deadline,
          budget_amount,
          budget_currency,
          priority,
          completion_percentage
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 })
      }
      console.error('Error fetching client:', error)
      return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 })
    }

    // Log view activity
    await logClientActivity(
      supabase,
      client.id,
      'viewed',
      `Client "${client.name}" viewed`,
      session.user.id,
      profile.department_id,
      'client',
      {},
      {},
      request
    )

    return NextResponse.json({ client })

  } catch (error) {
    console.error('Error in GET /api/clients/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
        },
      }
    )

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile
    const profile = await getUserProfile(supabase, session.user.id)

    // Get existing client for logging and permission check
    const { data: existingClient, error: fetchError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 })
      }
      return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 })
    }

    // Check permissions (admin, account manager, or team member with edit rights)
    const canEdit =
      profile.role === 'admin' ||
      existingClient.account_manager_id === session.user.id

    if (!canEdit) {
      // Check if user has edit rights via team assignment
      const { data: teamAssignment } = await supabase
        .from('client_team_assignments')
        .select('can_edit_client')
        .eq('client_id', params.id)
        .eq('user_id', session.user.id)
        .single()

      if (!teamAssignment?.can_edit_client) {
        return NextResponse.json({ error: 'Insufficient permissions to edit this client' }, { status: 403 })
      }
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = updateClientSchema.parse(body)

    // Update client
    const { data: updatedClient, error } = await supabase
      .from('clients')
      .update(validatedData)
      .eq('id', params.id)
      .select(`
        *,
        department:departments(name),
        account_manager:profiles!clients_account_manager_id_fkey(first_name, last_name),
        created_by_user:profiles!clients_created_by_fkey(first_name, last_name)
      `)
      .single()

    if (error) {
      console.error('Error updating client:', error)
      return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
    }

    // Log activity
    await logClientActivity(
      supabase,
      params.id,
      'updated',
      `Client "${updatedClient.name}" updated`,
      session.user.id,
      profile.department_id,
      'client',
      existingClient,
      validatedData,
      request
    )

    return NextResponse.json({ client: updatedClient })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }

    console.error('Error in PATCH /api/clients/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
        },
      }
    )

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile
    const profile = await getUserProfile(supabase, session.user.id)

    // Only admins can delete clients
    if (profile.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can delete clients' }, { status: 403 })
    }

    // Get client for logging
    const { data: clientToDelete, error: fetchError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 })
      }
      return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 })
    }

    // Delete client (cascade will handle related records)
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting client:', error)
      return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 })
    }

    // Log activity (to a separate table or external service since client is deleted)
    await logClientActivity(
      supabase,
      params.id,
      'deleted',
      `Client "${clientToDelete.name}" deleted`,
      session.user.id,
      profile.department_id,
      'client',
      clientToDelete,
      {},
      request
    )

    return NextResponse.json({ message: 'Client deleted successfully' })

  } catch (error) {
    console.error('Error in DELETE /api/clients/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}