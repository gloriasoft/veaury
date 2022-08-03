<template>
  <AA :cc="getRandom()">
    <template v-slot:aa="{value}">
      <Basic className="CCC" :style="{color: 'red'}" v-model:aa="aa" v-bind="$attrs">
        <div>999911111</div>
      </Basic>
    </template>
  </AA>
</template>

<script>
import {h, withCtx, getCurrentInstance, createVNode} from 'vue'
import Basic from "./Basic";
import AA from './AA'

export default {
  name: "DD",
  data() {
    return {
      aa: Math.random()
    }
  },
  components: {
    Basic,
    AA
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    update() {
      this.$forceUpdate()
    }
  },
  mounted() {
    console.log('attrs', this.$attrs)
  },
  watch: {
    $attrs: {
      deep: true,
      handler() {
        console.log('attrs update')
      }
    }
  }
  // render() {
  //   const style = {color: 'red'}
  //   // const node = withCtx(() => [<div>999</div>, <div>77777</div>], getCurrentInstance())
  //
  //   // return <AA v-slots={{
  //   //   aa: ({value}) => <Basic className="CCC" style={style} v-slots={{default:  node}}></Basic>
  //   // }}/>
  //   return createVNode(AA, {}, {
  //     aa: ({value}) => createVNode(Basic, {
  //       className: 'CCC',
  //       style: {color: 'red'}
  //     })
  //   })
  // }
}
</script>

<style scoped>
.aa{}
</style>
