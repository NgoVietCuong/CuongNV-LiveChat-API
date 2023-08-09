const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  entry: './browser/index.js',
  output: {
    filename: 'livechat.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new Dotenv()
  ]
}