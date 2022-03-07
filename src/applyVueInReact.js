import React from 'react'
import {Teleport, h as createElement, createApp} from 'vue'
import applyReactInVue from './applyReactInVue'
import {setOptions} from './options'
import REACT_ALL_HANDLERS from './reactAllHandles'
import lookupVueWrapperRef from "./lookupVueWrapperRef"
import parseVModel from "./parseVModel"

const optionsName = 'vuereact-combined-options'

// Get a random element id and ensure that it does not repeat
function getRandomId (prefix) {
  const id = prefix + (Math.random() + '').substr(2)
  // Recreate random numbers if duplicate data is generated
  if (getRandomId.pool.has(id)) {
    return getRandomId(prefix)
  }
  getRandomId.pool.add(id)
  return id
}
getRandomId.pool = new Set()

// According to whether the incoming parameter is a string, determine whether it is necessary to obtain the global component of Vue
function filterVueComponent (component, vueInstance) {
  if (typeof component === 'string' && vueInstance) {
    // Vue3's global components are relative to appContext
    component = vueInstance.$?.appContext?.app?.component?.(component)
  }
  return component
}

function ReactInterceptComponent({Loader, componentProps}) {
  return <Loader {...componentProps}/>
}

const VueContainer = React.forwardRef((props, ref) => {
  const globalOptions = setOptions(props[optionsName] || {}, undefined, true)

  let ReactInjectionProps = props.component?.__veauryInjectPropsFromWrapper__?.(props)
  return <VueComponentLoader {...{...props, ...ReactInjectionProps, [optionsName]: globalOptions}} ref={ref}/>
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
    this.portalKeyPool = []
    this.maxPortalCount = 0
    // Capture vue component
    this.currentVueComponent = props.component
    this.createVueInstance = this.createVueInstance.bind(this)
    this.vueComponentContainer = this.createVueComponentContainer()
  }

  pushReactPortal (reactPortal) {
    let { portals } = this.state
    const key = this.portalKeyPool.shift() || this.maxPortalCount++
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
    this.portalKeyPool.push(portalData.key)
    portals.splice(index, 1)
    this.vueRef && this.setState({ portals })
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

    return options.vue.componentWrapHOC(<div {...options.vue.componentWrapAttrs} ref={this.createVueInstance} key={null} />, nativeProps)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps === this.props) return true
    let { component, [optionsName]: options, 'v-slots': $slots = {}, children, ...props } = nextProps
    if (this.currentVueComponent !== component) {
      this.updateVueComponent(component)
    }
    if (component.__fromReactSlot) return true
    if (!this.vueInstance) return

    if (children) {
      if (typeof children === 'object' && !(children instanceof Array) && !children.$$typeof) {
        $slots = children
      } else {
        $slots.default = children
      }
    }
    if ($slots) {
      props.$slots = this.transferSlots($slots)
    }
    // delete all keys
    Object.keys(this.vueInstance.$data).forEach((key) => {
      delete this.vueInstance.$data[key]
    })
    // update vue $data
    this.vueInstance && Object.assign(this.vueInstance.$data, parseVModel(props))
    return true
  }

  componentWillUnmount () {
    // remove portal
    if (this.vuePortal) {
      this.parentVueWrapperRef.removeVuePortal(this.vuePortal)
      return
    }
    this.vueInstance && this.vueInstance.$.appContext.app.unmount()
    getRandomId.pool.delete(this.vueTargetId)
  }

  transferSlots ($slots) {
    // Process the content in $slots into a function to prevent it from being processed by the observer of vue's data
    if ($slots) {
      Object.keys($slots).forEach((key) => {
        const originSlot = $slots[key]
        if (typeof originSlot === 'function') {
          $slots[key] = originSlot
        } else {
          $slots[key] = () => originSlot
        }

      })
      return $slots
    }
  }
  // The dom object of the component will be received through the ref callback of the react component,
  // and the context has been bound in the constructor of the class
  createVueInstance (targetElement) {
    const VueContainerInstance = this
    let { component, [optionsName]: options, children, 'v-slots': $slots = {}, ...props } = this.props
    if (children) {
      if (typeof children === 'object' && !(children instanceof Array) && !children.$$typeof) {
        $slots = children
      } else {
        $slots.default = children
      }
    }
    $slots = this.transferSlots($slots)
    if ($slots) {
      props.$slots = $slots
    }

    function setVueInstance(instance) {
      if (!this.vueInstance) {
        this.vueInstance = instance
      }
    }
    setVueInstance = setVueInstance.bind(this)
    const vueOptionsData = { ...parseVModel(props) }
    const vueOptions = {
      data() {
        return options.isSlots? { children: VueContainerInstance.currentVueComponent.originVNode }: vueOptionsData
      },
      created() {
        this.reactWrapperRef = VueContainerInstance
        setVueInstance(this)
      },
      methods: {
        getScopedSlots (createElement, $scopedSlots) {
          if (!this.getScopedSlots.__scopeSlots) {
            this.getScopedSlots.__scopeSlots = {}
          }
          const tempScopedSlots = { ...$scopedSlots }
          for (let i in tempScopedSlots) {
            if (!tempScopedSlots.hasOwnProperty(i)) continue
            let reactFunction = tempScopedSlots[i]
            tempScopedSlots[i] = ((scopedSlot) => {
              return (...args) => {
                if (scopedSlot.vueFunction) {
                  return scopedSlot.vueFunction.apply(this, args)
                }
                // cache vnode
                let newSlot
                if (!this.getScopedSlots.__scopeSlots[i]?.component?.ctx?.reactInstance) {
                  newSlot = createElement(applyReactInVue(() => scopedSlot.apply(this, args), { ...options, isSlots: true, wrapInstance: VueContainerInstance }))
                  this.getScopedSlots.__scopeSlots[i] = newSlot
                } else {
                  newSlot = this.getScopedSlots.__scopeSlots[i]
                  newSlot?.component?.ctx?.reactInstance?.setState({ children: scopedSlot.apply(this, args) })
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
        // In the react wrapper instance, use vueRef to save the target component instance of vue
        VueContainerInstance.vueRef = this.$refs.use_vue_wrapper
        // In the target component instance of vue,
        // use reactWrapperRef to save the react wrapper instance.
        // The vue component can use this property to determine whether it is wrapped
        this.$refs.use_vue_wrapper.reactWrapperRef = VueContainerInstance
      },
      beforeUnmount () {
        // garbage collection
        VueContainerInstance.vueRef = null
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
          filterVueComponent(VueContainerInstance.currentVueComponent, this),
          {
            ...lastProps,
            ...lastAttrs,
            ...(className || newClassName || newClassName1? {'class': className || newClassName || newClassName1}: {}),
            // 'class': className || newClassName || newClassName1 || '',
            ...(style? {style}: {}),
            // style,
            ref: 'use_vue_wrapper',
          },
          {
            ...options.isSlots && this.children? {
              default: this.children
            } : {
              ...lastNamedSlots,
            }
          }
        )
      }
    }

    if (!targetElement) return

    const targetId = getRandomId('__vue_wrapper_container_')
    targetElement.id = targetId
    this.vueTargetId = targetId
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
      vueWrapperRef.pushVuePortal(this.vuePortal)
      return
    }

    this.vueInstance = createApp(vueOptions).mount(targetElement)
  }

  updateVueComponent (nextComponent) {
    if (!this.vueInstance) return

    if (nextComponent.__fromReactSlot) {
      this.vueInstance.children = typeof nextComponent.originVNode === 'function'? nextComponent.originVNode: () => nextComponent.originVNode
    } else {
      this.currentVueComponent = nextComponent
      // Use $forceUpdate to force the vue instance to re-render,
      // because this method will only re-render the current instance and slot,
      // not sub-components, so it won't cause performance problems
      this.vueInstance.$forceUpdate()
    }
  }

  render () {
    return <this.vueComponentContainer portals={this.state.portals}/>
  }
}

export default function applyVueInReact (component, options = {}) {
  if (!component) {
    console.warn('Component must be passed in applyVueInReact!')
  }

  if (component.__esModule && component.default) {
    component = component.default
  }

  return React.forwardRef((props, ref) => {
    return <VueContainer {...props} component={component} ref={ref} {...{[optionsName]: options}}/>
  })
}
