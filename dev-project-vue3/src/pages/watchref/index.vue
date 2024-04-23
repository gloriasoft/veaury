<template>
  <span>Test</span>
  <div>
    <PureBox ref="ddd">
      <div v-if="show === 1" ref="box1">box1 show===1</div>
      <div v-if="show === 2" ref="box1">box1 show===2</div>
    </PureBox>
    <div>
      <div v-if="show === 1" ref="box2">box2 show===1</div>
      <div v-if="show === 2" ref="box2">box2 show===2</div>
    </div>
    <VueBox>
      <div v-if="show === 1" ref="box3">box3 show===1</div>
      <div v-if="show === 2" ref="box3">box3 show===2</div>
    </VueBox>
    <br/>
  </div>
</template>

<script setup lang="jsx">
import {applyPureReactInVue, applyReactInVue} from 'veaury'
import {ref, onMounted, nextTick, watch, getCurrentInstance} from 'vue'
import ReactBox from './react_app/Box'
import VueBox from './VueBox';

const instance = getCurrentInstance()
const PureBox = applyPureReactInVue(ReactBox)

const show = ref(0);

const box1 = ref();
const box2 = ref();
const box3 = ref();

watch(box1, (after, before) => {
  console.log('box1 changed', after, before, box1.value);
});

watch(box2, (after, before) => {
  console.log('box2 changed', after, before, box2.value);
});

watch(box3, (after, before) => {
  console.log('box3 changed', after, before, box3.value);
});

onMounted(() => {
  console.log('box1', box1.value);
  console.log('box2', box2.value);
  console.log('box3', box2.value);
  setTimeout(() => {
    show.value = 1;
  }, 3000);
  setTimeout(() => {
    show.value = 2;
  }, 6000);
});
</script>
