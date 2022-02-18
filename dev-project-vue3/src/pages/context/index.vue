<template>
  <h3>
    Vue components in slots can receive the context.<br/>
  </h3>
  The random number set in 'provide': <span style="color:red; font-weight: bold">{{random}}</span>
  <Basic>
    <div class="slot">
      This is the Vue default slot
      <Custom1/>
    </div>
  </Basic>
</template>

<script>
import { onMounted, onUnmounted, ref, provide } from 'vue'
import { applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import Custom1 from "./Custom1"

export default {
  components: {
    Basic: applyReactInVue(ReactBasic),
    Custom1
  },
  setup() {
    let timer
    const random = ref(Math.random())
    provide('random', random)
    onMounted(() => {
      timer = setInterval(() => {
        random.value = Math.random()
      }, 1000)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return {
      random
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
