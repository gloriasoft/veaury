export default function setChildKey(child, children, topIndex) {
  if (child instanceof Array && child.length === 1) {
    child = child[0]
  }
  if (!(child instanceof Array) && child.key == null && children.length > 1) {
    child = {...child}
    child.key = `_key_${topIndex}`
  }
  return child
}
