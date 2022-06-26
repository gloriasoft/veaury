// Sometimes some features and plugins of Vue are really more useful than React.
// Such as beforeEach of vue-router, and pinia.
// So I implemented a factory function called createReactMissVue that returns a React Provider Component and a React hooks.
// With ReactMissVue, you can use Vue's plugins directly in React applications.
// Enjoy it!

import createCrossingProviderForReactInVue from './createCrossingProviderForReactInVue'
import applyVueInReact from './applyVueInReact'
export default function createReactMissVue({useVueInjection, beforeVueAppMount}) {
  let [useReactMissVue, ReactMissVue, ReactMissVueContext] = createCrossingProviderForReactInVue(useVueInjection)
  ReactMissVue = applyVueInReact(ReactMissVue, { beforeVueAppMount })

  return [useReactMissVue, ReactMissVue, ReactMissVueContext]
}
