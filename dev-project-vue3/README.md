# The Vue3 development environment for Veaury
The vue3 project created by `@vue/cli`, and through the configuration of `babel.config.js`, the files in the specified path support React's jsx compilation.  
This project is only used for the development of `veaury` in the main Vue3 environment, not a standard usage scenario.   

## Dependency of React environment  
To enable Vue3 project to develop React JS files, some additional dependencies need to be installed. In actual usage scenarios, it is not necessary to deploy two front-end frameworks in one project.  
1. `react` —— It is recommended to install the latest version.  
2. `react-dom` —— It is recommended to install the latest version.

## configuration  
It is relatively easy to configure the Vue3 project to support React JSX compilation, just configure the `babel.config.js` of the local project.  
- First install `react` , `react-dom` and `veaury`.  
- Add Veaury's babel preset to the `babel.config.js`  
```js
module.exports = {
  presets: [
    // @vue/cli preset
    '@vue/cli-plugin-babel/preset',
    // veary babel preset
    'veaury/babel/ReactPreset'
  ]
}
```
