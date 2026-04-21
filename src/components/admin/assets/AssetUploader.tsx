'use client'

import { useState, useRef } from 'react'
import { Upload, X, File, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AssetUploaderProps {
    onUpload: (files: File[]) => Promise<void>
    onClose: () => void
}

export function AssetUploader({ onUpload, onClose }: AssetUploaderProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)])
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleUpload = async () => {
        if (files.length === 0) return
        setUploading(true)
        try {
            await onUpload(files)
            setFiles([]) // Clear on success
        } catch (error) {
            console.error('Upload failed', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-xl w-full max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Upload Files</h3>
                <Button variant="ghost" size="sm" onClick={onClose} disabled={uploading}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div
                className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                    isDragging ? "border-blue-500 bg-blue-500/10" : "border-gray-600 hover:border-gray-500",
                    uploading && "opacity-50 pointer-events-none"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                />
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-300 font-medium">
                    Drag & drop files here, or click to select
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    Support for documents, images, and other common formats.
                </p>
            </div>

            {files.length > 0 && (
                <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-md">
                            <div className="flex items-center space-x-3 overflow-hidden">
                                <File className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                <span className="text-sm text-gray-300 truncate">{file.name}</span>
                                <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                disabled={uploading}
                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-6 w-6 p-0"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end mt-6 space-x-3">
                <Button variant="outline" onClick={onClose} disabled={uploading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploading}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>Upload {files.length > 0 && `(${files.length})`}</>
                    )}
                </Button>
            </div>
        </div>
    )
}
