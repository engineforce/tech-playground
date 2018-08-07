const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: {
    index: './index.js',
  },
  minimize: !process.env.DEBUG,
  cleanOutDir: true,
  html: false,
  sourceMap: false,
  hash: false,
  format: 'cjs',
  configureWebpack(config, context) {
    config.target = 'node';
    config.externals = [
      nodeExternals({
        // modulesDir: "../../node_modules",
        modulesFromFile: true,
      }),
    ];

    return config;
  },
  // plugins: [require('@poi/plugin-typescript')()],
};
