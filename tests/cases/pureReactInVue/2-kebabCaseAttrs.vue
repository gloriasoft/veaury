<template>
  <Component
    my-prop="value"
    another-prop="value"
    aria-label="value"
    data-foo="value"
    already-camel="value"
  />
</template>

<script setup>
import { applyPureReactInVue } from 'veaury'
import KebabCaseAttrsComponent from './KebabCaseAttrsComponent'

const Component = applyPureReactInVue(KebabCaseAttrsComponent)
</script>
