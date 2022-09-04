// Create a Provider that can get react hooks
// This Provider will be exported as a react component,
// and all of the vue components in this Provider can get the status of react hooks

import { useLocation, useNavigate } from 'react-router-dom'
import { createCrossingProviderForVueInReact } from 'veaury'

// Execute 'useReactRouterForVue' in the setup function of the vue component to get the object returned by the incoming function
const [useReactRouterForVue, ReactRouterProviderForVue] = createCrossingProviderForVueInReact(
  // This incoming function can execute react hooks
  function() {
    return {
      location: useLocation(),
      navigate: useNavigate()
    }
  }
)

export {
  useReactRouterForVue,
  ReactRouterProviderForVue
}
