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
    <div @click="testClick" style="color:red" class="AA BB">12121</div>
    <CC @click="testClick">
      <!--      <div>CCCC</div>-->
      <!--      <template v-slot:node:aaa>-->
      <!--        AAAA-->
      <!--      </template>-->
      <template v-slot:bbb="aaa">
        {{count1}}<br/>
        <RenderReactNode :node="aaa"/>
      </template>
    </CC>
  </BB>


</template>

<script>
import { onMounted, onUnmounted, ref, h } from 'vue'
import { applyReactInVue, applyPureReactInVue, RenderReactNode } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import ReactAA from "./react_app/AA"
import ReactBB from './react_app/BB'
import ReactCC from './react_app/CC'
// const DD = {
//   components: {
//     RenderReactNode
//   },
//   render(props, context) {
//     return h('div', {
//       node: 'KKKKKKK'
//     })
//   }
// }

export default {
  components: {
    Basic: applyReactInVue(ReactBasic),
    AA: applyReactInVue(ReactAA),
    BB: applyPureReactInVue(ReactBB),
    CC: applyPureReactInVue(ReactCC),
    RenderReactNode,
    // DD
  },
  directives: {
    abc: {
      mounted(...args) {
        console.log('abcabc', args)
      },
      updated(el, binding) {
        console.log('updated!!!!', binding.value, binding.oldValue)
      }
    }
  },
  mounted() {
    // console.log(888, this.$refs)
  },
  setup() {
    let timer, timer1
    const currentTime = ref(new Date().toLocaleString())
    const foo = ref(Math.random())
    const showFlag = ref(true)
    const CCRef = ref(null)
    const count1 = ref(2)
    onMounted(() => {
      // console.log(777, CCRef.value)
      timer = setInterval(() => {
        currentTime.value = new Date().toLocaleString()
        foo.value = Math.random()
        count1.value = 33
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
      CCRef,
      count1
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
