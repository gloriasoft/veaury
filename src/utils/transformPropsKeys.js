import toCamelCase from './toCamelCase'

export default function transformPropsKeys(props) {
  if (!props) return props
  const result = {}
  for (const [key, value] of Object.entries(props)) {
    if (!key.includes('-') || key.startsWith('aria-') || key.startsWith('data-')) {
      result[key] = value
    } else {
      result[toCamelCase(key)] = value
    }
  }
  return result
}
