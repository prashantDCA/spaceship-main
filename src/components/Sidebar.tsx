'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  BookOpen,
  Search,
  Bell,
  User,
  Building2,
  Calendar,
  Kanban,
  Download,
  Video,
  Briefcase,
  MessageCircle,
  PenTool
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Logo from "@/components/Logo"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userRole?: 'admin' | 'user'
}

export default function Sidebar({ activeTab, onTabChange, userRole }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { profile, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    console.log('🔄 Sidebar: Starting sign out...')
    try {
      await signOut()
      // signOut function handles the redirect, so we don't need to call router.push here
    } catch (error) {
      console.error('❌ Sidebar: Sign out error:', error)
      // Fallback redirect if signOut fails
      router.push('/')
    }
  }

  const userMenuItems = [
    { id: 'clients', label: 'My Clients', icon: Building2 },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'My Profile', icon: User },
  ]

  const adminMenuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'members', label: 'Team Members', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'assets', label: 'Asset Library', icon: FileText },
    { id: 'departments', label: 'Departments', icon: Briefcase },
    { id: 'clients', label: 'Clients', icon: Building2 },
    { id: 'content', label: 'Content', icon: PenTool },
    { id: 'documents', label: 'KB Documents', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'kanban', label: 'Kanban Board', icon: Kanban },
    // { id: 'freepik-downloader', label: 'Freepik Downloader', icon: Download },
    // { id: 'istock-downloader', label: 'iStock Manager', icon: Video },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems

  return (
    <div className={`bg-gray-900 border-r border-gray-800 h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
      }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && <Logo size="md" />}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* User Info & Sign Out */}
      <div className="p-4 border-t border-gray-800">
        {!isCollapsed && (
          <div className="mb-3">
            <p className="text-sm font-medium text-white">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-xs text-gray-400 capitalize">{userRole}</p>
          </div>
        )}
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className={`w-full ${isCollapsed ? 'px-2' : ''} text-gray-400 hover:text-white hover:bg-gray-800`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}