<template>
  <ReactTestContextProviderInVue :value="contextValue">
    <!--  这个Provider使内部的所有vue组件都能使用到预设的react hooks    -->
    <HooksProviderInVue>
      <!--  这个vue组件内部使用了react hooks,并且通过hooks获取到了最外层的context的值    -->
      <VueComponent/>
    </HooksProviderInVue>
  </ReactTestContextProviderInVue>

</template>

<script setup lang="jsx">
import {useContext, createContext} from 'react'
import {defineComponent, onMounted, onUnmounted, ref} from 'vue'
import {applyPureReactInVue, createCrossingProviderForPureVueInReact } from 'veaury'

// 创建一个React context, 作为测试react hook状态的来源
const ReactTestContext = createContext()
// 将React context的Provider转换为vue组件
const ReactTestContextProviderInVue = applyPureReactInVue(ReactTestContext.Provider)

// 创建一个跨技术栈到vue的react hooks和一个对应使用的react provider
const [useHooksInVue, HooksProvider] = createCrossingProviderForPureVueInReact(
    function() {
      return {
        // 将前面创建的React context的值暴露给vue，使用useContext hooks
        reactTestContext: useContext(ReactTestContext)
      }
    }
)
// 将HooksProvider转换为vue组件
const HooksProviderInVue = applyPureReactInVue(HooksProvider)

// 临时定义一个vue组件作为测试组件，组件里使用前面定义的vue hooks
const VueComponent = defineComponent({
  setup() {
    // 这里其实就是在vue里使用了react hooks
    const {reactTestContext} = useHooksInVue()
    // 这里使用了vue的jsx
    return () => <div>{reactTestContext}</div>
  }
})

// 定义一个响应式的状态，用于React context的value
const contextValue = ref(Math.random())

let timer
onMounted(() => {
  clearInterval(timer)
  // 每秒会修改react context的值，作为测试结果观察
  timer = setInterval(() => {
    contextValue.value = Math.random()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
