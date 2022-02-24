export default function(ReactInject, VueComponent) {
  if (typeof ReactInject !== 'function') {
    console.warn(`[veaury warn]: parameter 'ReactIntercept' is not a function`)
    return VueComponent
  }
  VueComponent.__veauryReactInject__ = ReactInject
  return VueComponent
}
