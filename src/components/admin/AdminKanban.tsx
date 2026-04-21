"use client";

import * as React from "react";
import { Plus, Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KanbanBoard, KanbanColumn, KanbanTask } from "@/components/ui/kanban-board";
import { TaskModal, TaskModalData } from "@/components/ui/task-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import {
  moveTask,
  saveTask,
  deleteTask,
  type AdminTask,
  type TaskPayload
} from "@/app/actions/admin-kanban";
import { useAdminTasks, useAdminDepartments, useAdminUsers } from "@/hooks/useSWR";


interface TaskStats {
  total: number;
  todo: number;
  in_progress: number;
  review: number;
  completed: number;
  cancelled: number;
}

const kanbanColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', status: 'todo', color: '#6B7280' },
  { id: 'in_progress', title: 'In Progress', status: 'in_progress', color: '#3B82F6', limit: 5 },
  { id: 'review', title: 'Review', status: 'review', color: '#8B5CF6' },
  { id: 'completed', title: 'Completed', status: 'completed', color: '#10B981' },
  { id: 'cancelled', title: 'Cancelled', status: 'cancelled', color: '#EF4444' },
];

export default function AdminKanban() {
  const { user } = useAuth();

  // Use SWR hooks for cached data fetching
  const { tasks, isLoading: tasksLoading, refresh: refreshTasks } = useAdminTasks();
  const { departments } = useAdminDepartments();
  const { users } = useAdminUsers();

  const loading = tasksLoading;

  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<AdminTask | null>(null);
  const [newTaskStatus, setNewTaskStatus] = React.useState<string>('todo');
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterPriority, setFilterPriority] = React.useState<string>("all");
  const [filterAssignee, setFilterAssignee] = React.useState<string>("all");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // Calculate stats using useMemo to avoid infinite loops
  const stats = React.useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc.total++;
      acc[task.status as keyof Omit<TaskStats, 'total'>]++;
      return acc;
    }, {
      total: 0,
      todo: 0,
      in_progress: 0,
      review: 0,
      completed: 0,
      cancelled: 0,
    } as TaskStats);
  }, [tasks]);

  const handleTaskMove = React.useCallback(async (taskId: string, newStatus: string, newPosition: number) => {
    try {
      const result = await moveTask(taskId, newStatus, newPosition);
      if (result.error) {
        console.error('Error moving task:', result.error);
        throw new Error(result.error);
      }
      // Refresh tasks to ensure consistency
      await refreshTasks();
    } catch (error) {
      console.error('Error in handleTaskMove:', error);
      // Refresh to restore correct state
      await refreshTasks();
      throw error;
    }
  }, [refreshTasks]);

  const handleTaskClick = React.useCallback((task: KanbanTask) => {
    const adminTask = tasks.find(t => t.id === task.id);
    if (adminTask) {
      setSelectedTask(adminTask);
      setIsTaskModalOpen(true);
    }
  }, [tasks]);

  const handleAddTask = React.useCallback((status: string) => {
    setSelectedTask(null);
    setNewTaskStatus(status);
    setIsTaskModalOpen(true);
  }, []);

  const convertToTaskModalData = React.useCallback((task: AdminTask): TaskModalData => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    type: task.type,
    assigned_to: task.assigned_to,
    due_date: task.due_date ? new Date(task.due_date) : undefined,
    start_date: task.start_date ? new Date(task.start_date) : undefined,
    estimated_hours: task.estimated_hours,
    tags: task.tags,
    department_id: task.department_id,
  }), []);

  const handleSaveTask = React.useCallback(async (taskData: TaskModalData) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const payload: TaskPayload = {
        title: taskData.title,
        description: taskData.description,
        status: taskData.id ? taskData.status : newTaskStatus,
        priority: taskData.priority,
        type: taskData.type,
        assigned_to: taskData.assigned_to,
        department_id: taskData.department_id,
        start_date: taskData.start_date?.toISOString(),
        due_date: taskData.due_date?.toISOString(),
        estimated_hours: taskData.estimated_hours,
        tags: taskData.tags,
        created_by: user.id,
        kanban_position: 0, // Will be adjusted by the database
      };

      const result = await saveTask(payload, taskData.id);
      if (result.error) {
        console.error('Error saving task:', result.error);
        throw new Error(result.error);
      }

      await refreshTasks();
      setIsTaskModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error in handleSaveTask:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [user, refreshTasks, newTaskStatus]);

  const handleDeleteTask = React.useCallback(async (taskId: string) => {
    try {
      const result = await deleteTask(taskId);
      if (result.error) {
        console.error('Error deleting task:', result.error);
        throw new Error(result.error);
      }

      await refreshTasks();
      setIsTaskModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error in handleDeleteTask:', error);
      throw error;
    }
  }, [refreshTasks]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === "all" || task.assigned_to === filterAssignee;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const kanbanTasks: KanbanTask[] = filteredTasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    type: task.type,
    assignedTo: task.assigned_to ? {
      id: task.assigned_to,
      name: users.find(u => u.id === task.assigned_to)?.first_name + " " +
        users.find(u => u.id === task.assigned_to)?.last_name || "Unknown",
    } : undefined,
    dueDate: task.due_date ? new Date(task.due_date) : undefined,
    tags: task.tags,
    estimatedHours: task.estimated_hours,
    actualHours: task.actual_hours,
    kanban_position: task.kanban_position,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading kanban board...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Kanban Board</h1>
            <p className="text-gray-400">Manage tasks and reminders</p>
          </div>
          <Button
            onClick={() => handleAddTask('todo')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">To Do</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">{stats.todo}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{stats.in_progress}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{stats.review}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterAssignee} onValueChange={setFilterAssignee}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Filter by assignee" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">All Assignees</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kanban Board */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
          <KanbanBoard
            columns={kanbanColumns}
            tasks={kanbanTasks}
            onTaskMove={handleTaskMove}
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
        </div>

        {/* Task Modal */}
        <TaskModal
          open={isTaskModalOpen}
          onOpenChange={setIsTaskModalOpen}
          task={selectedTask ? convertToTaskModalData(selectedTask) : null}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          departments={departments}
          users={users}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}