const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');

const config = {
  mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
  entry: {
    main: [
      path.resolve(__dirname, './src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, './public'),
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [ new VueLoaderPlugin() ]
};

module.exports = config;
