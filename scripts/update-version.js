#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the current app.json
const appJsonPath = path.join(process.cwd(), 'app.json');
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

// Get command line arguments
const args = process.argv.slice(2);
const newVersion = args[0];

if (!newVersion) {
  console.log('Usage: node scripts/update-version.js <new-version>');
  console.log('Example: node scripts/update-version.js 1.0.1');
  console.log('\nCurrent version:', appJson.expo.version);
  process.exit(1);
}

// Validate version format (simple check)
if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error('Error: Version must be in format X.Y.Z (e.g., 1.0.1)');
  process.exit(1);
}

// Update version
const oldVersion = appJson.expo.version;
appJson.expo.version = newVersion;

// Write back to file
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 3));

console.log(`✅ Version updated from ${oldVersion} to ${newVersion}`);
console.log('\nNext steps:');
console.log('1. Commit your changes: git add . && git commit -m "Bump version to ' + newVersion + '"');
console.log('2. Build your app: eas build --platform android --profile production');
console.log('3. Build for iOS: eas build --platform ios --profile production'); 