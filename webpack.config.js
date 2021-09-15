const path = require('path');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'main.bundle.js',
  },
}
