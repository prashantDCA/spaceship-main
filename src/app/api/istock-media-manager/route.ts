import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url, mode } = await request.json()
    
    console.log('=== NEW REQUEST ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Requested URL:', url)
    console.log('Mode:', mode)

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    if (!mode || (mode !== 'preview' && mode !== 'licensed')) {
      return NextResponse.json({ error: 'Valid mode required (preview or licensed)' }, { status: 400 })
    }

    // Validate iStock URL
    const urlObj = new URL(url)
    if (!urlObj.hostname.includes('istockphoto.com') && !urlObj.hostname.includes('istock.com')) {
      return NextResponse.json({ error: 'Invalid iStock URL' }, { status: 400 })
    }

    // Extract video ID from URL - handle different URL formats
    console.log('Processing URL:', url)
    
    const videoIdMatch = url.match(/gm(\d+)-(\d+)/) || 
                        url.match(/video\/[^\/]*-gm(\d+)-(\d+)/) ||
                        url.match(/-gm(\d+)-(\d+)$/) ||
                        url.match(/gm(\d+)-(\d+)(?:\?|$)/)
    
    if (!videoIdMatch) {
      console.error('Could not parse video ID from URL:', url)
      console.error('URL parsing failed - please check URL format')
      return NextResponse.json({ error: 'Could not parse video ID from URL' }, { status: 400 })
    }

    const videoId = videoIdMatch[1]
    const assetId = videoIdMatch[2]

    console.log(`Processing ${mode} mode for video ID:`, videoId, 'Asset ID:', assetId)
    console.log('URL match details:', videoIdMatch)
    
    // Verify we have unique video IDs
    console.log('=== VERIFICATION ===')
    console.log('Original URL:', url)
    console.log('Extracted Video ID:', videoId)
    console.log('Extracted Asset ID:', assetId)
    console.log('Are IDs unique?', videoId !== '1360048537' || assetId !== '433183292')

    if (mode === 'preview') {
      // For preview mode, return the watermarked preview URL
      return handlePreviewMode(url, videoId, assetId)
    } else {
      // For licensed mode, attempt to get the clean video
      return handleLicensedMode(url, videoId, assetId)
    }

  } catch (error) {
    console.error('Error processing media:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handlePreviewMode(url: string, videoId: string, assetId: string) {
  try {
    console.log('Attempting preview mode to find top-left watermark video...')
    
    // Method 0: Try direct URL construction with known working patterns first
    console.log('=== METHOD 0: Direct URL construction for video ID:', videoId);
    
    // Extract filename from URL
    const urlMatch = url.match(/\/video\/([^\/]+)/);
    const directFilename = urlMatch ? urlMatch[1] : videoId;
    
    const directUrls = [
      // Try top-left watermark positions (k=10, k=21)
      `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-640x640-is&k=10`,
      `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-640x640-is&k=21`,
      `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-480x480-is&k=10`,
      `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-480x480-is&k=21`,
      
      // Try with videoId as filename
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-640x640-is&k=10`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-640x640-is&k=21`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-480x480-is&k=10`,
    ];
    
    for (const testUrl of directUrls) {
      try {
        console.log('Testing direct URL:', testUrl);
        const testResponse = await fetch(testUrl, { method: 'HEAD' });
        if (testResponse.ok) {
          console.log('✅ Direct URL works:', testUrl);
          return NextResponse.json({ previewUrl: testUrl });
        }
      } catch {
        continue;
      }
    }
    
    // Method 1: Extract from iStock page to get base URL and modify for top-left watermark
    const pageResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })

    if (pageResponse.ok) {
      const html = await pageResponse.text()
      
      // Look for the FilmComp URL in the JSON data
      const filmCompMatch = html.match(/"FilmComp":\{"Url":"([^"]+)"/);
      if (filmCompMatch) {
        const baseUrl = filmCompMatch[1].replace(/\\u002F/g, '/');
        console.log('Found base FilmComp URL for video', videoId, ':', baseUrl);
        console.log('Full FilmComp match:', filmCompMatch[0]);
        
        // Verify this URL actually contains the current video ID
        if (!baseUrl.includes(videoId)) {
          console.error('FilmComp URL does not contain expected video ID:', videoId);
          console.error('Expected video ID:', videoId, 'but URL contains:', baseUrl);
          // If URL doesn't contain the expected video ID, skip this method
          console.log('Skipping FilmComp method due to video ID mismatch');
        } else {
          console.log('✅ FilmComp URL contains correct video ID:', videoId);
          
          // Try different approaches for better quality/minimal watermark
          const betterQualityVariations = [
            baseUrl.replace(/k=\d+/, ''), // Remove k parameter completely
            baseUrl.replace(/&k=\d+/, ''), // Remove k parameter with &
            baseUrl.replace(/k=\d+&/, ''), // Remove k parameter with trailing &
            baseUrl.replace(/\?k=\d+&/, '?'), // Remove k parameter from start
            baseUrl.replace(/s=mp4-640x640-is/, 's=mp4-480x480-is'), // Try smaller size
            baseUrl.replace(/s=mp4-640x640-is/, 's=mp4-720x720-is'), // Try larger size
            baseUrl // Original as fallback
          ];
          
          for (const testUrl of betterQualityVariations) {
            try {
              console.log('Testing better quality URL:', testUrl);
              const testResponse = await fetch(testUrl, { method: 'HEAD' });
              if (testResponse.ok) {
                console.log('Found working better quality URL:', testUrl);
                return NextResponse.json({ previewUrl: testUrl });
              }
            } catch {
              continue;
            }
          }
        }
      }
    }

    // Method 2: Try to extract video filename from URL for generic approach
    let videoFileName = ''
    const urlMatch2 = url.match(/\/video\/([^\/]+)/)
    if (urlMatch2) {
      videoFileName = urlMatch2[1]
      console.log('Extracted video filename from URL:', videoFileName)
    } else {
      // Fallback: construct filename from video ID
      videoFileName = `video-${videoId}`
      console.log('Using fallback video filename:', videoFileName)
    }
    
    console.log('=== METHOD 2: Generating URLs for video ID:', videoId, 'filename:', videoFileName);
    
    const minimalWatermarkUrls = [
      // Try different watermark positions with k parameter
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-640x640-is&k=10`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-640x640-is&k=21`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-640x640-is&k=20`,
      
      // Try different sizes with various watermark positions
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-480x480-is&k=10`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-480x480-is&k=21`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-720x720-is&k=10`,
      
      // Try without k parameter (might reduce watermark)
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-640x640-is`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-480x480-is`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-720x720-is`,
      
      // Try basic video ID only with different approaches
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-640x640-is&k=10`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-640x640-is&k=21`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4`,
      
      // Try legacy format
      `https://media.istockphoto.com/videos/${videoId}.mp4`,
    ];

    for (const testUrl of minimalWatermarkUrls) {
      try {
        console.log('Testing minimal watermark URL:', testUrl);
        const testResponse = await fetch(testUrl, { method: 'HEAD' });
        if (testResponse.ok) {
          console.log('Found working minimal watermark URL:', testUrl);
          return NextResponse.json({ previewUrl: testUrl });
        }
      } catch {
        continue;
      }
    }

    // Method 3: Fallback to FetchPik-style CDN approach
    const cdnResult = await tryFetchPikStyleExtraction(videoId, assetId);
    if (cdnResult) {
      console.log('Found video via CDN method:', cdnResult);
      return NextResponse.json({ previewUrl: cdnResult });
    }

    // Method 4: Final fallback - construct basic preview URLs with different approaches
    console.log('=== METHOD 4: Final fallback for video ID:', videoId);
    
    // Try different fallback URL patterns
    const fallbackUrls = [
      // Try with extracted filename if available
      ...(videoFileName !== `video-${videoId}` ? [
        `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-640x640-is&k=20`,
        `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-480x480-is&k=20`,
        `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-720x720-is&k=20`,
      ] : []),
      
      // Try with video ID as filename
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-640x640-is&k=20`,
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-480x480-is&k=20`,
      
      // Try legacy format
      `https://media.istockphoto.com/videos/${videoId}.mp4?s=mp4-640x640-is&k=20`,
      
      // Try without parameters
      `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4`,
    ];
    
    for (const fallbackUrl of fallbackUrls) {
      try {
        console.log('Trying fallback URL:', fallbackUrl);
        const fallbackResponse = await fetch(fallbackUrl, { method: 'HEAD' });
        if (fallbackResponse.ok) {
          console.log('✅ Fallback URL works:', fallbackUrl);
          return NextResponse.json({ previewUrl: fallbackUrl });
        }
      } catch (error) {
        console.log('Fallback URL failed:', fallbackUrl, error instanceof Error ? error.message : 'Unknown error');
        continue;
      }
    }

    return NextResponse.json({ 
      error: `Could not find preview video for video ID ${videoId}. Please check the URL format.` 
    }, { status: 404 });

  } catch (error) {
    console.error('Error in preview mode:', error);
    return NextResponse.json({ error: 'Failed to get preview' }, { status: 500 });
  }
}

async function tryFetchPikStyleExtraction(videoId: string, assetId: string) {
  try {
    console.log('Attempting FetchPik-style extraction for video:', videoId, 'asset:', assetId)
    
    // Try multiple hash generation approaches to find the correct CDN pattern
    const hashInputs = [
      `${videoId}${assetId}`, // Direct concatenation
      `${videoId}_${assetId}`, // Underscore separator
      `istock_${videoId}_${assetId}`, // With prefix
      `${videoId}-${assetId}`, // Dash separator
      videoId, // Video ID only
      assetId, // Asset ID only
      `${assetId}${videoId}`, // Reversed order
      `video${videoId}asset${assetId}`, // With labels
    ]
    
    for (const input of hashInputs) {
      console.log('Trying hash input:', input)
      const hash = await generateHash(input)
      console.log('Generated hash:', hash)
      
      const dir1 = hash.substring(0, 2)
      const dir2 = hash.substring(2, 4)
      
      // Try different CDN patterns
      const cdnUrls = [
        `https://ak02-video-cdn.slidely.com/media/videos/${dir1}/${dir2}/${hash}-720p-preview.mp4`,
        `https://ak01-video-cdn.slidely.com/media/videos/${dir1}/${dir2}/${hash}-720p-preview.mp4`,
        `https://ak03-video-cdn.slidely.com/media/videos/${dir1}/${dir2}/${hash}-1080p-preview.mp4`,
        `https://ak04-video-cdn.slidely.com/media/videos/${dir1}/${dir2}/${hash}-480p-preview.mp4`,
        `https://ak02-video-cdn.slidely.com/media/videos/${dir1}/${dir2}/${hash}.mp4`,
        `https://ak01-video-cdn.slidely.com/media/videos/${dir1}/${dir2}/${hash}.mp4`,
      ]

      for (const cdnUrl of cdnUrls) {
        try {
          console.log('Checking generated CDN URL:', cdnUrl)
          const response = await fetch(cdnUrl, { method: 'HEAD' })
          if (response.ok) {
            console.log('Found working generated CDN URL:', cdnUrl)
            return cdnUrl
          }
        } catch {
          continue
        }
      }
    }

    console.log('No working CDN URLs found')
    return null
  } catch (error) {
    console.error('Error in FetchPik-style extraction:', error)
    return null
  }
}

async function generateHash(input: string): Promise<string> {
  // Simple hash generation using SHA-256 since MD5 isn't available in crypto.subtle
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  // Take first 32 characters to simulate MD5 length
  return hash.substring(0, 32)
}

async function handleLicensedMode(_url: string, _videoId: string, _assetId: string) {
  try {
    // For licensed mode, we need to note that this should only be used with proper licenses
    console.log('Licensed mode - ensuring proper license compliance')
    
    // This is a placeholder implementation
    // In a real system, you would:
    // 1. Verify the user has a valid license for this content
    // 2. Use iStock's API with proper authentication
    // 3. Download from the licensed content endpoint
    
    return NextResponse.json({ 
      error: 'Licensed mode requires valid iStock API credentials and license verification. Please implement proper license checking.' 
    }, { status: 501 })

  } catch (error) {
    console.error('Error in licensed mode:', error)
    return NextResponse.json({ error: 'Failed to process licensed content' }, { status: 500 })
  }
}