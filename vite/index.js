const vue = require('@vitejs/plugin-vue')
const react = require('@vitejs/plugin-react')
const vueJsx = require('@vitejs/plugin-vue-jsx')

function veauryVitePlugins({type, vueJsxInclude, vueJsxExclude}) {

  let vueJsxOptions = {}
  if (type === 'react') {
    vueJsxOptions.include = [/vue&type=script&lang\.[tj]sx?$/, /vue&type=script&setup=true&lang\.[tj]sx?$/, /[/\\]vue_app[\\/$]+/]
  }
  if (type === 'vue') {
    vueJsxOptions.exclude = [/[/\\]react_app[\\/$]+/]
  }
  if (type === 'custom') {
    if (vueJsxInclude) {
      vueJsxOptions.include = vueJsxInclude
    }
    if (vueJsxExclude) {
      vueJsxOptions.exclude = vueJsxExclude
    }
  }

  return [
    vue(),
    // Make vueJsx plugin run time earlier
    {
      ...vueJsx(vueJsxOptions),
      enforce: 'pre'
    },
    react()
  ]
}

module.exports = veauryVitePlugins
