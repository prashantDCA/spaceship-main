'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import Logo from "@/components/Logo"
import { supabase } from "@/lib/supabase"
import { mapErrorToUserMessage, validatePassword } from "@/lib/errors"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [validToken, setValidToken] = useState<boolean | null>(null)

  const router = useRouter()

  useEffect(() => {
    const handleResetToken = async () => {
      // Check for tokens in URL hash first
      const hash = window.location.hash

      if (hash && hash.length > 1) {
        const params = new URLSearchParams(hash.substring(1))
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')
        const type = params.get('type')

        console.log('Reset token check:', { hasAccess: !!accessToken, hasRefresh: !!refreshToken, type })

        if (accessToken && refreshToken) {
          // Set the session from the tokens
          supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          }).then(({ error }) => {
            if (error) {
              console.error('Error setting session:', error)
              setValidToken(false)
            } else {
              console.log('Session set successfully from hash tokens')
              // Clear the hash from URL
              window.history.replaceState(null, '', window.location.pathname)
              setValidToken(true)
            }
          })
          return
        }
      }

      // If no hash tokens, check for existing session
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        setValidToken(true)
      } else {
        // Wait a bit for auth state change listener
        setTimeout(() => {
          if (validToken === null) {
            setValidToken(false)
          }
        }, 3000)
      }
    }

    handleResetToken()

    // Listen for auth state changes (when user clicks reset link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log('Auth event in reset-password:', event)
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setValidToken(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate password
    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      setLoading(false)
      return
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      })

      if (updateError) {
        const userError = mapErrorToUserMessage(updateError)
        setError(userError.message)
      } else {
        setSuccess(true)
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      }
    } catch (error) {
      const userError = mapErrorToUserMessage(error)
      setError(userError.message)
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking token validity
  if (validToken === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
          <p className="text-gray-400">Verifying reset link...</p>
        </div>
      </div>
    )
  }

  // Show error if token is invalid
  if (validToken === false) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Invalid Reset Link</CardTitle>
              <CardDescription className="text-gray-400">
                This password reset link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-400 mb-4">
                Please request a new password reset link.
              </p>
              <Link
                href="/auth/forgot-password"
                className="text-blue-400 hover:text-blue-300"
              >
                Request new reset link
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show success message
  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Password Updated</CardTitle>
              <CardDescription className="text-gray-400">
                Your password has been successfully updated.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-400">
                You will be redirected to the login page in a few seconds...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Set New Password</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white pr-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  Password must be at least 12 characters with uppercase, lowercase, numbers, and special characters.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white pr-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}