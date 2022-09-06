import * as React from "react";
import Random from "../utils/getRandomId";
const random = new Random()
export default function DirectiveHOC(VNode, ReactNode) {
  if (VNode.dirs?.length > 0) {
    return <FakeDirective vnode={VNode}>{ReactNode}</FakeDirective>
  }
  return ReactNode
}

// Fake Vue's directive
class FakeDirective extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevVnode: null,
      savedDirectives: [],
      ref: null,
      prevProps: props
    }
  }

  findDirectiveName({dir}) {
    let savedIndex = -1
    let savedDirectiveBinding = this.state.savedDirectives.find((n, index) => {
      if (n.dir === dir) {
        savedIndex = index
        return true
      }
    })
    return [savedDirectiveBinding, savedIndex]
  }

  doDirective() {
    let {savedDirectives, ref} = this.state
    // get el
    if (!ref) {
      const fiber = this._reactInternals || this._reactInternalFiber
      ref = fiber.child
      while (ref && ref.tag !== 5) {
        ref = ref.child
      }
      if (!ref) return
      ref = ref.stateNode
    }
    const {vnode} = this.props
    const directives = vnode.dirs
    if (!directives) return
    directives.forEach((directiveBinding) => {
      if (!directiveBinding) return
      const [savedDirectiveBinding, savedIndex] = this.findDirectiveName(directiveBinding)

      // All hooks of vue3's directive
      // These hooks will be mapped to the life cycle of the react component
      const {created, beforeMount, mounted, beforeUpdate, updated} = directiveBinding.dir

      // created, beforeMount, mounted
      if (!savedDirectiveBinding) {
        savedDirectives.push(directiveBinding)
        const directiveHookArgs = [ref, directiveBinding, vnode, null]
        created?.apply(null, directiveHookArgs)
        beforeMount?.apply(null, directiveHookArgs)
        mounted?.apply(null, directiveHookArgs)
        // set oldValue
        directiveBinding.oldValue = directiveBinding.value
        return
      }
      // beforeUpdate, updated
      savedDirectives[savedIndex] = {
        ...savedDirectiveBinding, ...directiveBinding,
        oldValue: savedDirectiveBinding.oldValue
      }
      const directiveHookArgs = [ref, savedDirectives[savedIndex], vnode, this.state.prevVnode]
      beforeUpdate?.apply(null, directiveHookArgs)
      updated?.apply(null, directiveHookArgs)
      // set oldValue
      savedDirectives[savedIndex].oldValue = directiveBinding.value
    })
    this.setState({
      prevVnode: {...vnode},
      savedDirectives,
      ref
    })
  }

  componentDidMount() {
    this.doDirective()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.vnode === this.props.vnode) return
    this.doDirective()
  }

  componentWillUnmount() {
    const {vnode} = this.props
    const {savedDirectives, ref, prevVnode} = this.state
    const directives = vnode.dirs
    if (!directives) return
    directives.forEach((directiveBinding) => {
      if (!directiveBinding) return
      const [savedDirectiveBinding, savedIndex] = this.findDirectiveName(directiveBinding)
      if (!savedDirectiveBinding) return

      const {beforeUnmount, unmounted} = directiveBinding.dir

      // beforeUnmount, unmounted
      savedDirectives[savedIndex] = {...savedDirectiveBinding, ...directiveBinding}
      const directiveHookArgs = [ref, savedDirectiveBinding, vnode, prevVnode]
      beforeUnmount?.apply(null, directiveHookArgs)
      unmounted?.apply(null, directiveHookArgs)
    })
    this.setState({
      prevVnode: {...vnode},
      savedDirectives
    })
  }

  render() {
    const {vnode, children} = this.props
    // return this.props.children
    return children
  }

}
