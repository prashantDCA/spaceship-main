'use client'

import { SWRConfig } from 'swr'
import { ReactNode } from 'react'

interface SWRProviderProps {
    children: ReactNode
}

export default function SWRProvider({ children }: SWRProviderProps) {
    return (
        <SWRConfig
            value={{
                // Revalidate on focus after 5 minutes
                revalidateOnFocus: true,
                focusThrottleInterval: 300000, // 5 minutes

                // Don't revalidate on reconnect too aggressively
                revalidateOnReconnect: true,

                // Dedupe requests within 2 seconds
                dedupingInterval: 2000,

                // Keep previous data while revalidating
                keepPreviousData: true,

                // Retry failed requests 3 times
                errorRetryCount: 3,
                errorRetryInterval: 5000,

                // Global error handler
                onError: (error, key) => {
                    console.error(`SWR Error [${key}]:`, error)
                },
            }}
        >
            {children}
        </SWRConfig>
    )
}
