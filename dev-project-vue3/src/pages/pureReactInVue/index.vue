<template>
  <h3>
    This example shows the basic usage of `applyPureReactInVue`.
  </h3>
  <h4>
    The style attribute display is set to 'flex' inside the AA component.
  </h4>
  <h4>
    Pure mode<br/>
    The divs in the children will no longer be placed in an additional container, so the divs will be directly affected by the flex style.
  </h4>
  <CC>
    <template v-slot:renderProps1="_">
      <div data-testid="ccRenderProps1">PPPPP</div>
    </template>
    <template v-slot:node:reactNode>
      string
      <div data-testid="ccReactNode">RRRRR</div>
    </template>
    <template v-slot:node:default>
      <div data-testid="ccDefault">YYYYY</div>
    </template>
    <template v-slot:node:stringNode>
      string node
    </template>
    <template v-slot:node:objectNode>
      <div>object node</div>
    </template>
  </CC>
  <AAWithPure>
    <RenderReactNode :node="ReactNode"/>
    <VueCom1>
      <div>12121212</div>
    </VueCom1>
    <div class="flex-sub" v-my v-bar data-testid="directiveTest">A</div>
    <div class="flex-sub">B</div>
    <div class="flex-sub">C</div>
  </AAWithPure>
  <br/>
  <h4>
    Normal mode<br/>
    The divs in the children will be placed in a container styled 'all:unset', so the flex setting in the AA component has no effect on the divs.
  </h4>
  <AAWithNormal>
    <RenderReactNode :node="ReactNode"/>
    <RenderReactNode :node="8888"/>
    <RenderReactNode :node="[6666, 7777]"/>
    <div class="flex-sub">A</div>
    <div class="flex-sub">B</div>
    <div class="flex-sub">C</div>
  </AAWithNormal>
  <br/>
  <h4>
    Pure mode has priority over normal mode.<br/>
    Even if there are normal mode react components in the children of pure mode components, they will be upgraded to pure mode.
  </h4>
  <AAWithPure>
    <div class="flex-sub">A</div>
    <div class="flex-sub">B</div>
    <div class="flex-sub">C</div>
    <BB style="color: red" class="test" :reactNode="VNodeToReactNode">
      <template v-slot:renderProps="_">
        renderProps for BB
      </template>
      <RenderReactNode :node="ReactNode" :ref="()=>{}"/>
      <div class="flex-sub flex-sub-in-bb" ref="REF">E</div>
      <div class="flex-sub flex-sub-in-bb">F</div>
      <div class="flex-sub flex-sub-in-bb" style="width:180px" data-testid="random">{{random}}</div>
      <!--  Test comment node    -->
      <Comment/>
      <div></div>
    </BB>
  </AAWithPure>
<!--  <Box>-->
<!--    <Box v-for="e in [1]">-->
<!--      <ReactInput :value="value" @valueChange="onValueChange" />-->
<!--    </Box>-->
<!--  </Box>-->

</template>

<script setup lang="jsx">
// import { Input } from "@nextui-org/react";
import { applyPureReactInVue, applyReactInVue, RenderReactNode, getReactNode, injectSyncUpdateForPureReactInVue } from 'veaury'
import { ref, onMounted, getCurrentInstance, h, Comment } from 'vue'
import { createElement } from 'react'
import AAReact from './react_app/AA'
import BBReact from './react_app/BB'
import CCReact from './react_app/CC'
import BoxReact from './react_app/Box'

// After the Input component is bidirectionally bound, inputting text will cause confusion in the timing of status updates, and synchronous update injection processing is required.
// injectSyncUpdateForPureReactInVue(Input, {
//   // The name of the hook function that determines the content update of the Input component
//   onValueChange(...args) {
//     // The state key that determines the content of the Input component
//     return {
//       value: args[0]
//     }
//   }
// })
// const ReactInput = applyPureReactInVue(Input);
const Box = applyPureReactInVue(BoxReact)

const ReactNode = createElement('div', null, 'ReactNode')
const instance = getCurrentInstance()

const value = ref("");

function onValueChange(val) {
  value.value = val;
}

// Custom directive
const vMy = {
  mounted(el) {
    el.style.color = 'red'
  },
  unmounted(el) {
    el.style.color = 'unset'
  }
}

const vBar = {
  mounted(el) {

  },
  unmounted(el) {

  }
}


// Custom Vue component
function VueCom1(props, context) {
  return h('div', context.attrs, context.slots)
}
// Children and slots in the component will be rendered completely as pure ReactNode
const AAWithPure = applyPureReactInVue(AAReact)
const AAWithNormal = applyReactInVue(AAReact)
const CC = applyPureReactInVue(CCReact)
const BB = applyReactInVue(BBReact)
const random = ref(Math.random())
const VNodeToReactNode = getReactNode(() => <div><VueCom1>Test getReactNode</VueCom1></div>)


onMounted(() => {
  setInterval(() => {
    random.value = Math.random()
  }, 1000)
})
</script>

<style scoped>
.slot {
  background: aquamarine;
  padding: 10px;
  margin: 10px;
}
.flex-sub {
  width: 50px;
  height: 50px;
  background: dodgerblue;
  line-height: 50px;
  margin: 5px;
}
.flex-sub-in-bb {
  background: darkblue;
  color: white;
}
</style>
