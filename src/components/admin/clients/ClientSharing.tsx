'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
    Share2, UserPlus, X, Loader2, User, Trash2
} from 'lucide-react'
import {
    getClientShares,
    getShareableUsers,
    shareClientWithUser,
    unshareClient,
    ClientShare,
    ShareableUser
} from '@/app/actions/client-sharing'

interface ClientSharingProps {
    clientId: string
    clientName: string
}

export default function ClientSharing({ clientId, clientName }: ClientSharingProps) {
    const [shares, setShares] = useState<ClientShare[]>([])
    const [shareableUsers, setShareableUsers] = useState<ShareableUser[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [sharingUserId, setSharingUserId] = useState<string | null>(null)
    const [removingShareId, setRemovingShareId] = useState<string | null>(null)

    const fetchShares = useCallback(async () => {
        const result = await getClientShares(clientId)
        if (result.success && result.data) {
            setShares(result.data)
        }
        setLoading(false)
    }, [clientId])

    const fetchShareableUsers = useCallback(async () => {
        const result = await getShareableUsers(clientId)
        if (result.success && result.data) {
            setShareableUsers(result.data)
        }
    }, [clientId])

    useEffect(() => {
        fetchShares()
    }, [fetchShares])

    useEffect(() => {
        if (dialogOpen) {
            fetchShareableUsers()
        }
    }, [dialogOpen, fetchShareableUsers])

    const handleShare = async (userId: string) => {
        setSharingUserId(userId)
        const result = await shareClientWithUser(clientId, userId)
        if (result.success) {
            fetchShares()
            fetchShareableUsers()
        } else {
            alert(result.error || 'Failed to share')
        }
        setSharingUserId(null)
    }

    const handleUnshare = async (shareId: string) => {
        if (!confirm('Remove this user\'s access to this client?')) return

        setRemovingShareId(shareId)
        const result = await unshareClient(shareId)
        if (result.success) {
            fetchShares()
        } else {
            alert(result.error || 'Failed to remove access')
        }
        setRemovingShareId(null)
    }

    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Shared With
                </CardTitle>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-white">
                                Share "{clientName}" with Team
                            </DialogTitle>
                        </DialogHeader>

                        {shareableUsers.length === 0 ? (
                            <div className="text-center py-6 text-gray-400">
                                <User className="mx-auto h-12 w-12 mb-3 opacity-50" />
                                <p>No team members available to share with</p>
                                <p className="text-sm mt-1">
                                    All team members already have access
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-80 overflow-y-auto">
                                {shareableUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.name}</p>
                                                <p className="text-xs text-gray-400">
                                                    {user.role} • {user.department_name}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => handleShare(user.id)}
                                            disabled={sharingUserId === user.id}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            {sharingUserId === user.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                'Share'
                                            )}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                    </div>
                ) : shares.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">
                        Not shared with anyone yet
                    </p>
                ) : (
                    <div className="space-y-2">
                        {shares.map((share) => (
                            <div
                                key={share.id}
                                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{share.shared_with_name}</p>
                                        <p className="text-xs text-gray-400">
                                            Shared by {share.shared_by_name}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleUnshare(share.id)}
                                    disabled={removingShareId === share.id}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                >
                                    {removingShareId === share.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
