<template>
  <h3>
    Import async React components using 'lazyReactInVue'.
  </h3>
  <Basic :foo="foo">
    <div class="slot">
      This is the Vue default slot
      <div>
        current time: {{currentTime}}
      </div>
    </div>
  </Basic>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { lazyReactInVue } from 'veaury'


export default {
  components: {
    // import an async React component
    // It is also possible to use the full parameter of the Vue3 API 'defineAsyncComponent'
    // for example: lazyReactInVue({ loader: () => import('./react_app/Basic'), timeout: 3000 })
    Basic: lazyReactInVue(() => import('./react_app/Basic'))
  },
  setup() {
    let timer
    const currentTime = ref(new Date().toLocaleString())
    const foo = ref(Math.random())
    onMounted(() => {
      timer = setInterval(() => {
        currentTime.value = new Date().toLocaleString()
        foo.value = Math.random()
      }, 1000)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return {
      currentTime,
      foo
    }
  }
}
</script>

<style scoped>
.slot {
  background: aquamarine;
  padding: 10px;
  margin: 10px;
}
</style>
