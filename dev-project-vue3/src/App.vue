<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <BBB/>-->
  <HelloWorld ref="aaa">
<!--    <div>{{aaa}}</div>-->
<!--    <template v-slot:ccc>-->
<!--      {{aaa}}-->
<!--    </template>-->
<!--    <template v-slot:bbb1>-->
<!--      {{bbb.a}}-->
<!--    </template>-->
<!--    <div>{{aaa}}</div>-->
<!--    <AAA>-->
<!--      {{aaa}}-->
<!--    </AAA>-->
<!--    {{aaa}}-->
  </HelloWorld>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {h} from 'vue'
const AAA = {
  name: 'AAA',
  created() {
    // console.log(777, this)
  },
  render () {
    return this.$slots.default()
  }
}
const BBB = {
  created() {
    // console.log(8888, this)
  },
  render () {
    return h(AAA)
  }
}

export default {
  name: 'App',
  components: {
    HelloWorld,
    BBB,
    AAA
  },
  methods: {
    ddd() {
      console.log('dddd')
    }
  },
  data() {
    return {
      aaa: 11111
    }
  },
  beforeCreate() {
    // console.log(11111, this)
  },
  updated() {
    console.log('uuuuuuuuuuuuuuuuuuuu')
  },
  mounted() {
    console.log(3333, this)
    // setTimeout(() => {
    //   this.aaa = 2222
    // }, 1000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
