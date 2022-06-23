// Sometimes some features and plugins of Vue are really more useful than React.
// Such as keep-alive, beforeEach of vue-router, pinia.
// So I implemented a factory function called createReactMissVue that returns a React Provider Component and a React hooks.
// With ReactMissVue, you can use Vue's plugins directly in React applications.

import createCrossingProviderForReactInVue from './createCrossingProviderForReactInVue'
import applyVueInReact from './applyVueInReact'
export default function createReactMissVue({vueInjection, beforeVueAppMount}) {
  let [useReactMissVue, ReactMissVue, reactContext] = createCrossingProviderForReactInVue(vueInjection)
  ReactMissVue = applyVueInReact(ReactMissVue, { beforeVueAppMount })

  return [useReactMissVue, ReactMissVue, reactContext]
}
