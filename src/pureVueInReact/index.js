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
      defaultPropsFormatter(props, vueInReactCall, hashList) {
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
