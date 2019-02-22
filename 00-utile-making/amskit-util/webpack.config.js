// webpack.config.js
module.exports = {
    entry: './src/index.js',
    output: {
      path: __dirname,  // 현재 디렉토리
      filename: './dist/amskit-util.js'
    }
  };