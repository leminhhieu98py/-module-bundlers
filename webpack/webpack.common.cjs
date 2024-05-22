const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config({ path: `env/.env.${process.env.NODE_ENV}` });

const ASSET_PATH = process.env.ASSET_PATH || '/';

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
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(process.env.ASSET_PATH)
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
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, '../src/')
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: ({ filename }) => {
      if (fontRegex.test(filename)) return 'fonts/[name][ext]';
      if (imageRegex.test(filename)) return 'images/[name][ext]';

      return 'asset/[name][ext]';
    },
    publicPath: ASSET_PATH,
    clean: true
  },
  optimization: {
    moduleIds: 'deterministic',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      },
      maxSize: 512000 // 512KB
    }
  }
};
