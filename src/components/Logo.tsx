import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
}

const sizeMap = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 40, height: 40 },
  xl: { width: 48, height: 48 }
}

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const { width, height } = sizeMap[size]
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/logos/logo-white.svg"
        alt="ANYA SEGEN Logo"
        width={width}
        height={height}
        className="flex-shrink-0"
        priority
      />
      {showText && (
        <h1 className={`font-bold text-white ${
          size === 'sm' ? 'text-lg' : 
          size === 'md' ? 'text-xl' : 
          size === 'lg' ? 'text-2xl' : 
          'text-3xl'
        }`}>
          ANYA SEGEN
        </h1>
      )}
    </div>
  )
}