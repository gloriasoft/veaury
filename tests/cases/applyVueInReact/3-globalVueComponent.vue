<template>
  <component :is="() => passingVNode"/>
</template>

<script setup>
defineProps(['passingVNode'])
</script>
