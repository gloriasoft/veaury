<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    received foo's value: {{$attrs.foo}}
    <slot/>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>

</style>
