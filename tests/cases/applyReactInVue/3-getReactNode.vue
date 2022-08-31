<template>
  <ReactComponentInVue :passingReactNode="getReactNode(VNode)"/>
</template>

<script setup>
import React from 'react'
import {h} from 'vue'
import {applyPureReactInVue, getReactNode} from 'veaury'
function ReactComponent(props) {
  return <div>{props.passingReactNode}</div>
}
const VNode = h('div', null, 'test getReactNode')
const ReactComponentInVue = applyPureReactInVue(ReactComponent)
</script>

<style scoped>

</style>
