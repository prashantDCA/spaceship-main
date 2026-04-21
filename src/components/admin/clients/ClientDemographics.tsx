'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    MapPin, Users, Vote, BookOpen, Building2, Sparkles,
    Save, Loader2, AlertCircle, CheckCircle
} from 'lucide-react'
import {
    getClientDemographics,
    upsertClientDemographics,
    ClientDemographics as DemographicsType,
    UpsertDemographicsData,
} from '@/app/actions/client-demographics'
import {
    INDIAN_STATES,
    REGIONS,
    COMMON_ISSUES
} from '@/lib/demographics-constants'

interface ClientDemographicsProps {
    clientId: string
    clientName: string
}

export default function ClientDemographics({ clientId, clientName }: ClientDemographicsProps) {
    const [demographics, setDemographics] = useState<DemographicsType | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Form state
    const [formData, setFormData] = useState<UpsertDemographicsData>({
        constituency_name: '',
        state: '',
        region: '',
        total_population: undefined,
        urban_percentage: undefined,
        rural_percentage: undefined,
        male_percentage: undefined,
        female_percentage: undefined,
        age_18_25: undefined,
        age_26_35: undefined,
        age_36_50: undefined,
        age_51_65: undefined,
        age_65_plus: undefined,
        total_voters: undefined,
        voter_turnout_percentage: undefined,
        literacy_rate: undefined,
        primary_languages: [],
        top_issues: [],
        local_industries: [],
        major_festivals: [],
        cultural_notes: '',
        data_source: ''
    })

    useEffect(() => {
        fetchDemographics()
    }, [clientId])

    const fetchDemographics = async () => {
        setLoading(true)
        const result = await getClientDemographics(clientId)
        if (result.data) {
            setDemographics(result.data)
            setFormData({
                constituency_name: result.data.constituency_name || '',
                state: result.data.state || '',
                region: result.data.region || '',
                total_population: result.data.total_population || undefined,
                urban_percentage: result.data.urban_percentage || undefined,
                rural_percentage: result.data.rural_percentage || undefined,
                male_percentage: result.data.male_percentage || undefined,
                female_percentage: result.data.female_percentage || undefined,
                age_18_25: result.data.age_18_25 || undefined,
                age_26_35: result.data.age_26_35 || undefined,
                age_36_50: result.data.age_36_50 || undefined,
                age_51_65: result.data.age_51_65 || undefined,
                age_65_plus: result.data.age_65_plus || undefined,
                total_voters: result.data.total_voters || undefined,
                voter_turnout_percentage: result.data.voter_turnout_percentage || undefined,
                literacy_rate: result.data.literacy_rate || undefined,
                primary_languages: result.data.primary_languages || [],
                top_issues: result.data.top_issues || [],
                local_industries: result.data.local_industries || [],
                major_festivals: result.data.major_festivals || [],
                cultural_notes: result.data.cultural_notes || '',
                data_source: result.data.data_source || ''
            })
        }
        setLoading(false)
    }

    const handleSave = async () => {
        setSaving(true)
        setMessage(null)

        const result = await upsertClientDemographics(clientId, formData)

        if (result.error) {
            setMessage({ type: 'error', text: result.error })
        } else {
            setMessage({ type: 'success', text: 'Demographics saved successfully!' })
            setDemographics(result.data)
        }
        setSaving(false)

        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000)
    }

    const updateField = (field: keyof UpsertDemographicsData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const updateArrayField = (field: keyof UpsertDemographicsData, value: string) => {
        const arr = value.split(',').map(s => s.trim()).filter(Boolean)
        setFormData(prev => ({ ...prev, [field]: arr }))
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
                        <MapPin className="h-5 w-5" />
                        Demographics & Constituency Data
                    </h3>
                    <p className="text-sm text-gray-400">
                        This data helps AI generate contextually relevant content for {clientName}
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {saving ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Demographics
                </Button>
            </div>

            {/* Message */}
            {message && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                    }`}>
                    {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {message.text}
                </div>
            )}

            {/* Location Section */}
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        Location & State
                    </CardTitle>
                    <CardDescription>Constituency and regional context</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Constituency Name</label>
                        <Input
                            placeholder="e.g., Gandhinagar"
                            value={formData.constituency_name || ''}
                            onChange={(e) => updateField('constituency_name', e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">State</label>
                        <select
                            value={formData.state || ''}
                            onChange={(e) => updateField('state', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white"
                        >
                            <option value="">Select State...</option>
                            {INDIAN_STATES.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Region</label>
                        <select
                            value={formData.region || ''}
                            onChange={(e) => updateField('region', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white"
                        >
                            <option value="">Select Region...</option>
                            {REGIONS.map(r => (
                                <option key={r.id} value={r.id}>{r.label}</option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Population Section */}
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-400" />
                        Population Demographics
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Total Population</label>
                            <Input
                                type="number"
                                placeholder="e.g., 2500000"
                                value={formData.total_population || ''}
                                onChange={(e) => updateField('total_population', parseInt(e.target.value) || undefined)}
                                className="bg-gray-900 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Urban %</label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="e.g., 45"
                                value={formData.urban_percentage || ''}
                                onChange={(e) => updateField('urban_percentage', parseInt(e.target.value) || undefined)}
                                className="bg-gray-900 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Rural %</label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="e.g., 55"
                                value={formData.rural_percentage || ''}
                                onChange={(e) => updateField('rural_percentage', parseInt(e.target.value) || undefined)}
                                className="bg-gray-900 border-gray-600 text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Male %</label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="e.g., 52"
                                value={formData.male_percentage || ''}
                                onChange={(e) => updateField('male_percentage', parseInt(e.target.value) || undefined)}
                                className="bg-gray-900 border-gray-600 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Female %</label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="e.g., 48"
                                value={formData.female_percentage || ''}
                                onChange={(e) => updateField('female_percentage', parseInt(e.target.value) || undefined)}
                                className="bg-gray-900 border-gray-600 text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Age Distribution (%)</label>
                        <div className="grid grid-cols-5 gap-2">
                            <div>
                                <label className="text-xs text-gray-500">18-25</label>
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.age_18_25 || ''}
                                    onChange={(e) => updateField('age_18_25', parseInt(e.target.value) || undefined)}
                                    className="bg-gray-900 border-gray-600 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">26-35</label>
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.age_26_35 || ''}
                                    onChange={(e) => updateField('age_26_35', parseInt(e.target.value) || undefined)}
                                    className="bg-gray-900 border-gray-600 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">36-50</label>
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.age_36_50 || ''}
                                    onChange={(e) => updateField('age_36_50', parseInt(e.target.value) || undefined)}
                                    className="bg-gray-900 border-gray-600 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">51-65</label>
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.age_51_65 || ''}
                                    onChange={(e) => updateField('age_51_65', parseInt(e.target.value) || undefined)}
                                    className="bg-gray-900 border-gray-600 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">65+</label>
                                <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.age_65_plus || ''}
                                    onChange={(e) => updateField('age_65_plus', parseInt(e.target.value) || undefined)}
                                    className="bg-gray-900 border-gray-600 text-white text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Voter Data Section */}
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                        <Vote className="h-4 w-4 text-purple-400" />
                        Voter Data
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Total Voters</label>
                        <Input
                            type="number"
                            placeholder="e.g., 1800000"
                            value={formData.total_voters || ''}
                            onChange={(e) => updateField('total_voters', parseInt(e.target.value) || undefined)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Voter Turnout %</label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g., 68"
                            value={formData.voter_turnout_percentage || ''}
                            onChange={(e) => updateField('voter_turnout_percentage', parseInt(e.target.value) || undefined)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Literacy Rate %</label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g., 82"
                            value={formData.literacy_rate || ''}
                            onChange={(e) => updateField('literacy_rate', parseInt(e.target.value) || undefined)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Context Section */}
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-400" />
                        AI Context Data
                    </CardTitle>
                    <CardDescription>This data is used by AI to generate relevant content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">
                            Primary Languages <span className="text-gray-500">(comma separated)</span>
                        </label>
                        <Input
                            placeholder="e.g., Hindi, Gujarati, English"
                            value={(formData.primary_languages || []).join(', ')}
                            onChange={(e) => updateArrayField('primary_languages', e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">
                            Top Issues <span className="text-gray-500">(comma separated)</span>
                        </label>
                        <Input
                            placeholder="e.g., Healthcare, Employment, Roads"
                            value={(formData.top_issues || []).join(', ')}
                            onChange={(e) => updateArrayField('top_issues', e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                        <div className="flex flex-wrap gap-1 mt-2">
                            {COMMON_ISSUES.slice(0, 8).map(issue => (
                                <button
                                    key={issue}
                                    onClick={() => {
                                        const current = formData.top_issues || []
                                        if (!current.includes(issue)) {
                                            updateField('top_issues', [...current, issue])
                                        }
                                    }}
                                    className="px-2 py-0.5 text-xs bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
                                >
                                    + {issue}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">
                            Local Industries <span className="text-gray-500">(comma separated)</span>
                        </label>
                        <Input
                            placeholder="e.g., Agriculture, Textiles, IT"
                            value={(formData.local_industries || []).join(', ')}
                            onChange={(e) => updateArrayField('local_industries', e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">
                            Major Festivals <span className="text-gray-500">(comma separated)</span>
                        </label>
                        <Input
                            placeholder="e.g., Navratri, Diwali, Uttarayan"
                            value={(formData.major_festivals || []).join(', ')}
                            onChange={(e) => updateArrayField('major_festivals', e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Cultural Notes</label>
                        <Textarea
                            placeholder="Any cultural context AI should know..."
                            value={formData.cultural_notes || ''}
                            onChange={(e) => updateField('cultural_notes', e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white min-h-[80px]"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Data Source</label>
                        <Input
                            placeholder="e.g., Census 2011, ECI website"
                            value={formData.data_source || ''}
                            onChange={(e) => updateField('data_source', e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
