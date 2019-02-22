// webpack.config.js
module.exports = {
    entry: './src/test.js',
    output: {
      path: __dirname,  // 현재 디렉토리
      filename: './dist/amskit-util.js'
    },
    module: {
      loaders: [
       { test: /\.sass$/, loader: 'style!css!sass' }
      ]
    }
  };