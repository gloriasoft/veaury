import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default function veauryVitePlugins(options) {
  let overrides = [{
    plugins: ['@vue/babel-plugin-jsx']
  }]
  if (options.type === 'react') {
    overrides[0].include = [/vue&type=script&lang.[tj]sx?$/]
  }
  if (options.type === 'vue') {
    overrides[0].exclude = [/[/\\]react_app[\\/$]+/]
  }
  if (options.type === 'custom') {
    if (options.include) {
      overrides[0].include = options.include
    }
    if (options.exclude) {
      overrides[0].include = options.exclude
    }
    if (options.overrides)
    overrides = options.overrides
  }
  return [
    vue(),
    react({
      babel: {
        // Default vuejsx plugin is off
        plugins: [['@vue/babel-plugin-jsx', false]],
        overrides
      }
    })
  ]
}
