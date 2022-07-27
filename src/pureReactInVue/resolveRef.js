// The VNode internal properties, ref: {i: instance, r: ref_key}
// TODO: ref for

import couldBeClass from "../utils/couldBeClass";

export default function resolveRef(child) {
  if (typeof child.type?.originReactComponent === 'function' && !couldBeClass(child.type?.originReactComponent)) {
    return null
  }
  let ref = child.ref?.r
  if (ref && typeof ref === 'string') {
    const refKey = ref
    ref = (reactRef) => {
      if (!reactRef) return
      if (child.ref.i.refs) {
        // object is not extensible, so reassign the whole object
        const $refs = {...child.ref.i.refs}
        $refs[refKey] = reactRef
        child.ref.i.refs = $refs
      }
      // composition api ref variable exists
      const refObj = child.ref.i.setupState?.[refKey]
      if (refObj !== undefined) {
        child.ref.i.setupState[refKey] = reactRef
      }
    }
    const oldRef= ref
    ref = new Proxy(oldRef, {
      get(target, key) {
        return target[key]
      },
      set(target, key, value) {
        if (child.ref.i.refs?.[refKey]) {
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
