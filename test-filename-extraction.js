// Test filename extraction logic
const testUrls = [
  'https://www.istockphoto.com/video/futuristic-animated-concept-big-data-center-chief-technology-officer-using-laptop-gm1360048537-433183292',
  'https://www.istockphoto.com/video/5g-written-in-the-middle-of-a-futuristic-circles-4k-gm1203195993-345720876'
];

function testFilenameExtraction(url) {
  console.log('\n=== Testing filename extraction ===');
  console.log('URL:', url);
  
  // Extract video ID
  const videoIdMatch = url.match(/gm(\d+)-(\d+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  
  // Extract video filename from URL
  const urlMatch = url.match(/\/video\/([^\/]+)/);
  let videoFileName = '';
  
  if (urlMatch) {
    videoFileName = urlMatch[1];
    console.log('✅ Extracted video filename from URL:', videoFileName);
  } else {
    // Fallback: construct filename from video ID
    videoFileName = `video-${videoId}`;
    console.log('⚠️  Using fallback video filename:', videoFileName);
  }
  
  // Generate test URLs
  const testUrls = [
    `https://media.istockphoto.com/id/${videoId}/video/${videoFileName}.mp4?s=mp4-640x640-is`,
    `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4`,
  ];
  
  console.log('Generated test URLs:');
  testUrls.forEach((url, index) => {
    console.log(`  ${index + 1}. ${url}`);
  });
  
  return { videoId, videoFileName, testUrls };
}

testUrls.forEach((url, index) => {
  console.log(`\n--- TEST ${index + 1} ---`);
  testFilenameExtraction(url);
});