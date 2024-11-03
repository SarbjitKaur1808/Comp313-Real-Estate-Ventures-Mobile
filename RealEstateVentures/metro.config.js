const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const blacklist = require('metro-config/src/defaults/exclusionList'); // Required for `blacklistRE`

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  resolver: {
    blacklistRE: blacklist([/node_modules\/.*\/node_modules\/.*/]), // Using `exclusionList` (formerly `blacklistRE`)
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), customConfig);
