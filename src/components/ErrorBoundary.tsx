'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Log error to monitoring service in production
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      // Add your error reporting service here
      // e.g., Sentry, LogRocket, etc.
    }

    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Something went wrong</CardTitle>
                <CardDescription className="text-gray-400">
                  An unexpected error occurred. Our team has been notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">
                    If this problem persists, please contact support with the following information:
                  </p>
                  <code className="text-xs text-red-400 block bg-gray-900 p-2 rounded">
                    {this.state.error?.message || 'Unknown error'}
                  </code>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={this.handleReset}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={this.handleReload}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Reload Page
                  </Button>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="text-sm text-gray-400 cursor-pointer hover:text-white">
                      Debug Information (Development Only)
                    </summary>
                    <pre className="text-xs text-gray-500 mt-2 p-2 bg-gray-900 rounded overflow-auto max-h-40">
                      {this.state.error?.stack}
                      {'\n\nComponent Stack:'}
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary