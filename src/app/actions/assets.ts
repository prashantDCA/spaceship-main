'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export interface Asset {
    id: string
    name: string
    type: 'file' | 'folder'
    parent_id: string | null
    department_id: string
    url: string | null
    size: number
    mime_type: string | null
    created_at: string
    updated_at: string
    created_by: string
    departments?: { name: string } | null
    client_id?: string | null
}

import { getAdminDepartmentId } from '@/lib/admin-helper'

// Helper to check permission (mostly relies on RLS, but strictly enforcing Dept ID on write is good)
async function getCallerInfo() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Helper to get profile for department info
    const admin = createAdminClient()
    const { data: profile } = await admin
        .from('profiles')
        .select('department_id, role')
        .eq('id', user.id)
        .single()

    return { user, profile }
}

export async function getAssets(departmentId?: string, parentId: string | null = null, clientId?: string) {
    try {
        const cookieStore = await cookies()
        const supabase = createClient(cookieStore)

        // RLS policies on 'assets' table should automatically filter for the user.
        // Super Admins RLS policy allows seeing all.
        // Department Users RLS policy limits to their department.

        let query = supabase
            .from('assets')
            .select('*, departments(name)')
            .order('type', { ascending: false }) // Folders first
            .order('name', { ascending: true })

        if (parentId) {
            query = query.eq('parent_id', parentId)
        } else {
            query = query.is('parent_id', null)
        }

        if (clientId) {
            // If filtering by client, show ONLY that client's assets
            query = query.eq('client_id', clientId)
        }
        // Client assets are visible in main library too

        // If a specific department is requested (e.g. by Super Admin filtering), add it.
        // If not requested, RLS handles it for normal users.
        if (departmentId && departmentId !== 'all') {
            query = query.eq('department_id', departmentId)
        }

        const { data, error } = await query

        if (error) throw error

        return { success: true, data: data as Asset[] }
    } catch (error) {
        console.error('Error fetching assets:', error)
        return { success: false, error: 'Failed to fetch assets' }
    }
}

// Helper to get or create a folder by name within a parent
async function getOrCreateFolder(
    supabase: any,
    name: string,
    parentId: string | null,
    departmentId: string,
    userId: string
) {
    // 1. Check if folder exists
    let query = supabase
        .from('assets')
        .select('id')
        .eq('name', name)
        .eq('type', 'folder')
        .eq('department_id', departmentId)

    if (parentId) {
        query = query.eq('parent_id', parentId)
    } else {
        query = query.is('parent_id', null)
    }

    const { data: existing } = await query.single()

    if (existing) return existing.id

    // 2. Create if not exists
    const { data: newFolder, error } = await supabase
        .from('assets')
        .insert({
            name,
            type: 'folder',
            parent_id: parentId,
            department_id: departmentId,
            created_by: userId
        })
        .select('id')
        .single()

    if (error) throw error
    return newFolder.id
}

// New helper to find the folder for a specific client
export async function getClientRootFolder(clientId: string) {
    try {
        const info = await getCallerInfo()
        if (!info || !info.profile) return { success: false, error: 'Unauthorized' }
        const { user, profile } = info

        const admin = createAdminClient()
        // 1. Get Client Name and Department
        const { data: client, error: clientError } = await admin
            .from('clients')
            .select('name, department_id')
            .eq('id', clientId)
            .single()

        if (clientError || !client) return { success: false, error: 'Client not found' }

        const supabase = createClient(await cookies()) // RLS client

        // 2. Look for "Clients" folder
        const { data: clientsFolder } = await supabase
            .from('assets')
            .select('id')
            .eq('name', 'Clients')
            .eq('type', 'folder')
            .eq('department_id', client.department_id)
            .is('parent_id', null)
            .single()

        if (!clientsFolder) return { success: true, data: null } // Not created yet

        // 3. Look for "{ClientName}" folder inside it
        const { data: clientFolder } = await supabase
            .from('assets')
            .select('id')
            .eq('name', client.name)
            .eq('type', 'folder')
            .eq('department_id', client.department_id)
            .eq('parent_id', clientsFolder.id)
            .single()

        return { success: true, data: clientFolder ? clientFolder.id : null }

    } catch (error) {
        console.error('Error getting client root folder:', error)
        return { success: false, error: 'Failed' }
    }
}

export async function createFolder(name: string, parentId: string | null, clientId?: string) {
    try {
        const info = await getCallerInfo()
        if (!info || !info.profile) return { success: false, error: 'Unauthorized' }

        const { user, profile } = info
        const supabase = createClient(await cookies())

        // Determine effective department:
        let targetDepartmentId = profile.department_id

        if (clientId) {
            const admin = createAdminClient()
            const { data: client, error: clientError } = await admin
                .from('clients')
                .select('department_id')
                .eq('id', clientId)
                .single()

            if (!clientError && client) {
                targetDepartmentId = client.department_id
            }
        }

        const { data, error } = await supabase
            .from('assets')
            .insert({
                name,
                type: 'folder',
                parent_id: parentId, // RLS + Constraint will ensure parent exists and is accessible
                department_id: targetDepartmentId,
                created_by: user.id,
                client_id: clientId || null
            })
            .select()
            .single()

        if (error) throw error

        revalidatePath('/admin/assets')
        return { success: true, data }
    } catch (error) {
        console.error('Error creating folder:', error)
        return { success: false, error: 'Failed to create folder' }
    }
}

export async function uploadFile(
    formData: FormData,
    parentId: string | null,
    clientId?: string
) {
    try {
        const file = formData.get('file') as File
        if (!file) return { success: false, error: 'No file provided' }

        const info = await getCallerInfo()
        if (!info || !info.profile) return { success: false, error: 'Unauthorized' }
        const { user, profile } = info

        const supabase = createClient(await cookies()) // Use RLS-scoped client for Insert
        const adminSupabase = createAdminClient() // Use Admin for Storage if RLS is tricky on storage buckets

        // Determine effective department:
        let targetDepartmentId = profile.department_id
        let targetParentId = parentId

        // If attaching to a client, fetch client's department AND set up folder structure
        if (clientId) {
            const { data: client, error: clientError } = await adminSupabase
                .from('clients')
                .select('id, name, department_id')
                .eq('id', clientId)
                .single()

            if (!clientError && client) {
                targetDepartmentId = client.department_id

                // Auto-create folder structure: "Clients" -> "{Client Name}"
                try {
                    // 1. Ensure "Clients" root folder exists in that department
                    const clientsFolderId = await getOrCreateFolder(
                        supabase,
                        'Clients',
                        null,
                        targetDepartmentId,
                        user.id
                    )

                    // 2. Ensure specific Client folder exists within "Clients"
                    const clientFolderId = await getOrCreateFolder(
                        supabase,
                        client.name,
                        clientsFolderId,
                        targetDepartmentId,
                        user.id
                    )

                    // 3. Force the file to go into this folder
                    targetParentId = clientFolderId

                } catch (folderError) {
                    console.error('Error auto-creating client folders:', folderError)
                    return { success: false, error: 'Failed to organize client folder' }
                }
            }
        }

        // 1. Upload to Supabase Storage
        // Path format: department_id/random_filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${targetDepartmentId}/${fileName}`

        const { error: uploadError } = await adminSupabase // Using admin for storage to ensure write access to bucket
            .storage
            .from('team-assets')
            .upload(filePath, file, {
                contentType: file.type,
                upsert: false
            })

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = adminSupabase
            .storage
            .from('team-assets')
            .getPublicUrl(filePath)

        // 2. Insert into Database
        const { data, error: dbError } = await supabase
            .from('assets')
            .insert({
                name: file.name,
                type: 'file',
                parent_id: targetParentId, // Use the potentially modified parent ID
                department_id: targetDepartmentId,
                url: publicUrl,
                size: file.size,
                mime_type: file.type,
                created_by: user.id,
                client_id: clientId || null
            })
            .select()
            .single()

        if (dbError) {
            // Cleanup storage if DB fails
            await adminSupabase.storage.from('team-assets').remove([filePath])
            throw dbError
        }

        revalidatePath('/admin/assets')
        return { success: true, data }
    } catch (error) {
        console.error('Error uploading file:', error)
        return { success: false, error: 'Failed to upload file' }
    }
}

export async function deleteAsset(id: string) {
    try {
        const supabase = createClient(await cookies())

        // Get asset details first to delete from storage if it's a file
        const { data: asset, error: fetchError } = await supabase
            .from('assets')
            .select('*')
            .eq('id', id)
            .single()

        if (fetchError || !asset) return { success: false, error: 'Asset not found' }

        // RLS prevents deleting others' assets automatically via `delete()` on `supabase` client
        const { error: deleteError } = await supabase
            .from('assets')
            .delete()
            .eq('id', id)

        if (deleteError) throw deleteError

        // If it was a file, delete from Storage
        if (asset.type === 'file' && asset.url) {
            const adminSupabase = createAdminClient()
            // Extract path from URL or reconstruct it?
            // This is tricky if we just stored the full public URL. 
            // Better to store path? Or parse it.
            // URL: .../storage/v1/object/public/team-assets/DEPT_ID/FILENAME
            const pathPart = asset.url.split('/team-assets/')[1]
            if (pathPart) {
                await adminSupabase.storage.from('team-assets').remove([pathPart])
            }
        }

        revalidatePath('/admin/assets')
        return { success: true }
    } catch (error) {
        console.error('Error deleting asset:', error)
        return { success: false, error: 'Failed to delete asset' }
    }
}
