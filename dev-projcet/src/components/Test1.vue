<template>
  <div>{{$attrs.aaa}}</div>
<!--  <input v-model="inputValue" @input="bbb"/>-->
  <A1 :a1="1"/>
</template>

<script>
import {h, getCurrentInstance} from 'vue'

const A2 = {
  inheritAttrs: false,
  render(props, context) {
    console.log('A2', this.$attrs)
    return h('div', 'sssss')
  }
  // setup(props, context) {
  //   console.log('A2', props, context)
  //   return () => h('div', 'sssss')
  // }
}

const A1 = {
  inheritAttrs: false,
  data() {
    return {
      aaa: 3
    }
  },
  render(props, context) {
    console.log('A1', this.$attrs)
    return <A2 v-model={[this.aaa, ['abc'], 'aaa']}/>
  }
}

export default {
  data () {
    return {
      inputValue: '1111'
    }
  },
  watch: {
    inputValue (nv) {
      console.log(nv)
    }
  },
  name: "Test1",
  setup(props, context) {
    return {abc: 2}
  },
  mounted() {
    console.log(this)
    console.log('Test1 mounted!')
  },
  updated() {
    console.log('Test1 updated!')
  },
  components: {
    A1
  },
  methods: {
    bbb(v){
      console.log('vvvvvvv', v)
    }
  }
}
</script>

<style scoped>

</style>
