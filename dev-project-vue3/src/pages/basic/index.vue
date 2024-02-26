<template>
  <h3>
    This example shows the basic usage of `applyReactInVue`.
  </h3>
  <h4>
    Using React components in Vue components.
  </h4>
  <ReactUnMount v-if="showFlag" />
  <Basic :foo="foo" ref="BasicRef" :null="null">
    <div class="slot">
      This is the Vue default slot
      <AA v-if="showFlag" :disappearTime="6" ref="AARef"/>
      <div>
        current time: {{currentTime}}
      </div>
      <BB ref="BBRef"/>
      <CC>
        <template #children="value">This is a react functional children in Vue, and received {{value}}</template>
      </CC>
    </div>
  </Basic>
</template>

<script>
import { onMounted, onUnmounted, ref, getCurrentInstance, nextTick } from 'vue'
import { applyPureReactInVue, applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import ReactAA from "./react_app/AA"
import ReactBB from "./react_app/BB"
import ReactCC from "./react_app/CC"
import ReactUnMount from "./react_app/UnMount"

export default {
  components: {
    Basic: applyReactInVue(ReactBasic),
    AA: applyReactInVue(ReactAA),
    BB: applyReactInVue(ReactBB),
    CC: applyReactInVue(ReactCC),
    ReactUnMount: applyReactInVue(ReactUnMount),
  },
  setup() {
    let timer, timer1
    const currentTime = ref(new Date().toLocaleString())
    const foo = ref(Math.random())
    const showFlag = ref(true)
    const instance = getCurrentInstance()
    onMounted(() => {
      timer = setInterval(() => {
        currentTime.value = new Date().toLocaleString()
        foo.value = Math.random()
      }, 1000)
      timer1 = setTimeout(() => {
        showFlag.value = false
      }, 5000)
      // Get refs in next macro task
      setTimeout(() => {
        console.log(instance.refs)
      })
    })
    onUnmounted(() => {
      clearInterval(timer)
      clearInterval(timer1)
    })
    return {
      currentTime,
      foo,
      showFlag
    }
  }
}
</script>

<style scoped>
.slot {
  background: aquamarine;
  padding: 10px;
  margin: 10px;
}
</style>
