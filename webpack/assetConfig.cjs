const toml = require('toml');
const yamljs = require('yamljs');
const json5 = require('json5');

const fontRegex = /\.(woff|woff2|eot|ttf|otf)$/i;
const imageRegex = /\.(png|svg|jpg|jpeg|gif)$/i;

const config = [
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
];

module.exports = { config, fontRegex, imageRegex };
