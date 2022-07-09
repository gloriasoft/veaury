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
<!--  <div ref="CCRef">UUUUU</div>-->
  <BB>
    33333
    <div @click="testClick" style="color:red" class="AA BB" ref="CCRef">12121</div>
    <CC @click="testClick" style="width: 100px" class="AA BB">
      1212
    </CC>
  </BB>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { applyReactInVue, applyPureReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import ReactAA from "./react_app/AA"
import ReactBB from './react_app/BB'
import ReactCC from './react_app/CC'

export default {
  components: {
    Basic: applyReactInVue(ReactBasic),
    AA: applyReactInVue(ReactAA),
    BB: applyPureReactInVue(ReactBB),
    CC: applyPureReactInVue(ReactCC)
  },
  mounted() {
    console.log(888, this.$refs)
  },
  setup() {
    let timer, timer1
    const currentTime = ref(new Date().toLocaleString())
    const foo = ref(Math.random())
    const showFlag = ref(true)
    const CCRef = ref(null)
    onMounted(() => {
      console.log(777, CCRef.value)
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
    function testClick() {
      console.log(1212)
    }
    return {
      currentTime,
      foo,
      showFlag,
      testClick,
      CCRef
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
