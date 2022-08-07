const path = require('path');

module.exports = {
	entry: {
		app: path.join(__dirname, 'src/index.js')
	},
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};