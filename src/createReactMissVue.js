// Sometimes some features and plugins of Vue are really more useful than React.
// Such as keep-alive, beforeEach of vue-router, pinia.
// So I implemented a factory function called createReactMissVue that returns a React context and a React hooks.
// With ReactMissVue, you can use Vue's plugins directly in React applications.

import createCrossingProviderForReactInVue from './createCrossingProviderForReactInVue'
import applyVueInReact from './applyVueInReact'
function createReactMissVue({vueInjection, beforeVueAppMount}) {

}
