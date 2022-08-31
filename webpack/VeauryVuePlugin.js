const {VueLoaderPlugin} = require('vue-loader')
let vueJsx = []
try {
  require.resolve('@vue/babel-plugin-jsx')
  vueJsx.push('@vue/babel-plugin-jsx')
} catch(e) {}


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
    const extensions = compiler.options.resolve?.extensions
    if (extensions && extensions.indexOf('.vue') < 0) {
      extensions.push('.vue')
    }
    const rules = compiler.options.module.rules
    // find oneOf rule
    const oneOfRule = rules.find((rule) => rule.oneOf)
    // the last rule is file-loader
    const fileLoaderRule = oneOfRule && oneOfRule.oneOf[oneOfRule.oneOf.length-1]

    if (fileLoaderRule) {
      // ignore vue type file
      fileLoaderRule.exclude.push(/\.vue$/)
    }

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
            ...vueJsx
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: { hotReload: false }
      },
    ]
    rules.push(...newRules)
    // apply VueLoaderPlugin
    this.vueLoaderPluginInstance.apply(compiler)
  }
}

module.exports = VeauryVuePlugin;
