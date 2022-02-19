<template>
  <h3>
    In React components you can use higher order component 'withVuex' to get an instance of Vuex.
  </h3>
  Vuex state 'count': {{$store.state.count}}
  <Basic/>
  <button style="margin-top: 20px" @click="changeValue">increment the count of the Vuex state</button>
</template>

<script>
import { useStore } from 'vuex'
import { applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"

export default {
  components: {
    Basic: applyReactInVue(ReactBasic)
  },
  setup() {
    const store = useStore()
    function changeValue() {
      // This action is defined in 'src/store/index.js'
      store.dispatch('increment')
    }
    return {
      changeValue
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
