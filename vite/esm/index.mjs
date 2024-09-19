import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import vueJsx from '@vitejs/plugin-vue-jsx'

function veauryVitePlugins({isNuxt, type, vueJsxInclude, vueJsxExclude, vueOptions = {}, vueJsxOptions: initVueJsxOptions = {}, reactOptions = {}}) {

  let vueJsxOptions = {...initVueJsxOptions}
  if (type === 'react') {
    vueJsxOptions.include = [/vue&type=script&lang\.[tj]sx$/i, /vue&type=script&setup=true&lang\.[tj]sx$/i, /[/\\]vue_app[\\/][\w\W]+\.[tj]sx$/]
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
    // ReactDOMTransformPlugin(),
    // requireTransform({

    //   fileRegex: /veaury/
    // }),
    isNuxt === true? {}: vue(vueOptions),
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
            include: /\.[jt]sx?$/
          }
        }
      }
    },
    react({
      jsxImportSource: 'react',
      ...reactOptions
    })
  ]
}

export default veauryVitePlugins
