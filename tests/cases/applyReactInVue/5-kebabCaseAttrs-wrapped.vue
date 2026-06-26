<template>
  <ParentInVue>
    <ChildInVue my-prop="value" another-prop="value" />
  </ParentInVue>
</template>

<script setup>
import { applyReactInVue } from 'veaury'
import KebabCaseAttrsComponent from './KebabCaseAttrsComponent'

const ParentInVue = applyReactInVue(({ children }) => children)
const ChildInVue = applyReactInVue(KebabCaseAttrsComponent)
</script>
