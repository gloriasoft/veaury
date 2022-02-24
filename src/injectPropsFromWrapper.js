export default function(injectionHook, Component) {
  if (typeof injectionHook !== 'function') {
    console.warn(`[veaury warn]: parameter 'injectionHook' is not a function`)
    return Component
  }
  Component.__veauryInjectPropsFromWrapper__ = injectionHook
  return Component
}
