const path = require('path');
const pak = require('../package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
  [
    'module-resolver',
    {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
          [pak.name]: path.join(__dirname, '..', pak.source),
        },
      },
    ],
    
    ['@babel/plugin-transform-runtime', { helpers: true }],
    ["@babel/plugin-proposal-object-rest-spread", { "loose": true }],
    
    'react-native-reanimated/plugin'
  ],
};
