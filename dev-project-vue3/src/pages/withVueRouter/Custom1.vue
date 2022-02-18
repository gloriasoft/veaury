<template>
  <div style="background: #42b983; padding:10px">
    This is the Custom1 Vue Component.<br/>
    current route path: {{$route.path}}<br/>
    current route query: {{$route.query}}
  </div>
</template>

<script>
export default {
  props: ['zoo'],
  setup({zoo}) {
    return {
      zoo
    }
  }
}
</script>

<style scoped>

</style>
