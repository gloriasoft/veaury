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
        const showFlag = ref(true)
        onMounted(() => {
            setTimeout(() => {
                showFlag.value = false
            }, 200);
        })

        return {
            showFlag
        }
    }
}
</script>

<style scoped>

</style>
