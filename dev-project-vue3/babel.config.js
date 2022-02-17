const path = require('path')
function resolve (dir) {
  return path.join(__dirname,  dir)
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  overrides: [
    {
      test (filename) {
        // The files in the following paths are compiled with React's jsx
        if (filename?.startsWith(resolve('src')) && filename.match(/\/react_app[\/$]+/) || filename?.startsWith(resolve('../src'))) return filename
      },
      plugins: [
        // Compile with React's jsx
        'transform-react-jsx'
      ],
      presets: [
        ['@vue/cli-plugin-babel/preset', {
          // Turn off jsx compilation of Vue
          jsx: false
        }]
      ]
    }
  ]
}
