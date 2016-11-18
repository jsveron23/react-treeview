var path    = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],

  output: {
    path      : path.join(__dirname, 'public'),
    filename  : 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [{
      test   : /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test   : /\.scss$/,
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
    }]
  }
};
