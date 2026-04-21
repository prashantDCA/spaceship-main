import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate iStock URL
    const urlObj = new URL(url)
    if (!urlObj.hostname.includes('istockphoto.com') && !urlObj.hostname.includes('istock.com')) {
      return NextResponse.json({ error: 'Invalid iStock URL' }, { status: 400 })
    }

    // Extract video ID from URL - handle different URL formats
    const videoIdMatch = url.match(/gm(\d+)-(\d+)/) || 
                        url.match(/video\/[^\/]*-gm(\d+)-(\d+)/) ||
                        url.match(/-gm(\d+)-(\d+)$/) ||
                        url.match(/gm(\d+)-(\d+)(?:\?|$)/)
    
    if (!videoIdMatch) {
      return NextResponse.json({ error: 'Could not parse video ID from URL' }, { status: 400 })
    }

    const videoId = videoIdMatch[1]
    const assetId = videoIdMatch[2]

    console.log('Extracted video ID:', videoId, 'Asset ID:', assetId)

    // Construct potential video URLs based on iStock's CDN patterns
    const possibleVideoUrls = [
      // New iStock CDN format - most likely to work
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}_hd.mp4`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}_sd.mp4`,
      
      // Legacy format
      `https://media.istockphoto.com/videos/${videoId}.mp4`,
      `https://media.istockphoto.com/videos/${videoId}_hd.mp4`,
      `https://media.istockphoto.com/videos/${videoId}_sd.mp4`,
      
      // Alternative formats with asset ID
      `https://media.istockphoto.com/id/${assetId}/video/${videoId}.mp4`,
      `https://media.istockphoto.com/id/${assetId}/video/${videoId}_hd.mp4`,
      
      // Remove invalid CDN domains that don't exist
    ]

    // Try to fetch the video from different possible URLs
    let videoResponse: Response | null = null

    console.log('Trying', possibleVideoUrls.length, 'possible video URLs...')

    for (const videoUrl of possibleVideoUrls) {
      try {
        console.log('Checking URL:', videoUrl)
        const response = await fetch(videoUrl, {
          method: 'HEAD', // Use HEAD to check if video exists without downloading
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://www.istockphoto.com/',
          },
        })

        console.log('Response status for', videoUrl, ':', response.status)

        if (response.ok) {
          console.log('Found working URL:', videoUrl)
          // Now fetch the actual video
          videoResponse = await fetch(videoUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              'Referer': 'https://www.istockphoto.com/',
            },
          })
          break
        }
      } catch (error) {
        console.log('Error checking URL', videoUrl, ':', error)
        continue
      }
    }

    if (!videoResponse) {
      // If direct video URLs don't work, try to scrape the page
      try {
        console.log('Attempting to scrape page:', url)
        const pageResponse = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
        })

        if (!pageResponse.ok) {
          console.log('Failed to fetch page, status:', pageResponse.status)
          return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
        }

        const html = await pageResponse.text()
        console.log('Page fetched, HTML length:', html.length)
        
        // Try to find the video URL in the HTML with various patterns
        const videoUrlMatches = [
          html.match(/data-src="([^"]*\.mp4[^"]*)"/) || [],
          html.match(/src="([^"]*\.mp4[^"]*)"/) || [],
          html.match(/data-video-src="([^"]*\.mp4[^"]*)"/) || [],
          html.match(/"videoUrl":"([^"]*\.mp4[^"]*)"/) || [],
          html.match(/"previewUrl":"([^"]*\.mp4[^"]*)"/) || [],
          html.match(/"downloadUrl":"([^"]*\.mp4[^"]*)"/) || [],
          html.match(/video[^"]*":\s*"([^"]*\.mp4[^"]*)"/) || [],
          // More specific patterns for iStock
          html.match(/https:\/\/media\.istockphoto\.com\/id\/\d+\/video\/[^"]*\.mp4[^"]*/) || [],
          html.match(/https:\/\/media\.istockphoto\.com\/videos\/[^"]*\.mp4[^"]*/) || [],
        ].filter(match => match.length > 0)

        console.log('Found', videoUrlMatches.length, 'potential video URL patterns')

        for (const match of videoUrlMatches) {
          let videoUrl = match[1] || match[0]
          
          if (videoUrl) {
            console.log('Trying scraped URL:', videoUrl)
            
            // Clean up the URL
            if (videoUrl.startsWith('//')) {
              videoUrl = 'https:' + videoUrl
            } else if (videoUrl.startsWith('/')) {
              videoUrl = 'https://media.istockphoto.com' + videoUrl
            }

            // Decode HTML entities
            videoUrl = videoUrl.replace(/&amp;/g, '&')
            
            // Remove watermark and size restriction parameters
            videoUrl = videoUrl.replace(/[?&]s=[^&]*/, '')
            videoUrl = videoUrl.replace(/[?&]k=[^&]*/, '')
            videoUrl = videoUrl.replace(/[?&]c=[^&]*/, '')
            videoUrl = videoUrl.replace(/[?&]watermark=[^&]*/, '')
            videoUrl = videoUrl.replace(/[?&]wm=[^&]*/, '')
            videoUrl = videoUrl.replace(/[?&]size=[^&]*/, '')
            
            // Clean up any trailing ? or & 
            videoUrl = videoUrl.replace(/[?&]$/, '')
            
            console.log('Cleaned URL:', videoUrl)
            
            try {
              videoResponse = await fetch(videoUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                  'Referer': 'https://www.istockphoto.com/',
                },
              })
              
              if (videoResponse.ok) {
                console.log('Successfully found video via scraping:', videoUrl)
                break
              } else {
                console.log('Scraped URL failed with status:', videoResponse.status)
                videoResponse = null
              }
            } catch (error) {
              console.log('Error fetching scraped URL:', error)
              videoResponse = null
            }
          }
        }
      } catch (error) {
        console.error('Error scraping page:', error)
      }
    }

    if (!videoResponse || !videoResponse.ok) {
      console.log('No working video URL found')
      return NextResponse.json({ 
        error: 'Could not find a working video URL. This might be a premium video or the video format is not supported.' 
      }, { status: 404 })
    }

    // Get the video data
    const videoBuffer = await videoResponse.arrayBuffer()
    
    // Return the video
    return new NextResponse(videoBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${videoId}.mp4"`,
      },
    })

  } catch (error) {
    console.error('Error downloading video:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}