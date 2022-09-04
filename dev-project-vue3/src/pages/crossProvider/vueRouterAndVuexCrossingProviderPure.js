// Create a Provider that can get hooks of vue
// This Provider will be exported as a vue component,
// and the react components in this Provider can get the status of vue hooks

import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import {createCrossingProviderForPureReactInVue} from 'veaury'

const [useVueHooksInReact, ProviderInVuePure] = createCrossingProviderForPureReactInVue(function() {
  return {
    vuex: useStore(),
    vueRoute: useRoute(),
    vueRouter: useRouter()
  }
})

export {
  useVueHooksInReact,
  ProviderInVuePure
}
