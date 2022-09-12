<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    <slot name="slot1"/>
    <slot name="slot2" value="121212"/>
    <slot/>
    <ReactCom v-if="$attrs.showReactCom">
      <template v-slot:node:toReactComNode>
        <slot name="toReactComNode"/>
      </template>
      <slot/>
    </ReactCom>
  </div>
</template>
<script>
import React, {createElement} from 'react'
import {applyReactInVue} from 'veaury'
function ReactCom(props) {
  return createElement('div', null, ['ReactCom', props.children, props.toReactComNode])
}
export default {
  components: {
    ReactCom: applyReactInVue(ReactCom)
  }
}
</script>
<style scoped>

</style>
