function deepFind (first: any, getChildren: (child: any, index?: number, parent?: any) => any[], todo: (child: any, index?: number, parent?: any) => any, startIndex: number = 0, parent?: any): any {
    if (todo(first, startIndex, parent) === false) {
        return
    }
    const children = getChildren(first, startIndex, parent)
    if (children) {
        children.forEach((child, index) => deepFind(child, getChildren, todo, index, first))
    }
}
export default deepFind
