// This HOC is used to solve the problem that when React components are used in Vue components,
// passing children is encapsulated by a div with `style="all:unset"`.
// This HOC will convert the VNode passed to the React component proportionally to the ReactNode.

import transformer from "./transformer";
import getDistinguishReactOrVue from "./getDistinguishReactOrVue";

const NoWrapFunction = getDistinguishReactOrVue({reactComponents: 'all', domTags: 'all'})
export default function applyPureReactInVue (ReactComponent, combinedOption) {
  return transformer(ReactComponent, {combinedOption: {
      pureTransformer: true,
      // Custom slot handler
      defaultSlotsFormatter: NoWrapFunction,
      // This function will be called by the react container component using call(this,...)
      defaultPropsFormatter(props, vueInReactCall, hashList) {

        // When some react components are doing two-way binding, the status update will be out of sync, such as the input component
        // Use internal synchronization updates to solve this problem
        if (ReactComponent.__syncUpdateForPureReactInVue) {
          Object.keys(ReactComponent.__syncUpdateForPureReactInVue).map((key) => {
            if (props[key] && typeof props[key] === 'function') {
              const __veauryVueWrapperRef__ = this.__veauryVueWrapperRef__
              const oldFun = props[key]
              props[key] = function(...args) {
                __veauryVueWrapperRef__.__veaurySyncUpdateProps__(ReactComponent.__syncUpdateForPureReactInVue[key].apply(this, args))
                oldFun.apply(this, args)
                __veauryVueWrapperRef__.macroTaskUpdate = true
                __veauryVueWrapperRef__.__veauryMountReactComponent__(true, true, {})
              }
            }
          })
        }

        const newProps = {}
        Object.keys(props).forEach((key) => {
          let slot = props[key]
          if (!slot) return
          if (slot.vueFunction) {

            newProps[key] = function (...args) {
              return NoWrapFunction(slot.vueFunction.apply(this, args), vueInReactCall, hashList)
            }
            // Override the length of the input parameter of the function
            Object.defineProperty(newProps[key], 'length', {
              get() {
                return slot.vueFunction.length
              }
            })
            return
          }
          if (slot.vueSlot) {
            newProps[key] = NoWrapFunction(slot.vueSlot, vueInReactCall, hashList)
          }
        })
        return Object.assign(props, newProps)
      },
      ...combinedOption
    }
  })
}
