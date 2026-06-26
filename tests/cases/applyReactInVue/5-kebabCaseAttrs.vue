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
import { applyReactInVue } from 'veaury'
import KebabCaseAttrsComponent from './KebabCaseAttrsComponent'

const Component = applyReactInVue(KebabCaseAttrsComponent)
</script>
