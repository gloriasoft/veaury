export default function isTextChild(child: any): any {
    const children = child.componentOptions.children
    return !children || !children[0]?.tag && children[0]?.text && children.length === 1
}

export function isTextOwner(child: any): any {
    return !child?.tag && child?.text
}
