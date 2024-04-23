// The VNode internal properties, ref: {i: instance, r: ref_key}
// TODO: ref for

import couldBeClass from "../utils/couldBeClass";

export default function resolveRef(child, children) {
  if (typeof child.type?.originReactComponent === 'function' && !couldBeClass(child.type?.originReactComponent)) {
    return null
  }
  let ref = child.ref?.r
  if (ref && typeof ref === 'string') {
    const refKey = ref
    ref = (reactRef) => {
      if (child.ref.i.refs) {
        // object is not extensible, so reassign the whole object
        const $refs = {...child.ref.i.refs}
        $refs[refKey] = reactRef
        child.ref.i.refs = $refs
      }
      // composition api ref variable exists
      const refObj = child.ref.i.setupState?.[refKey]
      if (child.ref.i.setupState && refKey in child.ref.i.setupState) {
        child.ref.i.setupState[refKey] = reactRef
      }

      if (!reactRef) return
      reactRef.__syncUpdateProps = function (newExtraData = {}) {
        if (!children.__top__) return
        child.__extraData = newExtraData
        children.__top__.__syncUpdateProps({})
      }
    }
    const oldRef= ref
    ref = new Proxy(oldRef, {
      get(target, key) {
        return target[key]
      },
      set(target, key, value) {
        if (child.ref.i.refs && refKey in child.ref.i.refs) {
          const $refs = {...child.ref.i.refs}
          $refs[key] = value
          child.ref.i.refs = $refs
        }
        return value
      }
    })
  }
  return ref
}
