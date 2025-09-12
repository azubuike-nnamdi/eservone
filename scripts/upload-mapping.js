#!/usr/bin/env node

/**
 * Script to help upload ProGuard mapping files to Google Play Console
 * This script should be run after each production build to upload the mapping file
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAPPING_FILE_PATH = path.join(__dirname, '../android/app/build/outputs/mapping/release/mapping.txt');
const OUTPUT_DIR = path.join(__dirname, '../dist/mapping');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Check if mapping file exists
if (fs.existsSync(MAPPING_FILE_PATH)) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputFile = path.join(OUTPUT_DIR, `mapping-${timestamp}.txt`);

  // Copy mapping file to dist directory
  fs.copyFileSync(MAPPING_FILE_PATH, outputFile);

  console.log('✅ Mapping file copied to:', outputFile);
  console.log('📤 Upload this file to Google Play Console:');
  console.log('   1. Go to Google Play Console');
  console.log('   2. Select your app');
  console.log('   3. Go to Release > App bundles');
  console.log('   4. Find your release and click "Upload deobfuscation file"');
  console.log('   5. Upload the mapping file:', outputFile);
} else {
  console.log('❌ Mapping file not found at:', MAPPING_FILE_PATH);
  console.log('💡 Make sure you have built a release version with ProGuard enabled');
  console.log('   Run: eas build --platform android --profile production');
}
