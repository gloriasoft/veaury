<template>
  <h3>
    This example shows the basic usage of `applyReactInVue`.
  </h3>
  <h4>
    Using React components in Vue components.
  </h4>
  <Basic :foo="foo">
    <div class="slot">
      This is the Vue default slot
      <div>
        current time: {{currentTime}}
      </div>
    </div>
  </Basic>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"

export default {
  components: {
    Basic: applyReactInVue(ReactBasic)
  },
  setup() {
    let timer
    const currentTime = ref(new Date().toLocaleString())
    const foo = ref(Math.random())
    onMounted(() => {
      timer = setInterval(() => {
        currentTime.value = new Date().toLocaleString()
        foo.value = Math.random()
      }, 1000)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return {
      currentTime,
      foo
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
