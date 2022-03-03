<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    <slot name="slot1"/>
    <slot name="slot2" value="121212"/>
    <slot/>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>

</style>
