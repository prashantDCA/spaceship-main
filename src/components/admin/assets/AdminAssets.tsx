'use client'

import { useState, useEffect } from "react"
import { Asset, getAssets, createFolder, uploadFile, deleteAsset } from "@/app/actions/assets"
import { AssetGrid } from "./AssetGrid"
import { AssetUploader } from "./AssetUploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ChevronRight, FolderPlus, Upload, Grid, List as ListIcon, Home, Loader2, ArrowLeft, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Breadcrumb {
    id: string | null
    name: string
}

export default function AdminAssets() {
    const [assets, setAssets] = useState<Asset[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    // Navigation State
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([{ id: null, name: 'Home' }])

    // UI State
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
    const [newFolderName, setNewFolderName] = useState('')
    const [creatingFolder, setCreatingFolder] = useState(false)

    // Initial Fetch & Refresh
    const loadAssets = async (folderId: string | null) => {
        setLoading(true)
        try {
            const result = await getAssets(undefined, folderId)
            if (result.success && result.data) {
                setAssets(result.data)
            } else {
                console.error(result.error)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAssets(currentFolderId)
    }, [currentFolderId])

    // Navigation Handlers
    const handleNavigate = (folderId: string) => {
        // Find folder name for breadcrumb
        const folder = assets.find(a => a.id === folderId)
        if (folder) {
            setBreadcrumbs(prev => [...prev, { id: folder.id, name: folder.name }])
            setCurrentFolderId(folder.id)
        }
    }

    const handleBreadcrumbClick = (index: number) => {
        const target = breadcrumbs[index]
        setBreadcrumbs(prev => prev.slice(0, index + 1))
        setCurrentFolderId(target.id)
    }

    const handleUp = () => {
        if (breadcrumbs.length > 1) {
            handleBreadcrumbClick(breadcrumbs.length - 2)
        }
    }

    // Action Handlers
    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return
        setCreatingFolder(true)
        try {
            const result = await createFolder(newFolderName, currentFolderId)
            if (result.success) {
                setIsCreateFolderOpen(false)
                setNewFolderName('')
                loadAssets(currentFolderId) // Refresh
            } else {
                alert(result.error)
            }
        } finally {
            setCreatingFolder(false)
        }
    }

    const handleFileUpload = async (files: File[]) => {
        // Process sequentially
        for (const file of files) {
            const formData = new FormData()
            formData.append('file', file)
            await uploadFile(formData, currentFolderId)
        }
        setIsUploadOpen(false)
        loadAssets(currentFolderId)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This cannot be undone.")) return
        const result = await deleteAsset(id)
        if (result.success) {
            loadAssets(currentFolderId)
        } else {
            alert("Failed to delete")
        }
    }

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header / Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">

                {/* Breadcrumbs */}
                <div className="flex items-center space-x-2 text-sm overflow-x-auto no-scrollbar">
                    {breadcrumbs.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={handleUp} className="mr-2 h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    )}
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.id || 'root'} className="flex items-center">
                            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 mx-1" />}
                            <button
                                onClick={() => handleBreadcrumbClick(index)}
                                className={cn(
                                    "hover:text-white transition-colors",
                                    index === breadcrumbs.length - 1 ? "text-white font-semibold" : "text-gray-400"
                                )}
                            >
                                {index === 0 ? <Home className="h-4 w-4" /> : crumb.name}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <div className="bg-gray-800 rounded-md border border-gray-700 p-1 flex items-center mr-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-7 w-7", viewMode === 'grid' && "bg-gray-700 text-white")}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-7 w-7", viewMode === 'list' && "bg-gray-700 text-white")}
                            onClick={() => setViewMode('list')}
                        >
                            <ListIcon className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button variant="outline" size="sm" onClick={() => setIsCreateFolderOpen(true)} className="border-gray-600">
                        <FolderPlus className="h-4 w-4 mr-2" />
                        New Folder
                    </Button>
                    <Button size="sm" onClick={() => setIsUploadOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-h-[400px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                    </div>
                ) : (
                    <AssetGrid
                        assets={assets}
                        viewMode={viewMode}
                        onNavigate={handleNavigate}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* Dialogs */}
            <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            placeholder="Folder Name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                            className="bg-gray-700 border-gray-600"
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsCreateFolderOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateFolder} disabled={creatingFolder}>
                            {creatingFolder ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {isUploadOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <AssetUploader onUpload={handleFileUpload} onClose={() => setIsUploadOpen(false)} />
                </div>
            )}
        </div>
    )
}
