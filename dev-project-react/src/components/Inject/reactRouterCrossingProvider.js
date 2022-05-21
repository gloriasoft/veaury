// Create a Provider that can get react hooks
// This Provider will be exported as a react component,
// and the vue components in this Provider can get the status of react hooks

import { useLocation, useNavigate } from 'react-router-dom'
import { createCrossingProviderForVueInReact } from 'veaury'

const [useReactRouterForVue, ReactRouterProviderForVue] = createCrossingProviderForVueInReact(function() {
  return {
    location: useLocation(),
    navigate: useNavigate()
  }
})

export {
  useReactRouterForVue,
  ReactRouterProviderForVue
}
