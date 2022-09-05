<template>
  <component :is="() => passingVNode"/>
  <slot/>
</template>

<script setup>
defineProps(['passingVNode'])
</script>
