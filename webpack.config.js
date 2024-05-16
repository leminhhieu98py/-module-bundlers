const path = require('path');
const toml = require('toml');
const yamljs = require('yamljs');
const json5 = require('json5');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fontRegex = /\.(woff|woff2|eot|ttf|otf)$/i;
const imageRegex = /\.(png|svg|jpg|jpeg|gif)$/i;

module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'share'
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'share'
    },
    share: 'lodash'
  },
  module: {
    rules: [
      // Asset management
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
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
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 1233
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development'
    }),
    new BundleAnalyzerPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: ({ filename }) => {
      if (fontRegex.test(filename)) return 'fonts/[name][ext]';
      if (imageRegex.test(filename)) return 'images/[name][ext]';

      return 'asset/[name][ext]';
    },
    clean: true
  },
  optimization: {
    runtimeChunk: 'single'
  }
};
