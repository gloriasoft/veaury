function deepFind(first, getChildren, todo, startIndex = 0, parent) {
    if (todo(first, startIndex, parent) === false) {
        return;
    }
    const children = getChildren(first, startIndex, parent);
    if (children) {
        children.forEach((child, index) => deepFind(child, getChildren, todo, index, first));
    }
}
export default deepFind;
