export default function(injectionHook, Component) {
  console.warn(`[veaury warn]: HOC injectPropsFromWrapper is deprecated! Try using 'useInjectPropsFromWrapper' in the options of 'applyReactInVue' or 'applyVueInReact'!`)
  if (typeof injectionHook !== 'function') {
    console.warn(`[veaury warn]: parameter 'injectionHook' is not a function`)
    return Component
  }
  Component.__veauryInjectPropsFromWrapper__ = injectionHook
  return Component
}
