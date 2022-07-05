<template>
<!--  <h3>-->
<!--    This example shows the basic usage of `applyReactInVue`.-->
<!--  </h3>-->
<!--  <h4>-->
<!--    Using React components in Vue components.-->
<!--  </h4>-->
<!--  <Basic :foo="foo">-->
<!--    <div class="slot">-->
<!--      This is the Vue default slot-->
<!--      <AA v-if="showFlag" :disappearTime="5"/>-->
<!--      <div>-->
<!--        current time: {{currentTime}}-->
<!--      </div>-->
<!--    </div>-->
<!--  </Basic>-->
  <BB>
    <div>12121</div>
  </BB>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { applyReactInVue, applyPureReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import ReactAA from "./react_app/AA"
import ReactBB from './react_app/BB'

export default {
  components: {
    Basic: applyReactInVue(ReactBasic),
    AA: applyReactInVue(ReactAA),
    BB: applyPureReactInVue(ReactBB)
  },
  setup() {
    let timer, timer1
    const currentTime = ref(new Date().toLocaleString())
    const foo = ref(Math.random())
    const showFlag = ref(true)
    onMounted(() => {
      timer = setInterval(() => {
        currentTime.value = new Date().toLocaleString()
        foo.value = Math.random()
      }, 1000)
      timer1 = setTimeout(() => {
        showFlag.value = false
      }, 5000)
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
