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
<!--  <BB>-->
<!--&lt;!&ndash;    33333&ndash;&gt;-->
<!--&lt;!&ndash;    <div @click="testClick" style="color:red" class="AA BB" >12121</div>&ndash;&gt;-->
<!--    <component :is="tt"/>-->
  <component :is="tt"/>
    <CC @click="testClick" ref="CC" :bbb="bb">
      <div>1212</div>
<!--      <div>dddd</div>-->
      <!--      <div>CCCC</div>-->
      <!--      <template v-slot:node:aaa>-->
      <!--        AAAA-->
      <!--      </template>-->
<!--      <template v-slot:bbb="aaa">-->
<!--        {{count1}}<br/>-->
<!--        <RenderReactNode :node="aaa" />-->
<!--        <DD ref="DD"/>-->
<!--        <EE ref="EE"/>-->
<!--      </template>-->
    </CC>
<!--  </BB>-->
<!--  <AAA>-->
<!--  </AAA>-->


</template>

<script>
import { onMounted, onUnmounted, ref, h, getCurrentInstance, computed, provide, withScopeId, withCtx, VNode } from 'vue'
import { applyReactInVue, applyPureReactInVue, RenderReactNode, getReactNode } from 'veaury'
import {createElement} from 'react'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import ReactAA from "./react_app/AA"
import ReactBB from './react_app/BB'
import ReactCC from './react_app/CC'
import AAA from './AAA'

const DD = {
  render() {
    return h('div', {}, <div>1212</div>)
  }
}
function EE () {
  return createElement('div', {}, 'EEEEEE')
}


// const newGetReactNode = getReactNode.clone()
// const bb = newGetReactNode([<div style="color:red"><div>121221</div></div>, <DD/>])


export default {
  components: {
    Basic: applyReactInVue(ReactBasic),
    AA: applyReactInVue(ReactAA),
    BB: applyReactInVue(ReactBB),
    CC: applyPureReactInVue(ReactCC),
    RenderReactNode,
    DD,
    EE: applyReactInVue(EE),
    AAA
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
  beforeCreate() {
    setTimeout(() => {
      console.log('AAAAAAAAAAAA', this)
    })
    // console.log(44444444444, getCurrentInstance())
    // Promise.resolve().then(() => {
    //   console.log(888, this.$refs)
    // })

  },
  setup() {
    function ddd() {

    }
    const tt = withCtx(() =>  [<div><div>77777777</div></div>, <DD/>])
    const RR = <div>DDDD</div>
    const bb = getReactNode(withCtx(() => [<div style="color:red"><div>121221</div></div>, <DD/>], getCurrentInstance()))
    // newGetReactNode.scopeId = getCurrentInstance().type.__scopeId

    let timer, timer1
    const currentTime = ref(new Date().toLocaleString())
    const foo = ref(Math.random())
    const showFlag = ref(true)
    const CCRef = ref(null)
    const count1 = ref(2)

    onMounted(() => {


      // console.log(777, CCRef.value)
      // timer = setInterval(() => {
      //   currentTime.value = new Date().toLocaleString()
      //   foo.value = Math.random()
      //   count1.value = 33
      // }, 1000)
      // timer1 = setTimeout(() => {
      //   showFlag.value = false
      // }, 5000)
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
      count1,
      bb,
      tt,
      RR,
      AAA
    }
  }
}
</script>

<style scoped>
.bbb{
  font-weight: bold;
}
.slot {
  background: aquamarine;
  padding: 10px;
  margin: 10px;
}
</style>
