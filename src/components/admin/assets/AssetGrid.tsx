'use client'

import { Asset } from '@/app/actions/assets'
import { Folder, FileText, Image as ImageIcon, Music, Video, MoreVertical, Trash2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface AssetGridProps {
    assets: Asset[]
    onNavigate: (folderId: string) => void
    onDelete: (id: string) => void
    viewMode: 'grid' | 'list'
}

export function AssetGrid({ assets, onNavigate, onDelete, viewMode }: AssetGridProps) {
    if (assets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Folder className="h-16 w-16 mb-4 opacity-20" />
                <p>This folder is empty</p>
            </div>
        )
    }

    const getIcon = (asset: Asset) => {
        if (asset.type === 'folder') return <Folder className="h-8 w-8 text-blue-400 fill-blue-400/20" />

        // Simple mime check
        if (asset.mime_type?.startsWith('image/')) return <ImageIcon className="h-8 w-8 text-purple-400" />
        if (asset.mime_type?.startsWith('video/')) return <Video className="h-8 w-8 text-red-400" />
        if (asset.mime_type?.startsWith('audio/')) return <Music className="h-8 w-8 text-yellow-400" />
        return <FileText className="h-8 w-8 text-gray-400" />
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '-'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
    }

    if (viewMode === 'list') {
        return (
            <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-800 text-gray-400 font-medium">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Size</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Modified</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {assets.map((asset) => (
                            <tr
                                key={asset.id}
                                className="group hover:bg-gray-700/30 transition-colors"
                            >
                                <td className="px-4 py-3">
                                    <div
                                        className="flex items-center space-x-3 cursor-pointer"
                                        onClick={() => asset.type === 'folder' && onNavigate(asset.id)}
                                    >
                                        <div className="scale-75 origin-left">{getIcon(asset)}</div>
                                        <span className={cn("font-medium text-gray-200", asset.type === 'folder' && "hover:underline")}>
                                            {asset.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-gray-400">{formatSize(asset.size)}</td>
                                <td className="px-4 py-3 text-gray-500 capitalize">{asset.type}</td>
                                <td className="px-4 py-3 text-gray-500">
                                    {asset.departments?.name && (
                                        <span className="px-2 py-0.5 rounded-full bg-gray-700 text-xs text-gray-300 border border-gray-600">
                                            {asset.departments.name}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-gray-500">{new Date(asset.created_at).toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical className="h-4 w-4 text-gray-400" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                                            {asset.url && (
                                                <DropdownMenuItem asChild>
                                                    <a href={asset.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-gray-300 focus:text-white focus:bg-gray-700">
                                                        <Download className="mr-2 h-4 w-4" /> Download
                                                    </a>
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                onClick={() => onDelete(asset.id)}
                                                className="text-red-400 focus:text-red-300 focus:bg-red-400/10 cursor-pointer"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    // Grid View
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {assets.map((asset) => (
                <div
                    key={asset.id}
                    className="group relative bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 hover:border-gray-600 transition-all cursor-pointer"
                >
                    <div
                        className="flex flex-col items-center text-center space-y-3 mb-2"
                        onClick={() => asset.type === 'folder' && onNavigate(asset.id)}
                    >
                        <div className="p-3 bg-gray-800 rounded-full group-hover:scale-110 transition-transform duration-200">
                            {getIcon(asset)}
                        </div>
                        <div className="w-full">
                            <p className="text-sm font-medium text-gray-200 truncate px-2" title={asset.name}>
                                {asset.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{formatSize(asset.size)}</p>
                            {asset.departments?.name && (
                                <p className="text-[10px] text-gray-500 mt-1 px-2 py-0.5 bg-gray-900/50 rounded-full border border-gray-700/50 inline-block">
                                    {asset.departments.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-600 rounded-full">
                                    <MoreVertical className="h-3 w-3 text-gray-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                                {asset.url && (
                                    <DropdownMenuItem asChild>
                                        <a href={asset.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-gray-300 focus:text-white focus:bg-gray-700">
                                            <Download className="mr-2 h-4 w-4" /> Download
                                        </a>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                    onClick={() => onDelete(asset.id)}
                                    className="text-red-400 focus:text-red-300 focus:bg-red-400/10 cursor-pointer"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            ))}
        </div>
    )
}
