// Simulate the API logic to test URL parsing
const testUrls = [
  'https://www.istockphoto.com/video/futuristic-animated-concept-big-data-center-chief-technology-officer-using-laptop-gm1360048537-433183292',
  'https://www.istockphoto.com/video/5g-written-in-the-middle-of-a-futuristic-circles-4k-gm1203195993-345720876'
];

function simulateApiCall(url) {
  console.log('\n=== SIMULATING API CALL ===');
  console.log('Input URL:', url);
  
  // URL parsing logic from the API
  const videoIdMatch = url.match(/gm(\d+)-(\d+)/) || 
                      url.match(/video\/[^\/]*-gm(\d+)-(\d+)/) ||
                      url.match(/-gm(\d+)-(\d+)$/) ||
                      url.match(/gm(\d+)-(\d+)(?:\?|$)/);
  
  if (!videoIdMatch) {
    return { error: 'Could not parse video ID from URL' };
  }
  
  const videoId = videoIdMatch[1];
  const assetId = videoIdMatch[2];
  
  console.log('Extracted Video ID:', videoId);
  console.log('Extracted Asset ID:', assetId);
  
  // Generate fallback URL (Method 4 from our API)
  const fallbackUrl = `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-640x640-is&k=20`;
  console.log('Generated fallback URL:', fallbackUrl);
  
  return {
    videoId,
    assetId,
    previewUrl: fallbackUrl
  };
}

// Test both URLs
testUrls.forEach((url, index) => {
  const result = simulateApiCall(url);
  console.log(`\n--- RESULT ${index + 1} ---`);
  console.log('Video ID:', result.videoId);
  console.log('Preview URL:', result.previewUrl);
});

// Check if results are unique
const result1 = simulateApiCall(testUrls[0]);
const result2 = simulateApiCall(testUrls[1]);

console.log('\n=== UNIQUENESS CHECK ===');
console.log('Video ID 1:', result1.videoId);
console.log('Video ID 2:', result2.videoId);
console.log('Are video IDs different?', result1.videoId !== result2.videoId);
console.log('Are preview URLs different?', result1.previewUrl !== result2.previewUrl);