<template>
  <div class="vue-component">
    <h3>This is the Vue Component.</h3>
    the path info from 'react-router': <span style="font-weight: bold" data-testid="pathnameSearch">{{pathname + search}}</span><br/><br/>
    <button @click="changeQuery" data-testid="changeQuery">change query</button>
  </div>
</template>
<script>
import { useReactRouterForVue } from './reactRouterCrossingProvider'
import React from 'react'

export default {
  setup() {
    const { location, navigate } = useReactRouterForVue()
    function changeQuery() {
      navigate(`?a=${Math.random()}`, {replace: true})
    }
    return {
      pathname: location.pathname,
      search: location.search,
      changeQuery
    }
  }
}
</script>
<style scoped>

</style>
