const {VueLoaderPlugin} = require('vue-loader')

class VeauryVuePlugin {
  constructor(options = {}) {
    this.options = { ...options }
  }
  apply(compiler) {
    const options = this.options
    const rules = compiler.options.module.rules
    const newRules = [
      { // add vue-loader
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        configFile: false,
        babelrc: false,
        options: {
          test (filename) {
            if (!options.test) {
              // default ignore node_modules
              if (filename.match(/[/\\]node_modules[\\/$]+/)) return
              // default pass vue file
              if (filename.match(/[/\\]\.vue$/i)) return filename
              // default pass vue_app path
              if (filename.match(/[/\\]vue_app[\\/$]+/)) return filename
              return
            }
            return options.test.call(this, filename)
          },
          plugins: [
            // Compile with Vue's jsx
            '@vue/babel-plugin-jsx'
          ]
        }
      }
    ]
    rules.unshift(...newRules)
    compiler.options.plugins.unshift(new VueLoaderPlugin())
    // compiler.hooks.environment.tap(
    //   'Hello World Plugin',
    //   () => {
    //     console.log(compiler.options.module)
    //     console.log('Hello World!---------------------');
    //   }
    // );
  }
}

module.exports = VearyVuePlugin;
