'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Target, Plus, Trash2, Save, Loader2, AlertCircle, CheckCircle,
    GripVertical, ArrowUp, ArrowDown
} from 'lucide-react'
import {
    getManifestoPriorities,
    updateManifestoPriorities,
    ManifestoPriority,
} from '@/app/actions/client-demographics'
import { COMMON_MANIFESTO_THEMES } from '@/lib/demographics-constants'

interface ManifestoPrioritiesProps {
    clientId: string
    clientName: string
}

export default function ManifestoPriorities({ clientId, clientName }: ManifestoPrioritiesProps) {
    const [priorities, setPriorities] = useState<ManifestoPriority[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [newTheme, setNewTheme] = useState('')

    useEffect(() => {
        fetchPriorities()
    }, [clientId])

    const fetchPriorities = async () => {
        setLoading(true)
        const result = await getManifestoPriorities(clientId)
        if (result.data) {
            setPriorities(result.data)
        }
        setLoading(false)
    }

    const handleSave = async () => {
        setSaving(true)
        setMessage(null)

        const result = await updateManifestoPriorities(clientId, priorities)

        if (result.error) {
            setMessage({ type: 'error', text: result.error })
        } else {
            setMessage({ type: 'success', text: 'Manifesto priorities saved!' })
        }
        setSaving(false)

        setTimeout(() => setMessage(null), 3000)
    }

    const totalWeight = priorities.reduce((sum, p) => sum + p.weight, 0)

    const addPriority = (theme: string) => {
        if (!theme.trim()) return
        if (priorities.some(p => p.theme.toLowerCase() === theme.toLowerCase())) {
            setMessage({ type: 'error', text: 'Theme already exists' })
            return
        }

        // Calculate remaining weight
        const remainingWeight = Math.max(0, 100 - totalWeight)
        const newWeight = remainingWeight > 0 ? Math.min(20, remainingWeight) : 0

        setPriorities([...priorities, { theme: theme.trim(), weight: newWeight }])
        setNewTheme('')
    }

    const removePriority = (index: number) => {
        setPriorities(priorities.filter((_, i) => i !== index))
    }

    const updateWeight = (index: number, weight: number) => {
        const newPriorities = [...priorities]
        newPriorities[index].weight = Math.max(0, Math.min(100, weight))
        setPriorities(newPriorities)
    }

    const movePriority = (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === priorities.length - 1)
        ) return

        const newPriorities = [...priorities]
        const newIndex = direction === 'up' ? index - 1 : index + 1
        const temp = newPriorities[index]
        newPriorities[index] = newPriorities[newIndex]
        newPriorities[newIndex] = temp
        setPriorities(newPriorities)
    }

    const distributeEvenly = () => {
        if (priorities.length === 0) return
        const evenWeight = Math.floor(100 / priorities.length)
        const remainder = 100 - (evenWeight * priorities.length)

        setPriorities(priorities.map((p, i) => ({
            ...p,
            weight: evenWeight + (i === 0 ? remainder : 0)
        })))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Manifesto Priorities
                    </h3>
                    <p className="text-sm text-gray-400">
                        Define key themes and their importance for {clientName}'s messaging
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={distributeEvenly}
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                        disabled={priorities.length === 0}
                    >
                        Distribute Evenly
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving || totalWeight !== 100}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {saving ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        Save Priorities
                    </Button>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                    }`}>
                    {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {message.text}
                </div>
            )}

            {/* Weight Status */}
            <Card className={`border-2 ${totalWeight === 100
                ? 'bg-green-900/20 border-green-600'
                : totalWeight > 100
                    ? 'bg-red-900/20 border-red-600'
                    : 'bg-yellow-900/20 border-yellow-600'
                }`}>
                <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Total Weight</span>
                        <span className={`text-2xl font-bold ${totalWeight === 100 ? 'text-green-400' :
                            totalWeight > 100 ? 'text-red-400' : 'text-yellow-400'
                            }`}>
                            {totalWeight}%
                        </span>
                    </div>
                    {totalWeight !== 100 && (
                        <p className="text-sm mt-1 text-gray-400">
                            {totalWeight < 100
                                ? `Add ${100 - totalWeight}% more weight`
                                : `Remove ${totalWeight - 100}% weight`
                            }
                        </p>
                    )}
                    {/* Visual bar */}
                    <div className="mt-3 h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all ${totalWeight === 100 ? 'bg-green-500' :
                                totalWeight > 100 ? 'bg-red-500' : 'bg-yellow-500'
                                }`}
                            style={{ width: `${Math.min(totalWeight, 100)}%` }}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Priorities List */}
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm">Theme Priorities</CardTitle>
                    <CardDescription>
                        Higher weighted themes will be emphasized more in AI-generated content
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {priorities.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>No priorities defined yet</p>
                            <p className="text-sm">Add themes below to get started</p>
                        </div>
                    ) : (
                        priorities.map((priority, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg"
                            >
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => movePriority(index, 'up')}
                                        disabled={index === 0}
                                        className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                                    >
                                        <ArrowUp className="h-3 w-3" />
                                    </button>
                                    <button
                                        onClick={() => movePriority(index, 'down')}
                                        disabled={index === priorities.length - 1}
                                        className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                                    >
                                        <ArrowDown className="h-3 w-3" />
                                    </button>
                                </div>

                                <div className="flex-1">
                                    <div className="font-medium text-white">{priority.theme}</div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={priority.weight}
                                            onChange={(e) => updateWeight(index, parseInt(e.target.value))}
                                            className="flex-1 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                                        />
                                        <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={priority.weight}
                                            onChange={(e) => updateWeight(index, parseInt(e.target.value) || 0)}
                                            className="w-20 bg-gray-800 border-gray-600 text-white text-center"
                                        />
                                        <span className="text-gray-400">%</span>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removePriority(index)}
                                    className="text-gray-400 hover:text-red-400"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Add New Priority */}
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Theme
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-3">
                        <Input
                            placeholder="Enter custom theme..."
                            value={newTheme}
                            onChange={(e) => setNewTheme(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addPriority(newTheme)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                        <Button
                            onClick={() => addPriority(newTheme)}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-400 w-full mb-1">Quick add:</span>
                        {COMMON_MANIFESTO_THEMES
                            .filter(t => !priorities.some(p => p.theme === t))
                            .slice(0, 12)
                            .map(theme => (
                                <button
                                    key={theme}
                                    onClick={() => addPriority(theme)}
                                    className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
                                >
                                    + {theme}
                                </button>
                            ))
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
