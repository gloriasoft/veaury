const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  publicPath: './',
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  transpileDependencies:['tailwind-merge'],
  configureWebpack: {
    resolve: {
      alias: {
        ...(process.env.BUILD_TYPE === 'remote'? {}: {
          veaury: path.resolve(__dirname, '../src')
        }),
        src: path.resolve(__dirname, './src'),
        react_app: path.resolve(__dirname, './src/react_app'),
      }
    },
    plugins: [
      new ReactRefreshWebpackPlugin({
        overlay: false,
      })
    ]
  }
}
