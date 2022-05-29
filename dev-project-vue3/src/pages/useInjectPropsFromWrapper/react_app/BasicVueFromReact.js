import {toRef} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {applyReactInVue} from 'veaury'

// This React component will be used in the Vue app and needs to use the vue-router and vuex hooks

// setup mode
function VueInjectionHookInSetupMode(vueProps) {
  // Vue hooks can be used in this function
  // This function will be called in the 'setup' hook of the Vue wrapper component
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  // The returned object will be passed to the React component as props
  return {
    // you need to manually convert to proxy with 'setup' mode
    // otherwise it will not be responsive
    fullPath: toRef(route, 'fullPath'),
    count: toRef(store.state, 'count'),
    changeQuery: () => router.replace({
      query: {
        a: Math.random()
      }
    }),
    incrementCount: () => store.dispatch('increment')
  }
}

// computed mode
function VueInjectionHookInComputedMode(vueProps) {
  // The context of the function is binding with the proxy from the 'getCurrentInstance' hook
  // Returning a function represents the computed of the options api
  // All logic code should be written in this computed function.
  // The lifecycle cannot be used in this function. If you want to use the lifecycle, you can only use the 'setup' mode
  return function computedFunction() {
    return {
      fullPath: this.$route.fullPath,
      count: this.$store.state.count,
      changeQuery: () => this.$router.replace({
        query: {
          a: Math.random()
        }
      }),
      incrementCount: () => this.$store.dispatch('increment')
    }
  }
}

function ReactComponent (props) {
  return (<div>
    This is the React Component
    <span>
      the path info from 'vue-router': <span style={{fontWeight: 'bold'}}>{props.fullPath}</span><br/>
      the count from 'vuex': <span style={{fontWeight: 'bold'}}>{props.count}</span>
    </span><br/>
    <button onClick={props.changeQuery}>change query</button> <button onClick={props.incrementCount}>increment count</button>
  </div>)
}

// Vue's injection function has two modes: 'setup' and 'computed'.
// Refer to the case of the above two injection function types.
// Also try replacing the option injectPropsFromWrapper with 'VueInjectionHookInComputedMode'
export default applyReactInVue(ReactComponent, {
  useInjectPropsFromWrapper: VueInjectionHookInSetupMode
})
