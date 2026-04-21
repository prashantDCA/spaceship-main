// Manual test for URL parsing
const url1 = 'https://www.istockphoto.com/video/futuristic-animated-concept-big-data-center-chief-technology-officer-using-laptop-gm1360048537-433183292';
const url2 = 'https://www.istockphoto.com/video/5g-written-in-the-middle-of-a-futuristic-circles-4k-gm1203195993-345720876';

function testUrlParsing(url) {
  console.log('\n=== Testing URL:', url);
  
  const videoIdMatch = url.match(/gm(\d+)-(\d+)/) || 
                      url.match(/video\/[^\/]*-gm(\d+)-(\d+)/) ||
                      url.match(/-gm(\d+)-(\d+)$/) ||
                      url.match(/gm(\d+)-(\d+)(?:\?|$)/);
  
  if (videoIdMatch) {
    const videoId = videoIdMatch[1];
    const assetId = videoIdMatch[2];
    console.log('✅ Video ID:', videoId);
    console.log('✅ Asset ID:', assetId);
    
    // Check if unique
    const isUnique = videoId !== '1360048537' || assetId !== '433183292';
    console.log('Is unique from first video?', isUnique);
    
    return { videoId, assetId, isUnique };
  } else {
    console.log('❌ Failed to parse');
    return null;
  }
}

const result1 = testUrlParsing(url1);
const result2 = testUrlParsing(url2);

console.log('\n=== SUMMARY ===');
console.log('URL 1 Video ID:', result1?.videoId);
console.log('URL 2 Video ID:', result2?.videoId);
console.log('Are they different?', result1?.videoId !== result2?.videoId);