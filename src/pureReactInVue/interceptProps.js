// This function will solve the timing problem of affecting external vue components after modifying the state inside some special react components
export function pureInterceptProps(target = {}, child, ReactComponent) {
  if (ReactComponent.__syncUpdateForPureReactInVue) {
    Object.keys(ReactComponent.__syncUpdateForPureReactInVue).map((key) => {
      if (target[key] && typeof target[key] === 'function' && child.__top__) {
        const oldFun = target[key]
        target[key] = function(...args) {
          child.__extraData = ReactComponent.__syncUpdateForPureReactInVue[key].apply(this, args)
          child.__top__.__veaurySyncUpdateProps__({})
          child.__top__.macroTaskUpdate = true;
          oldFun.apply(this, args)
          if (child.__top__) {
            Promise.resolve().then(() => {
              child.__extraData = null
              child.__top__.__veauryMountReactComponent__(true)
            })
          }
        }
      }
    })
  }
  return target
}
