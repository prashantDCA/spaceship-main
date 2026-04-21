import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function AuthCodeError() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-gray-900 border-gray-800">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <CardTitle className="text-white text-xl">Authentication Error</CardTitle>
                    <CardDescription className="text-gray-400">
                        There was a problem verifying your identity.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm text-gray-300 text-center">
                        <p>This usually happens if:</p>
                        <ul className="list-disc list-inside mt-2 text-left space-y-1">
                            <li>The link has expired</li>
                            <li>The link has already been used</li>
                            <li>The link was malformed</li>
                        </ul>
                    </div>

                    <div className="pt-4">
                        <Link href="/auth/login" className="w-full">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
