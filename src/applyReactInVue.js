import React from "react"
import ReactDOM from "react-dom"
import applyVueInReact from "./applyVueInReact"
import { setOptions } from "./options"
import { h as createElement, getCurrentInstance, reactive } from 'vue'
import { overwriteDomMethods, recoverDomMethods } from './overrideDom'

class FunctionComponentWrap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Component = this.props.component
    const { ref, ...props } = this.props.passedProps
    return <Component {...props}>{this.props.children}</Component>
  }
}
const createReactContainer = (Component, options, wrapInstance) => class applyReact extends React.Component {
  // reactDevTools
  static displayName = `applyReact_${Component.displayName || Component.name || "Component"}`

  setRef(ref) {
    if (!ref) return
    // Use the reactRef property to save the instance of the target react component,
    // which can be obtained by the setRef instance of the parent component
    wrapInstance.reactRef = ref
    // The enumerable properties of the react instance are linked to the vue instance
    Object.keys(ref).forEach((key) => {
      if (!wrapInstance[key]) {
        wrapInstance[key] = ref[key]
      }
    })
    Promise.resolve().then(() => {
      Object.keys(ref).forEach((key) => {
        if (!wrapInstance[key]) {
          wrapInstance[key] = ref[key]
        }
      })
    })


    // Compatible with receiving parameters of type useRef
    this.setRef.current = ref

    // save the middleware instance of vue in the instance of the react component
    // React components can use this property to determine whether they are used by encapsulation
    ref.vueWrapperRef = wrapInstance
  }

  constructor(props) {
    super(props)
    // All properties are stored in the state of the middleware.
    // The principle is to use a stateful React component as the middleware to trigger the props of the target component
    this.state = {
      ...props,
      ...(options.isSlots ? { children: Component } : {}),
    }
    this.setRef = this.setRef.bind(this)
    this.vueInReactCall = this.vueInReactCall.bind(this)
    this.vueWrapperRef = wrapInstance
  }

  // Use the method of converting VNode to ReactNode to solve the problem of slot transmission
  createSlot(children) {
    return {
      originVNode: children,
      inheritAttrs: false,
      __fromReactSlot: true,
      render() {
        children = this.$slots?.default?.() || children
        if (children instanceof Function) {
          children = children(this)
        }
        // Some react components pass properties to components in children by processing their own children,
        // which will cause them to be passed to the wrapper layer
        // Transparently transmit the properties of the wrapper layer.
        // The transparent transmission condition is that there is only one vnode in children
        if (children?.length === 1 && children[0]?.data) {
          // filter internal properties
          const {key, ...otherAttrs} = this.$attrs
          children[0].props = {...otherAttrs, ...children[0].props}
        }
        return children
      },
    }
  }

  componentWillUnmount() {
    if (!wrapInstance.reactRef) return
    // Garbage collection, but retain property names,
    // vue's refs retain the mode of property names for component destruction
    wrapInstance.reactRef.vueWrapperRef = null
    wrapInstance.reactRef = null
  }

  static catchVueRefs() {
    if (!wrapInstance.$parent) return false
    for (const ref in wrapInstance.$parent.$refs) {
      if (wrapInstance.$parent.$refs[ref] === wrapInstance) {
        return true
      }
    }
    return false
  }

  vueInReactCall(children, customOptions = {}, division) {
    if (division) {
      if (children && children[0]) {
        return children.map((child, index) => applyVueInReact(this.createSlot(child instanceof Function ? child : [child]), {
          ...options, ...customOptions, isSlots: true, wrapInstance,
        }).render({ key: child?.data?.key || index }))
      }
    }
    return applyVueInReact(this.createSlot(children), {
      ...options, ...customOptions, isSlots: true, wrapInstance,
    }).render()
  }

  render() {
    let {
      children,
      hashList,
      ...props
    } = this.state
    const $slots = {}
    const $scopedSlots = {}
    // parse slots
    for (const i in props) {
      if (!props.hasOwnProperty(i) || props[i] == null) continue
      if (props[i].__slot) {
        if (!props[i].reactSlot) {
          const vueSlot = props[i]
          // TODO: defaultSlotsFormatter
          // if (options.defaultSlotsFormatter) {
          //   props[i].__top__ = this.vueWrapperRef
          //   props[i] = options.defaultSlotsFormatter(props[i], this.vueInReactCall, hashList)
          //   if (props[i] instanceof Array || (typeof props[i]).indexOf("string", "number") > -1) {
          //     props[i] = [...props[i]]
          //   } else if (typeof props[i] === "object") {
          //     props[i] = { ...props[i] }
          //   }
          // } else {
            props[i] = { ...applyVueInReact(this.createSlot(props[i]), { ...options, isSlots: true, wrapInstance }).render() }
          // }
          props[i].vueSlot = vueSlot
        } else {
          props[i] = props[i].reactSlot
        }
        $slots[i] = props[i]
      } else if (props[i].__scopedSlot) {
        // The scoped slot is a pure function. In the react component,
        // you need to pass in the scoped call, and then create the vue slot component
        props[i] = props[i](this.createSlot)
        $scopedSlots[i] = props[i]
      }
    }
    // parse normal slots
    if (children != null) {
      if (!children.reactSlot) {
        const vueSlot = children
        // TODO: defaultSlotsFormatter
        // if (options.defaultSlotsFormatter) {
        //   children.__top__ = this.vueWrapperRef
        //   children = options.defaultSlotsFormatter(children, this.vueInReactCall, hashList)
        //   if (children instanceof Array || (typeof children).indexOf("string", "number") > -1) {
        //     children = [...children]
        //   } else if (typeof children === "object") {
        //     children = { ...children }
        //   }
        // } else {
          children = { ...applyVueInReact(this.createSlot(children), { ...options, isSlots: true, wrapInstance }).render() }
        // }
        children.vueSlot = vueSlot
      } else {
        children = children.reactSlot
      }
    }
    $slots.default = children
    const refInfo = {}
    refInfo.ref = this.setRef
    if (options.isSlots) {
      return this.state.children || this.props.children
    }
    let finalProps = props
    // TODO: defaultPropsFormatter
    // if (options.defaultPropsFormatter) {
    //   finalProps = options.defaultPropsFormatter(props, this.vueInReactCall, hashList)
    // }
    const newProps = { ...finalProps }
    // Determine whether to get ref by wrapping it with a class component
    // Whether the prototype of Component is not the prototype of Function
    if ((Object.getPrototypeOf(Component) !== Function.prototype && !(typeof Component === "object" && !Component.render)) || applyReact.catchVueRefs()) {
      return (
          <Component {...newProps} {...refInfo}>
            {children}
          </Component>
      )
    }
    return <FunctionComponentWrap passedProps={newProps} component={Component} {...refInfo}>{children}</FunctionComponentWrap>
  }
}
export default function applyReactInVue(component, options = {}) {
  if (component.__esModule && component.default) {
    component = component.default
  }
  if (options.isSlots) {
    component = component()
  }
  // additional options
  options = setOptions(options, undefined, true)
  return {
    originReactComponent: component,
    setup(props) {
      let injectedProps = reactive({})
      const instance = getCurrentInstance()
      if (typeof component.__veauryInjectPropsFromWrapper__ === 'function') {
        const injection = component.__veauryInjectPropsFromWrapper__?.call(instance.proxy, props)
        if (typeof injection !== "function") {
          Object.assign(injectedProps, injection)
          return {
            injectedProps
          }
        } else {
          instance.proxy.injectedComputed = injection
        }
      }
    },
    data() {
      return {
        portals: [],
        portalKeyPool: [],
        maxPortalCount: 0,
      }
    },
    created() {
    },
    computed: {
      injectedProps() {
        return this.injectedComputed?.call(this)
      }
    },
    render() {
      /**
       * Magical code!
       * The 'slotsInit' function allows' slots' to be executed once in 'render' to generate a 'dep' relationship.
       * However, when 'scopedSlot' is forcibly executed, it may rely on some function input parameters.
       * Forcibly executing without input parameters may lead to errors,
       * resulting in the failure of subsequent 'createElement' function execution,
       * resulting in reactdom 'container' on which render depends cannot be obtained.
       * Therefore,you can create a 'VNode' node first and then execute 'slotsInit', which effectively avoids this situation
       */
      const VNode = createElement(options.react.componentWrap, { ref: "react", ...options.react.componentWrapAttrs || {}}, this.portals.map(({ Portal, key }) => Portal(createElement, key)))
      // Must be executed after 'VNode' is created
      // this.slotsInit()
      return VNode
    },
    methods: {
      pushVuePortal(vuePortal) {
        const key = this.portalKeyPool.shift() || this.maxPortalCount++
        this.portals.push({
          Portal: vuePortal,
          key,
        })
      },
      removeVuePortal(vuePortal) {
        let index
        const portalData = this.portals.find((obj, i) => {
          if (obj.Portal === vuePortal) {
            index = i
            return true
          }
        })
        this.portalKeyPool.push(portalData.key)
        this.portals.splice(index, 1)
      },
      // slotsInit(vnode) {
      //   // TODO: It doesn't matter
      //   // 针对pureTransformer类型的react组件进行兼容，解决具名插槽和作用域插槽不更新的问题
      //   // if (vnode) {
      //   //   if (vnode.componentOptions?.Ctor?.options && !vnode.componentOptions?.Ctor?.options.originReactComponent) return
      //   //   if (vnode.data?.scopedSlots) {
      //   //     Object.keys(vnode.data?.scopedSlots).forEach((key) => {
      //   //       if (typeof vnode.data.scopedSlots[key] === "function") {
      //   //         try {
      //   //           vnode.data.scopedSlots[key]()
      //   //         } catch (e) {}
      //   //       }
      //   //     })
      //   //   }
      //   //   const children = vnode.children || vnode.componentOptions?.children || []
      //   //   children.forEach((subVnode) => {
      //   //     this.slotsInit(subVnode)
      //   //   })
      //   //   return
      //   // }
      //   Object.keys(this.$slots).forEach((key) => {
      //     try {
      //       this.$slots[key]()
      //     } catch (e) {}
      //   })
      // },
      // parse scopedSlots
      getScopeSlot(slotFunction, hashList, originSlotFunction) {
        const _this = this
        function scopedSlotFunction(createReactSlot) {
          function getSlot(...args) {
            if (slotFunction.reactFunction) {
              return slotFunction.reactFunction.apply(this, args)
            }
            if (options.defaultSlotsFormatter) {
              let scopeSlot = slotFunction.apply(this, args)
              scopeSlot.__top__ = _this
              scopeSlot = options.defaultSlotsFormatter(scopeSlot, _this.vueInReactCall, hashList)
              if (scopeSlot instanceof Array || (typeof scopeSlot).indexOf("string", "number") > -1) {
                scopeSlot = [...scopeSlot]
              } else if (typeof scopeSlot === "object") {
                scopeSlot = { ...scopeSlot }
              }
              return scopeSlot
            }
            return applyVueInReact(createReactSlot(() => slotFunction.apply(this, args)), { ...options, isSlots: true, wrapInstance: _this }).render()
          }
          if (options.pureTransformer && originSlotFunction) {
            getSlot.vueFunction = originSlotFunction
          } else {
            getSlot.vueFunction = slotFunction
          }
          return getSlot
        }
        scopedSlotFunction.__scopedSlot = true
        return scopedSlotFunction
      },
      // used by 'pureTransformer'
      __syncUpdateProps(extraData) {
        // this.mountReactComponent(true, false, extraData)
        this.reactInstance && this.reactInstance.setState(extraData)
      },
      mountReactComponent(update, updateType, extraData = {}) {
        const hashMap = {}
        const hashList = []
        // get vue component scoped hash
        const scopedId = this.$.vnode.scopeId
        if (scopedId) {
          hashMap[scopedId] = ""
          hashList.push(scopedId)
        }

        const normalSlots = {}
        const scopedSlots = {}
        let children
        if (!update || update && updateType?.slot) {
          // vue3 all slots are functions
          // In order for react to distinguish between renderProps and reactNode, it is still necessary to distinguish between scoped slots and named slots
          // It is agreed that the prefix of the special slots key is used as the named slot, and the processing method is to directly execute the function

          // Mark the properties of the slot type
          for (let i in this.$slots || {}) {
            if (!this.$slots.hasOwnProperty(i) || this.$slots[i] == null) continue
            const prefix = options.react.vueNamedSlotsKey.find((prefix) => i.indexOf(prefix) === 0)
            if (prefix || i === 'default') {
              const newKey = i.replace(new RegExp(`^${prefix}`), '')
              normalSlots[newKey] = this.$slots[i]
              normalSlots[newKey].__slot = true
              continue
            }
            scopedSlots[i] = this.getScopeSlot(this.$slots[i], hashList, this.$.vnode?.children?.[i])
          }
        }

        let lastNormalSlots
        if (!update || update && updateType?.slot) {
          lastNormalSlots = { ...normalSlots }
          children = lastNormalSlots.default
          delete lastNormalSlots.default
        }

        // cache last data
        this.last = this.last || {}
        this.last.slot = this.last.slot || {}
        this.last.attrs = this.last.attrs || {}
        const compareLast = {
          slot: () => {
            this.last.slot = {
              ...(children ? { children } : {children: null}),
              ...lastNormalSlots,
              ...scopedSlots,
            }
          },
          attrs: () => {
            this.last.attrs = this.$attrs
          }
        }
        if (updateType) {
          Object.keys(updateType).forEach((key) => compareLast[key]())
        }
        // component creation
        if (!update) {
          compareLast.slot()
          compareLast.attrs()
          const Component = createReactContainer(component, options, this)
          let reactRootComponent = <Component
            {...this.$attrs}
            {...this.injectedProps}
            {...{ children }}
            {...lastNormalSlots}
            {...scopedSlots}
            {...(this.$attrs.class ? { className: this.$attrs.class } : {})}
            {...hashMap}
            hashList={hashList}
            {...(this.$attrs.style ? { style: this.$attrs.style } : {})}
            // style={this.$attrs.style}
            ref={(ref) => (this.reactInstance = ref)}
          />

          const container = this.$refs.react
          let reactWrapperRef = options.wrapInstance

          if (!reactWrapperRef) {
            let parentInstance = this.$parent
            // Look up the React encapsulation layer
            while (parentInstance) {
              if (parentInstance.parentReactWrapperRef) {
                reactWrapperRef = parentInstance.parentReactWrapperRef
                break
              }
              if (parentInstance.reactWrapperRef) {
                reactWrapperRef = parentInstance.reactWrapperRef
                break
              }
              parentInstance = parentInstance.$parent
            }
          } else {
            reactWrapperRef = options.wrapInstance
            reactWrapperRef.vueWrapperRef = this
          }

          // If there is a React component in the outer component, use 'Portal' to open up the React scope
          if (reactWrapperRef) {
            // Store React encapsulation layer
            this.parentReactWrapperRef = reactWrapperRef
            // Store 'portal' reference
            this.reactPortal = () => ReactDOM.createPortal(
              reactRootComponent,
              container,
            )
            reactWrapperRef.pushReactPortal(this.reactPortal)
            return
          }

          ReactDOM.render(
            reactRootComponent,
            container,
          )
        } else {

          const setReactState = () => {
            this.reactInstance && this.reactInstance.setState((prevState) => {
              // Clear the previous 'state', preventing merging
              Object.keys(prevState).forEach((key) => {
                if (options.isSlots && key === 'children') return
                delete prevState[key]
              })
              return {
                ...this.cache,
                ...this.injectedProps,
                ...!options.isSlots && this.last.slot,
                ...this.last.attrs,
              }
            })
            this.cache = null
          }


          // do the micro task update
          if (this.microTaskUpdate) {
            // 'Promise' asynchronous merge update
            if (!this.cache) {
              this.$nextTick(() => {
                setReactState()
                this.microTaskUpdate = false
              })
            }
          }

          // do the macro task update
          if (this.macroTaskUpdate) {
            clearTimeout(this.updateTimer)
            this.updateTimer = setTimeout(() => {
              clearTimeout(this.updateTimer)
              setReactState()
              this.macroTaskUpdate = false
            })
          }

          this.cache = {
            ...this.cache || {},
            ...{
              ...extraData,
              ...(this.$attrs.class ? { className: this.$attrs.class } : {}),
              ...{ ...hashMap },
              hashList,
              ...(this.$attrs.style ? { style: this.$attrs.style } : {}),
              // style: this.$attrs.style,
            },
          }

          // do the sync update
          if (!this.macroTaskUpdate && !this.microTaskUpdate) {
            setReactState()
          }
        }
      },
    },
    mounted() {
      this.IGNORE_STRANGE_UPDATE = true
      Promise.resolve().then(() => {
        this.IGNORE_STRANGE_UPDATE = false
      })
      clearTimeout(this.updateTimer)
      this.mountReactComponent()
    },
    beforeUnmount() {
      clearTimeout(this.updateTimer)
      // destroy 'Portal'
      if (this.reactPortal) {
        // Magical Code!
        // Override some methods of native lookup 'dom',
        // so that React can still look up the dom object before the Vue component is destroyed
        overwriteDomMethods(this.$refs.react)
        this.parentReactWrapperRef?.removeReactPortal(this.reactPortal)
        // restore native method
        recoverDomMethods()
        return
      }

      // Override some methods of native lookup 'dom'
      overwriteDomMethods(this.$refs.react)
      // Destroy the React root node
      ReactDOM.unmountComponentAtNode(this.$refs.react)
      // restore native method
      recoverDomMethods()
    },
    updated() {
      // ignore the first strange update by Teleport of 'applyVueInReact'
      /**
       *  If the React component renders the slots passed in the Vue component,
       *  the 'slots' will be rendered into the React component using 'applyVueInReact',
       *  and the 'applyVueInReact' will use 'Teleport',
       *  and the scope of 'Teleport' is integrated with the outer Vue component ,
       *  will cause the outer Vue component to trigger an 'updated' life cycle by default
       **/
      if (this.IGNORE_STRANGE_UPDATE) return

      this.mountReactComponent(true, {slot: true})
    },
    inheritAttrs: false,
    watch: {
      $attrs: {
        handler() {
          this.mountReactComponent(true, {attrs: true})
        },
        deep: true,
      },
      injectedProps: {
        handler() {
          this.mountReactComponent(true, {attrs: true})
        },
        deep: true,
      }
    },
  }
}
