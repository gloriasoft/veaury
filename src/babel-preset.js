const path = require('path')
function resolve (dir) {
  return path.join(__dirname,  dir)
}

function reactInVue(testFunction) {
  return function () {
    let presets = []
    try {
      presets.push(require('@vue/cli-plugin-babel/preset'), {
        // Turn off jsx compilation of Vue
        jsx: false
      })
    } catch(e) {}
    return {
      overrides: [
        {
          test (filename) {
            if (!testFunction) {
              // default ignore node_modules
              if (filename.match(/[/\\]node_modules[\\/$]+/)) return
              // default pass react_app path
              if (filename.match(/[/\\]react_app[\\/$]+/)) return filename
            }
            return testFunction.call(this, filename)
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
}

module.exports = {
  reactInVue
}
