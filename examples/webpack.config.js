var path    = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './index.js'
  ],

  output: {
    path      : path.resolve(__dirname, '../public'),
    filename  : 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
    }),
    new webpack.SourceMapDevToolPlugin({
      exclude: /node_modules/
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias     : {
      'react-tj-treeview': path.resolve(__dirname, '../src')
    }
  },

  module: {
    preLoaders: [{
      test   : /\.(js|jsx)$/,
      loader : 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test   : /\.(js|jsx)$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }, {
      test   : /\.scss$/,
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
    }, {
      test  : /\.json$/,
      loader: 'json'
    }]
  },

  eslint: {
    configFile: '../.eslintrc'
  }
};
