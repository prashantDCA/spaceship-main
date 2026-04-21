'use client'

import { useState, useEffect } from 'react'
import {
    Newspaper,
    Plus,
    ExternalLink,
    Trash2,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    X,
    Calendar,
    TrendingUp,
    TrendingDown,
    Minus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    getClientIntelligence,
    addClientIntelligence,
    deleteClientIntelligence,
    verifyIntelligence,
    fetchNewsForClient,
    fetchYouTubeDataForClient,
    type ClientIntelligence,
    type CreateIntelligenceData,
} from '@/app/actions/client-intelligence'

interface ClientNewsPanelProps {
    clientId: string
    clientName: string
    youtubeHandle?: string
}

const sourceTypeIcons: Record<string, string> = {
    news: '📰',
    twitter: '𝕏',
    instagram: '📸',
    youtube: '▶️',
    facebook: '📘',
    linkedin: '💼',
    manual: '✏️',
}

const sentimentColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    positive: { bg: 'bg-green-500/20', text: 'text-green-400', icon: TrendingUp },
    negative: { bg: 'bg-red-500/20', text: 'text-red-400', icon: TrendingDown },
    neutral: { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: Minus },
    mixed: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: AlertCircle },
}

export default function ClientNewsPanel({ clientId, clientName, youtubeHandle }: ClientNewsPanelProps) {
    const [intelligence, setIntelligence] = useState<ClientIntelligence[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFetchingNews, setIsFetchingNews] = useState(false)
    const [isFetchingYouTube, setIsFetchingYouTube] = useState(false)
    const [fetchMessage, setFetchMessage] = useState<string | null>(null)
    const [newEntry, setNewEntry] = useState<Partial<CreateIntelligenceData>>({
        source_type: 'news',
        title: '',
        content: '',
        source_url: '',
        source_name: '',
        sentiment: 'neutral',
    })

    const fetchIntelligence = async () => {
        setLoading(true)
        const result = await getClientIntelligence(clientId)
        if (result.data) {
            // Filter out Twitter entries (they have their own tab now)
            const nonTwitterEntries = result.data.filter(item => item.source_type !== 'twitter')
            setIntelligence(nonTwitterEntries)
        }
        setLoading(false)
    }

    useEffect(() => {
        setFetchMessage(null) // Clear fetch message when switching clients
        fetchIntelligence()
    }, [clientId])

    const handleAddEntry = async () => {
        if (!newEntry.title) return

        setIsSubmitting(true)
        const result = await addClientIntelligence({
            client_id: clientId,
            source_type: newEntry.source_type || 'manual',
            title: newEntry.title,
            content: newEntry.content,
            source_url: newEntry.source_url,
            source_name: newEntry.source_name,
            sentiment: newEntry.sentiment,
            published_at: new Date().toISOString(),
        })

        if (result.data) {
            setIntelligence([result.data, ...intelligence])
            setNewEntry({
                source_type: 'news',
                title: '',
                content: '',
                source_url: '',
                source_name: '',
                sentiment: 'neutral',
            })
            setIsAddingNew(false)
        }
        setIsSubmitting(false)
    }

    const handleDelete = async (id: string) => {
        const result = await deleteClientIntelligence(id)
        if (result.success) {
            setIntelligence(intelligence.filter(i => i.id !== id))
        }
    }

    const handleVerify = async (id: string, isVerified: boolean) => {
        const result = await verifyIntelligence(id, isVerified)
        if (result.success) {
            setIntelligence(intelligence.map(i =>
                i.id === id ? { ...i, is_verified: isVerified } : i
            ))
        }
    }

    const handleFetchNews = async () => {
        setIsFetchingNews(true)
        setFetchMessage(null)

        const result = await fetchNewsForClient(clientId, clientName)

        if (result.error) {
            setFetchMessage(`❌ ${result.error}`)
        } else if (result.message) {
            setFetchMessage(`✅ ${result.message}`)
            // Refresh the list
            await fetchIntelligence()
        }

        setIsFetchingNews(false)
    }

    const handleFetchYouTube = async () => {
        if (!youtubeHandle) {
            setFetchMessage('❌ No YouTube handle configured for this client')
            return
        }

        setIsFetchingYouTube(true)
        setFetchMessage(null)

        const result = await fetchYouTubeDataForClient(clientId, youtubeHandle)

        if (result.error) {
            setFetchMessage(`❌ ${result.error}`)
        } else if (result.message) {
            setFetchMessage(`✅ ${result.message}`)
            await fetchIntelligence()
        }

        setIsFetchingYouTube(false)
    }

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'Unknown date'
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <div className="h-full flex flex-col bg-gray-900 rounded-lg border border-gray-700">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Newspaper className="h-5 w-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white">News & Intelligence</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleFetchNews}
                            className="text-purple-400 border-purple-600 hover:bg-purple-600/20"
                            disabled={isFetchingNews}
                        >
                            {isFetchingNews ? (
                                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                                <Newspaper className="h-4 w-4 mr-1" />
                            )}
                            {isFetchingNews ? 'Fetching...' : 'Fetch News'}
                        </Button>
                        {youtubeHandle && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleFetchYouTube}
                                className="text-red-400 border-red-600 hover:bg-red-600/20"
                                disabled={isFetchingYouTube}
                            >
                                {isFetchingYouTube ? (
                                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                    <span className="mr-1">▶️</span>
                                )}
                                {isFetchingYouTube ? 'Fetching...' : 'YouTube'}
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={fetchIntelligence}
                            className="text-gray-400 hover:text-white"
                            disabled={loading}
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setIsAddingNew(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                    </div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                    Recent news and social media about {clientName}
                </p>
                {fetchMessage && (
                    <p className={`text-sm mt-2 ${fetchMessage.startsWith('❌') ? 'text-red-400' : 'text-green-400'}`}>
                        {fetchMessage}
                    </p>
                )}
            </div>

            {/* Add New Form */}
            {isAddingNew && (
                <div className="p-4 border-b border-gray-700 bg-gray-800/50">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-white font-medium">Add News/Update</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddingNew(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-gray-400 text-xs">Source Type</Label>
                                <Select
                                    value={newEntry.source_type}
                                    onValueChange={(value: any) => setNewEntry(prev => ({ ...prev, source_type: value }))}
                                >
                                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-600">
                                        <SelectItem value="news" className="text-white">📰 News Article</SelectItem>
                                        <SelectItem value="twitter" className="text-white">𝕏 Twitter/X</SelectItem>
                                        <SelectItem value="instagram" className="text-white">📸 Instagram</SelectItem>
                                        <SelectItem value="youtube" className="text-white">▶️ YouTube</SelectItem>
                                        <SelectItem value="facebook" className="text-white">📘 Facebook</SelectItem>
                                        <SelectItem value="linkedin" className="text-white">💼 LinkedIn</SelectItem>
                                        <SelectItem value="manual" className="text-white">✏️ Manual Entry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-gray-400 text-xs">Sentiment</Label>
                                <Select
                                    value={newEntry.sentiment}
                                    onValueChange={(value: any) => setNewEntry(prev => ({ ...prev, sentiment: value }))}
                                >
                                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-600">
                                        <SelectItem value="positive" className="text-white">😊 Positive</SelectItem>
                                        <SelectItem value="neutral" className="text-white">😐 Neutral</SelectItem>
                                        <SelectItem value="negative" className="text-white">😞 Negative</SelectItem>
                                        <SelectItem value="mixed" className="text-white">🤔 Mixed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-gray-400 text-xs">Title *</Label>
                            <Input
                                value={newEntry.title}
                                onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                                className="bg-gray-800 border-gray-600 text-white text-sm"
                                placeholder="Headline or title..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-gray-400 text-xs">Source Name</Label>
                                <Input
                                    value={newEntry.source_name}
                                    onChange={(e) => setNewEntry(prev => ({ ...prev, source_name: e.target.value }))}
                                    className="bg-gray-800 border-gray-600 text-white text-sm"
                                    placeholder="e.g., Times of India"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-400 text-xs">Source URL</Label>
                                <Input
                                    value={newEntry.source_url}
                                    onChange={(e) => setNewEntry(prev => ({ ...prev, source_url: e.target.value }))}
                                    className="bg-gray-800 border-gray-600 text-white text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-gray-400 text-xs">Content/Summary</Label>
                            <Textarea
                                value={newEntry.content}
                                onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                                className="bg-gray-800 border-gray-600 text-white text-sm"
                                placeholder="Key points or full content..."
                                rows={3}
                            />
                        </div>

                        <Button
                            onClick={handleAddEntry}
                            disabled={!newEntry.title || isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Entry'}
                        </Button>
                    </div>
                </div>
            )}

            {/* Intelligence List */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <RefreshCw className="h-6 w-6 text-gray-400 animate-spin" />
                    </div>
                ) : intelligence.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                        <Newspaper className="h-8 w-8 mb-2" />
                        <p className="text-sm">No news or intelligence yet</p>
                        <p className="text-xs">Click "Add" to add news about this client</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-700">
                        {intelligence.map((item) => {
                            const sentiment = sentimentColors[item.sentiment || 'neutral']
                            const SentimentIcon = sentiment.icon

                            return (
                                <div
                                    key={item.id}
                                    className="p-4 hover:bg-gray-800/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            {/* Title & Source */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-lg">{sourceTypeIcons[item.source_type]}</span>
                                                <h4 className="text-white font-medium text-sm line-clamp-2">
                                                    {item.title}
                                                </h4>
                                            </div>

                                            {/* Meta info */}
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                {item.source_name && (
                                                    <span className="text-xs text-gray-400">{item.source_name}</span>
                                                )}
                                                <span className="text-xs text-gray-500">•</span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(item.published_at)}
                                                </span>
                                                {item.sentiment && (
                                                    <>
                                                        <span className="text-xs text-gray-500">•</span>
                                                        <Badge className={`${sentiment.bg} ${sentiment.text} text-xs flex items-center gap-1`}>
                                                            <SentimentIcon className="h-3 w-3" />
                                                            {item.sentiment}
                                                        </Badge>
                                                    </>
                                                )}
                                                {item.is_verified && (
                                                    <Badge className="bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
                                                        <CheckCircle className="h-3 w-3" />
                                                        Verified
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Content */}
                                            {item.content && (
                                                <p className="text-gray-300 text-xs mt-2 line-clamp-2">
                                                    {item.content}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1 shrink-0">
                                            {item.source_url && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => window.open(item.source_url, '_blank')}
                                                    className="text-gray-400 hover:text-white h-8 w-8 p-0"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {!item.is_verified && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleVerify(item.id, true)}
                                                    className="text-gray-400 hover:text-green-400 h-8 w-8 p-0"
                                                    title="Mark as verified"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(item.id)}
                                                className="text-gray-400 hover:text-red-400 h-8 w-8 p-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
