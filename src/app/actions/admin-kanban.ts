'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

export interface AdminTask {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  type: 'reminder' | 'task' | 'meeting' | 'deadline' | 'follow_up' | 'general'
  assigned_to?: string
  created_by: string
  department_id?: string
  start_date?: string
  due_date?: string
  completed_at?: string
  tags?: string[]
  estimated_hours?: number
  actual_hours?: number
  kanban_position: number
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  name: string
}

export interface User {
  id: string
  first_name: string
  last_name: string
}

export interface TaskPayload {
  title: string
  description?: string
  status: string
  priority: string
  type: string
  assigned_to?: string
  department_id?: string
  start_date?: string
  due_date?: string
  estimated_hours?: number
  tags?: string[]
  created_by: string
  kanban_position: number
}

async function getSupabaseClient() {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}

export async function fetchTasks(): Promise<{ data: AdminTask[] | null; error: string | null }> {
  try {
    console.log('Server Action: Fetching tasks...')
    const supabase = await getSupabaseClient()
    
    const { data, error } = await supabase
      .from('admin_tasks')
      .select('*')
      .order('kanban_position', { ascending: true })

    if (error) {
      console.error('Error fetching tasks:', error)
      return { data: null, error: error.message }
    }

    console.log('Server Action: Tasks fetched successfully:', data?.length || 0)
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Server Action: Error in fetchTasks:', error)
    return { data: null, error: 'Failed to fetch tasks' }
  }
}

export async function fetchDepartments(): Promise<{ data: Department[] | null; error: string | null }> {
  try {
    console.log('Server Action: Fetching departments...')
    const supabase = await getSupabaseClient()
    
    const { data, error } = await supabase
      .from('departments')
      .select('id, name')
      .order('name')

    if (error) {
      console.error('Error fetching departments:', error)
      return { data: null, error: error.message }
    }

    console.log('Server Action: Departments fetched successfully:', data?.length || 0)
    console.log('Server Action: Departments:', data)
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Server Action: Error in fetchDepartments:', error)
    return { data: null, error: 'Failed to fetch departments' }
  }
}

export async function fetchUsers(): Promise<{ data: User[] | null; error: string | null }> {
  try {
    console.log('Server Action: Fetching users...')
    const supabase = await getSupabaseClient()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .eq('role', 'admin')
      .order('first_name')

    if (error) {
      console.error('Error fetching users:', error)
      return { data: null, error: error.message }
    }

    console.log('Server Action: Users fetched successfully:', data?.length || 0)
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Server Action: Error in fetchUsers:', error)
    return { data: null, error: 'Failed to fetch users' }
  }
}

export async function moveTask(
  taskId: string,
  newStatus: string,
  newPosition: number
): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log('Server Action: Moving task...', { taskId, newStatus, newPosition })
    const supabase = await getSupabaseClient()
    
    // Get the current task details
    const { data: currentTask, error: fetchError } = await supabase
      .from('admin_tasks')
      .select('status, kanban_position')
      .eq('id', taskId)
      .single()

    if (fetchError || !currentTask) {
      console.error('Error fetching current task:', fetchError)
      return { success: false, error: 'Task not found' }
    }

    // If moving within the same column, adjust positions of other tasks
    if (currentTask.status === newStatus) {
      // Get all tasks in the column sorted by position
      const { data: columnTasks, error: columnError } = await supabase
        .from('admin_tasks')
        .select('id, kanban_position')
        .eq('status', newStatus)
        .order('kanban_position')

      if (columnError) {
        console.error('Error fetching column tasks:', columnError)
        return { success: false, error: 'Failed to fetch column tasks' }
      }

      if (columnTasks) {
        // Find current and new indices
        const currentIndex = columnTasks.findIndex(t => t.id === taskId)
        const targetTask = columnTasks.find(t => Math.abs(t.kanban_position - newPosition) < 0.1)
        
        if (targetTask && currentIndex !== -1) {
          const newIndex = columnTasks.findIndex(t => t.id === targetTask.id)
          
          // Adjust positions of tasks between old and new position
          if (currentIndex !== newIndex) {
            const updates: { id: string; position: number }[] = []
            
            if (currentIndex < newIndex) {
              // Moving down - shift tasks up
              for (let i = currentIndex + 1; i <= newIndex; i++) {
                updates.push({
                  id: columnTasks[i].id,
                  position: columnTasks[i - 1].kanban_position
                })
              }
            } else {
              // Moving up - shift tasks down
              for (let i = newIndex; i < currentIndex; i++) {
                updates.push({
                  id: columnTasks[i].id,
                  position: columnTasks[i + 1].kanban_position
                })
              }
            }

            // Update positions in batch
            for (const update of updates) {
              await supabase
                .from('admin_tasks')
                .update({ kanban_position: update.position })
                .eq('id', update.id)
            }
          }
        }
      }
    }

    // Update the main task
    const { error } = await supabase
      .from('admin_tasks')
      .update({
        status: newStatus,
        kanban_position: newPosition,
        ...(newStatus === 'completed' && currentTask.status !== 'completed' && { 
          completed_at: new Date().toISOString() 
        }),
        ...(newStatus !== 'completed' && currentTask.status === 'completed' && { 
          completed_at: null 
        }),
      })
      .eq('id', taskId)

    if (error) {
      console.error('Error moving task:', error)
      return { success: false, error: error.message }
    }

    console.log('Server Action: Task moved successfully')
    revalidateTag('admin-tasks')
    return { success: true, error: null }
  } catch (error) {
    console.error('Server Action: Error in moveTask:', error)
    return { success: false, error: 'Failed to move task' }
  }
}

export async function saveTask(
  taskData: TaskPayload,
  taskId?: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log('Server Action: Saving task...', { taskId, taskData })
    const supabase = await getSupabaseClient()

    if (taskId) {
      // Update existing task
      const { error } = await supabase
        .from('admin_tasks')
        .update(taskData)
        .eq('id', taskId)

      if (error) {
        console.error('Error updating task:', error)
        return { success: false, error: error.message }
      }
    } else {
      // Create new task
      const { error } = await supabase
        .from('admin_tasks')
        .insert([taskData])

      if (error) {
        console.error('Error creating task:', error)
        return { success: false, error: error.message }
      }
    }

    console.log('Server Action: Task saved successfully')
    revalidateTag('admin-tasks')
    return { success: true, error: null }
  } catch (error) {
    console.error('Server Action: Error in saveTask:', error)
    return { success: false, error: 'Failed to save task' }
  }
}

export async function deleteTask(taskId: string): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log('Server Action: Deleting task...', { taskId })
    const supabase = await getSupabaseClient()
    
    const { error } = await supabase
      .from('admin_tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      console.error('Error deleting task:', error)
      return { success: false, error: error.message }
    }

    console.log('Server Action: Task deleted successfully')
    revalidateTag('admin-tasks')
    return { success: true, error: null }
  } catch (error) {
    console.error('Server Action: Error in deleteTask:', error)
    return { success: false, error: 'Failed to delete task' }
  }
}