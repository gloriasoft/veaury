<template>
  <div class="hello" ref="aaa">

  </div>
</template>

<script>
import {createElement} from 'react'
import reactDom from 'react-dom'
import test from 'react_app/test'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    reactDom.render(createElement(test, {}), this.$refs.aaa)
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
