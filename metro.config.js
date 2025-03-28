const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure asset extensions
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'ttf');

// Configure source extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

// Configure module resolution
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@expo/vector-icons': require.resolve('@expo/vector-icons'),
  'react-native-gesture-handler': require.resolve('react-native-gesture-handler'),
};

module.exports = config; 