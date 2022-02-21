<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    received modelValue's value: {{$attrs.modelValue}}<br/>
    received bar's value: {{$attrs.bar}}
    <slot/>
  </div>
</template>
<script>
import {onMounted, getCurrentInstance, onUnmounted} from 'vue'
export default {
  setup() {
    let timer
    const instance = getCurrentInstance()
    onMounted(() => {
      timer = setInterval(() => {
        instance.emit('update:modelValue', Math.random())
        instance.emit('update:bar', Math.random())
      }, 1000)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
  }
}
</script>
<style scoped>

</style>
