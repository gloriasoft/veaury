<template>
  <div style="background: green">
    <div ref="FFF">666</div>
    <slot name="aa" :value="value"/>
  </div>
</template>

<script>
// import {h} from 'vue'
console.log(<div class="CCC" ref="DD">1212</div>)
export default {
  data() {
    return {
      value: Math.random()
    }
  },
  inheritAttrs: false,
  methods: {
    getRef() {}
  },
  mounted() {
    console.log(1111111111, this)
    // setInterval(() => {
    //   this.value = Math.random()
    // }, 1000)
    // console.log(this.$attrs)
  }
}
</script>

<style scoped>
.aaa {
  color:red
}
</style>
