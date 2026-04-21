"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_type: 'meeting' | 'deadline' | 'reminder' | 'appointment' | 'block_time' | 'general';
  start_date: string;
  end_date: string;
  all_day: boolean;
  location?: string;
  meeting_url?: string;
  assigned_to?: string;
  department_id?: string;
  client_id?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  color: string;
  tags?: string[];
  is_recurring: boolean;
  recurrence_rule?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export function useEvents(startDate?: Date, endDate?: Date) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('events_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'admin_events' },
        (payload) => {
          console.log('Event change received:', payload);
          fetchEvents(); // Refetch all events on any change
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [startDate, endDate]);

  const fetchEvents = async () => {
    try {
      setError(null);
      let query = supabase
        .from('admin_events')
        .select('*')
        .order('start_date', { ascending: true });

      // Add date range filtering if provided
      if (startDate) {
        query = query.gte('start_date', startDate.toISOString());
      }
      if (endDate) {
        query = query.lte('end_date', endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Partial<Event>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      await fetchEvents(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<Event>) => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('admin_events')
        .update(updates)
        .eq('id', eventId)
        .select()
        .single();

      if (error) throw error;
      await fetchEvents(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('admin_events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      await fetchEvents(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => {
      const eventStart = new Date(event.start_date);
      const eventEnd = new Date(event.end_date);
      
      if (event.all_day) {
        const eventDate = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate());
        const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return eventDate.getTime() === checkDate.getTime();
      }
      
      return date >= eventStart && date <= eventEnd;
    });
  };

  const getEventsForDateRange = (start: Date, end: Date): Event[] => {
    return events.filter(event => {
      const eventStart = new Date(event.start_date);
      const eventEnd = new Date(event.end_date);
      
      // Check if event overlaps with the date range
      return eventStart <= end && eventEnd >= start;
    });
  };

  const getUpcomingEvents = (days: number = 7): Event[] => {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);
    
    return events.filter(event => {
      const eventStart = new Date(event.start_date);
      return eventStart >= now && eventStart <= futureDate;
    });
  };

  const getOverdueEvents = (): Event[] => {
    const now = new Date();
    return events.filter(event => {
      const eventEnd = new Date(event.end_date);
      return eventEnd < now && (event.event_type === 'deadline' || event.event_type === 'reminder');
    });
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    getEventsForDateRange,
    getUpcomingEvents,
    getOverdueEvents,
  };
}