<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    the path info from 'react-router': <span style="font-weight: bold">{{pathname + search}}</span><br/><br/>
    <button @click="changeQuery">change query</button>
  </div>
</template>
<script>
// This Vue component will be used in the React app and needs to use the react-router hooks

import { injectPropsFromWrapper } from 'veaury'
import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'

function ReactInjectionHook (reactProps) {
  // React hooks can be used in this function
  // Use the hooks of react-router-dom
  const reactRouterLocation = useLocation()
  const navigate = useNavigate()
  function changeQuery() {
    navigate(`?a=${Math.random()}`, {replace: true})
  }

  // The returned object will be passed to the Vue component as props
  return {
    pathname: reactRouterLocation.pathname,
    search: reactRouterLocation.search,
    changeQuery
  }
}
// 'injectPropsFromWrapper' returns the original Vue component and will register injectionHook.
// When the Vue component is applied to the React app by 'applyVueInReact',
// InjectionHook will be executed first, otherwise InjectionHook will not be executed
export default injectPropsFromWrapper(ReactInjectionHook, {
  props: {
    pathname: String,
    search: String,
    changeQuery: Function
  }
})
</script>
<style scoped>

</style>
