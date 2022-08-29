<template>
  <div class="vue-component">
    <h3>This is a vue component</h3>
    <slot name="renderSomething" v-bind="VNodeFoo"/>
    <component :is="() => VNodeBar" v-if="VNodeBar" v-memo="[VNodeBar]"/>
  </div>
</template>

<script setup>
import { onMounted, ref, onUpdated } from 'vue'
defineProps(['VNodeBar'])
const VNodeFoo = ref(<div>This is a VNode of Foo! {Math.random()}</div>)
onMounted(() => {
  setInterval(() => {
    VNodeFoo.value = <div>This is a VNode of Foo! {Math.random()}</div>
  }, 1000)
})
</script>

<style scoped>

</style>
