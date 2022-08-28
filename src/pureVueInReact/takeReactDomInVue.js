import {h} from 'vue';
import {Fragment} from "react";
import {formatClass, formatStyle} from '../utils/styleClassTransformer'
import resolveRef from "./resolveRef";

function takeReactDomInVue(child, tags, reactInVueCall, division, slotsFormatter, __top__) {
  if (tags !== 'all' && !(tags instanceof Array)) {
    tags = tags ? [tags] : []
  }

  if (child.type === Fragment) {
    return slotsFormatter(child.props?.children, reactInVueCall)
  }
  if (typeof child.type === 'string' && (tags === 'all' || tags.indexOf(child.type) > -1)) {

    // Resolve ref
    let ref = resolveRef(child)

    const {style, class: className, children, ...otherProps} = child.props || {}
    const cleanClassName = Array.from(new Set(formatClass(className))).join(' ')
    const cleanStyle = formatStyle(style)
    let props = {
      ...otherProps,
      ...Object.keys(cleanStyle).length === 0 ? {}: {style: cleanStyle},
      ...cleanClassName? {className: cleanClassName}: {},
      ...(ref ? {ref} : {})
    }
    if (Object.keys(props).length === 0) {
      props = null
    }
    let newChildren = children
    if (newChildren) {
      if (["string", "number"].indexOf(typeof newChildren) > -1) {
        newChildren = [newChildren]
      } else {
        if (newChildren instanceof Array) {
          newChildren = [...newChildren]
        } else {
          newChildren = {...newChildren}
        }
      }
      newChildren.__top__ = __top__
    }

    return h(child.type, props, slotsFormatter(newChildren, reactInVueCall))
  }
  return reactInVueCall([child], null, division)
}

export default takeReactDomInVue
