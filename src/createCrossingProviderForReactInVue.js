import * as React from "react"
import { createContext, useContext } from "react"
import applyReactInVue from "./applyReactInVue"

export default function createCrossingProviderForReactInVue(vueInjection) {
  const reactContext = createContext({})
  const ProviderInVue = applyReactInVue(function ({children, ...props}) {
    return <context.Provider value={{
      ...props
    }}>
      {children}
    </context.Provider>
  }, {
    useInjectPropsFromWrapper: vueInjection
  })
  function useVueHooksInReact() {
    return useContext(reactContext)
  }
  return [useVueHooksInReact, ProviderInVue, reactContext]
}
