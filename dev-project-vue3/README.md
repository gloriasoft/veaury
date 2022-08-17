# The Vue3 development environment for Veaury
The vue3 project created by `@vue/cli`, and through the configuration of `babel.config.js`, the files in the specified path support React's jsx compilation.  
This project is only used for the development of `veaury` in the main Vue3 environment, not a standard usage scenario.   

## Dependency of React environment  
To enable Vue3 project to develop React JS files, some additional dependencies need to be installed. In actual usage scenarios, it is not necessary to deploy two front-end frameworks in one project.  
1. `react` —— It is recommended to install the latest version.  
2. `react-dom` —— It is recommended to install the latest version.

## configuration  
It is relatively easy to configure the Vue3 project to support React JSX compilation, just configure the `babel.config.js` of the local project.  
- First install `react` , `react-dom` , `veaury` and `babel-preset-react-app`.  
- Comment `@vue/cli-plugin-babel/preset`.  
- Add Veaury's babel preset to the `babel.config.js`  
```js
module.exports = {
  presets: [
    // Turn off '@vue/cli-plugin-babel/preset'
    // '@vue/cli-plugin-babel/preset',
    // veaury babel preset
    'veaury/babel/ReactPreset'
  ]
}
```
By default, js files in the 'react_app' directory can use the react type jsx.  
The way to customize the file range supported by react type jsx:  
```js
module.exports = {
  presets: [
    // Turn off '@vue/cli-plugin-babel/preset'
    // '@vue/cli-plugin-babel/preset',
    // veaury babel preset
    ['veaury/babel/ReactPreset', {
      test (filename) {
        // default ignore node_modules
        if (filename.match(/[/\\]node_modules[\\/$]+/)) return
        // default pass abc path
        if (filename.match(/[/\\]abc[\\/$]+/)) return filename
      },
    }]
  ]
}
```
