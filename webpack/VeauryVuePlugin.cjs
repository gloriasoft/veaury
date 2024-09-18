const {VueLoaderPlugin} = require('vue-loader')
let vueJsx = []
try {
  require.resolve('@vue/babel-plugin-jsx')
  require.resolve('babel-loader')
  vueJsx.push('@vue/babel-plugin-jsx')
} catch(e) {
  console.warn(e)
}


class VeauryVuePlugin {
  constructor(options = {}) {
    this.vueLoaderPluginInstance = new VueLoaderPlugin()
    this.options = { ...options }
  }
  apply(compiler) {
    function defaultBabelInclude(filename) {
      if (filename.match(/[/\\]node_modules[\\/$]+/)) return
      // // default pass vue file
      if (filename.match(/\.(vue|vue\.[jt]sx?)$/i)) return filename
      if (filename.match(/vue&type=script&setup=true&lang\.[tj]sx$/i)) return filename
      if (filename.match(/vue&type=script&lang\.[tj]sx$/i)) return filename
      // default pass vue_app path
      if (filename.match(/[/\\]vue_app[\\/$]+/)) return filename
    }
    const {babelLoader, isNext} = this.options
    const extensions = compiler.options.resolve?.extensions
    if (extensions && extensions.indexOf('.vue') < 0) {
      extensions.push('.vue')
    }

    const rules = compiler.options.module.rules
    const firstOneOf = rules.find((item) => item.oneOf)

    if (isNext === true) {
      // remove error-loader
      firstOneOf.oneOf = firstOneOf.oneOf.filter((item) => item?.use?.loader !== 'error-loader')

      firstOneOf.oneOf.push({
        test: /\.css$/,
        use: [
          'style-loader','css-loader'
        ]
      })
    }

    rules.unshift({
      test: /\.vue$/,
      loader: 'vue-loader',
      options: { hotReload: false },
    })

    rules.push({
        test: /\.vue$/,
        type: 'javascript/auto'
      },
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
            ...vueJsx
          ]
        }
      }
    )
    // apply VueLoaderPlugin
    this.vueLoaderPluginInstance.apply(compiler)
  }
}

module.exports = VeauryVuePlugin;
