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
  <AAWithPure>
    <div class="flex-sub" v-my data-testid="directiveTest">A</div>
    <div class="flex-sub">B</div>
    <div class="flex-sub">C</div>
  </AAWithPure>
  <br/>
  <h4>
    Normal mode<br/>
    The divs in the children will be placed in a container styled 'all:unset', so the flex setting in the AA component has no effect on the divs.
  </h4>
  <AAWithNormal>
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
    <BB>
      <div class="flex-sub flex-sub-in-bb" ref="REF">E</div>
      <div class="flex-sub flex-sub-in-bb">F</div>
      <div class="flex-sub flex-sub-in-bb" style="width:180px" data-testid="random">{{random}}</div>
    </BB>
  </AAWithPure>
</template>

<script setup>
import { applyPureReactInVue, applyReactInVue, RenderReactNode } from 'veaury'
import { ref, onMounted, getCurrentInstance } from 'vue'
import AAReact from './react_app/AA'
import BBReact from './react_app/BB'

const instance = getCurrentInstance()
// Custom directive
const vMy = {
  mounted(el) {
    el.style.color = 'red'
  }
}

// Children and slots in the component will be rendered completely as pure ReactNode
const AAWithPure = applyPureReactInVue(AAReact)
const AAWithNormal = applyReactInVue(AAReact)
const BB = applyReactInVue(BBReact)
const random = ref(Math.random())
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
