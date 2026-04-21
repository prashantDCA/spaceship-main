// Validate the URL generation logic
const testUrl = 'https://www.istockphoto.com/video/futuristic-animated-concept-big-data-center-chief-technology-officer-using-laptop-gm1360048537-433183292';

// Extract video ID and filename like the API does
const videoIdMatch = testUrl.match(/gm(\d+)-(\d+)/);
const videoId = videoIdMatch[1]; // Should be "1360048537"
const assetId = videoIdMatch[2]; // Should be "433183292"

const urlMatch = testUrl.match(/\/video\/([^\/]+)/);
const directFilename = urlMatch ? urlMatch[1] : videoId;

console.log('Video ID:', videoId);
console.log('Asset ID:', assetId);
console.log('Direct filename:', directFilename);

// Generate URLs like Method 0 does
const directUrls = [
  `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-640x640-is&k=10`,
  `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-640x640-is&k=21`,
  `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-480x480-is&k=10`,
  `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-480x480-is&k=21`,
  `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-640x640-is&k=10`,
  `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-640x640-is&k=21`,
  `https://media.istockphoto.com/id/${videoId}/video/${videoId}.mp4?s=mp4-480x480-is&k=10`,
];

console.log('\nGenerated URLs:');
directUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

// Test with second URL
console.log('\n=== Testing second URL ===');
const testUrl2 = 'https://www.istockphoto.com/video/5g-written-in-the-middle-of-a-futuristic-circles-4k-gm1203195993-345720876';

const videoIdMatch2 = testUrl2.match(/gm(\d+)-(\d+)/);
const videoId2 = videoIdMatch2[1]; // Should be "1203195993"
const assetId2 = videoIdMatch2[2]; // Should be "345720876"

const urlMatch2 = testUrl2.match(/\/video\/([^\/]+)/);
const directFilename2 = urlMatch2 ? urlMatch2[1] : videoId2;

console.log('Video ID 2:', videoId2);
console.log('Asset ID 2:', assetId2);
console.log('Direct filename 2:', directFilename2);

// Check uniqueness
console.log('\n=== Uniqueness Check ===');
console.log('Video IDs are different:', videoId !== videoId2);
console.log('Asset IDs are different:', assetId !== assetId2);
console.log('Filenames are different:', directFilename !== directFilename2);

const url1 = `https://media.istockphoto.com/id/${videoId}/video/${directFilename}.mp4?s=mp4-640x640-is&k=10`;
const url2 = `https://media.istockphoto.com/id/${videoId2}/video/${directFilename2}.mp4?s=mp4-640x640-is&k=10`;

console.log('Generated URLs are different:', url1 !== url2);
console.log('URL 1:', url1);
console.log('URL 2:', url2);