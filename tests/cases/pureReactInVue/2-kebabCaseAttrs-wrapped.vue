<template>
  <ParentInVue>
    <ChildInVue my-prop="value" another-prop="value" />
  </ParentInVue>
</template>

<script setup>
import { applyPureReactInVue } from 'veaury'
import KebabCaseAttrsComponent from './KebabCaseAttrsComponent'

const ParentInVue = applyPureReactInVue(({ children }) => children)
const ChildInVue = applyPureReactInVue(KebabCaseAttrsComponent)
</script>
