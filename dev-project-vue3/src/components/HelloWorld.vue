<template>
<!--  <div>111</div>-->
<!--  <div>222</div>-->
<!--  <div class="hello" ref="aaa">-->
<!--    <slot></slot>-->
<!--&lt;!&ndash;    <slot name="bbb22" v-bind="{a:1}"></slot>&ndash;&gt;-->
<!--&lt;!&ndash;    {{bbb}}&ndash;&gt;-->
    <Test >
      <div>3333</div>
    </Test>
<!--  <AA @:click="click"><div>12122</div></AA>-->
<!--  <Test1 @click="click"><button>3333333</button></Test1>-->
<!--  </div>-->
</template>

<script>
import {h} from 'vue'
import {createElement} from 'react'
import reactDom from 'react-dom'
import dev from 'react_app/test'
import {applyReactInVue} from 'veaury';
// import Test1 from './Test1'

const AA = {
  emits: ['click'],
  mounted() {
    console.log('AA mounted')
  },
  updated() {
    console.log('AA updated')
  },
  beforeUnmount() {
    console.log('AA destroy!!!!')
  },
  render () {
    return this.$slots.default()
  }
}

const Test1 = {
  beforeCreate() {
    console.log('HHHHHHHHHHHHHH', this.$slots.default)
  },
  mounted() {
    console.log('Test1 mounted', this)
  },
  updated() {
    console.log('Test1 updated')
  },
  render () {
    return h('div', {ref: 'aaa'})
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
    Test: applyReactInVue(dev),
    AA,
    Test1
  },
  methods: {
    die() {
      this.vvv = false
    },
    random() {
      // console.log('touch random!!!!!!!!!!!!')
      return Math.random()
    },
    click() {
      console.log(3333333333)
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
    // console.log(this)
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
