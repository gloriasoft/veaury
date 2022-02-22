# Veaury

<div align=center>
  <img src="https://raw.githubusercontent.com/devilwjp/VueReact/master/vuereact-combined.png"/>
</div>  

<div align=center>
  <p>
  <h1>Use React in Vue3 and Vue3 in React, And as perfect as possible!</h1>
  <p>
</div>  

## Do you want to preconfigure your project in advance?  
In theory, you don't need to do additional configuration in a React project to support Vue, nor do you need to do additional configuration in a Vue project to support React.  
If the React or Vue component you want to convert comes from a npm package, or has already been built, you can use `applyReactInVue` or `applyVueInReact` directly.  

If you need to develop both Vue and React in a project, instead of just using an existing npm component, then you should do some configuration, usually configuring `webpack.config.js` and `babel.config.js`.  

The `dev-project-react` and `dev-project-vue3` in the project are the basic projects of the development environment of `veaury`, and they are also the two initial projects created by `create-react-app` and `@vue/cli` respectively. You can refer to How the two projects are configured to support the other framework.

Use Vue components in React app:  
```jsx
import { applyVueInReact } from 'veaury'
// This is a vue component
import BasicVue from './Basic.vue'
import { useState } from 'react'
// Use HOC 'applyVueInReact'
const Basic = applyVueInReact(BasicVue)
export default function () {
    const [foo] = useState('Hello!')
    return <Basic foo={foo}>
        <div>
            for the default slot
        </div>
    </Basic>
}
```
