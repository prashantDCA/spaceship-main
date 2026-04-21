"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'reminder' | 'task' | 'meeting' | 'deadline' | 'follow_up' | 'general';
  assigned_to?: string;
  created_by: string;
  department_id?: string;
  start_date?: string;
  due_date?: string;
  completed_at?: string;
  tags?: string[];
  estimated_hours?: number;
  actual_hours?: number;
  kanban_position: number;
  created_at: string;
  updated_at: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface TaskAttachment {
  id: string;
  task_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  uploaded_by: string;
  uploaded_at: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('tasks_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'admin_tasks' },
        (payload) => {
          console.log('Task change received:', payload);
          fetchTasks(); // Refetch all tasks on any change
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_tasks')
        .select('*')
        .order('kanban_position', { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Partial<Task>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_tasks')
        .insert([taskData])
        .select()
        .single();

      if (error) throw error;
      await fetchTasks(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;
      await fetchTasks(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('admin_tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      await fetchTasks(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const moveTask = async (taskId: string, newStatus: string, newPosition: number) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('admin_tasks')
        .update({
          status: newStatus,
          kanban_position: newPosition,
          ...(newStatus === 'completed' && { completed_at: new Date().toISOString() }),
        })
        .eq('id', taskId);

      if (error) throw error;
      await fetchTasks(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  };
}

export function useTaskComments(taskId: string) {
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskId) {
      fetchComments();
    }
  }, [taskId]);

  const fetchComments = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_task_comments')
        .select('*')
        .eq('task_id', taskId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (comment: string, userId: string) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_task_comments')
        .insert([{
          task_id: taskId,
          user_id: userId,
          comment,
        }])
        .select()
        .single();

      if (error) throw error;
      await fetchComments(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
  };
}

export function useTaskAttachments(taskId: string) {
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskId) {
      fetchAttachments();
    }
  }, [taskId]);

  const fetchAttachments = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_task_attachments')
        .select('*')
        .eq('task_id', taskId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setAttachments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching attachments:', err);
    } finally {
      setLoading(false);
    }
  };

  const addAttachment = async (attachmentData: Partial<TaskAttachment>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_task_attachments')
        .insert([{ ...attachmentData, task_id: taskId }])
        .select()
        .single();

      if (error) throw error;
      await fetchAttachments(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteAttachment = async (attachmentId: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('admin_task_attachments')
        .delete()
        .eq('id', attachmentId);

      if (error) throw error;
      await fetchAttachments(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    attachments,
    loading,
    error,
    fetchAttachments,
    addAttachment,
    deleteAttachment,
  };
}