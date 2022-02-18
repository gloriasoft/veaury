<template>
  <div style="background: #42b983; color: white" class="slot">
    This is the Custom1 Vue Component.<br/>
    the random number from 'inject': <span style="color:red; font-weight: bold">{{random}}</span>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const random = inject('random')
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
