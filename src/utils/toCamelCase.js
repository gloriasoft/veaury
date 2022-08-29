export default function toCamelCase(val) {
  const reg = /-(\w)/g
  return val.replace(reg, ($, $1) => $1.toUpperCase())
}
