import { Text } from 'vue'

// export default function isTextChild(child) {
//     const children = child.componentOptions.children
//     return !children || !children[0]?.tag && children[0]?.text && children.length === 1
// }

export function isTextOwner(child) {
    return child.type === Text
}
