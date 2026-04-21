import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
  fullScreen?: boolean
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8", 
  lg: "h-12 w-12"
}

export function Loading({ 
  size = "md", 
  text, 
  className,
  fullScreen = false 
}: LoadingProps) {
  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center",
      fullScreen && "min-h-screen",
      className
    )}>
      <Loader2 className={cn(
        "animate-spin text-blue-400 mb-2",
        sizeClasses[size]
      )} />
      {text && (
        <p className={cn(
          "text-gray-400",
          size === "sm" && "text-sm",
          size === "lg" && "text-lg"
        )}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}

// Skeleton loading components
export function SkeletonCard() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-2/3"></div>
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 animate-pulse">
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/6"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkeletonForm() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-700 rounded w-full"></div>
        </div>
      ))}
    </div>
  )
}