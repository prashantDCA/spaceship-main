'use client'

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import Logo from "@/components/Logo"
import { supabase } from "@/lib/supabase"
import { mapErrorToUserMessage } from "@/lib/errors"

function ConfirmEmailContent() {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'loading' | 'success' | 'error'>('pending')
  const [error, setError] = useState("")
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Check for verification tokens/codes in URL
  useEffect(() => {
    const checkVerification = async () => {
      // Check if we have verification parameters
      const accessToken = searchParams.get('access_token')
      const refreshToken = searchParams.get('refresh_token')
      const type = searchParams.get('type')
      
      if (accessToken && refreshToken && type === 'signup') {
        setVerificationStatus('loading')
        
        try {
          // Set the session with the tokens
          const { data: { session }, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          
          if (error) {
            console.error('Verification error:', error)
            const userError = mapErrorToUserMessage(error)
            setError(userError.message)
            setVerificationStatus('error')
          } else if (session) {
            setVerificationStatus('success')
            // Redirect to dashboard after successful verification
            setTimeout(() => {
              router.push('/dashboard')
            }, 3000)
          } else {
            setError('Verification failed. Please try again.')
            setVerificationStatus('error')
          }
        } catch (err) {
          console.error('Verification error:', err)
          const userError = mapErrorToUserMessage(err)
          setError(userError.message)
          setVerificationStatus('error')
        }
      }
      // If no verification params, stay in pending state (user just signed up)
    }
    
    checkVerification()
  }, [searchParams, router])

  const handleResendVerification = async () => {
    setResendLoading(true)
    setResendMessage("")
    setError("")
    
    try {
      // We can't resend without email, so guide user to sign up again
      setResendMessage("Please try signing up again to receive a new verification email.")
    } catch (err) {
      const userError = mapErrorToUserMessage(err)
      setError(userError.message)
    } finally {
      setResendLoading(false)
    }
  }

  // Show verification in progress
  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
              <CardTitle className="text-white">Verifying Your Email</CardTitle>
              <CardDescription className="text-gray-400">
                Please wait while we verify your email address...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  // Show verification success
  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white">Email Verified!</CardTitle>
              <CardDescription className="text-gray-400">
                Your email has been successfully verified
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-300">
                Welcome to ANYA SEGEN! Your account is now active and you can start using the platform.
              </p>
              
              <div className="bg-green-900/30 border border-green-800 rounded-lg p-4">
                <p className="text-green-300 text-sm">
                  You will be redirected to your dashboard in a few seconds...
                </p>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => router.push('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show verification error
  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" />
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <XCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white">Verification Failed</CardTitle>
              <CardDescription className="text-gray-400">
                We couldn&apos;t verify your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <p className="text-gray-300">
                This verification link may have expired or is invalid. Please try signing up again.
              </p>

              <div className="space-y-2">
                <Button 
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  {resendLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Get Help
                    </>
                  )}
                </Button>
                
                {resendMessage && (
                  <p className="text-blue-400 text-sm">{resendMessage}</p>
                )}
              </div>

              <div className="pt-4">
                <Link 
                  href="/auth/signup" 
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Try signing up again
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Default pending state (user just signed up)
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-white">Check Your Email</CardTitle>
            <CardDescription className="text-gray-400">
              We&apos;ve sent you a verification link
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-300">
              We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to complete your registration.
            </p>
            
            <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                <strong>Didn&apos;t receive the email?</strong><br />
                Check your spam folder or try signing up again.
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleResendVerification}
                disabled={resendLoading}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                {resendLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Need Help?
                  </>
                )}
              </Button>
              
              {resendMessage && (
                <p className="text-blue-400 text-sm">{resendMessage}</p>
              )}
            </div>

            <div className="pt-4">
              <Link 
                href="/auth/login" 
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Back to Sign In
              </Link>
            </div>
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

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <ConfirmEmailContent />
    </Suspense>
  )
}