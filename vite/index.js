const vue = require('@vitejs/plugin-vue')
const react = require('@vitejs/plugin-react')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const requireTransform = require('vite-plugin-require-transform').default
function ReactDOMTransformPlugin() {
  return {
    resolveId(source, importer) {
      if (source.match(/react-dom\/client/)) {
        return { id: 'veaury-fake-react-dom-client', moduleSideEffects: true }
      }
    },
    load(id) {
      if (id === 'veaury-fake-react-dom-client') {
        return `export * from 'react-dom'; export {default} from 'react-dom';`
      }
    }
  }
}

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
    ReactDOMTransformPlugin(),
    requireTransform({
      fileRegex: /veaury/
    }),
    vue(),
    // Make vueJsx plugin run time earlier
    {
      ...vueJsx(vueJsxOptions),
      enforce: 'pre'
    },
    // recover esbuild include
    {
      config(){
        return {
          esbuild: {
            include: /\.tsx*$/
          }
        }
      }
    },
    react()
  ]
}

module.exports = veauryVitePlugins
