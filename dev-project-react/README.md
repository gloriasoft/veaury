# The React development environment for Veaury  
The React project created by `create-react-app`, and ran the `npm run eject` command in the project.  
This project is only used for the development of `veaury` in the main React environment, not a standard usage scenario.  
## Dependency of Vue3 environment  
To enable React projects to develop Vue3 files, some additional dependencies need to be installed. In actual usage scenarios, it is not necessary to deploy two front-end frameworks in one project.   
- `vue` —— It is recommended to install the latest version.   
## configuration
- First install `vue` and `veaury`
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
