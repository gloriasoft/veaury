<template>
  <AA/>
  <ReactComponentInVue ref="ReactComponentInVue">
    {{refText}}
  </ReactComponentInVue>
  <PureReactComponentInVue>
    <div style="color: red" class="AAA">test pure style</div>
  </PureReactComponentInVue>
</template>

<script setup>
import {onMounted, getCurrentInstance, ref} from 'vue'
import {applyReactInVue, applyPureReactInVue} from 'veaury'
import AAReact from './AA';
import ReactComponent from "./ReactComponent";
const AA = applyReactInVue(AAReact)
const ReactComponentInVue = applyReactInVue(ReactComponent)
const PureReactComponentInVue = applyPureReactInVue(ReactComponent)
const instance = getCurrentInstance()
const refText = ref('')
onMounted(() => {
  if (instance.refs.ReactComponentInVue) {
    refText.value = 'test ref'
  }
})
</script>
