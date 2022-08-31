<template>
  <AA/>
</template>

<script setup>
import * as Vue from 'vue'
import {applyReactInVue} from 'veaury'
import AAReact from './AA';
const AA = applyReactInVue(AAReact)
</script>
