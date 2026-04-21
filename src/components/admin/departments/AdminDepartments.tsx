'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Users, FileText, Briefcase, Plus, Edit3, Trash2, Loader2, AlertCircle, X } from "lucide-react"
import {
    getDepartmentStats,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    type DepartmentStats,
    type CreateDepartmentData,
    type UpdateDepartmentData
} from "@/app/actions/admin-departments"
import { useAuth } from '@/lib/auth'

export default function AdminDepartments() {
    const { profile } = useAuth()
    const [departments, setDepartments] = useState<DepartmentStats[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Dialog states
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [saving, setSaving] = useState(false)

    // Form states
    const [selectedDept, setSelectedDept] = useState<DepartmentStats | null>(null)
    const [formData, setFormData] = useState<CreateDepartmentData>({ name: '' })

    // Check if user is Admin department member
    const isAdminDept = profile?.department_id && profile?.role === 'admin'

    useEffect(() => {
        fetchDepartments()
    }, [])

    const fetchDepartments = async () => {
        try {
            setLoading(true)
            setError(null)
            const { success, data, error: fetchError } = await getDepartmentStats()

            if (success && data) {
                setDepartments(data)
            } else {
                setError(fetchError || 'Failed to load departments')
            }
        } catch (err) {
            console.error('Error fetching departments:', err)
            setError('Failed to load departments')
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async () => {
        if (!formData.name.trim()) {
            setError('Department name is required')
            return
        }

        setSaving(true)
        setError(null)

        const result = await createDepartment(formData)

        if (result.success) {
            setIsCreateOpen(false)
            setFormData({ name: '' })
            fetchDepartments()
        } else {
            setError(result.error || 'Failed to create department')
        }

        setSaving(false)
    }

    const handleUpdate = async () => {
        if (!selectedDept || !formData.name.trim()) {
            setError('Department name is required')
            return
        }

        setSaving(true)
        setError(null)

        const result = await updateDepartment(selectedDept.id, formData as UpdateDepartmentData)

        if (result.success) {
            setIsEditOpen(false)
            setSelectedDept(null)
            setFormData({ name: '' })
            fetchDepartments()
        } else {
            setError(result.error || 'Failed to update department')
        }

        setSaving(false)
    }

    const handleDelete = async (dept: DepartmentStats) => {
        if (!confirm(`Are you sure you want to delete "${dept.name}"? This cannot be undone.`)) return

        setIsDeleting(true)
        setError(null)

        const result = await deleteDepartment(dept.id)

        if (result.success) {
            fetchDepartments()
        } else {
            setError(result.error || 'Failed to delete department')
        }

        setIsDeleting(false)
    }

    const openEditDialog = (dept: DepartmentStats) => {
        setSelectedDept(dept)
        setFormData({ name: dept.name })
        setIsEditOpen(true)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Departments</h2>
                    <p className="text-gray-400">Overview of all departments and their resources.</p>
                </div>
                {isAdminDept && (
                    <Button
                        onClick={() => {
                            setFormData({ name: '' })
                            setError(null)
                            setIsCreateOpen(true)
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        New Department
                    </Button>
                )}
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-red-200 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="ml-auto">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept) => (
                    <Card key={dept.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium text-white">
                                {dept.name}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                {isAdminDept && dept.name !== 'Admin' && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEditDialog(dept)}
                                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(dept)}
                                            disabled={isDeleting}
                                            className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                                <Briefcase className="h-4 w-4 text-blue-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center text-gray-400">
                                        <Users className="h-4 w-4 mr-2" />
                                        Members
                                    </div>
                                    <span className="text-white font-medium">{dept.memberCount}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center text-gray-400">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Documents
                                    </div>
                                    <span className="text-white font-medium">{dept.documentCount}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Create Department Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                        <DialogTitle>Create New Department</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Department Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="e.g. Marketing, Sales, Engineering"
                                className="bg-gray-900 border-gray-600 text-white"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsCreateOpen(false)}
                            className="text-white border-gray-600 bg-gray-800 hover:bg-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreate}
                            disabled={saving || !formData.name.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Create Department
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Department Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit Department</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Department Name *</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="bg-gray-900 border-gray-600 text-white"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditOpen(false)}
                            className="text-white border-gray-600 bg-gray-800 hover:bg-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={saving || !formData.name.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </div >
    )
}
