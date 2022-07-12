import { Text } from 'vue'

export function isTextOwner(child) {
    return child.type === Text
}
