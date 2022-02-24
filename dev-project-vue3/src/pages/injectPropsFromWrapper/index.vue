<template>
  <h3>
    This example shows the basic usage of `injectPropsFromWrapper` with React component.
  </h3>
  <h4>
    Using React components in Vue components.
  </h4>
  <Basic/>
</template>

<script>
import { applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"

export default {
  components: {
    Basic: applyReactInVue(ReactBasic)
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
