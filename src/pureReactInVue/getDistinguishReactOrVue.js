import React, {forwardRef} from 'react';
import getChildInfo from "./getChildInfo";
import {isTextOwner} from "./isTextChild";
import takeVueDomInReact from "./takeVueDomInReact";
import DirectiveHOC from "./FakeDirective";
import {pureInterceptProps} from "./interceptProps";
import resolveRef from "./resolveRef";
import {Comment} from 'vue'
import addScopeId from "./addScopeId";
import setChildKey from "../utils/setChildKey";

export default function getDistinguishReactOrVue({reactComponents: Component, domTags, division = true}) {
  return function defaultSlotsFormatter(children, vueInReactCall, hashList) {
    if (children && children.forEach) {
      const newChildren = []
      children.forEach((child, topIndex) => {
        if (!child || child.type === Comment) return
        if (!child.type?.originReactComponent) {

          // reactNode
          if (child.$$typeof || typeof child === 'string' || typeof child === 'number') {
            newChildren.push(child)
            return
          }
          if (isTextOwner(child)) {
            child.children.trim() !== '' && newChildren.push(child.children.trim())
            return
          }
          if (child.type) {
            let newChild = takeVueDomInReact(child, domTags, vueInReactCall, division, defaultSlotsFormatter, hashList, children.__top__)
            newChild = setChildKey(newChild, children, topIndex)
            addScopeId(newChild, child.scopeId)
            newChildren.push(newChild)
          }
          return
        }
        // react component in vue
        let ReactComponent = child.type.originReactComponent

        let newChild
        if (Component !== 'all' && !(Component instanceof Array)) {
          Component = [Component]
        }
        if (Component === 'all' || Component.indexOf(ReactComponent) > -1) {
          child.__top__ = children.__top__
          const props = getChildInfo(child, `_key_${topIndex}`, vueInReactCall, defaultSlotsFormatter, hashList)

          const ref = resolveRef(child)

          if (child.children) {
            child.children.__top__ = children.__top__
          }

          newChild = DirectiveHOC(child,
            <ReactComponent {...{...pureInterceptProps(props, child, ReactComponent), ...(child.__extraData ? child.__extraData : {}), ...(ref ? {ref} : {})}} />)
        } else {
          newChild = isTextOwner(child) ? child.text : takeVueDomInReact(child, domTags, vueInReactCall, division, defaultSlotsFormatter, hashList)
        }
        newChild = setChildKey(newChild, children, topIndex)
        addScopeId(newChild, child.scopeId)
        newChildren.push(newChild)
      })
      return newChildren.length === 1 ? newChildren[0] : newChildren
    }
    return children
  }
}
