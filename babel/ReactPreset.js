/**
 * @jest-environment node
 */

module.exports = function(context, options = {}) {
  let presets1 = []
  let presets2 = []
  try {
    presets1.push([require('@vue/cli-plugin-babel/preset'), {
      // Turn off jsx compilation of Vue
      jsx: false
    }])
    presets2.push(require('@vue/cli-plugin-babel/preset'))
  } catch(e) {}
  presets1.push('babel-preset-react-app')
  return {
    presets: presets2,
    overrides: [
      {
        test (filename) {
          // default ignore node_modules
          if (filename.match(/[/\\]node_modules[\\/$]+/)) return
          // default pass react_app path
          if (filename.match(/[/\\]react_app[\\/$]+/)) return filename
        },
        ...options,
        // plugins: [
        //   // Compile with React's jsx
        //   '@babel/plugin-transform-react-jsx'
        // ],
        presets: presets1
      }
    ]
  }
}
