export default function setChildKey(child, children, topIndex) {
  if (child instanceof Array) {
    child = child[0]
  }
  if (child.key == null && children.length > 1) {
    child = {...child}
    child.key = `_key_${topIndex}`
  }
  return child
}
