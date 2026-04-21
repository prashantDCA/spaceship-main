'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Logo from "@/components/Logo"
import { supabase } from "@/lib/supabase"
import { mapErrorToUserMessage, validateEmail } from "@/lib/errors"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate email
    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      setLoading(false)
      return
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (resetError) {
        const userError = mapErrorToUserMessage(resetError)
        setError(userError.message)
      } else {
        setSuccess(true)
      }
    } catch (error) {
      const userError = mapErrorToUserMessage(error)
      setError(userError.message)
    } finally {
      setLoading(false)
    }
  }

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
              <CardTitle className="text-white">Check Your Email</CardTitle>
              <CardDescription className="text-gray-400">
                We&apos;ve sent a password reset link to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-400 text-center">
                Click the link in the email to reset your password. If you don&apos;t see the email, check your spam folder.
              </p>
              
              <div className="text-center">
                <Link 
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to login
                </Link>
              </div>
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
            <CardTitle className="text-white">Reset Your Password</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                  disabled={loading}
                />
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
                    Sending Reset Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/auth/login"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}