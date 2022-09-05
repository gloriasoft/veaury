<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    <span>received modelValue's value: <span data-testid="vModelShow">{{$attrs.modelValue}}</span></span><br/>
    received bar's value: {{$attrs.bar}}
    <slot/>
    <button @click="changeModel" data-testid="changeModel">change model</button>
  </div>
</template>
<script setup>
import {onMounted, getCurrentInstance, onUnmounted} from 'vue'
let timer
const instance = getCurrentInstance()
function changeModel() {
  instance.emit('update:modelValue', Math.random())
  instance.emit('update:bar', Math.random())
}

// onMounted(() => {
//   timer = setInterval(() => {
//     instance.emit('update:modelValue', Math.random())
//     instance.emit('update:bar', Math.random())
//   }, 1000)
// })
// onUnmounted(() => {
//   clearInterval(timer)
// })
</script>
<style scoped>

</style>
