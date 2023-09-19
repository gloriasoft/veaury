<template>
  <ReactComponentInVue v-if="showFlag"/>
</template>

<script>
import {h, ref, onMounted} from 'vue'
import {applyReactInVue} from 'veaury'
import ReactComponent from "./react_app/ReactUnMount"

export default {
    components: {
        ReactComponentInVue: applyReactInVue(ReactComponent)
    },
    setup() {
        const showFlag = ref(false)
        onMounted(() => {
            setTimeout(() => {
                showFlag.value = false
            }, 1000);
        })

        return {
            showFlag
        }
    }
}
</script>

<style scoped>

</style>
