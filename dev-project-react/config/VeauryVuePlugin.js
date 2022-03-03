const {VueLoaderPlugin} = require('vue-loader')

class VeauryVuePlugin {
  constructor(options = {}) {
    console.log(12121212)
    this.vueLoaderPluginInstance = new VueLoaderPlugin()
    this.options = { ...options }
  }
  apply(compiler) {
    const options = this.options
    const rules = compiler.options.module.rules
    const newRules = [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: function(filename) {
          // if (filename.match(/[/\\]node_modules[\\/$]+/)) return
          // // default pass vue file
          console.log(3333333333, filename)
          if (filename.match(/\.vue/i)){
            console.log(22222222222, filename)
            return filename
          }
          // // default pass vue_app path
          // if (filename.match(/[/\\]vue_app[\\/$]+/)) return filename
          // console.log(222222, filename)
          // return filename
        },
        options: {
          cacheDirectory: false,
          cacheCompression: false,
          configFile: false,
          babelrc: false,
          test: function(filename) {
            console.log(11111111111, filename)
            return filename
          },
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
