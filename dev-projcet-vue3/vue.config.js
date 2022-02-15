const path = require('path')
module.exports = {
  publicPath: './',
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        combined: path.resolve(__dirname, '../src'),
        src: path.resolve(__dirname, './src'),
        react_app: path.resolve(__dirname, './src/react_app'),
      }
    }
  }
}
