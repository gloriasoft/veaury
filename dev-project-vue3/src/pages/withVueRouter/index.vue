<template>
  <h3>
    When React components are used in Vue components, you can use the 'withVueRouter' higher-order component to get the 'vue-router' context of the current environment
  </h3>
  <h4>
    current route path: {{$route.path}}<br/>
    current route query: {{$route.query}}
  </h4>
  <Basic>
    <div class="slot">
      This is the Vue default slot
      <Custom1/>
    </div>
  </Basic>
  <button style="margin-top: 20px" @click="changeValue">Randomly change the value of query parameter 'a'</button>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import Custom1 from "./Custom1"
import { useRouter } from 'vue-router'

export default {
  components: {
    Basic: applyReactInVue(ReactBasic),
    Custom1
  },
  setup() {
    const router = useRouter()
    function changeValue() {
      router.replace({
        query: {
          a: Math.random()
        }
      })
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
