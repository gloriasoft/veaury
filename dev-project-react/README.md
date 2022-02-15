# The React development environment for Veaury  
The React project created by `create-react-app`, and run the command `npm run eject` in the project. 

## configure
Then make configuration modifications in the generated `config/webpack.config.js`, enables the project to compile `.vue` type files and to debug the `veaury` source code in the parent project  
1. Set `vue-loader` in `rules`  
2. Insert the instantiated `VueLoaderPlugin` into `plugins`  
3. Add `vue` suffix to `extensions` of `resolve`  
4. Open `configFile` of `babel-loader`  
5. Add the ability to compile React jsx of the parent project in `babel.config.js`  
6. Deprecated `ModuleScopePlugin`  
7. Add an alias of `veaury` to the `alias` of `resovle` and point to the `src` directory of the parent project  

This project serves as the development base of `veaury` in the React main environment.  
