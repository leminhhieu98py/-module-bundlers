const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const toml = require('toml');
const yamljs = require('yamljs');
const json5 = require('json5');
const webpack = require('webpack');

const fontRegex = /\.(woff|woff2|eot|ttf|otf)$/i;
const imageRegex = /\.(png|svg|jpg|jpeg|gif)$/i;

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
      {
        test: imageRegex,
        type: 'asset/resource'
      },
      {
        test: fontRegex,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)$/i,
        use: 'csv-loader'
      },
      {
        test: /\.xml$/i,
        use: 'xml-loader'
      },
      {
        test: /\.toml/i,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      {
        test: /\.(yml|yaml)$/i,
        type: 'json',
        parser: {
          parse: yamljs.parse
        }
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      },
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
