<template>
  <div>
    <ReactComponent>
      test lazyReactInVue
    </ReactComponent>
    <PureReactComponent>
      test lazyPureReactInVue
    </PureReactComponent>
  </div>

</template>

<script setup>
import {lazyReactInVue, lazyPureReactInVue} from 'veaury'
const ReactComponent = lazyReactInVue(() => import('./ReactComponent'))
const PureReactComponent = lazyPureReactInVue(() => import('./ReactComponent'))
</script>
