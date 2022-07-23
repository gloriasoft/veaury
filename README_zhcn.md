<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**目录引导**  

- [Veaury](#veaury)
  - [Vue3应用可以使用React组件，React应用可以使用Vue3组件，并且非常完美！](#vue3%E5%BA%94%E7%94%A8%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8react%E7%BB%84%E4%BB%B6react%E5%BA%94%E7%94%A8%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8vue3%E7%BB%84%E4%BB%B6%E5%B9%B6%E4%B8%94%E9%9D%9E%E5%B8%B8%E5%AE%8C%E7%BE%8E)
  - [什么是Veaury?](#%E4%BB%80%E4%B9%88%E6%98%AFveaury)
  - [重要功能](#%E9%87%8D%E8%A6%81%E5%8A%9F%E8%83%BD)
  - [支持Vue2？](#%E6%94%AF%E6%8C%81vue2)
  - [使用场景](#%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [项目的预配置](#%E9%A1%B9%E7%9B%AE%E7%9A%84%E9%A2%84%E9%85%8D%E7%BD%AE)
    - [Webpack](#webpack)
    - [Vite](#vite)
  - [用法](#%E7%94%A8%E6%B3%95)
    - [在React组件中使用Vue组件 - 基本用法](#%E5%9C%A8react%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8vue%E7%BB%84%E4%BB%B6---%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
    - [在Vue组件中使用React组件 - 基本用法](#%E5%9C%A8vue%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8react%E7%BB%84%E4%BB%B6---%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
    - [在React组件中使用Vue组件 - 事件的用法](#%E5%9C%A8react%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8vue%E7%BB%84%E4%BB%B6---%E4%BA%8B%E4%BB%B6%E7%9A%84%E7%94%A8%E6%B3%95)
    - [在Vue组件中使用React组件 - 事件的用法](#%E5%9C%A8vue%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8react%E7%BB%84%E4%BB%B6---%E4%BA%8B%E4%BB%B6%E7%9A%84%E7%94%A8%E6%B3%95)
    - [在React组件中使用Vue组件 - 插槽的用法](#%E5%9C%A8react%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8vue%E7%BB%84%E4%BB%B6---%E6%8F%92%E6%A7%BD%E7%9A%84%E7%94%A8%E6%B3%95)
    - [在Vue组件中使用React组件 - 传递render props 和 React node 的用法](#%E5%9C%A8vue%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8react%E7%BB%84%E4%BB%B6---%E4%BC%A0%E9%80%92render-props-%E5%92%8C-react-node-%E7%9A%84%E7%94%A8%E6%B3%95)
    - [Context(上下文)](#context%E4%B8%8A%E4%B8%8B%E6%96%87)
      - [React组件使用Vue组件 - Provider / useContext 的用法](#react%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8vue%E7%BB%84%E4%BB%B6---provider--usecontext-%E7%9A%84%E7%94%A8%E6%B3%95)
      - [Vue组件使用React组件 - Provide / Inject 的用法](#vue%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8react%E7%BB%84%E4%BB%B6---provide--inject-%E7%9A%84%E7%94%A8%E6%B3%95)
    - [在React组件中使用 VueContainer 组件的用法](#%E5%9C%A8react%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8-vuecontainer-%E7%BB%84%E4%BB%B6%E7%9A%84%E7%94%A8%E6%B3%95)
    - [通过VNode获取ReactNode - getReactNode 的用法](#%E9%80%9A%E8%BF%87vnode%E8%8E%B7%E5%8F%96reactnode---getreactnode-%E7%9A%84%E7%94%A8%E6%B3%95)
    - [在Vue组件中直接渲染ReactNode - RenderReactNode 的用法](#%E5%9C%A8vue%E7%BB%84%E4%BB%B6%E4%B8%AD%E7%9B%B4%E6%8E%A5%E6%B8%B2%E6%9F%93reactnode---renderreactnode-%E7%9A%84%E7%94%A8%E6%B3%95)
    - [在React组件中使用Vue组件, v-model / v-models 的用法](#%E5%9C%A8react%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8vue%E7%BB%84%E4%BB%B6-v-model--v-models-%E7%9A%84%E7%94%A8%E6%B3%95)
    - [Option useInjectPropsFromWrapper](#option-useinjectpropsfromwrapper)
      - [在 Vue 组件中注入 React hooks的用法](#%E5%9C%A8-vue-%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%B3%A8%E5%85%A5-react-hooks%E7%9A%84%E7%94%A8%E6%B3%95)
      - [在 React 组件中注入 Vue hooks 的用法](#%E5%9C%A8-react-%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%B3%A8%E5%85%A5-vue-hooks-%E7%9A%84%E7%94%A8%E6%B3%95)
    - [跨框架的Provider](#%E8%B7%A8%E6%A1%86%E6%9E%B6%E7%9A%84provider)
      - [createCrossingProviderForVueInReact 的用法](#createcrossingproviderforvueinreact-%E7%9A%84%E7%94%A8%E6%B3%95)
      - [createCrossingProviderForReactInVue的用法](#createcrossingproviderforreactinvue%E7%9A%84%E7%94%A8%E6%B3%95)
    - [ReactMissVue](#reactmissvue)
      - [Usage of createReactMissVue](#usage-of-createreactmissvue)
    - [lazyReactInVue的用法(在Vue组件中使用异步的React组件)](#lazyreactinvue%E7%9A%84%E7%94%A8%E6%B3%95%E5%9C%A8vue%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%BC%82%E6%AD%A5%E7%9A%84react%E7%BB%84%E4%BB%B6)
    - [lazyVueInReact的用法(在React组件中使用异步的Vue组件)](#lazyvueinreact%E7%9A%84%E7%94%A8%E6%B3%95%E5%9C%A8react%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%BC%82%E6%AD%A5%E7%9A%84vue%E7%BB%84%E4%BB%B6)
    - [获取ref实例的用法](#%E8%8E%B7%E5%8F%96ref%E5%AE%9E%E4%BE%8B%E7%9A%84%E7%94%A8%E6%B3%95)
  - [Contributing Guide](#contributing-guide)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
- 🪂 纯净模式 - 转换后的组件的子组件不再会有一个附加的dom元素容器. [>>了解纯净模式是如何工作的?](https://github.com/devilwjp/veaury/blob/master/pure_mode.md)

## 支持Vue2？
[完美支持react和vue2同时开发的工具库vuereact-combined](https://github.com/devilwjp/vuereact-combined)  

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

## 项目的预配置
理论上，不需要在 React 项目中做额外的配置来支持 Vue，也不需要在 Vue 项目中做额外的配置来支持 React。  

如果要转换的 React 或 Vue 组件来自 npm 包，或者已经经过构建（不是直接的vue文件以及不含有jsx），则可以直接使用 `applyPureReactInVue` 或 `applyVueInReact`。  

如果需要在一个项目中同时开发 Vue 和 React(一个项目源码中同时存在.vue文件和react jsx文件)，而不是仅仅使用现有的 npm 组件，那么应该做一些配置。  

### Webpack  
[如何配置由'@vue/cli'创建的vue项目支持开发react](https://github.com/devilwjp/veaury/tree/master/dev-project-vue3)  
[如何配置由'create-react-app'创建的react项目支持开发vue](https://github.com/devilwjp/veaury/tree/master/dev-project-react)

### Vite  
如果项目是通过`vite`构建的，那么需要对`vite.config.js`做如下配置  

+ 主项目是vue:
```js
import { defineConfig } from 'vite'
// >= veaury@2.1.1
import veauryVitePlugins from 'veaury/vite'

export default defineConfig({
  plugins: [
    // 关闭 vue 和 vuejsx 插件
    // vue(),
    // vueJsx(),
    // type设为vue时, 所有名为react_app目录中的文件的jsx将被react jsx编译，其他文件里的jsx将以vue jsx编译
    veauryVitePlugins({
      type: 'vue'
    })
  ]
})
```  
+ The main project is React:
```js
import { defineConfig } from 'vite'
// >= veaury@2.1.1
import veauryVitePlugins from 'veaury/vite'

export default defineConfig({
  plugins: [
    // 关闭 react 插件
    // react(),
    // type设为react时，所有.vue文件里的jsx将以vue jsx进行编译，其他文件的jsx都是以react jsx编译
    veauryVitePlugins({
      type: 'react'
    })
  ]
})

```
如果想自定义vue jsx编译的范围, 可以将type设置为`custom`，然后通过设置`vueJsxInclude`、`vueJsxExclude`以及`overrides`来自定义编译范围
```js
import { defineConfig } from 'vite'
// >= veaury@2.1.1
import veauryVitePlugins from 'veaury/vite'

export default defineConfig({
  plugins: [
    veauryVitePlugins({
      type: 'custom',
      // 所有.vue文件以及在名为vue_app目录里的文件都将以vue jsx编译
      vueJsxInclude: [/vue&type=script&lang.[tj]sx?$/, /[/\\]vue_app[\\/$]+/],
      // vueJsxExclude: [],
      // 自定义babel的vueJsxOverrides, 这个设置会覆盖 `vueJsxInclude` 和 `vueJsxExclude`
      // vueJsxOverrides: [{
      //   exclude: [/[/\\]react_app[\\/$]+/],
      //   plugins: ['@vue/babel-plugin-jsx']
      // }]
    })
  ]
})
```

## 用法

### 在React组件中使用Vue组件 - 基本用法

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

### 在Vue组件中使用React组件 - 基本用法
现在推荐使用`applyPureReactInVue`代替`applyReactInvue`.  
[了解 `applyPureReactInVue` 和 `applyReactInVue` 的区别](https://github.com/devilwjp/veaury/blob/master/pure_mode.md)
```vue

<template>
  <BasicPure :foo="foo">
    <div>
      children内容
    </div>
  </BasicPure>
</template>
<script>
import {applyReactInVue, applyPureReactInVue} from 'veaury'
// 这是一个React组件
import BasicReactComponent from './react_app/Basic.jsx'
import {ref} from 'vue'

export default {
  components: {
    // 使用高阶组件 'applyReactInVue'
    Basic: applyReactInVue(BasicReactComponent),
    // 现在推荐使用纯净模式的 'applyPureReactInVue'
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
import {applyPureReactInVue} from 'veaury'
// React组件ReactButton
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
import {applyPureReactInVue} from 'veaury'
// 这是一个React组件
import ReactBasic from "./react_app/Slots.jsx"

export default {
  components: {
    Basic: applyPureReactInVue(ReactBasic)
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
import {applyPureReactInVue} from 'veaury'
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
### 通过VNode获取ReactNode - getReactNode 的用法
ReactNode = `getReactNode`(VNode)  
有时候react组件的属性是一个复杂的数据结构，里面包含了ReactNode，而在vue文件中，jsx的定义会被编译成vue的jsx（也就是VNode），如果直接将这个属性传递给react组件，react组件是不能识别VNode的。  
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

### 在Vue组件中直接渲染ReactNode - RenderReactNode 的用法
有时react组件的render props的输入参数是ReactNode，而vue组件中如果直接使用作用域插槽去展示这个ReactNode是错误的。  
`RenderReactNode` 是一个 vue 组件，它接受 `node` 参数，可以在 Vue 组件中渲染 ReactNode。  
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

### 在React组件中使用Vue组件, v-model / v-models 的用法
'v-model' 的用法与Vue的jsx中的'v-model'用法相似  
在React jsx中使用 `v-model` 属性, 可以有如下格式:      
`[ modelValue, modelSetter, argumentKey, argumentModifiers ]`  
`[ modelValue, modelSetter, argumentModifiers ]`  
`[ modelValue, modelSetter ]`  
'argumentKey'代表了v-model的自定义参数名, 默认情况下, v-model的参数名时modelValue, 也可以将'argumentKey'设置在v-model属性之后的附加后缀上, 比如 `v-model-god={[godValue, setGodValue]}` = `v-model={[godValue, setGodValue, 'god']}`
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
      // v-models对象中的key设置为'modelValue'时, 等同于默认的v-model属性
      modelValue: [zoo, setZoo],
      //...可以设置其他的自定义v-model的key
    }} />
  </div>
}

```
### Option useInjectPropsFromWrapper
`useInjectPropsFromWrapper` 是 `applyReactInVue` 和 `applyVueInReact` 的一个选项。

在同时开发 Vue 和 React 应用时，有时需要在 Vue 组件内部获取 React 应用的上下文，反之亦然。

例如，在Vue组件中使用`react-router`，或者在React组件中使用`vuex`。

#### 在 Vue 组件中注入 React hooks的用法
React 应用使用 Vue 组件，以下例子是在这个Vue组件中使用`react-router`。
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
  // 不要对props进行解构
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
使用`applyVueInReact`将上面的Vue组件包装成一个React组件，并传入`react-router`。  
```js
import { applyVueInReact } from 'veaury'
import { useLocation, useNavigate } from 'react-router-dom'
import AboveVueComponent from './AboveVueComponent'

export default applyVueInReact(AboveVueComponent, {
  useInjectPropsFromWrapper(reactProps) {
    // 在这个函数中可以使用 React hooks
    // 使用 react-router-dom's hooks
    const location = useLocation()
    const navigate = useNavigate()

    // 返回的对象会作为 props 传递给 Vue 组件
    return {
      reactRouter: {
        navigate,
        location
      }
    }
  }
})
```

#### 在 React 组件中注入 Vue hooks 的用法
Vue 应用使用 React 组件，示例在 React 组件中获取 `vue-router` 和 `vuex`。  
注入函数有两种模式，“设置”和“计算”模式  
```jsx
import React from 'react'
import {toRef} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {applyPureReactInVue} from 'veaury'

// 这个 React 组件将在 Vue 应用程序中使用，需要使用 vue-router 和 vuex 钩子

// setup函数模式
function VueInjectionHookInSetupMode(vueProps) {
  // 可以在这个函数中使用 Vue hooks
  // 这个函数将在 Vue 包装器组件的 'setup' 函数中调用
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  // 返回的对象将作为 props 传递给 React 组件
  return {
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

// computed函数模式
function VueInjectionHookInComputedMode(vueProps) {
  // 该函数的上下文与来自getCurrentInstance().proxy
  // 返回一个函数表示使用compute模式
  // 所有逻辑代码都应该写在这个计算函数中。
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

// Vue 的注入函数有两种模式：'setup' 和 'computed'
// 请参考以上两种注入函数类型的案例
// 可以尝试用 'VueInjectionHookInComputedMode'
export default applyPureReactInVue(ReactComponent, {
  useInjectPropsFromWrapper: VueInjectionHookInSetupMode
})

```
### 跨框架的Provider  
虽然可以通过`useInjectPropsFromWrapper`使用其他框架的hook，然后通过属性在组件中获取hook的状态，但大多数情况下都是为了获取上下文类型数据，比如vue-router，react-router，redux，vuex，或者其他框架的自定义上下文。

使用 `createCrossingProviderForPureReactInVue` 和 `createCrossingProviderForVueInReact` 创建跨框架的Provider，在这个Provider内，另一个框架的组件可以获取到这个框架的上下文状态。

#### createCrossingProviderForVueInReact 的用法
通过`createCrossingProviderForVueInReact`创建一个Vue的hook和一个React的Provider，React Provider会将自定义的上下文传递给所有vue的子组件，例子中创建(reactRouterCrossingProvider.js)来定义一个crossing provider，provider包含了react-router。  

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

然后vue组件(Basic.vue)可以通过上面的js创建的vue hook获取到react-router的上下文。  
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
在react项目或者组件中，将之前创建的provider包囊在外层即可
```jsx
import {applyVueInReact} from 'veaury'
// Basic is a Vue component
import BasicVue from './Basic.vue'
import { ReactRouterProviderForVue } from './reactRouterCrossingProvider'

const Basic = applyVueInReact(BasicVue)
export default function () {

    return <ReactRouterProviderForVue>
            <Basic/>
        </ReactRouterProviderForVue>
}

```

#### createCrossingProviderForReactInVue的用法
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

### lazyReactInVue的用法(在Vue组件中使用异步的React组件)
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
    // for example: lazyPureReactInVue({ loader: () => import('./react_app/Basic'), timeout: 3000 })
    Basic: lazyPureReactInVue(() => import('./react_app/Basic'))
  },
}
</script>
```
```typescript
// types
type lazyPureReactInVue = (asyncImport: Promise<any> | defineAsyncComponentOptions, options?: options) => any;
```

### lazyVueInReact的用法(在React组件中使用异步的Vue组件)
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

### 获取ref实例的用法
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

## Contributing Guide
本项目中的`dev-project-react`和`dev-project-vue3`目录是`veaury`开发环境的基础项目，分别由`create-react-app`和`@vue/cli`创建的两个初始项目。
> **Note:** 在react项目中的`config/webpack.config.js`以及vue项目中的`vue.config.js`里，可以找到webpack的alias别名配置，将`veaury`的别名注释解开，就可以对根项目中`src`目录里的`veaury`源代码进行开发调试了
>
> **Setup:** 在主项目的根目录下运行命令行`npm run setup:yarn` 或者 `npm run setup:npm`，可以整体安装主项目和两个调试用的子项目
>
> **Develop:** 在主项目的根目录下运行命令行`npm run dev:vue` 以及 `npm run setup:npm`就可以对子项目进行开发调试
