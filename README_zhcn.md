<div align=center>
  <img src="https://raw.githubusercontent.com/devilwjp/VueReact/master/vuereact-combined.png"/>
</div>  
<h1 align=center>Veaury</h1>
<h2 align=center>Vue3应用可以使用React组件，React应用可以使用Vue3组件，并且非常完美！</h2> 

## 什么是Veaury?  
Veaury 是基于React和Vue3的工具库，主要用于React和Vue在一个项目中公共使用的场景，主要运用在项目迁移、技术栈融合的开发模式、跨技术栈使用第三方组件的场景。  

## 重要功能
- 🌞 支持 Vue3   
- 🌈 支持 Context - 同一个应用中出现的vue组件和react组件的context是共享的.  
- 💗 支持跨框架的hooks调用 - 可以在react组件中使用vue的hooks，获取到vue组件或者应用的上下文数据，比如vue-router、vuex，也可以在vue组件中使用react的hooks，获取到react组件或者应用的上下文数据，比如react-router、provide、context等

## 支持Vue2？
[完美支持react和vue2同时开发的工具库vuereact-combined](https://github.com/devilwjp/vuereact-combined)  

## 项目的预配置
理论上，不需要在 React 项目中做额外的配置来支持 Vue，也不需要在 Vue 项目中做额外的配置来支持 React。  

如果要转换的 React 或 Vue 组件来自 npm 包，或者已经经过构建（不是直接的vue文件以及不含有jsx），则可以直接使用 `applyReactInVue` 或 `applyVueInReact`。  

如果需要在一个项目中同时开发 Vue 和 React，而不是仅仅使用现有的 npm 组件，那么应该做一些配置，通常配置 `webpack.config.js` 和 `babel.config.js`。  

本项目中的`dev-project-react`和`dev-project-vue3`目录是`veaury`开发环境的基础项目，分别由`create-react-app`和`@vue/cli`创建的两个初始项目。  
> **Note:** 在react项目中的`config/webpack.config.js`以及vue项目中的`vue.config.js`里，可以找到webpack的alias别名配置，将`veaury`的别名注释解开，就可以对根项目中`src`目录里的`veaury`源代码进行开发调试了
> 
> **Setup:** 在主项目的根目录下运行命令行`npm run setup:yarn` 或者 `npm run setup:npm`，可以整体安装主项目和两个调试用的子项目
> 
> **Develop:** 在主项目的根目录下运行命令行`npm run dev:vue` 以及 `npm run setup:npm`就可以对子项目进行开发调试
   
以下信息可以作为如何配置react和vue项目以支持另一种框架的参考  
[如何配置由'@vue/cli'创建的vue项目支持开发react](https://github.com/devilwjp/veaury/tree/master/dev-project-vue3)  
[如何配置由'create-react-app'创建的react项目支持开发vue](https://github.com/devilwjp/veaury/tree/master/dev-project-react)

## 使用场景
- 👨‍👩‍👧 在一个应用中同时开发React和Vue
- 🏃 从Vue项目迁移到React项目，或者从React项目迁移到Vue项目
- 📲 在一个应用中可以随意使用React或者Vue的第三方组件, 比如 `antd`, `element-ui`, `vuetify`

## 安装

```sh
# Install with yarn:
$ yarn add veaury
# or with npm:
$ npm i veaury -S
```

## 用法

### 在Vue组件中使用React组件 - 基本用法

```jsx
import {applyVueInReact} from 'veaury'
// 这是一个Vue组件
import BasicVueComponent from './Basic.vue'
import {useState} from 'react'
// 使用高阶组件 'applyVueInReact'
const Basic = applyVueInReact(BasicVueComponent)
export default function () {
  const [foo] = useState('Hello!')
  return <Basic foo={foo}>
    <div>
      默认的slot
    </div>
  </Basic>
}
```  

### 在React组件中使用Vue组件 - 基本用法

```vue

<template>
  <Basic :foo="foo">
    <div>
      children内容
    </div>
  </Basic>
</template>
<script>
import {applyReactInVue} from 'veaury'
// 这是一个React组件
import BasicReactComponent from './react_app/Basic.jsx'
import {ref} from 'vue'

export default {
  components: {
    // 使用高阶组件 'applyReactInVue'
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

### 在React组件中使用Vue组件 - 事件的用法

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
    {/*在Vue组件Basic中可以使用$emit('click')触发这个事件绑定的函数*/}
    <Basic onClick={onClickForVue}/>
  </div>
}
```

### 在Vue组件中使用React组件 - 事件的用法

```vue

<template>
  <!-- 在React组件ReactButton中可以使用props.onClick()触发这个事件绑定的函数 -->
  <ReactButton @click="onClickForReact"/>
</template>

<script>
import {applyReactInVue} from 'veaury'
// React组件ReactButton
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

### 在React组件中使用Vue组件 - 插槽的用法

这个插槽的用法与Vue的jsx传递插槽的用法非常相似

```jsx
import {applyVueInReact} from 'veaury'
import BasicVue from './Basic.vue'

const Basic = applyVueInReact(BasicVue)
export default function () {
  return <div>
    {/*只传递children*/}
    <Basic>
      {/* 在Vue组件的template内使用'<slot/>'进行渲染 */}
      <div>this is children</div>
    </Basic>
    {/*传递 v-slots*/}
    <Basic v-slots={{
      // 在Vue组件的template内使用'<slot name="slot1" />'进行渲染
      slot1: <div>this is slot1(namedSlot)</div>,
      // 在Vue组件的template内使用'<slot name="slot2" value="xxxxxx"/>'进行渲染
      slot2: ({value}) => <div>this is slot2(scopedSlot), and receive value: {value}</div>,
      // 在Vue组件的template内使用'<slot/>'进行渲染
      default: <div>this is children</div>
    }}/>
    {/*另一种用法*/}
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

### 在Vue组件中使用React组件 - 传递render props 和 React node 的用法

Vue3的具名插槽和作用域插槽 = React render props.  
Vue3的默认插槽和children = React props.children.  
一个带有`node:`前缀的具名插槽 = React Node  
```vue
<template>
  <Basic>
    <!--  在React组件里使用'props.slot1()'进行渲染  -->
    <template v-slot:slot1>
      <div>
        插槽1 (render props)
      </div>
    </template>
    <!--  在React组件里使用'props.slot2("xxxxx")'进行渲染  -->
    <template v-slot:slot2="bar">
      <div>
        插槽2 (render props)<br/>
        从React组件传递的内容: {{bar}}
      </div>
    </template>
    <!--  在React组件里使用'props.slot3'进行渲染  -->
    <template v-slot:node:slot3>
      <div>
        插槽3 (react node)
      </div>
    </template>
    <!--  在React组件里使用'props.children'进行渲染  -->
    <div>
      默认插槽children (react node)
    </div>
  </Basic>
</template>

<script>
import {applyReactInVue} from 'veaury'
// 这是一个React组件
import ReactBasic from "./react_app/Slots.jsx"

export default {
  components: {
    Basic: applyReactInVue(ReactBasic)
  }
}
</script>
```

### Context(上下文)

Veaury 会判断如果一个组件的外层有同一个框架的组件存在，那么Veaury 就会使用 React 的 `Portal` 或者 Vue 的 `Teleport`创建被高阶组件包装的目标组件，而不是每次都创建一个新的应用实例。   
  
这是非常牛逼的做法! Veaury 可以很好地将根节点的上下文跨过不同的框架组件传递给内部与根节点相同框架的组件.  

这意味着一个 Vue 组件使用了一个 React 组件，然后这个 React 组件使用了另一个 Vue 子组件。 这个 Vue 子组件可以获取外部 Vue 组件的上下文。  

#### React组件使用Vue组件 - Provider / useContext 的用法

```jsx
import {applyVueInReact} from 'veaury'
import BasicVue from './Basic.vue'
import {createContext, useContext} from 'react'

const Basic = applyVueInReact(BasicVue)
// 创建 React context 对象
const Context = createContext({})

// React子组件
function SubReactComponent() {
  // 获取 context 值
  const {bossName} = useContext(Context)
  return <div className="slot">bossName from Context: {bossName}</div>
}

export default function () {
  // 设置 context 值
  return <Context.Provider value={{bossName: 'God'}}>
    {/* Vue组件Basic */}
    <Basic>
      {/* 在Vue组件的children里, React子组件可以获得从外层Provider传入的context的值 */}
      <SubReactComponent/>
    </Basic>
  </Context.Provider>
}
```

#### Vue组件使用React组件 - Provide / Inject 的用法

```vue

<template>
  <Basic>
    <!--  在这个Vue组件里可以通过inject获得从外层provide传入的值  -->
    <SubVueComponent/>
  </Basic>
</template>

<script>
import {provide, inject, h} from 'vue'
import {applyReactInVue} from 'veaury'
// 这是一个React组件
import ReactBasic from "./react_app/Basic"
// 这是一个Vue组件
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

### 在React组件中使用 VueContainer 组件的用法

可以在React组件中直接使用 `VueContainer` 组件动态展示一个Vue组件  

当这个React组件存在于某个Vue组件中时， 此时React组件中使用`VueContainer` 可以显示在上层 Vue 应用中注册的全局 Vue 组件。  

```jsx
import {VueContainer} from "veaury"
import BasicVue from './Basic.vue'

export default function () {
  const passedProps = {
    name: 'Mike'
  }
  // 如果 'vue-router' 存在，则渲染 '<router-view>' 可以使用 '<VueContainer component="RouterView"/>'
  return <VueContainer component={BasicVue} {...passedProps}/>
}
```

### 在React组件中使用Vue组件, v-model / v-models 的用法
'v-model' 的用法与Vue的jsx中的'v-model'用法相似  
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
// Also try replacing the first parameter with 'VueInjectionHookInComputedMode'
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
