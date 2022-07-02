const vue = require('@vitejs/plugin-vue')
const react = require('@vitejs/plugin-react')

function veauryVitePlugins({type, vueJsxInclude, vueJsxExclude, vueJsxOverrides, reactPluginBabelOption}) {

  let initOverrides = [{
    plugins: ['@vue/babel-plugin-jsx']
  }]
  if (type === 'react') {
    initOverrides[0].include = [/vue&type=script&lang\.[tj]sx?$/]
  }
  if (type === 'vue') {
    initOverrides[0].exclude = [/[/\\]react_app[\\/$]+/]
  }
  if (type === 'custom') {
    if (vueJsxInclude) {
      initOverrides[0].include = vueJsxInclude
    }
    if (vueJsxExclude) {
      initOverrides[0].include = vueJsxExclude
    }
    if (vueJsxOverrides) {
      initOverrides = vueJsxOverrides
    }
  }

  return [
    vue(),
    react({
      babel: {
        // Default vuejsx plugin is off
        plugins: [['@vue/babel-plugin-jsx', false]],
        overrides: initOverrides,
        ...reactPluginBabelOption
      }
    })
  ]
}

module.exports = veauryVitePlugins
