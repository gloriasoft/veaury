import {h} from 'vue';
import getChildInfo from "./getChildInfo";
import {isTextOwner} from "./isTextChild";
import takeReactDomInVue from "./takeReactDomInVue";
import DirectiveHOC from "./FakeDirective";
import {pureInterceptProps} from "./interceptProps";
import resolveRef from "./resolveRef";
import setChildKey from "../utils/setChildKey";

export default function getDistinguishReactOrVue({reactComponents: Component, domTags, division = true}) {
  return function defaultSlotsFormatter(children, vueInReactCall, hashList) {
    if (children == null) return children
    if (!(children instanceof Array)) children = [children]
    const newChildren = []
    children.forEach((child, topIndex) => {
      // if (!child || child.type === Comment) return
      if (!child.type?.originVueComponent) {
        if (child.__v_isVNode || typeof child === 'string' || typeof child === 'number') {
          newChildren.push(child)
          return
        }
        if (child.type) {
          let newChild = takeReactDomInVue(child, domTags, vueInReactCall, division, defaultSlotsFormatter, children.__top__)
          newChild = setChildKey(newChild, children, topIndex)
          newChildren.push(newChild)
        }
        return
      }
      // vue component in react
      let VueComponent = child.type.originVueComponent

      let newChild
      if (Component !== 'all' && !(Component instanceof Array)) {
        Component = [Component]
      }
      if (Component === 'all' || Component.indexOf(VueComponent) > -1) {
        child = {...child}
        child.__top__ = children.__top__
        const props = getChildInfo(child, `_key_${topIndex}`, vueInReactCall, defaultSlotsFormatter, hashList)

        const ref = resolveRef(child)

        if (child.children) {
          child.children.__top__ = children.__top__
        }

        newChild = h(VueComponent, props)
        // newChild = DirectiveHOC(child,
        //   <ReactComponent {...{...pureInterceptProps(props, child, VueComponent), ...(child.__extraData ? child.__extraData : {}), ...(ref ? {ref} : {})}} />)
      } else {
        newChild = isTextOwner(child) ? child.text : takeVueDomInReact(child, domTags, vueInReactCall, division, defaultSlotsFormatter, hashList)
      }
      newChild = setChildKey(newChild, children, topIndex)
      newChildren.push(newChild)
    })
    return newChildren.length === 1 ? newChildren[0] : newChildren
  }
}
