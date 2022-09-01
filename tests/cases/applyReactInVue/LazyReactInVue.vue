<template>
  <ReactComponent>
    test lazyReactInVue
  </ReactComponent>
</template>

<script setup>
import {lazyReactInVue} from 'veaury'
const ReactComponent = lazyReactInVue(() => import('./ReactComponent'))
</script>
