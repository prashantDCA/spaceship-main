import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Loading component for dynamic imports
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="text-center">
      <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
)

// Lazy load heavy components for better initial page load
export const LazyAdminDashboard = dynamic(
  () => import('@/app/admin/page').then(mod => ({ default: mod.default })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false // Admin dashboard doesn't need SSR
  }
)

export const LazyDashboard = dynamic(
  () => import('@/app/dashboard/page').then(mod => ({ default: mod.default })),
  {
    loading: () => <LoadingSpinner />,
    ssr: false // Dashboard doesn't need SSR since it's protected
  }
)

// Lazy load auth components (these can be SSR'd for SEO)
export const LazyLoginPage = dynamic(
  () => import('@/app/auth/login/page'),
  {
    loading: () => <LoadingSpinner />
  }
)

export const LazySignupPage = dynamic(
  () => import('@/app/auth/signup/page'),
  {
    loading: () => <LoadingSpinner />
  }
)

export const LazyForgotPasswordPage = dynamic(
  () => import('@/app/auth/forgot-password/page'),
  {
    loading: () => <LoadingSpinner />
  }
)

export const LazyResetPasswordPage = dynamic(
  () => import('@/app/auth/reset-password/page'),
  {
    loading: () => <LoadingSpinner />
  }
)

export const LazyConfirmEmailPage = dynamic(
  () => import('@/app/auth/confirm-email/page'),
  {
    loading: () => <LoadingSpinner />
  }
)

// Lazy load heavy UI components
export const LazySidebar = dynamic(
  () => import('@/components/Sidebar'),
  {
    loading: () => (
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <LoadingSpinner />
      </div>
    ),
    ssr: false
  }
)

// Future components can be added here as needed

// Export loading component for reuse
export { LoadingSpinner }