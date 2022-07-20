<template>
  <h3>
    This example shows the basic usage of `applyPureReactInVue`.
  </h3>
  <h4>
    The 'pureReactInVue' Mode<br/>
    The style attribute display is set to 'flex' inside the AA component.<br/>
    The divs in the children will no longer be placed in an additional container, so the divs will be directly affected by the flex style.
  </h4>
  <AAWithPure>
    <div class="flex-sub">A</div>
    <div class="flex-sub">B</div>
    <div class="flex-sub">C</div>
  </AAWithPure>
  <br/>
  <h4>
    The 'ReactInVue' Mode<br/>
    The style attribute display is set to 'flex' inside the AA component.<br/>
    The divs in the children will be placed in a container styled 'all:unset', so the flex setting in the AA component has no effect on the divs.
  </h4>
  <AAWithNormal>
    <div class="flex-sub">A</div>
    <div class="flex-sub">B</div>
    <div class="flex-sub">C</div>
  </AAWithNormal>
</template>

<script setup>
import { applyPureReactInVue, applyReactInVue, getReactNode, RenderReactNode } from 'veaury'
import { withCtx } from 'vue'
import AAReact from './react_app/AA'

// Children and slots in the component will be rendered completely as pure ReactNode
const AAWithPure = applyPureReactInVue(AAReact)
const AAWithNormal = applyReactInVue(AAReact)

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
</style>
