function addScopeId(child, hashList) {
  if (!hashList || (hashList instanceof Array && hashList.length === 0)) return child
  if (typeof hashList === 'string') hashList = [hashList]
  child = {...child}
  child.props = {...child.props}
  hashList.forEach((val) => {
    child.props[val] = ''
  })
  return child
}

export default addScopeId
