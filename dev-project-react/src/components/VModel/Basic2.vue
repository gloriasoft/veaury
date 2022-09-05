<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    <span>received modelValue's value: <span data-testid="vModelShow1">{{$attrs.modelValue}}</span></span><br/>
    <slot/>
    <button @click="changeModel" data-testid="changeModel1">change model</button>
  </div>
</template>
<script setup>
import {onMounted, getCurrentInstance, onUnmounted} from 'vue'
let timer
function changeModel() {
  instance.emit('update:modelValue', Math.random())
}
const instance = getCurrentInstance()
// onMounted(() => {
//   timer = setInterval(() => {
//     instance.emit('update:modelValue', Math.random())
//   }, 1000)
// })
// onUnmounted(() => {
//   clearInterval(timer)
// })
</script>
<style scoped>

</style>
