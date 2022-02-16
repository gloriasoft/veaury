# The React development environment for Veaury  
The React project created by `create-react-app`, and ran the `npm run eject` command in the project.

## Dependency of Vue3 environment  
To enable React projects to develop Vue3 files, some additional dependencies need to be installed. In actual usage scenarios, it is not necessary to deploy two front-end frameworks in one project.   
## configuration
Then make configuration modifications in the generated `config/webpack.config.js`, enables the project to compile `.vue` type files and to debug the `veaury` source code in the parent project  
1. Set `vue-loader` in `rules`  
2. Insert the instantiated `VueLoaderPlugin` into `plugins`  
3. Add `vue` suffix to `extensions` of `resolve`  
4. Open `configFile` of `babel-loader`  
5. Add the ability to compile React jsx of the parent project in `babel.config.js` of the local project. In general, `babel-plugin-transform-react-jsx` is used, so it needs to be installed in advance.  
6. The `ModuleScopePlugin` should be deprecated because the `veaury` in the project needs to be mapped to the `src` directory of the parent project.  
7. Add an alias of `veaury` to the `alias` of `resovle` and point to the `src` directory of the parent project  

This project serves as the development base of `veaury` in the React main environment.  
