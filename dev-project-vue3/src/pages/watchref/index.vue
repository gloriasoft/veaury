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
    <PureBox>
      <PureBox v-if="show === 1" ref="box4">box4 show===1</PureBox>
      <PureBox v-if="show === 2" ref="box4">box4 show===2</PureBox>
    </PureBox>
    <PureBox v-if="show === 1" ref="box5">box5 show===1</PureBox>
    <PureBox v-if="show === 2" ref="box5">box5 show===2</PureBox>
  </div>
</template>

<script setup lang="jsx">
import {applyPureReactInVue, applyReactInVue} from 'veaury'
import {getCurrentInstance, onMounted, ref, watch} from 'vue'
import ReactBox from './react_app/Box'
import VueBox from './VueBox';

const instance = getCurrentInstance()
const PureBox = applyReactInVue(ReactBox)

const show = ref(0);

const box1 = ref();
const box2 = ref();
const box3 = ref();
const box4 = ref();
const box5 = ref();

watch(box1, (after, before) => {
  console.log('box1 changed', after, before, box1.value);
});

watch(box2, (after, before) => {
  console.log('box2 changed', after, before, box2.value);
});

watch(box3, (after, before) => {
  console.log('box3 changed', after, before, box3.value);
});

watch(box4, (after, before) => {
  console.log('box4 changed', after, before, box4.value);
});

watch(box5, (after, before) => {
  console.log('box5 changed', after, before, box5.value);
});

onMounted(() => {
  console.log('box1', box1.value);
  console.log('box2', box2.value);
  console.log('box3', box2.value);
  console.log('box4', box4.value);
  console.log('box5', box5.value);
  setTimeout(() => {
    show.value = 1;
  }, 3000);
  setTimeout(() => {
    show.value = 2;
  }, 6000);
});
</script>
