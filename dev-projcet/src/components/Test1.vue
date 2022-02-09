<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  name: "Test1",
  mounted() {
    console.log(this)
    console.log('Test1 mounted!')
  },
  updated() {
    console.log('Test1 updated!')
  }
}
</script>

<style scoped>

</style>
