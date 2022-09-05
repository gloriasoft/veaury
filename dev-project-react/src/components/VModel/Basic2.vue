<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    <span>received zooValue's value: {{$attrs.zoo}}</span><br/>
    <span>received modelValue's value: <span data-testid="vModelShow2">{{$attrs.modelValue}}</span></span><br/>
    <slot/>
    <button @click="changeModel" :data-testid="`changeModel2_${$attrs.testId}`">change model</button>
  </div>
</template>
<script setup>
import {onMounted, getCurrentInstance, onUnmounted} from 'vue'
// const props = defineProps(['zoo', 'modelValue'])
let timer
function changeModel() {
  instance.emit('update:modelValue', Math.random() + '')
  instance.emit('update:zoo', Math.random() + '')
}
const instance = getCurrentInstance()
// onMounted(() => {
  // console.log(111111, props)
  // timer = setInterval(() => {
  //   instance.emit('update:modelValue', Math.random())
  // }, 1000)
// })
// onUnmounted(() => {
//   clearInterval(timer)
// })
</script>
<style scoped>

</style>
