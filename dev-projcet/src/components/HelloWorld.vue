<template>
<!--  <div>111</div>-->
<!--  <div>222</div>-->
<!--  <div class="hello" ref="aaa">-->
<!--    <slot></slot>-->
<!--&lt;!&ndash;    <slot name="bbb22" v-bind="{a:1}"></slot>&ndash;&gt;-->
<!--&lt;!&ndash;    {{bbb}}&ndash;&gt;-->
    <Test @click="()=>{}" v-if="vvv">
      <div>{{bbb}}</div>
      <template v-slot:slot1="a, b">
        <div @click="die">{{ a.a }}</div>
        <div @click="die">{{ bbb }}</div>
      </template>
    </Test>
<!--  </div>-->
</template>

<script>
import {h} from 'vue'
import {createElement} from 'react'
import reactDom from 'react-dom'
import test from 'react_app/test'
import applyReactInVue from "combined/applyReactInVue";

const AA = {
  mounted() {
    console.log('AAAAAAA', this)
  },
  render () {
    return h('div', this.$slots.default())
  }
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      bbb: 'red',
      vvv: true
    }
  },
  components: {
    Test: applyReactInVue(test),
    AA
  },
  methods: {
    die() {
      this.vvv = false
    }
  },
  updated() {
    console.log('UUUUUUUU')
  },
  watch: {
    '$slots.aaa' () {
      // console.log('xxxxxx')
    }
  },
  beforeCreate() {
    // console.log(22222, this.$)
  },
  mounted() {
    console.log(this)
    this.$emit('click')
    setTimeout(() => {
      this.bbb = 'blue'
    }, 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
