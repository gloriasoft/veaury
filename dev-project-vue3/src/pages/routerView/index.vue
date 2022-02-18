<template>
  <h3>
    React components can use 'router-view' in Vue projects.
  </h3>
  <Basic/>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import { useRouter } from 'vue-router'

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
