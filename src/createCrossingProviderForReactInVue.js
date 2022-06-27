import * as React from "react"
import { createContext, useContext } from "react"
import applyReactInVue from "./applyReactInVue"

export default function createCrossingProviderForReactInVue(vueInjection) {
  const reactContext = createContext({})
  const ProviderInVue = applyReactInVue(function ({children, ...props}) {
    return <reactContext.Provider value={{
      ...props
    }}>
      {children}
    </reactContext.Provider>
  }, {
    useInjectPropsFromWrapper: vueInjection
  })
  function useVueHooksInReact() {
    return useContext(reactContext)
  }
  return [useVueHooksInReact, ProviderInVue, reactContext]
}
