<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    <button @click="changeAa">change aa->(aa is {{aa}} now!)</button><br/>
<!--    received foo's value: {{$attrs.foo}}-->
    <slot/>
  </div>
</template>
<script>
export default {
  props: ['aa'],
  emits: ['update:aa'],
  methods: {
    changeAa() {
      this.$emit('update:aa', Math.random())
    }
  },
  updated() {
    console.log(9999)
  },
  mounted() {
    console.log('Basic mounted!!!!', this.$attrs)
  }

}
</script>
<style scoped>
.bbb{}
</style>
