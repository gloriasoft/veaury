function reactInVue(options) {
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
          if (!options.test) {
            // default ignore node_modules
            if (filename.match(/[/\\]node_modules[\\/$]+/)) return
            // default pass react_app path
            if (filename.match(/[/\\]react_app[\\/$]+/)) return filename
            return
          }
          return options.test.call(this, filename)
        },
        plugins: [
          // Compile with React's jsx
          'transform-react-jsx'
        ],
        presets
      }
    ]
  }
}

function vueInReact(options) {
  return {
    overrides: [
      {
        test (filename) {
          if (!options.test) {
            // default ignore node_modules
            if (filename.match(/[/\\]node_modules[\\/$]+/)) return
            // default pass vue file
            if (filename.match(/\.vue$/i)) return filename
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
    ]
  }
}

module.exports = function(context, options = {}) {
  if (options.mode === 'reactInVue') {
    return reactInVue.call(this, options)
  }
  if (options.mode === 'vueInReact') {
    return vueInReact.call(this, options)
  }
  return {}
}
