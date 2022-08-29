import {formatClass, formatStyle} from '../utils/styleClassTransformer'
import { transferSlots } from '../applyVueInReact'
import parseVModel from '../utils/parseVModel'
import options from "../options";

export default function getChildInfo(child, index, reactInVueCall, defaultSlotsFormatter, hashList) {

  // Filter out ref
  let {ref, children, 'v-slots': slots = {}, ...props} = child.props || {}

  if (children) {
    if (typeof children === 'object' && !(children instanceof Array) && !children.$$typeof) {
      slots = children
    } else {
      slots.default = children
    }
    // slots = transferSlots(slots)
  }


  let vueSlots = null
  Object.keys(slots || {}).forEach((key) => {
    let slot = slots[key]
    if (!vueSlots) vueSlots = {}
    vueSlots[key] = function (...args) {
      if (typeof slot === 'function') {
        slot = slot.apply(this, args)
      }
      // slot.__vueArgs = args
      return defaultSlotsFormatter(slot, reactInVueCall, hashList)
    }
  })

  const newProps = {}
  const style = formatStyle(props.style)
  const className = Array.from(new Set(formatClass(props.className))).join(' ')
  if (Object.keys(style).length > 0) newProps.style = style
  if (className !== '') newProps.class = className

  Object.assign(props, {
    ...newProps
  })
  delete props.className

  props = parseVModel(props)
  return { props, slots: vueSlots }
}
