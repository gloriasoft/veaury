import {h} from 'vue';
import getChildInfo from "./getChildInfo";
import takeReactDomInVue from "./takeReactDomInVue";
import resolveRef from "./resolveRef";
import {VueContainer} from "../applyVueInReact";

export default function getDistinguishReactOrVue({vueComponents: Component, domTags, division = true}) {
  return function defaultSlotsFormatter(children, reactInVueCall) {
    if (children == null) return children
    if (!(children instanceof Array)) children = [children]
    let newChildren = []
    children.forEach((child, topIndex) => {
      // if (!child || child.type === Comment) return
      if (!child.type?.originVueComponent && child.type !== VueContainer) {
        if (child.__v_isVNode || typeof child === 'string' || typeof child === 'number') {
          newChildren.push(child)
          return
        }
        if (child.type) {
          let newChild = takeReactDomInVue(child, domTags, reactInVueCall, division, defaultSlotsFormatter, children.__top__)
          newChildren.push(newChild)
        }
        return
      }
      // vue component in react
      let VueComponent = child.type.originVueComponent

      if (child.type === VueContainer) {
        if (child.props.component) {
          VueComponent = child.props.component
          child = {...child}
          const props = {...child.props}
          delete props.component
          child.props = props
        } else {
          newChildren.push(child.props.node)
          return
        }
      }

      let newChild
      if (Component !== 'all' && !(Component instanceof Array)) {
        Component = [Component]
      }
      if (Component === 'all' || Component.indexOf(VueComponent) > -1) {
        child = {...child}
        child.__top__ = children.__top__
        const { props, slots } = getChildInfo(child, `_key_${topIndex}`, reactInVueCall, defaultSlotsFormatter)

        const ref = resolveRef(child)

        if (child.children) {
          child.children.__top__ = children.__top__
        }

        newChild = h(VueComponent, {...props}, slots)
      } else {
        newChild = takeReactDomInVue(child, domTags, reactInVueCall, division, defaultSlotsFormatter)
      }
      newChildren.push(newChild)
    })
    newChildren = newChildren.flat(Infinity)
    return newChildren.length === 1 ? newChildren[0] : newChildren
  }
}
