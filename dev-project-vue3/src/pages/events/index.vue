<template>
  <h3>
    This example shows how to pass events when using `applyReactInVue`.
  </h3>
  <ReactButton :foo="foo" @click="onClickForReact">
    <div class="slot">
      This is the Vue default slot
      <h4>
        current timestamp: {{currentTimestamp}}
      </h4>
      Click the button can refresh current timestamp<br/>
      <button @click="onClickForVue">button in Vue</button>
    </div>
  </ReactButton>
</template>

<script>
import { ref } from 'vue'
import { applyPureReactInVue } from 'veaury'
// This is a React Component
import ReactButton from "./react_app/Button"

export default {
  components: {
    ReactButton: applyPureReactInVue(ReactButton)
  },
  setup() {
    const currentTimestamp = ref(Date.now())
    const foo = ref(Math.random())
    function onClickForReact() {
      return foo.value = Math.random()
    }
    function onClickForVue() {
      return currentTimestamp.value = Date.now()
    }
    return {
      currentTimestamp,
      foo,
      onClickForReact,
      onClickForVue
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
