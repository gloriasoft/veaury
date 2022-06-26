import { defineStore, createPinia } from 'pinia'
import { createRouter, createWebHashHistory, useRouter, useRoute } from 'vue-router'
import { createReactMissVue, applyReactInVue } from 'veaury'

// create vue-router instance
const router = createRouter({
  // Using vue-router inside route 'ReactMissVue'
  history: createWebHashHistory('/#/ReactMissVue'),
  routes: [
    {
      name: '',
      path: '/aaa',
      component: applyReactInVue(() => <div className="vue-component">react use vue-router<br/>path: /aaa</div>)
    },
    {
      name: 'empty',
      path: '/:default(.*)',
      component: applyReactInVue(() => <div className="vue-component">react use vue-router<br/>empty</div>)
    },
  ],
})

// Yes, that's what vue-router has a charm over react-router
router.beforeEach((to, from, next) => {
  console.log('The beforeEach hook of vue-router is triggered!', to, from)
  next()
})

// create a pinia store
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
// create a pinia store
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

// create a ReactMissVue instance
let [useReactMissVue, ReactMissVue] = createReactMissVue({
  useVueInjection() {
    // This object can be obtained by using useReactMissVue in the react component
    return {
      fooStore: useFooStore(),
      barStore: useBarStore(),
      vueRouter: useRouter(),
      vueRoute: useRoute()
    }
  },
  // beforeVueAppMount can only be used in the outermost ReactMissVue
  // Because veaury will only create a vue application in the outermost layer
  beforeVueAppMount(app) {
    // register pinia
    app.use(createPinia())
    // register vue-router
    app.use(router)
  }
})

export {
  useReactMissVue,
  ReactMissVue
}
