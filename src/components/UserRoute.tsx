'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Loader2, Users } from 'lucide-react'

interface UserRouteProps {
  children: React.ReactNode
}

export default function UserRoute({ children }: UserRouteProps) {
  const { user, profile, loading, isAdmin } = useAuth()
  const router = useRouter()
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected || loading) return
    
    console.log('UserRoute check:', { user: !!user, profile: !!profile, isAdmin, loading })
    
    // Only redirect unauthenticated users to login
    // Admin users should be allowed to access user routes (like dashboard)
    if (!user) {
      console.log('No user found, redirecting to login')
      setHasRedirected(true)
      router.push('/auth/login')
    }
    // If user exists but no profile yet, wait (don't redirect)
  }, [user, profile, loading, isAdmin, router, hasRedirected])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Users className="mx-auto h-16 w-16 text-blue-400 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Please Sign In</h2>
          <p className="text-gray-400">You need to be logged in to access this page.</p>
        </div>
      </div>
    )
  }

  // Allow admin users to access user routes
  // They should be able to view both admin and user interfaces

  return <>{children}</>
}