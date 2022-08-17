# The React development environment for Veaury  
The React project created by `create-react-app`, and ran the `npm run eject` command in the project.  
This project is only used for the development of `veaury` in the main React environment, not a standard usage scenario.  
## Dependency of Vue3 environment  
To enable React projects to develop Vue3 files, some additional dependencies need to be installed. In actual usage scenarios, it is not necessary to deploy two front-end frameworks in one project.   
- `vue` —— It is recommended to install the latest version.   
## configuration
- First install `vue` , `veaury` , `vue-loader` and `@vue/babel-plugin-jsx`.
- Add Veaury's webpack plugin to the plugins of `config/webpack.config.js`  
```js
// webpack.config.js
// ...
module.exports = {
  // ...
  plugins: [
    new (require('veaury/webpack/VeauryVuePlugin')),
    // ...
  ]
  // ...
}
```
By default, all vue files and js files in the vue_app directory can use the vue type jsx.  
The way to customize the file range supported by vue type jsx:  
```js
// webpack.config.js
// ...
const VeauryVuePlugin = require('veaury/webpack/VeauryVuePlugin')
module.exports = {
  // ...
  plugins: [
    new VeauryVuePlugin({
      babelLoader: {
        // Set all vue files and js files in the 'abc' directory to support vue type jsx
        include(filename) {
          // ignore node_modules
          if (filename.match(/[/\\]node_modules[\\/$]+/)) return
          // pass all vue file
          if (filename.match(/\.(vue|vue\.js)$/i)){
            return filename
          }
          // pass abc path
          if (filename.match(/[/\\]abc[\\/$]+/)) return filename
        },
        // exclude() {}
      }
    }),
    // ...
  ]
  // ...
}
```
