// TODO
// This function will solve the timing problem of affecting external vue components after modifying the state inside some special react components
const reactComponents = []

export function pureInterceptProps(target = {}, child, ReactComponent) {
  return target

  // if (reactComponents.indexOf(ReactComponent) > -1) {
  //   if (target.onChange && child.__top__) {
  //     const oldChange = target.onChange
  //     target.onChange = function (...args) {
  //       child.__extraData = {
  //         value: args[0].target.value
  //       }
  //       child.__top__.__veaurySyncUpdateProps__({})
  //       child.__top__.macroTaskUpdate = true;
  //       oldChange.apply(this, args)
  //       if (child.__top__) {
  //         Promise.resolve().then(() => {
  //           child.__extraData = null
  //           child.__top__.__veauryMountReactComponent__(true)
  //         })
  //       }
  //     }
  //   }
  // }
  // return target
}
