<div align=center>
  <img src="https://raw.githubusercontent.com/devilwjp/VueReact/master/vuereact-combined.png"/>
</div>  
<h1 align=center style="font-size: 90px; margin:0">Veaury</h1>
<div align=center>
  <p>
  <h1>Use React in Vue3 and Vue3 in React, And as perfect as possible!</h1>
  <p>
</div>  

## Latest documentation  
View the latest [documentation](https://github.com/devilwjp/veaury#readme)  
## Do you want to preconfigure your project in advance?

In theory, you don't need to do additional configuration in a React project to support Vue, nor do you need to do additional configuration in a Vue project to support React.  
  
If the React or Vue component you want to convert comes from a npm package, or has already been built, you can use `applyReactInVue` or `applyVueInReact` directly.  
  
If you need to develop both Vue and React in a project, instead of just using an existing npm component, then you should do some configuration, usually configuring `webpack.config.js` and `babel.config.js`.   
  
The `dev-project-react` and `dev-project-vue3` in the project are the basic projects of the development environment of `veaury`, and they are also the two initial projects created by `create-react-app` and `@vue/cli` respectively.  
  
You can refer to How to configure the two projects to support the other framework.

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

## Usage

### Vue in React - Basic usage

```jsx
import {applyVueInReact} from 'veaury'
// This is a Vue component
import BasicVueComponent from './Basic.vue'
import {useState} from 'react'
// Use HOC 'applyVueInReact'
const Basic = applyVueInReact(BasicVueComponent)
export default function () {
  const [foo] = useState('Hello!')
  return <Basic foo={foo}>
    <div>
      the default slot
    </div>
  </Basic>
}
```  

### React in Vue - Basic usage

```vue

<template>
  <Basic :foo="foo">
    <div>
      the children
    </div>
  </Basic>
</template>
<script>
import {applyReactInVue} from 'veaury'
// This is a React component
import BasicReactComponent from './react_app/Basic.jsx'
import {ref} from 'vue'

export default {
  components: {
    // Use HOC 'applyReactInVue'
    Basic: applyReactInVue(BasicReactComponent)
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
import {applyReactInVue} from 'veaury'
// This is a React Component
import ReactButton from "./react_app/Button.jsx"

export default {
  components: {
    ReactButton: applyReactInVue(ReactButton)
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
Name a named slot of Vue starting with 'node:' = React Node.

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
import {applyReactInVue} from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Slots.jsx"

export default {
  components: {
    Basic: applyReactInVue(ReactBasic)
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
import {applyReactInVue} from 'veaury'
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
    Basic: applyReactInVue(ReactBasic),
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

export default function () {
  const passedProps = {
    name: 'Mike'
  }
  // Render '<router-view>' if 'vue-router' exists, You can use '<VueContainer component="RouterView"/>'
  return <VueContainer component={BasicVue} {...passedProps}/>
}
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
### API injectPropsFromWrapper
`injectPropsFromWrapper` is a higher order component.  
  
When developing Vue and React applications at the same time, sometimes it is necessary to obtain the context of the React app inside the Vue component, and vice versa.  
  
For example, to get information from `react-router` in Vue components, or to get state from `vuex` in React components.  
  
This API can be used for both Vue and React components.  

```typescript
interface propsFromWrapper {
    [propName: string]: any;
}
type component = object | Function
type computedModeReturn = () => propsFromWrapper
type defaultModeReturn = propsFromWrapper | Function
type allModeReturn = defaultModeReturn | computedModeReturn
type injectionFunction<T = allModeReturn> = (props?: propsFromWrapper) => T

// types of injectPropsFromWrapper
interface injectPropsFromWrapper<T extends allModeReturn = allModeReturn>{
    (injectionFunction: injectionFunction<T>, component:component): component
}
```
#### Usage of injecting React hooks in Vue component
React application uses Vue component, example to get `react-router` inside Vue component.  
```vue
<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    the path info from 'react-router': <span style="font-weight: bold">{{pathname + search}}</span><br/><br/>
    <button @click="changeQuery">change query</button>
  </div>
</template>
<script>
// This Vue component will be used in the React app and needs to use the react-router hooks

import { injectPropsFromWrapper } from 'veaury'
import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'

function ReactInjectionHook (reactProps) {
  // React hooks can be used in this function
  // Use the hooks of react-router-dom
  const reactRouterLocation = useLocation()
  const navigate = useNavigate()
  function changeQuery() {
    navigate(`?a=${Math.random()}`, {replace: true})
  }

  // The returned object will be passed to the Vue component as props
  return {
    pathname: reactRouterLocation.pathname,
    search: reactRouterLocation.search,
    changeQuery
  }
}
// 'injectPropsFromWrapper' returns the original Vue component and will register injectionHook.
// When the Vue component is applied to the React app by 'applyVueInReact',
// InjectionHook will be executed first, otherwise InjectionHook will not be executed
export default injectPropsFromWrapper(ReactInjectionHook, {
  props: {
    pathname: String,
    search: String,
    changeQuery: Function
  }
})
</script>
```
#### Usage of injecting Vue hooks in React component
Vue application uses React component, example to get `vue-router` and `vuex` inside React component.  
There are two modes for injecting functions, 'setup' and 'computed' modes.  
```jsx
import {toRef} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {injectPropsFromWrapper} from 'veaury'

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

// The first parameter is the injection function.
// Vue's injection function has two modes: 'setup' and 'computed'.
// Refer to the case of the above two injection function types.
export default injectPropsFromWrapper(VueInjectionHookInSetupMode, function (props) {
  return (<div>
    This is the React Component
    <span>
      the path info from 'vue-router': <span style={{fontWeight: 'bold'}}>{props.fullPath}</span><br/>
      the count from 'vuex': <span style={{fontWeight: 'bold'}}>{props.count}</span>
    </span><br/>
    <button onClick={props.changeQuery}>change query</button> <button onClick={props.incrementCount}>increment count</button>
  </div>)
})

```
> **Note:** If you use interception to wrap the same component multiple times, the previous interception function will be overwritten.  
> 
> Injection functions in 'computed' mode only support synchronous code
> 
> It should be ensured that the logic inside the injection function is a pure function, and business logic should not be added to the injection function. It is not recommended to use lifecycle or asynchronous calls in the injection function.

### Usage of lazyReactInVue
```vue
<template>
  <Basic/>
</template>

<script>
import { lazyReactInVue } from 'veaury'

export default {
  components: {
    // import an async React component
    // It is also possible to use the full parameter of the Vue3 API 'defineAsyncComponent'
    // for example: lazyReactInVue({ loader: () => import('./react_app/Basic'), timeout: 3000 })
    Basic: lazyReactInVue(() => import('./react_app/Basic'))
  },
}
</script>
```
```typescript
// types
type lazyReactInVue = (asyncImport: Promise<any> | defineAsyncComponentOptions, options?: options) => any;
```

### Usage of lazyVueInReact
```jsx
import { lazyVueInReact } from 'veaury'

const AsyncBasic = lazyVueInReact(() => import('./Basic'))
export default function () {
    return <AsyncBasic/>
}
```
```typescript
// types
type lazyReactInVue = (asyncImport: Promise<any>, options?: options) => any
```
