import * as React from 'react'
import {Teleport, h as createElement, createApp} from 'vue'
import applyReactInVue from './applyReactInVue'
import {setOptions} from './options'
import REACT_ALL_HANDLERS from './reactAllHandles'
import lookupVueWrapperRef from "./lookupVueWrapperRef"
import parseVModel from "./utils/parseVModel"
import RandomId from './utils/getRandomId'
import RenderReactNode from "./pureReactInVue/RenderReactNode";

const optionsName = 'veaury-options'

// Get a random element id and ensure that it does not repeat
const random = new RandomId()

// According to whether the incoming parameter is a string, determine whether it is necessary to obtain the global component of Vue
function filterVueComponent (component, vueInstance) {
  if (typeof component === 'string' && vueInstance) {
    // Vue3's global components are relative to appContext
    component = vueInstance.$?.appContext?.app?.component?.(component)
  }
  return component
}

export function transferSlots ($slots) {
  if (!$slots) return
  Object.keys($slots).forEach((key) => {
    const originSlot = $slots[key]
    if (originSlot == null) return
    if (typeof originSlot === 'function') {
      $slots[key] = originSlot
      $slots[key].reactFunction = originSlot
    } else {
      $slots[key] = () => originSlot
      $slots[key].reactSlot = originSlot
    }
    if (originSlot.vueFunction) {
      $slots[key].vueFunction = originSlot.vueFunction
    }
  })
  return $slots
}

function VNodeBridge(props) {
  return props.node?.()
}
// const VNodeBridge = {
//   inherits: false,
//   render(props) {
//     return createElement('div', { style: { all: 'unset' } }, [this.$attrs.node && this.$attrs.node()])
//   }
// }

const VueContainer = React.forwardRef((originProps, ref) => {
  let { component, node, ...props } = originProps
  if (component == null && node == null) return null
  if (node != null) {
    // reactNode
    if (node.$$typeof || typeof node === 'string' || typeof node === 'number') {
      return node
    }
    if (typeof node !== 'function') {
      const lastNode = node
      node = () => lastNode
    }
  }

  component = component || VNodeBridge

  const globalOptions = setOptions(props[optionsName] || {}, undefined, true)
  const injection = globalOptions.useInjectPropsFromWrapper || component.__veauryInjectPropsFromWrapper__

  let ReactInjectionProps
  // If it is a slot, useInjectPropsFromWrapper is not executed
  if (!globalOptions.isSlots) {
    if (typeof injection === 'function') {
      ReactInjectionProps = injection(props)
    }
  }
  return <VueComponentLoader {...{component, ...node ? {node} : {}, ...props, ...ReactInjectionProps, [optionsName]: globalOptions}} ref={ref}/>
})

export {
  VueContainer
}
class VueComponentLoader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      portals: [],
    }
    this.__veauryPortalKeyPool__ = []
    this.__veauryMaxPortalCount__ = 0
    // Capture vue component
    this.__veauryCurrentVueComponent__ = props.component
    this.__veauryCreateVueInstance__ = this.__veauryCreateVueInstance__.bind(this)
    this.__veauryVueComponentContainer__ = this.createVueComponentContainer()
  }

  pushReactPortal (reactPortal) {
    let { portals } = this.state
    const key = this.__veauryPortalKeyPool__.shift() || this.__veauryMaxPortalCount__++
    portals.push({
      Portal: reactPortal,
      key
    })
    this.setState({ portals })
  }

  removeReactPortal (reactPortal) {
    const { portals } = this.state
    let index
    const portalData = portals.find((obj, i) => {
      if (obj.Portal === reactPortal) {
        index = i
        return true
      }
    })
    this.__veauryPortalKeyPool__.push(portalData.key)
    portals.splice(index, 1)
    this.__veauryVueRef__ && this.setState({ portals })
  }

  createVueComponentContainer () {
    let nativeProps = {}
    const options = this.props[optionsName]
    if (options.isSlots) {
      // TODO: not necessarily required
      Object.keys(this.props).forEach((keyName) => {
        if (REACT_ALL_HANDLERS.has(keyName) && typeof this.props[keyName] === 'function') {
          nativeProps[keyName] = this.props[keyName]
        }
      })
      if (options.vue.slotWrapAttrs) {
        nativeProps = {
          ...nativeProps,
          ...options.vue.slotWrapAttrs
        }
      }
    } else {
      if (options.vue.componentWrapAttrs) {
        nativeProps = {
          ...nativeProps,
          ...options.vue.componentWrapAttrs
        }
      }
    }

    return options.vue.componentWrapHOC(<div {...options.vue.componentWrapAttrs} ref={this.__veauryCreateVueInstance__} key={null} />, nativeProps)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps === this.props) return true
    let { component, [optionsName]: options, 'v-slots': $slots = null, children, ...props } = nextProps
    if (this.__veauryCurrentVueComponent__ !== component) {
      this.updateVueComponent(component)
    }
    if (component.__fromReactSlot) return true
    if (!this.__veauryVueInstance__) return

    if (children) {
      if (!$slots) {
        $slots = {}
      }
      if (typeof children === 'object' && !(children instanceof Array) && !children.$$typeof) {
        $slots = children
      } else {
        $slots.default = children
      }
    }

    const dataSlots = this.__veauryVueInstance__.$data.$slots
    if (dataSlots) {
      Object.keys(dataSlots).forEach((key) => {
        delete dataSlots[key]
      })
    }
    if ($slots) {
      if (!dataSlots) this.__veauryVueInstance__.$data.$slots = {}
      Object.assign(this.__veauryVueInstance__.$data.$slots, transferSlots($slots))
    }

    // delete all keys, except $slots
    Object.keys(this.__veauryVueInstance__.$data).forEach((key) => {
      // don't delete $slots, otherwise it will trigger infinite updates
      if (key === '$slots') return
      delete this.__veauryVueInstance__.$data[key]
    })

    // update vue $data
    this.__veauryVueInstance__ && Object.assign(this.__veauryVueInstance__.$data, parseVModel(props))
    return true
  }

  componentWillUnmount () {
    // remove portal
    if (this.vuePortal) {
      this.parentVueWrapperRef.__veauryRemoveVuePortal__(this.vuePortal)
      return
    }
    this.__veauryVueInstance__ && this.__veauryVueInstance__.$.appContext.app.unmount()
    random.pool.delete(this.__veauryVueTargetId__)
  }

  // The dom object of the component will be received through the ref callback of the react component,
  // and the context has been bound in the constructor of the class
  __veauryCreateVueInstance__ (targetElement) {
    const VueContainerInstance = this
    let { component, [optionsName]: options, children, 'v-slots': $slots = {}, ...props } = this.props
    if (children) {
      if (typeof children === 'object' && !(children instanceof Array) && !children.$$typeof) {
        $slots = children
      } else {
        $slots.default = children
      }
    }
    $slots = transferSlots($slots)
    if ($slots) {
      props.$slots = $slots
    }

    function setVueInstance(instance) {
      if (!this.__veauryVueInstance__) {
        this.__veauryVueInstance__ = instance
      }
    }
    setVueInstance = setVueInstance.bind(this)
    const vueOptionsData = { ...parseVModel(props) }
    const vueOptions = {
      data() {
        return options.isSlots? { children: VueContainerInstance.__veauryCurrentVueComponent__.originVNode }: vueOptionsData
      },
      created() {
        this.reactWrapperRef = VueContainerInstance
        setVueInstance(this)
      },
      methods: {
        reactInVueCall(children, customOptions = {}, division) {
          if (division) {
            if (children && children[0]) {
              return children.map((child, index) => createElement(RenderReactNode, { node: child, key: child?.data?.key || index }))
            }
          }
          return createElement(RenderReactNode, {node: children})
        },
        getScopedSlots (createElement, $scopedSlots) {
          if (!this.getScopedSlots.__scopeSlots) {
            this.getScopedSlots.__scopeSlots = {}
          }
          const tempScopedSlots = { ...$scopedSlots }
          for (let i in tempScopedSlots) {
            if (!tempScopedSlots.hasOwnProperty(i)) continue
            let reactFunction = tempScopedSlots[i]
            if (reactFunction == null) continue
            tempScopedSlots[i] = ((scopedSlot) => {
              return (...args) => {
                if (scopedSlot.vueFunction) {
                  return scopedSlot.vueFunction.apply(this, args)
                }
                // cache vnode
                let newSlot
                const { reactSlot, reactFunction } = scopedSlot
                const slotFromReact = reactSlot || reactFunction?.apply(this, args)
                const { defaultSlotsFormatter } = options
                if (!this.getScopedSlots.__scopeSlots[i]?.component?.ctx?.__veauryReactInstance__) {
                  // Custom slot's formatter
                  if (defaultSlotsFormatter && slotFromReact) {
                    newSlot = [defaultSlotsFormatter(slotFromReact, this.reactInVueCall)]
                  } else {
                    // newSlot = this.reactInVueCall(scopedSlot.apply(this, args))
                    newSlot = createElement(applyReactInVue(() => scopedSlot.apply(this, args), { ...options, isSlots: true, wrapInstance: VueContainerInstance }))
                  }
                  this.getScopedSlots.__scopeSlots[i] = newSlot
                } else {
                  newSlot = this.getScopedSlots.__scopeSlots[i]
                  // Here, if you use synchronous update, it may trigger an infinite loop,
                  // so you can only use microtask execution
                  Promise.resolve().then(() => {
                    newSlot?.component?.ctx?.__veauryReactInstance__?.setState({ children: scopedSlot.apply(this, args) })
                  })
                }
                if (scopedSlot.reactFunction) {
                  newSlot.reactFunction = scopedSlot.reactFunction
                  return newSlot
                }
                if (scopedSlot.reactSlot) {
                  newSlot.reactSlot = scopedSlot.reactSlot
                  return newSlot
                }
                return newSlot
              }
            })(reactFunction)
            tempScopedSlots[i].reactFunction = reactFunction
          }
          return tempScopedSlots
        },
      },
      mounted () {
        // hide id
        targetElement.removeAttribute('id')
        // In the react wrapper instance, use __veauryVueRef__ to save the target component instance of vue
        VueContainerInstance.__veauryVueRef__ = this.$refs.use_vue_wrapper
        // In the target component instance of vue,
        // use reactWrapperRef to save the react wrapper instance.
        // The vue component can use this property to determine whether it is wrapped
        this.$refs.use_vue_wrapper.reactWrapperRef = VueContainerInstance
      },
      beforeUnmount () {
        // garbage collection
        VueContainerInstance.__veauryVueRef__ = null
        this.$refs.use_vue_wrapper.reactWrapperRef = null
      },
      render () {
        // Filter out the content that is not an property and extract it separately
        let { component,
          $slots,
          children,
          'class': className,
          style,
          ...lastProps } = this.$data


        // Get slot data (including named slots)
        const namedSlots = this.getScopedSlots(createElement, { ...$slots })
        const {className: newClassName, classname: newClassName1, ...lastAttrs} = lastProps
        const lastNamedSlots = {}
        // Serialize 'namedSlots' into an object consisting of functions
        Object.keys(namedSlots).forEach((key) => {
          const scopeFun = namedSlots[key]
          if (typeof scopeFun === 'function') {
            lastNamedSlots[key] = scopeFun
          } else {
            lastNamedSlots[key] = () => scopeFun
          }
        })

        return createElement(
          filterVueComponent(VueContainerInstance.__veauryCurrentVueComponent__, this),
          {
            // ...lastProps,
            ...lastAttrs,
            ...(className || newClassName || newClassName1? {'class': className || newClassName || newClassName1}: {}),
            // 'class': className || newClassName || newClassName1 || '',
            ...(style? {style}: {}),
            // style,
            ref: 'use_vue_wrapper',
          },
          {
            ...options.isSlots && this.children? {
              default: typeof this.children === 'function' ? this.children: () => this.children
            } : {
              ...lastNamedSlots,
            }
          }
        )
      }
    }

    if (!targetElement) return

    const targetId = random.getRandomId('__vue_wrapper_container_')
    targetElement.id = targetId
    this.__veauryVueTargetId__ = targetId
    // get react fiberNode
    let vueWrapperRef = options.wrapInstance
    if (!vueWrapperRef) {
      vueWrapperRef = lookupVueWrapperRef(this)
    } else {
      vueWrapperRef = options.wrapInstance
      vueWrapperRef.reactWrapperRef = VueContainerInstance
    }

    // Use 'teleport' if wrapper layer is present
    if (vueWrapperRef && document.getElementById(targetId)) {
      // Store a reference to the wrapper layer
      this.parentVueWrapperRef = vueWrapperRef

      // Store a reference to 'teleport'
      this.vuePortal = (createElement, key) => createElement(Teleport, {to: '#' + targetId, key: targetId}, [createElement(Object.assign(vueOptions, {router: this._router}))])
      vueWrapperRef.__veauryPushVuePortal__(this.vuePortal)
      return
    }

    const app = createApp(vueOptions)
    if (typeof options.beforeVueAppMount === 'function') {
      options.beforeVueAppMount(app)
    }
    this.__veauryVueInstance__ = app.mount(targetElement)
  }

  updateVueComponent (nextComponent) {
    if (!this.__veauryVueInstance__) return

    if (nextComponent.__fromReactSlot) {
      this.__veauryVueInstance__.children = typeof nextComponent.originVNode === 'function'? nextComponent.originVNode: () => nextComponent.originVNode
    } else {
      this.__veauryCurrentVueComponent__ = nextComponent
      // Use $forceUpdate to force the vue instance to re-render,
      // because this method will only re-render the current instance and slot,
      // not sub-components, so it won't cause performance problems
      this.__veauryVueInstance__.$forceUpdate()
    }
  }

  render () {
    return <this.__veauryVueComponentContainer__ portals={this.state.portals}/>
  }
}

export default function applyVueInReact (component, options = {}) {
  if (!component) {
    console.warn('Component must be passed in applyVueInReact!')
  }

  if (component.__esModule && component.default) {
    component = component.default
  }

  const returnedReactComponent = React.forwardRef((props, ref) => {
    return <VueContainer {...props} component={component} ref={ref} {...{[optionsName]: options}}/>
  })
  returnedReactComponent.originVueComponent = component
  return returnedReactComponent
}
