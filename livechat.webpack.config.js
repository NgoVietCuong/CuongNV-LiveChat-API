const path = require('path');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  entry: './js/index.js',
  output: {
    filename: 'livechat.js',
    path: path.resolve(__dirname, 'public')
  }
}