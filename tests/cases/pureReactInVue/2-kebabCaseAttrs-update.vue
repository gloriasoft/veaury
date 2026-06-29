<template>
  <Component :my-prop="dynamicProp" />
  <button data-testid="update-btn" @click="dynamicProp = 'new-value'">update</button>
</template>

<script setup>
import { ref } from 'vue'
import { applyPureReactInVue } from 'veaury'
import KebabCaseAttrsComponent from './KebabCaseAttrsComponent'

const Component = applyPureReactInVue(KebabCaseAttrsComponent)
const dynamicProp = ref('value')
</script>
