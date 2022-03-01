const path = require('path')
function resolve (dir) {
  return path.join(__dirname,  dir)
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['veaury/babel/preset', {
      mode: 'reactInVue',
      // test: function(filename) {
      //   // The files in the following paths are compiled with React's jsx
      //   if (filename?.startsWith(resolve('src')) && filename.match(/[/\\]react_app[\\/$]+/) || filename?.startsWith(resolve('../src'))) return filename
      // }
    }]
  ]
}
