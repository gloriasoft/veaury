<template>
  <div>
    <ReactComponent>
      test lazyReactInVue
    </ReactComponent>
    <PureReactComponent>
      test lazyPureReactInVue
    </PureReactComponent>
    <ReactComponent1>
      lazyReactInVue loader options
    </ReactComponent1>
    <PureReactComponent1>
      lazyPureReactInVue loader options
    </PureReactComponent1>
  </div>

</template>

<script setup>
import {lazyReactInVue, lazyPureReactInVue} from 'veaury'
const ReactComponent = lazyReactInVue(() => import('./ReactComponent'))
const PureReactComponent = lazyPureReactInVue(() => import('./ReactComponent'))
const ReactComponent1 = lazyReactInVue({
  loader: () => import('./ReactComponent')
})
const PureReactComponent1 = lazyPureReactInVue({
  loader: () => import('./ReactComponent')
})
</script>
