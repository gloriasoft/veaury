<template>
  <slot name="renderSomething" v-bind="VNodeFoo"/>
</template>

<script setup>
const VNodeFoo = <div>This is a VNode of Foo!</div>
</script>

<style scoped>

</style>
