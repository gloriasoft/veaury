<template>
  <Component :my-prop="dynamicProp" />
  <button data-testid="update-btn" @click="dynamicProp = 'new-value'">update</button>
</template>

<script setup>
import { ref } from 'vue'
import { applyReactInVue } from 'veaury'
import KebabCaseAttrsComponent from './KebabCaseAttrsComponent'

const Component = applyReactInVue(KebabCaseAttrsComponent)
const dynamicProp = ref('value')
</script>
