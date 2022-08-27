<template>
  <div :style="containerStyle">
    <slot/>
  </div>
</template>

<script setup>
const containerStyle = {
  color: 'white',
  background: 'aquamarine',
  width: '500px',
  margin: 'auto',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-around'
}
</script>

<style scoped>
</style>
