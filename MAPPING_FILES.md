# ProGuard Mapping Files

This document explains how to handle ProGuard mapping files for deobfuscation in Google Play Console.

## What are Mapping Files?

When you enable ProGuard/R8 for code obfuscation in your Android app, the code gets minified and obfuscated to reduce app size and protect your code. However, this makes crash reports and ANRs (Application Not Responding) difficult to debug because the stack traces are obfuscated.

Mapping files contain the mapping between obfuscated names and original names, allowing Google Play Console to deobfuscate crash reports for easier debugging.

## Current Configuration

✅ **ProGuard is enabled** in release builds
✅ **Mapping files are generated** automatically
✅ **Comprehensive ProGuard rules** are configured for React Native

## How to Upload Mapping Files

### After Each Production Build

1. **Build your app** using EAS:

   ```bash
   eas build --platform android --profile production
   ```

2. **Extract mapping file** using the provided script:

   ```bash
   npm run upload-mapping
   ```

3. **Upload to Google Play Console**:
   -  Go to [Google Play Console](https://play.google.com/console)
   -  Select your app
   -  Navigate to **Release > App bundles**
   -  Find your release and click **"Upload deobfuscation file"**
   -  Upload the mapping file from `dist/mapping/`

### Manual Process

If you prefer to do it manually:

1. **Locate the mapping file**:

   ```
   android/app/build/outputs/mapping/release/mapping.txt
   ```

2. **Upload to Google Play Console** as described above

## ProGuard Configuration

The ProGuard configuration includes rules for:

-  React Native core libraries
-  Hermes JavaScript engine
-  Expo modules
-  React Native Reanimated
-  Native methods
-  React Native bridge components
-  TurboModules and Fabric

## Benefits

-  **Smaller app size**: Code obfuscation reduces the final APK/AAB size
-  **Better crash reports**: Deobfuscated stack traces are easier to debug
-  **Code protection**: Obfuscated code is harder to reverse engineer
-  **Improved performance**: Minified code can run slightly faster

## Troubleshooting

### Mapping file not found

-  Ensure you've built a release version: `eas build --platform android --profile production`
-  Check that ProGuard is enabled in `android/gradle.properties`
-  Verify the build completed successfully

### Upload fails

-  Ensure the mapping file is for the exact same version code as your uploaded app
-  Check that the file is not corrupted
-  Verify you're uploading to the correct release in Google Play Console

## Files Modified

-  `android/gradle.properties` - Enabled ProGuard
-  `android/app/build.gradle` - Added mapping file configuration
-  `android/app/proguard-rules.pro` - Added comprehensive ProGuard rules
-  `scripts/upload-mapping.js` - Created helper script
-  `package.json` - Added upload-mapping script command
