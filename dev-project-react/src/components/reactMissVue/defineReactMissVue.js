// Create a Provider that can get react hooks
// This Provider will be exported as a react component,
// and all of the vue components in this Provider can get the status of react hooks

import { defineStore, createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import { h } from 'vue'
import { createCrossingProviderForReactInVue, applyVueInReact, applyReactInVue } from 'veaury'

function TestReact2() {
  return 333333
}

const router = createRouter({
  history: createWebHashHistory('/#/ReactMissVue/'),
  routes: [
    {
      name: 'aaa111',
      path: '/aaa',
      component: applyReactInVue(TestReact2)
    },
    {
      name: 'empty',
      path: '/:default(.*)',
      component: applyReactInVue(() => <div>empty</div>)
    },
  ],
})


const useFooStore = defineStore({
  id: 'foo',
  state() {
    return {
      name: 'Eduardo'
    }
  },
  actions: {
    changeName(name) {
      this.$patch({
        name
      })
    }
  }
})
const useBarStore = defineStore({
  id: 'bar',
  state() {
    return {
      name: 'Italy'
    }
  },
  actions: {
    changeName(name) {
      this.$patch({
        name
      })
    }
  }
})

// Execute 'useReactRouterForVue' in the setup function of the vue component to get the object returned by the incoming function
let [useReactMissVue, ReactMissVue] = createCrossingProviderForReactInVue(
  // This incoming function can execute react hooks
  function() {
    return {
      fooStore: useFooStore(),
      barStore: useBarStore()
    }
  }
)

ReactMissVue = applyVueInReact(ReactMissVue, {
  beforeVueAppMount(app) {
    app.use(createPinia())
    app.use(router)
  }
})
export {
  useReactMissVue,
  ReactMissVue
}
