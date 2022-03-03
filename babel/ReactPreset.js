module.exports = function(context, options = {}) {
  let presets = []
  try {
    presets.push([require('@vue/cli-plugin-babel/preset'), {
      // Turn off jsx compilation of Vue
      jsx: false
    }])
  } catch(e) {}
  return {
    overrides: [
      {
        test (filename) {
          // default ignore node_modules
          if (filename.match(/[/\\]node_modules[\\/$]+/)) return
          // default pass react_app path
          if (filename.match(/[/\\]react_app[\\/$]+/)) return filename
        },
        ...options,
        plugins: [
          // Compile with React's jsx
          'transform-react-jsx'
        ],
        presets
      }
    ]
  }
}
