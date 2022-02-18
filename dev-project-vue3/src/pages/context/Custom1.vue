<template>
  <div style="background: #42b983">
    This is the Custom1 Vue Component.<br/>
    the value of prop 'zoo': {{zoo}}
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
