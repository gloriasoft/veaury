# The React development environment for Veaury  
The React project created by `create-react-app`, and ran the `npm run eject` command in the project.  
This project is only used for the development of `veaury` in the main React environment, not a standard usage scenario.  
## Dependency of Vue3 environment  
To enable React projects to develop Vue3 files, some additional dependencies need to be installed. In actual usage scenarios, it is not necessary to deploy two front-end frameworks in one project.   
1. `vue` —— It is recommended to install the latest version.  
2. `vue-loader` —— It is recommended to install the latest version.   
## configuration
Then make configuration modifications in the generated `config/webpack.config.js`, enables the project to compile `.vue` type files and to debug the `veaury` source code in the parent project.  
1. Set `vue-loader` in `rules`  
2. Insert the instantiated `VueLoaderPlugin` into `plugins`  
3. Add `vue` suffix to `extensions` of `resolve`  
4. Open `configFile` of `babel-loader`  
5. Add the ability to compile React jsx of the parent project in the `babel.config.js` of the local project. You can directly use the `babel-preset-react-app` that already exists in the project.  
6. The `ModuleScopePlugin` should be deprecated because the `veaury` in the project needs to be mapped to the `src` directory of the parent project.  
7. Add an alias of `veaury` to the `alias` of `resovle` and point to the `src` directory of the parent project. 
