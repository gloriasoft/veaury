import {h} from 'vue';
import {formatClass, formatStyle} from './reactStyleClassTransformer'
import resolveRef from "./resolveRef";

function takeReactDomInVue(child, tags, reactInVueCall, division, slotsFormatter, __top__) {
  if (tags !== 'all' && !(tags instanceof Array)) {
    tags = tags ? [tags] : []
  }

  if (typeof child.type === 'string' && (tags === 'all' || tags.indexOf(child.type) > -1)) {

    // Resolve ref
    let ref = resolveRef(child)

    const {style, class: className, children, ...otherProps} = child.props || {}
    const props = {
      ...otherProps,
      style: formatStyle(style),
      className: Array.from(new Set(formatClass(className))).join(' '),
      ...(ref ? {ref} : {})
    }
    let newChildren = children
    if (newChildren) {
      if (["string", "number"].indexOf(typeof newChildren) > -1) {
        newChildren = [newChildren]
      } else {
        newChildren = [...newChildren]
      }
      newChildren.__top__ = __top__
    }

    return h(child.type, props, slotsFormatter(newChildren, reactInVueCall))
    // return <child.type {...props}>{slotsFormatter(newChildren, reactInVueCall)}</child.type>
  }
  return reactInVueCall([child], null, division)
}

export default takeReactDomInVue
