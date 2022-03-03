<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    <slot name="slot1"/>
    <slot name="slot2" value="121212"/>
    <slot/>
  </div>
</template>
<script>
const aaa = <div>1212</div>
console.log(aaa)
export default {
}
</script>
<style scoped>

</style>
