'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Image as ImageIcon, Link, Loader2, AlertCircle } from "lucide-react"
import AdminRoute from "@/components/AdminRoute"
import Sidebar from "@/components/Sidebar"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function FreepikDownloader() {
  const { loading } = useAuth()
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadedImages, setDownloadedImages] = useState<Array<{id: string, url: string, originalUrl: string, filename: string, timestamp: Date}>>([])
  const [error, setError] = useState('')

  const isValidFreepikUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.includes('freepik.com') || urlObj.hostname.includes('freepik.es')
    } catch {
      return false
    }
  }

  const extractImageId = (url: string): string | null => {
    const match = url.match(/\/([^\/]+)\.htm/)
    return match ? match[1] : null
  }

  const downloadImage = async () => {
    if (!url.trim()) {
      setError('Please enter a Freepik URL')
      return
    }

    if (!isValidFreepikUrl(url)) {
      setError('Please enter a valid Freepik URL')
      return
    }

    setIsDownloading(true)
    setError('')

    try {
      const response = await fetch('/api/freepik-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      
      const imageId = extractImageId(url) || 'freepik-image'
      const filename = `${imageId}-${Date.now()}.jpg`
      
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      window.URL.revokeObjectURL(downloadUrl)

      setDownloadedImages(prev => [{
        id: Date.now().toString(),
        url: downloadUrl,
        originalUrl: url,
        filename,
        timestamp: new Date()
      }, ...prev])

      setUrl('')
      
    } catch (err) {
      console.error('Download error:', err)
      setError('Failed to download image. Please check the URL and try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      downloadImage()
    }
  }

  const handleTabChange = (tab: string) => {
    if (tab === 'freepik-downloader') {
      // Already on this page, do nothing
      return
    } else if (tab === 'istock-downloader') {
      // Navigate to iStock downloader
      router.push('/admin/istock')
    } else if (tab === 'overview' || tab === 'members' || tab === 'clients' || tab === 'documents' || tab === 'calendar' || tab === 'kanban' || tab === 'settings') {
      // Navigate to main admin page with the selected tab
      router.push(`/admin?tab=${tab}`)
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
          activeTab="freepik-downloader" 
          onTabChange={handleTabChange}
          userRole="admin"
        />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Freepik Image Downloader</h1>
              <p className="text-gray-400">Download high-quality Freepik images without watermarks</p>
            </div>

            {/* Download Form */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Image
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Paste a Freepik URL to download the image in high quality without watermarks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    type="url"
                    placeholder="https://www.freepik.com/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    disabled={isDownloading}
                  />
                  <Button 
                    onClick={downloadImage}
                    disabled={isDownloading || !url.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {isDownloading ? 'Downloading...' : 'Download'}
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
                    <li>Go to Freepik.com and find the image you want</li>
                    <li>Copy the URL from your browser</li>
                    <li>Paste it above and click Download</li>
                    <li>The image will be saved without watermarks</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Download History */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Download History
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Recently downloaded images from this session
                </CardDescription>
              </CardHeader>
              <CardContent>
                {downloadedImages.length === 0 ? (
                  <div className="text-center py-8">
                    <ImageIcon className="mx-auto h-16 w-16 text-gray-500 mb-4" />
                    <p className="text-gray-400">No images downloaded yet</p>
                    <p className="text-gray-500 text-sm">Downloaded images will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {downloadedImages.map((image) => (
                      <div key={image.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{image.filename}</h4>
                            <p className="text-gray-400 text-sm">
                              Downloaded {image.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(image.originalUrl, '_blank')}
                            className="text-white border-gray-600"
                          >
                            <Link className="h-4 w-4" />
                          </Button>
                        </div>
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