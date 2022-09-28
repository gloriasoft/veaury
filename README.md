<div align=center>
  <img src="https://raw.githubusercontent.com/devilwjp/VueReact/master/vuereact-combined.png"/>
</div>  
<h1 align=center>Veaury</h1>
<h2 align=center>Use React in Vue3 and Vue3 in React, And as perfect as possible!</h2>
<p align="center">
  <a href="https://coveralls.io/github/devilwjp/veaury?branch=master"><img src="https://coveralls.io/repos/github/devilwjp/veaury/badge.svg?branch=master" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/veaury"><img src="https://img.shields.io/npm/v/veaury" alt="Version"></a>
  <a href="https://npmcharts.com/compare/veaury?minimal=true"><img src="https://img.shields.io/npm/dm/veaury" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/veaury"><img src="https://img.shields.io/bundlephobia/minzip/veaury" alt="Size"></a>
</p>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is Veaury?](#what-is-veaury)
- [The greatest feature](#the-greatest-feature)
- [Legacy](#legacy)
- [Latest documentation](#latest-documentation)
- [Use cases](#use-cases)
- [Installation](#installation)
- [Do you want to preconfigure your project in advance?](#do-you-want-to-preconfigure-your-project-in-advance)
  - [Webpack](#webpack)
  - [Vite](#vite)
- [Usage](#usage)
  - [Vue in React - Basic usage](#vue-in-react---basic-usage)
  - [React in Vue - Basic usage](#react-in-vue---basic-usage)
  - [Vue in React - Usage of events](#vue-in-react---usage-of-events)
  - [React in Vue - Usage of events](#react-in-vue---usage-of-events)
  - [Vue in React - Usage of slots](#vue-in-react---usage-of-slots)
  - [React in Vue - Usage of render props and React node](#react-in-vue---usage-of-render-props-and-react-node)
  - [Context](#context)
    - [Vue in React - Usage of Provider / useContext](#vue-in-react---usage-of-provider--usecontext)
    - [React in Vue - Usage of Provide / Inject](#react-in-vue---usage-of-provide--inject)
  - [Usage of VueContainer in React Component](#usage-of-vuecontainer-in-react-component)
  - [Usage of getVNode](#usage-of-getvnode)
  - [Usage of getReactNode](#usage-of-getreactnode)
  - [Usage of RenderReactNode](#usage-of-renderreactnode)
  - [Vue in React, Usage of v-model / v-models](#vue-in-react-usage-of-v-model--v-models)
  - [Option useInjectPropsFromWrapper](#option-useinjectpropsfromwrapper)
    - [Usage of injecting React hooks in Vue component](#usage-of-injecting-react-hooks-in-vue-component)
    - [Usage of injecting Vue hooks in React component](#usage-of-injecting-vue-hooks-in-react-component)
  - [Crossing provider](#crossing-provider)
    - [Usage of createCrossingProviderForVueInReact](#usage-of-createcrossingproviderforvueinreact)
    - [Usage of createCrossingProviderForReactInVue](#usage-of-createcrossingproviderforreactinvue)
  - [ReactMissVue](#reactmissvue)
    - [Usage of createReactMissVue](#usage-of-createreactmissvue)
  - [Usage of lazyReactInVue](#usage-of-lazyreactinvue)
  - [Usage of lazyVueInReact](#usage-of-lazyvueinreact)
  - [Usage of getting ref](#usage-of-getting-ref)
- [Typescript JSX types conflict caused by Vue and React at the same time.](#typescript-jsx-types-conflict-caused-by-vue-and-react-at-the-same-time)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is Veaury?  
Veaury (pronounced /ˈvjuːri/, inspired by 'beauty') is a tool library.
It is built on the Vue and React framework. It's use cases include using both Vue and React in one app, migrating from React to Vue or from Vue to React, and using third-party Vue and React Components, such as `antd`, `element-ui`, `vuetify`.    

## The greatest feature  
- 🌞 Support Vue3   
- 🌈 Support Context - Share the context of all vue and react components.  
- 💗 Support for using hooks across frameworks - You can use React's hooks in a Vue component, or you can use Vue's 'setup' function in a React component and use Vue's hooks in this function.  
- 🪂 Pure mode - The children of the converted component no longer have an extra element container. [>>learn more about how the pure mode works](https://github.com/devilwjp/veaury/blob/master/pure_mode.md)  

## Legacy
The perfect [tool library](https://github.com/devilwjp/vuereact-combined) which can use React in Vue2 and Vue2 in React.  

## Latest documentation  
View the latest [documentation](https://github.com/devilwjp/veaury#readme)  
[中文文档](https://github.com/devilwjp/veaury/blob/master/README_zhcn.md)

## Use cases
- 👨‍👩‍👧 Using both Vue and React in one app
- 🏃 Migrating from React to Vue or from Vue to React
- 📲 Using third-party Vue and React Components, such as `antd`, `element-ui`, `vuetify`

## Installation

```sh
# Install with yarn:
$ yarn add veaury
# or with npm:
$ npm i veaury -S
```

## Do you want to preconfigure your project in advance?

In theory, you don't need to do additional configuration in a React project to support Vue, nor do you need to do additional configuration in a Vue project to support React.  
  
If the React or Vue component you want to convert comes from a npm package, or has already been built (Not a direct vue file and does not contain jsx), you can use `applyPureReactInVue` or `applyVueInReact` directly.  
  
If you need to develop both Vue and React in a project, instead of just using an existing npm component (There are both .vue files and react jsx files in a project source code), then you should do some configuration.   
  
### Webpack  
[How to configure React in the Vue project from '@vue/cli' ](https://github.com/devilwjp/veaury/tree/master/dev-project-vue3)  
[How to configure Vue in the React project from 'create-react-app' ](https://github.com/devilwjp/veaury/tree/master/dev-project-react)

### Vite
If it is a project built by `vite`, the relevant configuration is as follows.  
First install `@vitejs/plugin-react`, `@vitejs/plugin-vue` and `@vitejs/plugin-vue-jsx`.  

+ The main project is Vue:  
```js
import { defineConfig } from 'vite'
// >= veaury@2.1.1
import veauryVitePlugins from 'veaury/vite/index.js'

export default defineConfig({
  plugins: [
    // Turn off vue and vuejsx plugins
    // vue(),
    // vueJsx(),
    // When the type of veauryVitePlugins is set to vue, 
    // only jsx in files in the directory named 'react_app' will be parsed with react jsx,
    // and jsx in other files will be parsed with vue jsx
    veauryVitePlugins({
      type: 'vue',
      // Configuration of @vitejs/plugin-vue
      // vueOptions: {...},
      // Configuration of @vitejs/plugin-react
      // reactOptions: {...}, 
      // Configuration of @vitejs/plugin-vue-jsx
      // vueJsxOptions: {...}
    })
  ]
})
```  
+ The main project is React:  
```js
import { defineConfig } from 'vite'
// >= veaury@2.1.1
import veauryVitePlugins from 'veaury/vite/index.js'

export default defineConfig({
  plugins: [
    // Turn off react plugin
    // react(),
    // When the type of veauryVitePlugins is set to react, 
    // only jsx in .vue file will be parsed with vue jsx, 
    // jsx in other files will be parsed with react jsx
    veauryVitePlugins({
      type: 'react',
      // Configuration of @vitejs/plugin-vue
      // vueOptions: {...},
      // Configuration of @vitejs/plugin-react
      // reactOptions: {...}, 
      // Configuration of @vitejs/plugin-vue-jsx
      // vueJsxOptions: {...}
    })
  ]
})

```
If you want to customize the compilation scope of vueJsx, you can configure overrides by setting type to `custom`.
```js
import { defineConfig } from 'vite'
// >= veaury@2.1.1
import veauryVitePlugins from 'veaury/vite/index.js'

export default defineConfig({
  plugins: [
    veauryVitePlugins({
      type: 'custom',
      // The jsx in .vue files and in the directory named 'vue_app' will be parsed with vue jsx.
      vueJsxInclude: [/vue&type=script&lang\.[tj]sx?$/, /vue&type=script&setup=true&lang\.[tj]sx?$/, /[/\\]vue_app[\\/$]+/],
      // vueJsxExclude: [],
      // Configuration of @vitejs/plugin-vue
      // vueOptions: {...},
      // Configuration of @vitejs/plugin-react
      // reactOptions: {...}, 
      // Configuration of @vitejs/plugin-vue-jsx
      // vueJsxOptions: {...}
    })
  ]
})
```
## Usage

### Vue in React - Basic usage

```jsx
import {applyVueInReact, applyPureVueInReact} from 'veaury'
// This is a Vue component
import BasicVueComponent from './Basic.vue'
import {useState} from 'react'
// Use HOC 'applyVueInReact'
const BasicWithNormal = applyVueInReact(BasicVueComponent)
// Use HOC 'applyPureVueInReact'
const BasicWithPure = applyPureVueInReact(BasicVueComponent)
export default function () {
  const [foo] = useState('Hello!')
  return <>
    <BasicWithNormal foo={foo}>
      <div>
        the default slot
      </div>
    </BasicWithNormal>
    <BasicWithPure foo={foo}>
      <div>
        the default slot
      </div>
    </BasicWithPure>
  </>
}
```  

### React in Vue - Basic usage
`applyPureReactInVue` is recommended.  
[Learn about the difference between `applyPureReactInVue` and `applyReactInVue`.](https://github.com/devilwjp/veaury/blob/master/pure_mode.md)   
```vue
<template>
  <BasicPure :foo="foo">
    <div>
      the children
    </div>
  </BasicPure>
</template>
<script>
import {applyReactInVue, applyPureReactInVue} from 'veaury'
// This is a React component
import BasicReactComponent from './react_app/Basic.jsx'
import {ref} from 'vue'

export default {
  components: {
    // Use HOC 'applyReactInVue' or 'applyPureReactInVue'
    Basic: applyReactInVue(BasicReactComponent), 
    BasicPure: applyPureReactInVue(BasicReactComponent)
  },
  setup() {
    return {
      foo: ref('Hello!')
    }
  }
}
</script>
```

### Vue in React - Usage of events

```jsx
import {applyVueInReact} from 'veaury'
import BasicVue from './Basic.vue'
import {useState} from 'react'

const Basic = applyVueInReact(BasicVue)
export default function () {
  function onClickForVue() {
    console.log('clicked!')
  }

  return <div>
    {/*Trigger with $emit('click') in Vue component*/}
    <Basic onClick={onClickForVue}/>
  </div>
}
```

### React in Vue - Usage of events

```vue

<template>
  <!-- Trigger with 'props.onClick()' in React component -->
  <ReactButton @click="onClickForReact"/>
</template>

<script>
import {ref} from 'vue'
import {applyPureReactInVue} from 'veaury'
// This is a React Component
import ReactButton from "./react_app/Button.jsx"

export default {
  components: {
    ReactButton: applyPureReactInVue(ReactButton)
  },
  setup() {
    function onClickForReact() {
      console.log('clicked!')
    }

    return {
      onClickForReact,
    }
  }
}
</script>
```

### Vue in React - Usage of slots

The usage of 'slots' is similar to the usage of 'v-slots' of Vue's jsx.

```jsx
import {applyVueInReact} from 'veaury'
import BasicVue from './Basic.vue'

const Basic = applyVueInReact(BasicVue)
export default function () {
  return <div>
    {/*just send children*/}
    <Basic>
      {/* Render with '<slot/>' in Vue Component */}
      <div>this is children</div>
    </Basic>
    {/*send v-slots*/}
    <Basic v-slots={{
      // Render with '<slot name="slot1" />' in Vue Component
      slot1: <div>this is slot1(namedSlot)</div>,
      // Render with '<slot name="slot2" value="xxxxxx"/>' in Vue Component
      slot2: ({value}) => <div>this is slot2(scopedSlot), and receive value: {value}</div>,
      // Render with '<slot/>' in Vue Component
      default: <div>this is children</div>
    }}/>
    {/*another usage*/}
    <Basic>
      {{
        slot1: <div>this is slot1(namedSlot)</div>,
        slot2: ({value}) => <div>this is slot2(scopedSlot), and receive value: {value}</div>,
        default: <div>this is children</div>
      }}
    </Basic>
  </div>
}
```

### React in Vue - Usage of render props and React node

Named slots & scoped slots of Vue = React render props.  
Default slots $ children of Vue = React props.children.  
A named slot has a name prefixed with `node:` = React Node  
```vue
<template>
  <Basic>
    <!--  Render with 'props.slot1()' in React component  -->
    <template v-slot:slot1>
      <div>
        this is slot1 (render props)
      </div>
    </template>
    <!--  Render with 'props.slot2("xxxxx")' in React component  -->
    <template v-slot:slot2="bar">
      <div>
        this is slot2 (render props)<br/>
        this content is passed from React: {{bar}}
      </div>
    </template>
    <!--  Render with 'props.slot3' in React component  -->
    <template v-slot:node:slot3>
      <div>
        this is slot3 (react node)
      </div>
    </template>
    <!--  Render with 'props.children' in React component  -->
    <div>
      this is children (react node)
    </div>
  </Basic>
</template>

<script>
import {applyPureReactInVue} from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Slots.jsx"

export default {
  components: {
    Basic: applyPureReactInVue(ReactBasic)
  }
}
</script>
```

### Context

Veaury will judge that if there is a wrapper layer of the same framework in the outer layer, Veaury will use React's `Portal` and Vue's `Teleport` instead of creating a new application instance every time.   
  
It's a really awesome! Veaury can well pass the root node context to the child nodes, regardless of whether the node is wrapped or not.  

This means that a Vue component used a React component, and then this React component used another Vue subcomponent. This Vue subcomponent can get the context of the outer Vue component.  

#### Vue in React - Usage of Provider / useContext

```jsx
import {applyVueInReact} from 'veaury'
import BasicVue from './Basic.vue'
import {createContext, useContext} from 'react'

const Basic = applyVueInReact(BasicVue)
// Create React context object
const Context = createContext({})

function SubReactComponent() {
  // Get context value
  const {bossName} = useContext(Context)
  return <div className="slot">bossName from Context: {bossName}</div>
}

export default function () {
  // Set context value
  return <Context.Provider value={{bossName: 'God'}}>
    <Basic>
      {/* This React component can get the context value from 'Provider' */}
      <SubReactComponent/>
    </Basic>
  </Context.Provider>
}
```

#### React in Vue - Usage of Provide / Inject

```vue

<template>
  <Basic>
    <!--  This Vue component can get the injection value from 'provide'  -->
    <SubVueComponent/>
  </Basic>
</template>

<script>
import {provide, inject, h} from 'vue'
import {applyPureReactInVue} from 'veaury'
// This is a React component
import ReactBasic from "./react_app/Basic"
// This is a Vue component
const SubVueComponent = {
  setup() {
    // get bossName from injection
    const bossName = inject('bossName')
    return h('div', () => bossName)
  }
}

export default {
  components: {
    Basic: applyPureReactInVue(ReactBasic),
    SubVueComponent
  },
  setup() {
    // Use 'provide' to set the value of bossName
    provide('bossName', 'God')
  }
}
</script>
```

### Usage of VueContainer in React Component

You can use the `VueContainer` component in a React component to display Vue components directly.  
  
When React components in Vue components, `VueContainer` can display global Vue components registered in the upper-level Vue app.  

```jsx
import {VueContainer} from "veaury"
import BasicVue from './Basic.vue'

export default function ReactComponent() {
  const passedProps = {
    name: 'Mike'
  }
  // Render '<router-view>' if 'vue-router' exists, You can use '<VueContainer component="RouterView"/>'
  return <VueContainer component={BasicVue} {...passedProps}/>
}
```
`VueContainer` can also render VNodes.  
```jsx
import {VueContainer} from "veaury"
import {h} from 'vue'

const VNode = h('div', null, () => 'This is a VNode')
export default function ReactComponent() {
  return <VueContainer node={VNode}/>
}
```

### Usage of getVNode  
VNode = `getVNode`(ReactNode)  
In most cases, vue components follow the SFC specification, but you can also create vue components in other ways, such as `h` or jsx, which may get VNode through properties.  
When passing a property of type VNode to a vue component in react, you can use `getVNode`.  
```jsx
import { applyVueInReact, getVNode } from 'veaury'
import AAVue from './AA.vue'

const AA = applyVueInReact(AAVue)
const VNodeBar = getVNode(
  <div style={{background: '#105a31', marginTop: '5px', color: 'white'}}>
    <div>rendered with a property</div>
    <div>This is Bar's VNode</div>
  </div>
)
export default function ReactComponent () {
  // `VNodeBar` is a property of type VNode, so use getVNode to convert reactNode to VNode.
  return <AA VNodeBar={VNodeBar}/>
}
```

### Usage of getReactNode  
ReactNode = `getReactNode`(VNode)  
Sometimes the property of the react component is a complex data structure, which contains ReactNode, and in the vue file, the definition of jsx will be compiled into vue's jsx.
```vue
<template>
  <AA :prop1="propForReact"/>
</template>
<script setup>
import { getReactNode, applyPureReactInVue } from 'veaury'
import AAReact from './react_app/AA.jsx'
const AA = applyPureReactInVue(AAReact)
const propForReact = {
  foo: 'Mike',
  bar: [{
    body: getReactNode(<div>John</div>)
  }],
  render: (name) => getReactNode(<div>{name}</div>)
}
</script>
```

### Usage of RenderReactNode
Sometimes the input parameter of the render props of the react component is ReactNode.  
`RenderReactNode` is a vue component that accepts a `node` parameter and can render ReactNode in a Vue component.  
```vue
<template>
  <AA>
    <template v-slot:prop2="itemReactNode">
      <RenderReactNode :node="itemReactNode"/>
    </template>
  </AA>
</template>
<script setup>
import { RenderReactNode, applyPureReactInVue } from 'veaury'
import AAReact from './react_app/AA.jsx'
const AA = applyPureReactInVue(AAReact)
</script>
```

### Vue in React, Usage of v-model / v-models
The usage of 'v-model' is similar to the usage of 'v-model' of Vue's jsx.  
The value type of the `v-model` property should be  
`[ modelValue, modelSetter, argumentKey, argumentModifiers ]`  
`[ modelValue, modelSetter, argumentModifiers ]`  
`[ modelValue, modelSetter ]`  
Additional 'argumentKey' attached property, such as `v-model-god={[godValue, setGodValue]}` = `v-model={[godValue, setGodValue, 'god']}`
```typescript
// types
type modelValue = any
type modelSetter = (newValue) => void
type argumentKey = string
type argumentModifiers = string[]
```
```jsx
import {applyVueInReact} from 'veaury'
import BasicVue from './Basic.vue'
import Basic1Vue from './Basic1.vue'
import {useState} from 'react'

const Basic = applyVueInReact(BasicVue)
const Basic1 = applyVueInReact(Basic1Vue)
export default function () {
  const [foo, setFoo] = useState(Math.random())
  const [bar, setBar] = useState(Math.random())
  const [zoo, setZoo] = useState(Math.random())

  return <div>
    <Basic v-model={[foo, setFoo]} v-model-bar={[bar, setBar]} />
    {/*<Basic1 v-model={[zoo, setZoo, 'zoo']}/>*/}
    {/*<Basic1 v-model={[zoo, setZoo, 'zoo', ['number']]}/>*/}
    {/*<Basic1 v-model-zoo={[zoo, setZoo, ['number']]}/>*/}
    <Basic1 v-models={{
      // The key value of 'modelValue' is equivalent to 'v-model'
      modelValue: [zoo, setZoo],
      //...otherModels
    }} />
  </div>
}

```
### Option useInjectPropsFromWrapper
`useInjectPropsFromWrapper` is an option to `applyReactInVue` and `applyVueInReact`.
  
When developing Vue and React applications at the same time, sometimes it is necessary to obtain the context of the React app inside the Vue component, and vice versa.  
  
For example, to get information from `react-router` in Vue components, or to get state from `vuex` in React components.

#### Usage of injecting React hooks in Vue component
React application uses Vue component, example to get `react-router` inside Vue component.  
```vue
<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    the path info from 'react-router': <span style="font-weight: bold">{{fullPath}}</span><br/><br/>
    <button @click="changeQuery">change query</button>
  </div>
</template>
<script>
import { computed } from 'vue'

export default {
  props: ['reactRouter'],
  // do not destructure props
  setup(props) {
    function changeQuery() {
      props.reactRouter?.navigate(`?a=${Math.random()}`, {replace: true})
    }
    const fullPath = computed(() => {
      const { location } = props.reactRouter || {}
      return location?.pathname + location?.search
    })
    return {
      fullPath,
      changeQuery
    }
  }
}
</script>
```
Use `applyVueInReact` to wrap the above Vue component into a React component, and pass in `react-router`
```js
import { applyVueInReact } from 'veaury'
import { useLocation, useNavigate } from 'react-router-dom'
import AboveVueComponent from './AboveVueComponent'

export default applyVueInReact(AboveVueComponent, {
  useInjectPropsFromWrapper(reactProps) {
    // React hooks can be used in this function
    // Use the hooks of react-router-dom
    const location = useLocation()
    const navigate = useNavigate()

    // The returned object will be passed to the Vue component as props
    return {
      reactRouter: {
        navigate,
        location
      }
    }
  }
})
```

#### Usage of injecting Vue hooks in React component
Vue application uses React component, example to get `vue-router` and `vuex` inside React component.  
There are two modes for injecting functions, 'setup' and 'computed' modes.  
```jsx
import React from 'react'
import {toRef} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {applyPureReactInVue} from 'veaury'

// This React component will be used in the Vue app and needs to use the vue-router and vuex hooks

// setup mode
function VueInjectionHookInSetupMode(vueProps) {
  // Vue hooks can be used in this function
  // This function will be called in the 'setup' hook of the Vue wrapper component
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  // The returned object will be passed to the React component as props
  return {
    // you need to manually convert to proxy with 'setup' mode
    // otherwise it will not be responsive
    fullPath: toRef(route, 'fullPath'),
    count: toRef(store.state, 'count'),
    changeQuery: () => router.replace({
      query: {
        a: Math.random()
      }
    }),
    incrementCount: () => store.dispatch('increment')
  }
}

// computed mode
function VueInjectionHookInComputedMode(vueProps) {
  // The context of the function is binding with the proxy from the 'getCurrentInstance' hook
  // Returning a function represents the computed of the options api
  // All logic code should be written in this computed function.
  // The lifecycle cannot be used in this function. If you want to use the lifecycle, you can only use the 'setup' mode
  return function computedFunction() {
    return {
      fullPath: this.$route.fullPath,
      count: this.$store.state.count,
      changeQuery: () => this.$router.replace({
        query: {
          a: Math.random()
        }
      }),
      incrementCount: () => this.$store.dispatch('increment')
    }
  }
}

function ReactComponent (props) {
  return (<div>
    This is the React Component
    <span>
      the path info from 'vue-router': <span style={{fontWeight: 'bold'}}>{props.fullPath}</span><br/>
      the count from 'vuex': <span style={{fontWeight: 'bold'}}>{props.count}</span>
    </span><br/>
    <button onClick={props.changeQuery}>change query</button> <button onClick={props.incrementCount}>increment count</button>
  </div>)
}

// Vue's injection function has two modes: 'setup' and 'computed'.
// Refer to the case of the above two injection function types.
// Also try replacing the option injectPropsFromWrapper with 'VueInjectionHookInComputedMode'
export default applyPureReactInVue(ReactComponent, {
  useInjectPropsFromWrapper: VueInjectionHookInSetupMode
})

```
### Crossing provider
Although it is possible to use hooks from another framework via `useInjectPropsFromWrapper` and get them via properties, but in most cases, it is to get context type data, such as vue-router, react-router, redux, vuex, or another framework custom context.  

Use `createCrossingProviderForReactInVue` and `createCrossingProviderForVueInReact` to create cross-frame providers, and components of another framework within the provider can get the context from this framework.  

#### Usage of createCrossingProviderForVueInReact
Create a react-router provider and a vue hooks that can be executed in the setup function of the Vue component and get the react-router. (reactRouterCrossingProvider.js)
```jsx
// Create a Provider that can get react hooks
// This Provider will be exported as a react component,
// and all of the vue components in this Provider can get the status of react hooks

import { useLocation, useNavigate } from 'react-router-dom'
import { createCrossingProviderForVueInReact } from 'veaury'

// Execute 'useReactRouterForVue' in the setup function of the vue component to get the object returned by the incoming function
const [useReactRouterForVue, ReactRouterProviderForVue] = createCrossingProviderForVueInReact(
  // This incoming function can execute react hooks
  function() {
    return {
      location: useLocation(),
      navigate: useNavigate()
    }
  }
)

export {
  useReactRouterForVue,
  ReactRouterProviderForVue
}
```
The vue component(Basic.vue) can get the context from the provider through the custom hook returned by `createCrossingProviderForVueInReact`.
```vue
<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    the path info from 'react-router': <span style="font-weight: bold">{{pathname + search}}</span><br/><br/>
    <button @click="changeQuery">change query</button>
  </div>
</template>
<script>
import { useReactRouterForVue } from './reactRouterCrossingProvider'
import React from 'react'

export default {
  setup() {
    const { location, navigate } = useReactRouterForVue()
    function changeQuery() {
      navigate(`?a=${Math.random()}`, {replace: true})
    }
    return {
      pathname: location.pathname,
      search: location.search,
      changeQuery
    }
  }
}
</script>
```
React components use the provider, so that all vue components (including internal components) in the provider can get the context of this provider through custom hooks.
```jsx
import {applyVueInReact} from 'veaury'
import BasicVue from './Basic.vue'
import { ReactRouterProviderForVue } from './reactRouterCrossingProvider'

const Basic = applyVueInReact(BasicVue)
export default function () {

    return <ReactRouterProviderForVue>
            <Basic/>
        </ReactRouterProviderForVue>
}

```

#### Usage of createCrossingProviderForReactInVue  
It is now recommended to use `createCrossingProviderForPureReactInVue` instead of `createCrossingProviderForReactInVue`.  
Create a provider including vue-router and vuex and a React hooks that can be executed in the React function component and get the vue-router and vuex. (vueRouterAndVuexCrossingProvider.js)
```js
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import {createCrossingProviderForPureReactInVue} from 'veaury'

const [useVueHooksInReact, VueProviderForReact] = createCrossingProviderForPureReactInVue(function() {
  return {
    vuex: useStore(),
    vueRoute: useRoute(),
    vueRouter: useRouter()
  }
})

export {
  useVueHooksInReact,
  VueProviderForReact
}
```
The React component(Basic.js) can get the context from the provider through the custom hook.
```jsx
import React from 'react'
import { useVueHooksInReact } from '../vueRouterAndVuexCrossingProvider'

export default function (props) {
  const { vuex, vueRoute, vueRouter } = useVueHooksInReact()
  function changeQuery() {
    vueRouter.replace({
      query: {
        a: Math.random()
      }
    })
  }
  function incrementCount() {
    vuex.dispatch('increment')
  }
  
  return (<div>
    This is the React Component<br/>
    <span>
      the path info from 'vue-router': <span style={{fontWeight: 'bold'}}>{vueRoute.fullPath}</span><br/>
      the count from 'vuex': <span style={{fontWeight: 'bold'}}>{vuex.state.count}</span>
    </span><br/>
    <button onClick={changeQuery}>change query</button> <button onClick={incrementCount}>increment count</button>
  </div>)
}
```
Vue components use the provider, so that all React components (including internal components) in the provider can get the context of this provider through custom hooks.
```vue
<template>
  <VueProviderForReact>
    <Basic/>
  </VueProviderForReact>
</template>

<script>
import { applyPureReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import {VueProviderForReact} from "./vueRouterAndVuexCrossingProvider";

export default {
  components: {
    VueProviderForReact,
    Basic: applyPureReactInVue(ReactBasic),
  }
}
</script>
```
### ReactMissVue  
Sometimes some features and plugins of Vue are really more useful than React, such as `beforeEach` of `vue-router`, and `pinia`.  
So I implemented a factory function called `createReactMissVue` that returns a React provider component and a React hook.  
With ReactMissVue, you can use Vue's plugins directly in React applications.  
Enjoy it!  

#### Usage of createReactMissVue  
For detailed use cases, please refer to `dev-project-react/src/components/reactMissVue`  
```jsx
import { defineStore, createPinia } from 'pinia'
import { createRouter, createWebHashHistory, useRouter, useRoute } from 'vue-router'
import { createReactMissVue, applyReactInVue, VueContainer } from 'veaury'

// create vue-router instance
const router = createRouter({
  // Using vue-router inside route 'ReactMissVue'
  history: createWebHashHistory('/#/ReactMissVue'),
  routes: [
    {
      name: '',
      path: '/aaa',
      component: applyReactInVue(() => <div className="react-component">
        react use vue-router<br/>
        path: /aaa
      </div>)
    },
    {
      name: 'empty',
      path: '/:default(.*)',
      component: applyReactInVue(() => <div className="react-component">
        react use vue-router<br/>
        empty
      </div>)
    },
  ],
})

// create a pinia store
const useFooStore = defineStore({
  id: 'foo',
  state() {
    return {
      name: 'Eduardo'
    }
  },
  actions: {
    changeName(name) {
      this.$patch({
        name
      })
    }
  }
})

// create a ReactMissVue instance
let [useReactMissVue, ReactMissVue, ReactMissVueContext] = createReactMissVue({
  useVueInjection() {
    // This object can be obtained by using useReactMissVue in the react component
    return {
      fooStore: useFooStore(),
      vueRouter: useRouter(),
      vueRoute: useRoute()
    }
  },
  // beforeVueAppMount can only be used in the outermost ReactMissVue
  // Because veaury will only create a vue application in the outermost layer
  beforeVueAppMount(app) {
    // register pinia
    app.use(createPinia())
    // register vue-router
    app.use(router)
  }
})

function Demo() {
  const { fooStore } = useReactMissVue()
  return <div>
    <div>
      Foo's name: {fooStore?.name}
    </div>
    {/* Use the global component router-view */}
    <VueContainer component="RouterView"/>
  </div>
}

export default function () {
  return <ReactMissVue>
    <Demo/>
  </ReactMissVue>
}
```

### Usage of lazyReactInVue
It is now recommended to use `lazyPureReactInVue` instead of `lazyReactInVue`.  
```vue
<template>
  <Basic/>
</template>

<script>
import { lazyPureReactInVue } from 'veaury'

export default {
  components: {
    // import an async React component
    // It is also possible to use the full parameter of the Vue3 API 'defineAsyncComponent'
    // for example: lazyReactInVue({ loader: () => import('./react_app/Basic'), timeout: 3000 })
    Basic: lazyPureReactInVue(() => import('./react_app/Basic'))
  },
}
</script>
```
### Usage of lazyVueInReact
```jsx
import { lazyVueInReact, lazyPureVueInReact } from 'veaury'

const AsyncBasicWithNormal = lazyVueInReact(() => import('./Basic'))
const AsyncBasicWithPure = lazyPureVueInReact(() => import('./Basic'))
export default function () {
  return <>
    <AsyncBasicWithNormal/>
    <AsyncBasicWithPure/>
  </>
}
```

### Usage of getting ref
Get the React component's instance in the Vue Component.  
```vue
<template>
  <Basic ref="Basic">
    <div ref="div">hello</div>
    <AA ref="AA"/>
  </Basic>
</template>
<script>
import { applyPureReactInVue } from 'veaury'
import BasicReact from './Basic.jsx'
import AAReact from './AA.jsx'
export default {
  components: {
    Basic: applyPureReactInVue(BasicReact),
    AA: applyPureReactInVue(AAReact)
  },
  mounted() {
    // Get the real react instance through `__veauryReactRef__`
    console.log(this.$refs.Basic.__veauryReactRef__)
    // If the converted react component or dom element is placed as a child node in a pure mode react component, 
    // the ref can be obtained directly
    console.log(this.$refs.div)
    console.log(this.$refs.AA)
  }
}
</script>
```
Get the Vue component's instance in the React Component.
```jsx
import {applyVueInReact} from 'veaury'
import BasicVue from './Basic.vue'
import React, { createRef, useEffect } from "react"

const Basic = applyVueInReact(BasicVue)
export default function () {
  const basicInstance = createRef(null)
  useEffect(() => {
    // Get the real vue instance through `__veauryVueRef__`
    console.log(basicInstance.current.__veauryVueRef__)
  }, [])
  return <Basic ref={basicInstance}/>
}
```
## Typescript JSX types conflict caused by Vue and React at the same time.  
> If you can ignore the TS error warning in the IDE, you can skip this chapter.  

Vue(@vue/runtime-dom) and React(@types/react) both extend the type interface in the global namespace JSX, which will cause types conflicts.  
For example, JSX.Element cannot extend ReactElement and VNode at the same time.  
So if both Vue and React are installed in the project, it will cause TS error warning in JSX in IDE (such as vscode or webstorm) , but this will not affect the compilation of the development environment and production environment.  
A working solution is to use `patch-package` to modify `@vue/runtime-dom/dist/runtime-dom.d.ts` and `@types/react/index.d.ts`, and make sure to set `compilerOptions.jsx` to `preserve` in tsconfig.json.  
For example, the changes to these two files are as follows.  

node_modules/@types/react/index.d.ts(@types/react@18.0.14)  
```diff
diff --git a/node_modules/@types/react/index.d.ts b/node_modules/@types/react/index.d.ts
index 5c5d343..a850f38 100644
--- a/node_modules/@types/react/index.d.ts
+++ b/node_modules/@types/react/index.d.ts
@@ -3118,7 +3118,9 @@ type ReactManagedAttributes<C, P> = C extends { propTypes: infer T; defaultProps
 
 declare global {
     namespace JSX {
-        interface Element extends React.ReactElement<any, any> { }
+        interface Element extends React.ReactElement<any, any> {
+            [k: string]: any
+         }
         interface ElementClass extends React.Component<any> {
             render(): React.ReactNode;
         }
@@ -3133,8 +3135,12 @@ declare global {
                 : ReactManagedAttributes<T, P>
             : ReactManagedAttributes<C, P>;
 
-        interface IntrinsicAttributes extends React.Attributes { }
-        interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }
+        interface IntrinsicAttributes extends React.Attributes {
+            [k: string]: any
+         }
+        interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { 
+            [k: string]: any
+        }
 
         interface IntrinsicElements {
             // HTML

```

node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts(@vue/runtime-dom@3.2.37)  
```diff
diff --git a/node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts b/node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts
index 3366f5a..b9eacc6 100644
--- a/node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts
+++ b/node_modules/@vue/runtime-dom/dist/runtime-dom.d.ts
@@ -1493,7 +1493,7 @@ type NativeElements = {
 
 declare global {
   namespace JSX {
-    interface Element extends VNode {}
+    // interface Element extends VNode {}
     interface ElementClass {
       $props: {}
     }

```

## Development Setup  
The directories `dev-project-react` and `dev-project-vue3` in the project are the basic projects of the development environment of `veaury`, and they are also the two initial projects created by `create-react-app` and `@vue/cli` respectively.
> **Note:** In the `config/webpack.config.js` of the React project and the `vue.config.js` of the Vue project, you can uncomment the `veaury` in `alias` to develop the source code of `veaury`
>
> **Setup:** Run the command `npm run setup:yarn` or `npm run setup:npm` in the root directory of the main project to install the main project and two subprojects
>
> **Develop:** Run the commands `npm run dev:vue` and `npm run dev:react` in the root directory of the main project for development  

## Project Structure  
- `babel`: contains babel presets for projects built via webpack to solve the problem of compiling both vue and react type jsx.  
  - See [How to configure React in the Vue project from '@vue/cli' ](https://github.com/devilwjp/veaury/tree/master/dev-project-vue3)  for more details on the babel preset.
- `dist`: contains built files for distribution. Note this directory is only updated when a release happens; they do not reflect the latest changes in development branches.  
- `types`: contains TypeScript type definitions.
- `vite`: contains plugins for projects built with vite to solve the problem of compiling vue and react at the same time.   
- `webpack`: contains webpack plugins for projects built via webpack to solve the problem of compiling vue and react at the same time.  
  - See [How to configure Vue in the React project from 'create-react-app' ](https://github.com/devilwjp/veaury/tree/master/dev-project-react)  for more details on the webpack plugin.  
- `src`: contains the source code.  
