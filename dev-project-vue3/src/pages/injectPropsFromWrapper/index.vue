<template>
  <h3>
    This example shows the basic usage of `createCrossingProviderForReactInVue`.
  </h3>
  <h4>
    Using React components in Vue components.
  </h4>
  <ProviderInVue>
    <Basic/>
  </ProviderInVue>
</template>

<script>
import { applyReactInVue } from 'veaury'
// This is a React Component
import ReactBasic from "./react_app/Basic"
import {ProviderInVue} from "./react_app/CrossProvider";

export default {
  components: {
    ProviderInVue,
    Basic: applyReactInVue(ReactBasic),
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
