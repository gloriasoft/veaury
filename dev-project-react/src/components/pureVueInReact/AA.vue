<template>
  <div style="background: green" class="PPP">
    <div ref="FFF"  :aa="{a:1}">666</div>
    <div>{{$attrs.cc}}</div>
    <slot />
<!--    <slot name="aa" value="121212"/>-->
    <button @click="changeValue">change value{{value}}</button>
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
      value: 88888
    }
  },
  inheritAttrs: false,
  methods: {
    getRef() {},
    changeValue() {
      this.value = Math.random()
      // if (!this.cc) {
      //   console.log('fffffff')
      //   this.cc = 1
      //   this.$attrs.bb()
      // }

    }
  },
  updated() {
    console.log('AA updated', this)
    // this.$slots.aa({value: 8888})
  },
  mounted() {
    console.log('AA mounted')
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
