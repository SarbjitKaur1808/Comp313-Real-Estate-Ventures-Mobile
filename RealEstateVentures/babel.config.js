module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-syntax-jsx'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
