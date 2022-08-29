export default function resolveRef(child) {

  let ref = child.ref
  if (ref) {
    if (typeof ref === 'object') {
      ref = (r) => { child.ref.current = r }
      return ref
    }
    if (typeof ref === 'function') {
      return ref
    }
  }
}
