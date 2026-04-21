'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import Logo from "@/components/Logo"
import { mapErrorToUserMessage, validateEmail, validateRequired } from "@/lib/errors"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { signIn, user, profile, isAdmin } = useAuth()
  const router = useRouter()

  // Handle redirect when user is authenticated
  useEffect(() => {
    console.log('Login useEffect - user:', !!user, 'loading:', loading, 'isAdmin:', isAdmin, 'profile:', !!profile)
    // Only redirect if we have a valid authenticated user and profile is loaded
    if (user && profile && !loading) {
      const redirectUrl = isAdmin ? '/admin' : '/dashboard'
      console.log('User authenticated, redirecting to:', redirectUrl)
      // Use hard redirect to ensure cookies are properly set for middleware
      window.location.href = redirectUrl
    }
  }, [user, profile, loading, isAdmin, router])

  // Backup redirect mechanism - if user is authenticated but redirect didn't happen
  useEffect(() => {
    if (user && !loading) {
      const timer = setTimeout(() => {
        if (window.location.pathname === '/auth/login') {
          console.log('Backup redirect triggered - user still on login page')
          // If we're still on login page after 2 seconds, force redirect
          // Let middleware handle the proper redirect based on role
          window.location.href = '/dashboard'
        }
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [user, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Client-side validation
    const emailError = validateEmail(email)
    const passwordError = validateRequired(password, "Password")

    if (emailError) {
      setError(emailError)
      setLoading(false)
      return
    }

    if (passwordError) {
      setError(passwordError)
      setLoading(false)
      return
    }

    try {
      console.log('Starting sign in...')
      
      // Use the signIn method from AuthProvider for better state management
      const { error: authError } = await signIn(email, password)
      
      if (authError) {
        console.error('Sign in error:', authError)
        const userError = mapErrorToUserMessage(authError)
        setError(userError.message)
        setLoading(false)
      } else {
        console.log('Sign in successful, waiting for auth state...')
        // Reset loading state so useEffect can trigger redirect
        setLoading(false)
        // The useEffect will handle the proper redirect based on role
        // No fallback redirect needed - let the useEffect handle it
      }
    } catch (error) {
      console.error('Sign in catch error:', error)
      const userError = mapErrorToUserMessage(error)
      setError(userError.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-gray-400">Welcome back to your knowledge hub</p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-900/50 border border-red-800 text-red-400 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}