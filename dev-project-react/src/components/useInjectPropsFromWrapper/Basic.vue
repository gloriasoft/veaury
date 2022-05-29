<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    the path info from 'react-router': <span style="font-weight: bold">{{pathname + search}}</span><br/><br/>
    <button @click="changeQuery">change query</button>
  </div>
</template>
<script>
import { reactive } from 'vue'

export default {
  props: ['reactRouter'],
  setup({ reactRouter }) {
    return reactive({
      pathname: reactRouter?.location.pathname,
      search: reactRouter?.location.search,
      changeQuery() {
        reactRouter?.navigate(`?a=${Math.random()}`, {replace: true})
      }
    })
  }
}
</script>
<style scoped>

</style>
