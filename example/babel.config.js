// const path = require('path');
// const pak = require('../package.json');

// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: [
//     [
//       'module-resolver',
//       {
//         extensions: ['.tsx', '.ts', '.js', '.json'],
//         alias: {
//           [pak.name]: path.join(__dirname, '..', pak.source),
//         },
//       },
//     ],

//     ['@babel/plugin-transform-runtime', { helpers: true }],
//     ['@babel/plugin-proposal-object-rest-spread', { loose: true }],

//   ],
// };


const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

module.exports = getConfig(
  {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'react-native-reanimated/plugin'
    ]
  },
  { root, pkg }
);
