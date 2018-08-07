const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  // externals: [nodeExternals()],
  externals: ['aws-sdk', 'aws-xray-sdk-core'],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    // modules: [path.resolve(__dirname), "node_modules"],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    pathinfo: true,
  },
  module: {
    rules: [{ test: /\.js(x?)$/, loader: 'babel-loader' }],
  },
};
