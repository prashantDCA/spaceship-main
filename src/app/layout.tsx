import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals-simple.css'
import { AuthProvider } from '@/lib/auth'
import ErrorBoundary from '@/components/ErrorBoundary'
import SWRProvider from '@/components/SWRProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ANYA SEGEN',
  description: 'Knowledge Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <ErrorBoundary>
          <SWRProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </SWRProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
