<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    <span style="font-weight: bold">received foo's value: {{$attrs.foo}}</span><br/>
    Click the button can refresh foo's value<br/>
    <button @click="$emit('click')">button in Vue</button>
    <slot/>
  </div>
</template>
<script>
export default {
  emits: ['click'],
  updated() {
    // console.log('updated')
  }
}
</script>
<style scoped>

</style>
