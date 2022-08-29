// This HOC is used to solve the problem that when React components are used in Vue components,
// passing children is encapsulated by a div with `style="all:unset"`.
// This HOC will convert the VNode passed to the React component proportionally to the ReactNode.

import transformer from "./transformer";
import getDistinguishReactOrVue from "./getDistinguishReactOrVue";

const NoWrapFunction = getDistinguishReactOrVue({vueComponents: 'all', domTags: 'all'})
export default function applyPureVueInReact(ReactComponent, combinedOption) {
  return transformer(ReactComponent, {
    combinedOption: {
      pureTransformer: true,
      // Custom slot handler
      defaultSlotsFormatter: NoWrapFunction,
      ...combinedOption
    }
  })
}
