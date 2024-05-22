const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const {
  config: assetConfig,
  fontRegex,
  imageRegex
} = require('./assetConfig.cjs');

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Progressive Web Application (PWA)'
    }),
    new webpack.ProvidePlugin({
      _: 'lodash-es',
      subtract: ['lodash-es', 'subtract']
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  module: {
    rules: [
      // Asset management
      ...assetConfig,
      // Resolve js extension
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      // Resolve ts extension
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: ({ filename }) => {
      if (fontRegex.test(filename)) return 'fonts/[name][ext]';
      if (imageRegex.test(filename)) return 'images/[name][ext]';

      return 'asset/[name][ext]';
    },
    clean: true
  }
};
