const {VueLoaderPlugin} = require('vue-loader')

class VeauryVuePlugin {
  constructor(options = {}) {
    this.vueLoaderPluginInstance = new VueLoaderPlugin()
    this.options = { ...options }
  }
  apply(compiler) {
    function defaultBabelInclude(filename) {
      if (filename.match(/[/\\]node_modules[\\/$]+/)) return
      // // default pass vue file
      if (filename.match(/\.(vue|vue\.js)$/i)){
        return filename
      }
      // default pass vue_app path
      if (filename.match(/[/\\]vue_app[\\/$]+/)) return filename
    }
    const {babelLoader} = this.options

    const rules = compiler.options.module.rules
    const newRules = [
      {
        include: defaultBabelInclude,
        ...babelLoader,
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: false,
          cacheCompression: false,
          configFile: false,
          babelrc: false,
          plugins: [
            // Compile with Vue's jsx
            '@vue/babel-plugin-jsx'
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
    rules.push(...newRules)
    // apply VueLoaderPlugin
    this.vueLoaderPluginInstance.apply(compiler)
  }
}

module.exports = VeauryVuePlugin;
