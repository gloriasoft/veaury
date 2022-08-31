<template>
  <ReactComponent :vnodeAttr="vnodeAttr">
    <template
      #body="{attr1}"
    >
      111-{{attr1}}
    </template>
  </ReactComponent>
</template>

<script>
import React from "react"
import {createVNode} from "vue"
import { applyReactInVue, getReactNode } from 'veaury'
function ReactComponent(props) {
  return <div onClick={props.onClick}>
    {props.vnodeAttr}{props.body({attr1: "attr1"})}
  </div>
}
ReactComponent.defaultProps = {
  onClick() {},
  body() {}
}

export default {
  components: {
    ReactComponent: applyReactInVue(ReactComponent)
  },
  data() {
    return {
      vnodeAttr: getReactNode(createVNode("span", {}, ["vnode-"])),
      "clickText": ""
    }
  },
  methods: {
    clickHandle() {
      this.clickText = "clicked"
    }
  }
}
</script>

<style>

</style>