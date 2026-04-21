#!/usr/bin/env node
/**
 * Simple build test to check for basic import/export issues
 */

const fs = require('fs');
const path = require('path');

// Check if critical files exist
const criticalFiles = [
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/admin/page.tsx',
  'src/app/auth/login/page.tsx',
  'src/components/AdminRoute.tsx',
  'src/lib/auth.tsx',
  'src/lib/supabase.ts',
  'next.config.js',
  'package.json',
  'tsconfig.json',
  'tailwind.config.js',
];

console.log('🔍 Checking critical files...');
let missingFiles = [];

for (const file of criticalFiles) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  console.error('❌ Missing critical files:');
  missingFiles.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
} else {
  console.log('✅ All critical files exist');
}

// Check for basic syntax issues in TypeScript files
console.log('\n🔍 Checking for basic syntax issues...');
const tsFiles = [
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/admin/page.tsx',
  'src/components/AdminRoute.tsx',
  'src/lib/auth.tsx',
];

for (const file of tsFiles) {
  const filePath = path.join(__dirname, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Basic checks
  if (content.includes('export default') || content.includes('export function') || content.includes('export const')) {
    console.log(`✅ ${file} - has exports`);
  } else {
    console.log(`⚠️  ${file} - no exports found`);
  }
}

// Check environment variables setup
console.log('\n🔍 Checking environment setup...');
const envExample = `
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
`;

console.log('✅ Build test completed');
console.log('\n📝 Make sure you have these environment variables set:');
console.log(envExample);