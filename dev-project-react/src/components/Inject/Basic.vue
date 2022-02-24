<template>
  <div class="vue-component">
    {{bbb}}
    <h3>This is the Vue Component.</h3>
    the router info from 'react-router': <br/>
    {{$props.reactRouterLocation}}
  </div>
</template>
<script>
// This Vue component will be used in the React app and needs to use the react-router hooks

import { interceptVueInReact } from 'veaury'
import { useLocation } from 'react-router-dom'
import React from 'react'
import {getCurrentInstance, on} from 'vue'

function Wrap(props) {
  return React.createElement(Component, {
    ...props,
    propA: 'I am propA from a React HOC'
  })
}

function ReactIntercept (reactProps) {
  // React hooks can be used in this function
  // Use the hooks of react-router-dom
  const reactRouterLocation = useLocation()
  // The returned object will be passed to the Vue component as props
  return {
    ...reactProps,
    reactRouterLocation
  }
}
// 'interceptVueInReact' returns the original Vue component and will register ReactIntercept.
// When the Vue component is applied to the React app by 'applyVueInReact',
// ReactIntercept will be executed first, otherwise ReactIntercept will not be executed
export default interceptVueInReact(ReactIntercept, {
  props: {
    reactRouterLocation: Object
  },
  data() {
    return {
      bbb: 2,
    }
  },
  setup() {
    const instance = getCurrentInstance()
    return {
      // bbb: 2
    }
  },
  mounted() {
    console.log(33333, this)
    setTimeout(() => {this.bbb = 6}, 500)
  },
  watch: {
    'bbb'(nv) {
      console.log(nv)
    }
  }
})
</script>
<style scoped>

</style>
