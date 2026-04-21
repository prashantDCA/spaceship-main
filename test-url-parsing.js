// Test URL parsing for iStock videos

const testUrls = [
  'https://www.istockphoto.com/video/futuristic-animated-concept-big-data-center-chief-technology-officer-using-laptop-gm1360048537-433183292',
  'https://www.istockphoto.com/video/5g-written-in-the-middle-of-a-futuristic-circles-4k-gm1203195993-345720876'
]

testUrls.forEach(url => {
  console.log('\n=== Testing URL:', url)
  
  // Test the regex patterns
  const videoIdMatch = url.match(/gm(\d+)-(\d+)/) || 
                      url.match(/video\/[^\/]*-gm(\d+)-(\d+)/) ||
                      url.match(/-gm(\d+)-(\d+)$/) ||
                      url.match(/gm(\d+)-(\d+)(?:\?|$)/)
  
  if (videoIdMatch) {
    const videoId = videoIdMatch[1]
    const assetId = videoIdMatch[2]
    console.log('✅ Parsed successfully:')
    console.log('  Video ID:', videoId)
    console.log('  Asset ID:', assetId)
    console.log('  Full match:', videoIdMatch[0])
  } else {
    console.log('❌ Failed to parse video ID')
  }
  
  // Test video filename extraction
  const urlMatch = url.match(/\/video\/([^\/]+)/)
  if (urlMatch) {
    const videoFileName = urlMatch[1]
    console.log('  Video filename:', videoFileName)
  } else {
    console.log('  No video filename found')
  }
})