<template>
  <h3>
    This example shows the basic usage of `useInjectPropsFromWrapper`.
  </h3>
  <h4>
    Using React components in Vue components.
  </h4>
  <BasicVue/>
</template>

<script>
import BasicVue from "./react_app/BasicVueFromReact"

export default {
  components: {
    BasicVue
  },
}
</script>

<style scoped>
.slot {
  background: aquamarine;
  padding: 10px;
  margin: 10px;
}
</style>
