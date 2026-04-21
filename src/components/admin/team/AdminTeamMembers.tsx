'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Users, UserPlus, Eye, Trash2, Mail, Phone, Building2, Calendar, Shield } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useDepartments } from "@/hooks/admin/useDepartments"
import { inviteTeamMember, deleteTeamMember } from "@/app/actions/admin-team"
import { useAdminTeamMembers } from "@/hooks/useSWR"

interface TeamMember {
    id: string
    email: string
    first_name: string
    last_name: string
    role: string
    created_at: string
    department_name: string
    department_id?: string
    phone?: string
}


export default function AdminTeamMembers() {
    // Use SWR hook for cached data fetching
    const { members: teamMembers, isLoading: loading, refresh: refreshTeamMembers } = useAdminTeamMembers()

    const [isInviteOpen, setIsInviteOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const { departments } = useDepartments()

    // Invite Form State
    const [inviteData, setInviteData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        role: 'user',
        department_id: '',
        custom_message: ''
    })
    const [inviteLoading, setInviteLoading] = useState(false)


    const handleInvite = async () => {
        try {
            setInviteLoading(true)

            const result = await inviteTeamMember(inviteData)

            if (result.success) {
                alert('Invitation sent successfully! The user will receive an email from Supabase.')
                setIsInviteOpen(false)
                setInviteData({
                    email: '',
                    first_name: '',
                    last_name: '',
                    role: 'user',
                    department_id: '',
                    custom_message: ''
                })
                refreshTeamMembers() // Refresh list
            } else {
                alert(`Failed to invite member: ${result.error}`)
            }
        } catch (error) {
            console.error('Error inviting member:', error)
            alert('Failed to invite member')
        } finally {
            setInviteLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this team member? This action cannot be undone.')) return

        try {
            const result = await deleteTeamMember(id)
            if (result.success) {
                refreshTeamMembers() // Refresh the list
            } else {
                alert(result.error || 'Failed to delete team member')
            }
        } catch (error) {
            console.error('Error deleting member:', error)
            alert('An unexpected error occurred')
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Team Members</h2>
                <p className="text-gray-400">Manage all registered team members</p>
            </div>

            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white">Team Members</CardTitle>
                            <CardDescription className="text-gray-400">
                                Manage all registered team members
                            </CardDescription>
                        </div>
                        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Invite Member
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Invite New Team Member</DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                        Send an invitation to a new team member. They will receive an email to set up their account.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="first_name">First Name</Label>
                                            <Input
                                                id="first_name"
                                                value={inviteData.first_name}
                                                onChange={(e) => setInviteData({ ...inviteData, first_name: e.target.value })}
                                                className="bg-gray-700 border-gray-600"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="last_name">Last Name</Label>
                                            <Input
                                                id="last_name"
                                                value={inviteData.last_name}
                                                onChange={(e) => setInviteData({ ...inviteData, last_name: e.target.value })}
                                                className="bg-gray-700 border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={inviteData.email}
                                            onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                                            className="bg-gray-700 border-gray-600"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Role</Label>
                                            <Select
                                                value={inviteData.role}
                                                onValueChange={(value) => setInviteData({ ...inviteData, role: value })}
                                            >
                                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-700 border-gray-600">
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                    <SelectItem value="manager">Manager</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Department</Label>
                                            <Select
                                                value={inviteData.department_id}
                                                onValueChange={(value) => setInviteData({ ...inviteData, department_id: value })}
                                            >
                                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                                    <SelectValue placeholder="Select Department" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-700 border-gray-600">
                                                    {departments.map((dept) => (
                                                        <SelectItem key={dept.id} value={dept.id}>
                                                            {dept.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="custom_message">Custom Invitation Message (Optional)</Label>
                                        <Textarea
                                            id="custom_message"
                                            placeholder="Write a personal message to include in the invitation..."
                                            value={inviteData.custom_message}
                                            onChange={(e) => setInviteData({ ...inviteData, custom_message: e.target.value })}
                                            className="bg-gray-700 border-gray-600 min-h-[100px]"
                                        />
                                        <p className="text-xs text-gray-400">
                                            Make sure you have added <code>{`{{ .Data.invite_message }}`}</code> to your Supabase Invite Email template.
                                        </p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsInviteOpen(false)} className="border-gray-600 text-white hover:bg-gray-700">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleInvite} disabled={inviteLoading} className="bg-blue-600 hover:bg-blue-700">
                                        {inviteLoading ? 'Sending...' : 'Send Invitation'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                        </div>
                    ) : teamMembers.length === 0 ? (
                        <div className="text-center py-8">
                            <Users className="mx-auto h-16 w-16 text-gray-500 mb-4" />
                            <p className="text-gray-400">No team members found</p>
                            <p className="text-gray-500 text-sm">Team members will appear here once they sign up</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">
                                                {member.first_name.charAt(0)}{member.last_name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">
                                                {member.first_name} {member.last_name}
                                            </h4>
                                            <p className="text-gray-400 text-sm">{member.email}</p>
                                            <p className="text-gray-500 text-xs">
                                                {member.department_name} • {member.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-white border-gray-600 hover:bg-gray-600"
                                            onClick={() => {
                                                setSelectedMember(member)
                                                setIsDetailsOpen(true)
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-400 border-red-600 hover:bg-red-600/20"
                                            onClick={() => handleDelete(member.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Member Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                        <DialogTitle>Team Member Details</DialogTitle>
                    </DialogHeader>
                    {selectedMember && (
                        <div className="space-y-6 py-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                                    {selectedMember.first_name.charAt(0)}{selectedMember.last_name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{selectedMember.first_name} {selectedMember.last_name}</h3>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30 capitalize">
                                            {selectedMember.role}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
                                            {selectedMember.department_name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span>{selectedMember.email}</span>
                                </div>
                                {selectedMember.phone && (
                                    <div className="flex items-center space-x-3 text-gray-300">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span>{selectedMember.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <Building2 className="h-4 w-4 text-gray-500" />
                                    <span>{selectedMember.department_name}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <Shield className="h-4 w-4 text-gray-500" />
                                    <span className="capitalize">{selectedMember.role} Access</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span>Joined {new Date(selectedMember.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsDetailsOpen(false)} className="bg-gray-700 hover:bg-gray-600">
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
