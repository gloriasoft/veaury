<template>
  <div style="background: green" class="PPP">
    <div ref="FFF">666</div>
    <slot />
<!--    <slot name="aa" :value="value"/>-->
<!--    <Basic class="CCC"/>-->
  </div>
</template>

<script>
import {h} from 'vue'
import Basic from "./Basic";
console.log(h('div', {dirs: {aaa: 1}}, 22222))
export default {
  components: {
    Basic
  },
  directives: {
    aa: {}
  },
  data() {
    return {
      value: <div>88888</div>
    }
  },
  inheritAttrs: false,
  methods: {
    getRef() {}
  },
  mounted() {
    // console.log(1111111111, h('div', {'v-aa': 1212}))
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
