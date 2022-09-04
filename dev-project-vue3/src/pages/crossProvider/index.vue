<template>
  <h3>
    This example shows the basic usage of `createCrossingProviderForPureReactInVue`.
  </h3>
  <h4>
    Using React components in Vue components.
  </h4>
  <ProviderInVue>
    <Basic/>
  </ProviderInVue>
  <ProviderInVuePure>
    <BasicPure/>
  </ProviderInVuePure>
</template>

<script>
import { applyPureReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import ReactBasicPure from "./react_app/BasicPure"
import {ProviderInVue} from "./vueRouterAndVuexCrossingProvider";
import {ProviderInVuePure} from "./vueRouterAndVuexCrossingProviderPure";

export default {
  components: {
    ProviderInVue,
    ProviderInVuePure,
    Basic: applyPureReactInVue(ReactBasic),
    BasicPure: applyPureReactInVue(ReactBasicPure)
  },
  mounted() {
    // console.log(11111, this.$refs.aaa)

  }
}
</script>

<style scoped>
.slot {
  background: aquamarine;
  padding: 10px;
  margin: 10px;
}
</style>
