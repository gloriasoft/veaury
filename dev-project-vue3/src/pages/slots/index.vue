<template>
  <h3>
    Pass Slots to React Components.
  </h3>
  <div style="line-height: 30px">
    Vue named slots & scoped slots = React render props.<br/>
    Vue default slots $ children = React props.children.<br/>
    Name a named slot starting with 'node:' = React Node.
  </div>
  <Basic :foo="foo">
    <template v-slot:slot1>
      <div class="slot">
        this is slot1 (render props)
      </div>
    </template>
    <template v-slot:slot2="bar">
      <div class="slot">
        this is slot2 (render props)<br/>
        this content is passed from React: {{bar}}
      </div>
    </template>
    <template v-slot:node:slot3>
      <div class="slot">
        this is slot3 (react node)
        this content is passed from Vue: {{foo}}
      </div>
    </template>
    <div class="slot">
      this is children (react node)
      <Custom1 :zoo="121212"/>
    </div>
  </Basic>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Slots"
import Custom1 from './Custom1'

export default {
  components: {
    Basic: applyReactInVue(ReactBasic),
    Custom1
  },
  setup() {
    let timer
    const foo = ref(Math.random())
    onMounted(() => {
      timer = setInterval(() => {
        foo.value = Math.random()
      }, 300)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return {
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
