'use client'

import { useEffect, useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Settings, PenTool, Clock, AlertCircle } from "lucide-react"
import AdminRoute from "@/components/AdminRoute"
import Sidebar from "@/components/Sidebar"
import AdminDocuments from "@/components/admin/documents/AdminDocuments"
import AdminClients from "@/components/admin/clients/AdminClients"
import AdminCalendar from "@/components/admin/AdminCalendar"
import AdminKanban from "@/components/admin/AdminKanban"
import AdminTeamMembers from "@/components/admin/team/AdminTeamMembers"
import AdminDepartments from "@/components/admin/departments/AdminDepartments"
import AdminAssets from "@/components/admin/assets/AdminAssets"
import ContentCreator from "@/components/admin/content/ContentCreator"
import ChatPanel from "@/components/user/ChatPanel"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { useRouter, useSearchParams } from "next/navigation"

interface DashboardStats {
  total_members: number
  total_documents: number
  total_departments: number
}

function AdminDashboardContent() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<DashboardStats>({ total_members: 0, total_documents: 0, total_departments: 0 })
  const [loading, setLoading] = useState(true)
  const [contentAlerts, setContentAlerts] = useState<{ pending: number; scheduled: any[] }>({ pending: 0, scheduled: [] })

  const fetchStats = async () => {
    try {
      const [membersResult, documentsResult, departmentsResult] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('documents').select('id', { count: 'exact', head: true }),
        supabase.from('departments').select('id', { count: 'exact', head: true })
      ])

      setStats({
        total_members: membersResult.count || 0,
        total_documents: documentsResult.count || 0,
        total_departments: departmentsResult.count || 0
      })

      // Fetch content alerts
      const { data: pendingPosts } = await supabase
        .from('content_posts')
        .select('id, title, client_id, scheduled_for, status')
        .eq('status', 'pending_review')
        .limit(5)

      const today = new Date()
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

      const { data: scheduledToday } = await supabase
        .from('content_posts')
        .select('id, title, scheduled_for')
        .eq('is_scheduled', true)
        .gte('scheduled_for', startOfDay)
        .lte('scheduled_for', endOfDay)
        .limit(5)

      setContentAlerts({
        pending: pendingPosts?.length || 0,
        scheduled: scheduledToday || []
      })
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchStats()
      } catch (error) {
        console.error('Error loading admin data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Admin Overview</h2>
        <p className="text-gray-400">
          Welcome back, {profile?.first_name}. Here&apos;s an overview of your system.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Members</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.total_members}</div>
            <p className="text-xs text-gray-400">Active team members</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Documents</CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.total_documents}</div>
            <p className="text-xs text-gray-400">Knowledge base articles</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Departments</CardTitle>
            <Settings className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.total_departments}</div>
            <p className="text-xs text-gray-400">Active departments</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Alerts */}
      {(contentAlerts.pending > 0 || contentAlerts.scheduled.length > 0) && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PenTool className="h-5 w-5 text-blue-400" />
              Content Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentAlerts.pending > 0 && (
                <div
                  onClick={() => setActiveTab('content')}
                  className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg cursor-pointer hover:bg-yellow-500/20 transition-colors"
                >
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {contentAlerts.pending} post{contentAlerts.pending > 1 ? 's' : ''} pending approval
                    </p>
                    <p className="text-gray-400 text-xs">Click to review</p>
                  </div>
                </div>
              )}
              {contentAlerts.scheduled.map((post: any) => (
                <div
                  key={post.id}
                  onClick={() => setActiveTab('content')}
                  className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg cursor-pointer hover:bg-blue-500/20 transition-colors"
                >
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {post.title || 'Scheduled Post'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Scheduled for {new Date(post.scheduled_for).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-gray-400">
            Latest team activity and system updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">New member joined the team</p>
                <p className="text-gray-400 text-xs">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">Document updated in Knowledge Base</p>
                <p className="text-gray-400 text-xs">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white text-sm">System maintenance completed</p>
                <p className="text-gray-400 text-xs">3 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">System Settings</h2>
        <p className="text-gray-400">Configure system-wide settings and preferences</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">System Settings</CardTitle>
          <CardDescription className="text-gray-400">
            Configure system-wide settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Settings interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )

  const handleTabChange = (tab: string) => {
    // if (tab === 'freepik-downloader') {
    //   router.push('/admin/freepik')
    // } else if (tab === 'istock-downloader') {
    //   router.push('/admin/istock')
    // } else {
    setActiveTab(tab)
    // }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'members':
        return <AdminTeamMembers />
      case 'messages':
        return <ChatPanel />
      case 'departments':
        return <AdminDepartments />
      case 'assets':
        return <AdminAssets />
      case 'clients':
        return <AdminClients key={activeTab} user={user} />
      case 'content':
        return <ContentCreator key={activeTab} />
      case 'documents':
        return <AdminDocuments key={activeTab} user={user} />
      case 'calendar':
        return <AdminCalendar key={activeTab} />
      case 'kanban':
        return <AdminKanban key={activeTab} />
      case 'settings':
        return renderSettings()
      default:
        return renderOverview()
    }
  }

  return (
    <AdminRoute>
      <div className="flex h-screen bg-black">
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userRole="admin"
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {(activeTab === 'documents' || activeTab === 'clients' || activeTab === 'content' || activeTab === 'calendar' || activeTab === 'kanban') ? (
            <div className="h-full">
              {renderContent()}
            </div>
          ) : (
            <div className="p-8">
              {renderContent()}
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  )
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading admin dashboard...</p>
      </div>
    </div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}