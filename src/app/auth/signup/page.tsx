'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Loader2, RefreshCw, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import Logo from "@/components/Logo"
import { ERROR_MESSAGES } from "@/lib/errors"

interface Department {
  id: string
  name: string
}

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [departmentId, setDepartmentId] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [departments, setDepartments] = useState<Department[]>([])
  const [departmentsLoading, setDepartmentsLoading] = useState(true)
  const [departmentsError, setDepartmentsError] = useState("")
  
  const { signUp } = useAuth()
  const router = useRouter()

  // Fetch departments function
  const fetchDepartments = async () => {
    setDepartmentsLoading(true)
    setDepartmentsError("")
    
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('id, name')
        .neq('name', 'Admin') // Exclude Admin department from signup
        .order('name')
      
      if (error) {
        console.error('Error fetching departments:', error)
        setDepartmentsError(ERROR_MESSAGES.DEPARTMENT_LOAD_ERROR)
      } else {
        setDepartments(data || [])
        if (data && data.length === 0) {
          setDepartmentsError("No departments available. Please contact support.")
        }
      }
    } catch (err) {
      console.error('Error fetching departments:', err)
      setDepartmentsError(ERROR_MESSAGES.DEPARTMENT_LOAD_ERROR)
    } finally {
      setDepartmentsLoading(false)
    }
  }

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!firstName || !lastName || !email || !departmentId || !password || !confirmPassword) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 12) {
      setError("Password must be at least 12 characters long")
      setLoading(false)
      return
    }

    // Validate password complexity
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSpecialChar) {
      setError("Password must contain uppercase, lowercase, numbers, and special characters")
      setLoading(false)
      return
    }

    const selectedDepartment = departments.find(d => d.id === departmentId)
    
    if (!selectedDepartment) {
      setError("Please select a valid department")
      setLoading(false)
      return
    }

    console.log('Selected department:', selectedDepartment)
    
    const { error: authError } = await signUp(
      email, 
      password, 
      firstName, 
      lastName, 
      selectedDepartment.name
    )
    
    if (authError) {
      console.error('Auth error from signup:', authError)
      setError(authError.message || "Database error saving new user")
      setLoading(false)
    } else {
      console.log('Signup completed successfully')
      // Show success message or redirect to confirmation page
      router.push("/auth/confirm-email")
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-gray-400">Join your team&apos;s knowledge management system</p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-400">
              Sign up to start managing your team&apos;s knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-900/50 border border-red-800 text-red-400 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department" className="text-white">Department</Label>
                
                {departmentsError && (
                  <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {departmentsError}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={fetchDepartments}
                      disabled={departmentsLoading}
                      className="ml-2 h-8 px-3 text-xs border-red-400 text-red-400 hover:bg-red-900/20"
                    >
                      {departmentsLoading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Retry
                        </>
                      )}
                    </Button>
                  </div>
                )}
                
                <Select 
                  value={departmentId} 
                  onValueChange={setDepartmentId} 
                  disabled={departmentsLoading || departmentsError !== "" || departments.length === 0}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-blue-500 data-[placeholder]:text-gray-500">
                    <SelectValue placeholder={
                      departmentsLoading 
                        ? "Loading departments..." 
                        : departmentsError 
                        ? "Please retry loading departments"
                        : departments.length === 0
                        ? "No departments available"
                        : "Select your department"
                    } />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white z-50">
                    {departments.length > 0 ? (
                      departments.map((dept) => (
                        <SelectItem 
                          key={dept.id} 
                          value={dept.id}
                          className="text-white focus:bg-gray-700 focus:text-white cursor-pointer"
                        >
                          {dept.name}
                        </SelectItem>
                      ))
                    ) : departmentsLoading ? (
                      <SelectItem value="loading" disabled className="text-gray-500">
                        <div className="flex items-center">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading departments...
                        </div>
                      </SelectItem>
                    ) : (
                      <SelectItem value="empty" disabled className="text-gray-500">
                        No departments available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                
                {departmentsLoading && !departmentsError && (
                  <p className="text-sm text-gray-500 flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading departments from database...
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
                    required
                    minLength={12}
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
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-400 hover:text-blue-300">
                    Sign in
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