<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    the path info from 'react-router': <span style="font-weight: bold">{{fullPath}}</span><br/><br/>
    <button @click="changeQuery">change query</button>
  </div>
</template>
<script>
import { computed } from 'vue'

export default {
  props: ['reactRouter'],
  // do not destructure props
  setup(props) {
    function changeQuery() {
      props.reactRouter?.navigate(`?a=${Math.random()}`, {replace: true})
    }
    const fullPath = computed(() => {
      const { location } = props.reactRouter || {}
      return location?.pathname + location?.search
    })
    return {
      fullPath,
      changeQuery
    }
  }
}
</script>
<style scoped>

</style>
