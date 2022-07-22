<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    received foo's value: {{$attrs.foo}}
    <slot/>
  </div>
</template>
<script>
export default {
  mounted() {
    // console.log(1111, this.$attrs)
  }

}
</script>
<style scoped>

</style>
