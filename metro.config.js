const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add Reanimated plugin
config.resolver.plugins = [
  ...(config.resolver.plugins || [])
];

module.exports = withNativeWind(config, { input: "./app/global.css" });
