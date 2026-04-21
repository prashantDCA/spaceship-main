'use client'

import { useState, useRef, useEffect, useCallback } from "react"
import { Send, Bot, User, Loader2, Sparkles, AlertCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { chatWithClient, ChatMessage, loadChatHistory, saveChatMessage, clearChatHistory } from "@/app/actions/ai-chat"
import ReactMarkdown from 'react-markdown'

interface ClientChatProps {
    clientId: string
    clientName: string
}

export default function ClientChat({ clientId, clientName }: ClientChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingHistory, setLoadingHistory] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Load chat history when clientId changes
    const loadHistory = useCallback(async () => {
        setLoadingHistory(true)
        setMessages([]) // Clear current messages first
        setError(null)

        try {
            const result = await loadChatHistory(clientId)
            if (result.success && result.messages) {
                setMessages(result.messages)
            } else if (result.error) {
                console.error('Failed to load chat history:', result.error)
                // Don't show error to user for history load - just start fresh
            }
        } catch (err) {
            console.error('Error loading chat history:', err)
        } finally {
            setLoadingHistory(false)
        }
    }, [clientId])

    // Load history when component mounts or clientId changes
    useEffect(() => {
        loadHistory()
    }, [loadHistory])

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, loading])

    const handleSend = async () => {
        if (!input.trim() || loading) return

        const userMsg: ChatMessage = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)
        setError(null)

        // Save user message to database
        await saveChatMessage(clientId, userMsg)

        const result = await chatWithClient(clientId, [...messages, userMsg])

        if (result.success && result.response) {
            const aiMsg: ChatMessage = { role: 'model', content: result.response }
            setMessages(prev => [...prev, aiMsg])

            // Save AI response to database
            await saveChatMessage(clientId, aiMsg)
        } else {
            setError(result.error || "Failed to get response")
        }
        setLoading(false)
    }

    const handleClearChat = async () => {
        if (!confirm("Are you sure you want to clear this chat history? This cannot be undone.")) return

        const result = await clearChatHistory(clientId)
        if (result.success) {
            setMessages([])
        } else {
            setError(result.error || "Failed to clear chat")
        }
    }

    return (
        <div className="flex flex-col h-[600px] bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                        <Sparkles className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-medium">AI Assistant</h3>
                        <p className="text-xs text-gray-400">Context aware chat for {clientName}</p>
                    </div>
                </div>
                {messages.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearChat}
                        className="text-gray-400 hover:text-red-400 hover:bg-gray-800"
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear Chat
                    </Button>
                )}
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-4">
                    {loadingHistory ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400 mt-10">
                            <Loader2 className="h-8 w-8 mb-4 text-blue-500 animate-spin" />
                            <p className="text-sm">Loading chat history...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400 mt-10">
                            <Bot className="h-12 w-12 mb-4 text-gray-600" />
                            <p className="text-lg font-medium text-gray-300">How can I help you with {clientName}?</p>
                            <p className="text-sm max-w-sm mt-2">
                                I have access to their profile, notes, and recent activity. Ask me about their budget, status, or history.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 mt-6">
                                {[
                                    "Summarize recent activity",
                                    "What is their budget?",
                                    "Draft a follow-up email",
                                    "Key risks?"
                                ].map(q => (
                                    <button
                                        key={q}
                                        onClick={() => setInput(q)}
                                        className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-xs text-gray-300 transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div
                                key={msg.id || idx}
                                className={cn(
                                    "flex gap-3 max-w-[85%]",
                                    msg.role === 'user' ? "self-end flex-row-reverse" : "self-start"
                                )}
                            >
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                                    msg.role === 'user' ? "bg-blue-600" : "bg-purple-600"
                                )}>
                                    {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                                </div>

                                <div className={cn(
                                    "p-3 rounded-2xl text-sm leading-relaxed",
                                    msg.role === 'user'
                                        ? "bg-blue-600/20 text-blue-50 border border-blue-500/30 rounded-tr-none"
                                        : "bg-gray-800 text-gray-100 border border-gray-700 rounded-tl-none"
                                )}>
                                    {msg.role === 'user' ? (
                                        msg.content
                                    ) : (
                                        <div className="prose prose-invert prose-sm max-w-none">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}

                    {loading && (
                        <div className="flex gap-3 self-start max-w-[85%]">
                            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                                <Loader2 className="h-4 w-4 text-white animate-spin" />
                            </div>
                            <div className="p-3 bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-none">
                                <span className="text-gray-400 text-sm animate-pulse">Thinking...</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-red-200 text-sm self-center">
                            <AlertCircle className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 bg-gray-800/30 border-t border-gray-700">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                    className="flex gap-2"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about this client..."
                        className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                        disabled={loading || loadingHistory}
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() || loading || loadingHistory}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </form>
            </div>
        </div>
    )
}
