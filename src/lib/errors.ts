// Centralized error handling and user-friendly messages

export interface AppError {
  message: string
  code?: string
  severity: 'low' | 'medium' | 'high'
}

// Generic error messages that don't expose system internals
export const ERROR_MESSAGES = {
  AUTHENTICATION_FAILED: 'Authentication failed. Please check your credentials and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  PROFILE_NOT_FOUND: 'User profile not found. Please contact support.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  SIGNUP_FAILED: 'Account creation failed. Please try again.',
  PASSWORD_WEAK: 'Password must be at least 12 characters long and include uppercase, lowercase, numbers, and special characters.',
  EMAIL_INVALID: 'Please enter a valid email address.',
  REQUIRED_FIELD: 'This field is required.',
  DEPARTMENT_LOAD_ERROR: 'Unable to load departments. Please refresh the page and try again.',
  DOCUMENT_SAVE_ERROR: 'Unable to save document. Please try again.',
  USER_UPDATE_ERROR: 'Unable to update user information. Please try again.',
} as const

// Map technical errors to user-friendly messages
export const mapErrorToUserMessage = (error: any): AppError => {
  // Log the actual error for debugging (server-side only)
  if (typeof window === 'undefined') {
    console.error('Technical error:', error)
  }

  // Supabase authentication errors
  if (error?.message?.includes('Invalid login credentials')) {
    return {
      message: ERROR_MESSAGES.AUTHENTICATION_FAILED,
      code: 'AUTH_INVALID_CREDENTIALS',
      severity: 'medium'
    }
  }

  if (error?.message?.includes('Email not confirmed')) {
    return {
      message: 'Please check your email and click the confirmation link before signing in.',
      code: 'AUTH_EMAIL_NOT_CONFIRMED',
      severity: 'medium'
    }
  }

  if (error?.message?.includes('User already registered')) {
    return {
      message: 'An account with this email already exists. Please sign in instead.',
      code: 'AUTH_USER_EXISTS',
      severity: 'low'
    }
  }

  // Network errors
  if (error?.name === 'NetworkError' || error?.code === 'NETWORK_ERROR') {
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      code: 'NETWORK_ERROR',
      severity: 'medium'
    }
  }

  // Validation errors
  if (error?.code === 'VALIDATION_ERROR' || error?.message?.includes('validation')) {
    return {
      message: ERROR_MESSAGES.VALIDATION_ERROR,
      code: 'VALIDATION_ERROR',
      severity: 'low'
    }
  }

  // Permission errors
  if (error?.code === 'PGRST301' || error?.message?.includes('permission')) {
    return {
      message: ERROR_MESSAGES.UNAUTHORIZED,
      code: 'UNAUTHORIZED',
      severity: 'medium'
    }
  }

  // Default to generic server error
  return {
    message: ERROR_MESSAGES.SERVER_ERROR,
    code: 'UNKNOWN_ERROR',
    severity: 'high'
  }
}

// Input validation helpers
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return ERROR_MESSAGES.REQUIRED_FIELD
  if (!emailRegex.test(email)) return ERROR_MESSAGES.EMAIL_INVALID
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return ERROR_MESSAGES.REQUIRED_FIELD
  if (password.length < 12) return ERROR_MESSAGES.PASSWORD_WEAK
  
  // Check for complexity
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  
  if (!hasUppercase || !hasLowercase || !hasNumbers || !hasSpecialChar) {
    return ERROR_MESSAGES.PASSWORD_WEAK
  }
  
  return null
}

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`
  }
  return null
}

// Sanitize user input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000) // Limit length
}

// Rate limiting helper
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>()
  
  return (identifier: string): boolean => {
    const now = Date.now()
    const userAttempts = attempts.get(identifier)
    
    if (!userAttempts || now > userAttempts.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs })
      return true
    }
    
    if (userAttempts.count >= maxAttempts) {
      return false
    }
    
    userAttempts.count++
    return true
  }
}