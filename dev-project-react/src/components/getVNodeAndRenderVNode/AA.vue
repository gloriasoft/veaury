<template>
  <div class="vue-component">
    <h3>This is a vue component</h3>
    <slot name="renderSomething" v-bind="VNodeFoo"/>
    <slot name="slot1" :aa="121212"/>
  </div>
</template>

<script setup>
const VNodeFoo = <div>This is a VNode of Foo!</div>
</script>

<style scoped>

</style>
