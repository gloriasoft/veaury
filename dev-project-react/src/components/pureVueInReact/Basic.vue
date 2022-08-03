<template>
  <div class="vue-component">
    {{getRandom()}}
    <h3>This is the Vue Component.</h3>
    <button @click="() => {changeAa(); bb()}">
      {{aa}}
    </button><br/>
<!--    received foo's value: {{$attrs.foo}}-->
    <slot/>
  </div>
</template>
<script>
export default {
  props: ['aa', 'bb'],
  emits: ['update:aa'],
  methods: {
    getRandom() {
      return Math.random()
    },
    changeAa() {
      this.$emit('update:aa', Math.random())
    }
  },
  updated() {
    console.log(9999, this)
  },
  mounted() {
    console.log('Basic mounted!!!!', this)
  },
  watch: {
    $attrs: {
      // deep: true,
      handler(nv, ov) {
        console.log('attrs update')
      }
    },
    aa: {
      deep: true,
      handler(nv, ov) {
        console.log('aa update')
      }
    },
    $slots: {
      deep: true,
      handler(nv, ov) {
        console.log('slot update')
      }
    }
  }

}
</script>
<style scoped>
.bbb{}
</style>
