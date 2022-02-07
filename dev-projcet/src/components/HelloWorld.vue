<template>
  <div class="hello" ref="aaa">
<!--    <slot></slot>-->
<!--    <slot name="bbb22" v-bind="{a:1}"></slot>-->
    <Test>
      <div>1212</div>
    </Test>
  </div>
</template>

<script>
import {createElement} from 'react'
import reactDom from 'react-dom'
import test from 'react_app/test'
import applyReactInVue from "combined/applyReactInVue";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      bbb: 'red'
    }
  },
  components: {
    Test: applyReactInVue(test)
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
    // setTimeout(() => {
    //   this.bbb = 'blue'
    // }, 2000)
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
