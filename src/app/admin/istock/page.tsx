'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Video, Link, Loader2, AlertCircle, Play, FileVideo } from "lucide-react"
import AdminRoute from "@/components/AdminRoute"
import Sidebar from "@/components/Sidebar"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function IStockMediaManager() {
  const { loading } = useAuth()
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [mediaItems, setMediaItems] = useState<Array<{id: string, url: string, originalUrl: string, filename: string, timestamp: Date, size?: string, isLicensed?: boolean, previewUrl?: string}>>([])
  const [error, setError] = useState('')
  const [downloadMode, setDownloadMode] = useState<'preview' | 'licensed'>('preview')

  const isValidIStockUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.includes('istockphoto.com') || urlObj.hostname.includes('istock.com')
    } catch {
      return false
    }
  }

  const extractVideoId = (url: string): string | null => {
    // iStock URLs typically look like: https://www.istockphoto.com/video/video-title-gm123456789-123456789
    const match = url.match(/gm(\d+)-(\d+)/) || url.match(/video\/[^\/]*-gm(\d+)-(\d+)/)
    return match ? match[1] : null
  }

  const processMedia = async () => {
    if (!url.trim()) {
      setError('Please enter an iStock video URL')
      return
    }

    if (!isValidIStockUrl(url)) {
      setError('Please enter a valid iStock video URL')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      const response = await fetch('/api/istock-media-manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, mode: downloadMode }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      if (downloadMode === 'preview') {
        // For preview mode, get the preview URL and create downloadable link
        const data = await response.json()
        const videoId = extractVideoId(url) || 'istock-video'
        
        // Create a download link for the preview
        const downloadUrl = data.previewUrl
        const filename = `${videoId}-preview-topLeft.mp4`
        
        // Add to media items
        setMediaItems(prev => [{
          id: Date.now().toString(),
          url: downloadUrl,
          originalUrl: url,
          filename: filename,
          timestamp: new Date(),
          isLicensed: false,
          previewUrl: downloadUrl
        }, ...prev])
        
        // Also automatically trigger download
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = filename
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // For licensed mode, download the full video
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        
        const videoId = extractVideoId(url) || 'istock-video'
        const filename = `${videoId}-licensed-${Date.now()}.mp4`
        
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        window.URL.revokeObjectURL(downloadUrl)

        // Get file size for display
        const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2)

        setMediaItems(prev => [{
          id: Date.now().toString(),
          url: downloadUrl,
          originalUrl: url,
          filename,
          timestamp: new Date(),
          size: `${sizeInMB} MB`,
          isLicensed: true
        }, ...prev])
      }

      setUrl('')
      
    } catch (err) {
      console.error('Processing error:', err)
      setError(err instanceof Error ? err.message : 'Failed to process media. Please check the URL and try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processMedia()
    }
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'istock-downloader') {
      // Already on this page, do nothing
      return
    } else if (tab === 'overview' || tab === 'members' || tab === 'clients' || tab === 'documents' || tab === 'calendar' || tab === 'kanban' || tab === 'freepik-downloader' || tab === 'settings') {
      // Navigate to main admin page with the selected tab
      if (tab === 'freepik-downloader') {
        router.push('/admin/freepik')
      } else {
        router.push(`/admin?tab=${tab}`)
      }
    } else {
      // Navigate to admin page
      router.push('/admin')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminRoute>
      <div className="flex h-screen bg-black">
        <Sidebar 
          activeTab="istock-downloader" 
          onTabChange={handleTabChange}
          userRole="admin"
        />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">iStock Media Manager</h1>
              <p className="text-gray-400">Manage your licensed iStock videos and preview content</p>
            </div>

            {/* Media Processing Form */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Process Media
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your iStock media content - get previews or download licensed content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mode Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Processing Mode:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="downloadMode"
                        value="preview"
                        checked={downloadMode === 'preview'}
                        onChange={(e) => setDownloadMode(e.target.value as 'preview' | 'licensed')}
                        className="text-blue-600"
                      />
                      <span className="text-white">Preview (with watermark)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="downloadMode"
                        value="licensed"
                        checked={downloadMode === 'licensed'}
                        onChange={(e) => setDownloadMode(e.target.value as 'preview' | 'licensed')}
                        className="text-blue-600"
                      />
                      <span className="text-white">Licensed Content</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Input
                    type="url"
                    placeholder="https://www.istockphoto.com/video/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    disabled={isProcessing}
                  />
                  <Button 
                    onClick={processMedia}
                    disabled={isProcessing || !url.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {isProcessing ? 'Processing...' : (downloadMode === 'preview' ? 'Get Preview' : 'Download Licensed')}
                  </Button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="text-sm text-gray-400">
                  <p className="font-medium mb-2">How to use:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to iStockphoto.com and find the video you want</li>
                    <li>Copy the URL from your browser</li>
                    <li>Select your processing mode:</li>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Preview mode:</strong> Get preview video with watermark overlay</li>
                      <li><strong>Licensed mode:</strong> Download full-quality video (requires valid license)</li>
                    </ul>
                    <li>Click the appropriate button to process</li>
                  </ol>
                </div>

                <div className="text-sm text-gray-400">
                  <p className="font-medium mb-2">Legal Notice:</p>
                  <p className="text-xs text-gray-500">
                    This tool is for managing legally obtained iStock content. Licensed mode requires valid iStock licenses. 
                    Preview mode shows watermarked content for evaluation purposes.
                  </p>
                </div>

                {/* Quick URL Tester */}
                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Processing Methods:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-800 px-2 py-1 rounded text-green-400">1</code>
                      <span className="text-xs text-gray-400">Extract from page & optimize parameters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-800 px-2 py-1 rounded text-yellow-400">2</code>
                      <span className="text-xs text-gray-400">Try multiple quality/size variations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-800 px-2 py-1 rounded text-blue-400">3</code>
                      <span className="text-xs text-gray-400">FetchPik-style CDN hash generation</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      The system will automatically try all methods to find the best quality video with minimal watermarks for any iStock URL you provide.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Library */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Media Library
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your managed iStock media content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mediaItems.length === 0 ? (
                  <div className="text-center py-8">
                    <FileVideo className="mx-auto h-16 w-16 text-gray-500 mb-4" />
                    <p className="text-gray-400">No media items yet</p>
                    <p className="text-gray-500 text-sm">Processed media will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mediaItems.map((item) => (
                      <div key={item.id} className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center relative">
                              <Play className="h-6 w-6 text-gray-400" />
                              {!item.isLicensed && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full" title="Preview with watermark" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{item.filename}</h4>
                              <p className="text-gray-400 text-sm">
                                {item.isLicensed ? 'Licensed' : 'Preview (Top-Left Watermark)'} • {item.timestamp.toLocaleTimeString()}
                                {item.size && (
                                  <span className="ml-2 text-gray-500">• {item.size}</span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(item.url, '_blank')}
                              className="text-white border-gray-600"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a')
                                link.href = item.url
                                link.download = item.filename
                                link.target = '_blank'
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)
                              }}
                              className="text-white border-gray-600"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(item.originalUrl, '_blank')}
                              className="text-white border-gray-600"
                            >
                              <Link className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Video Preview */}
                        {item.previewUrl && (
                          <div className="mt-3">
                            <video 
                              className="w-full max-w-md h-32 bg-black rounded-lg" 
                              controls
                              preload="metadata"
                            >
                              <source src={item.previewUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <p className="text-xs text-gray-500 mt-1">
                              Preview URL: <span className="text-blue-400">{item.previewUrl}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminRoute>
  )
}