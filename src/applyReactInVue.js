import * as React from "react"
import * as ReactDOM from "react-dom"
// TODO: react 18
// import { createRoot } from "react-dom/client"
import applyVueInReact from "./applyVueInReact"
import { setOptions } from "./options"
import { h as createElement, getCurrentInstance, reactive, Fragment as VueFragment } from 'vue'
import { overwriteDomMethods, recoverDomMethods } from './overrideDom'

function toRaws(obj) {
  return obj;
  // TODO: Use toRaw to transform property values passed to react components
  // if (!obj) return obj
  // const newObj = {}
  // Object.keys(obj).forEach((key) => {
  //   newObj[key] = toRaw(obj[key])
  // })
  // return newObj
}

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

  // The enumerable properties of the react instance are linked to the vue instance
  reactPropsLinkToVueInstance(ref) {
    Object.keys(ref).forEach((key) => {
      if (!wrapInstance[key]) {
        wrapInstance[key] = ref[key]
      }
    })
    // Iterate over all properties on the __proto__ object, except for 'render' and 'constructor'
    Object.getOwnPropertyNames(ref.__proto__).filter((key) => ['constructor', 'render'].indexOf(key) < 0).forEach((key) => {
      if (!wrapInstance[key]) {
        wrapInstance[key] = ref[key]
      }
    })
  }
  setRef(ref) {
    if (!ref) return
    // Use the reactRef property to save the instance of the target react component,
    // which can be obtained by the setRef instance of the parent component
    wrapInstance.__veauryReactRef__ = ref
    this.reactPropsLinkToVueInstance(ref)
    Promise.resolve().then(() => this.reactPropsLinkToVueInstance(ref))

    // Compatible with receiving parameters of type useRef
    this.setRef.current = ref

    // save the middleware instance of vue in the instance of the react component
    // React components can use this property to determine whether they are used by encapsulation
    ref.__veauryVueWrapperRef__ = wrapInstance
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
    this.__veauryVueWrapperRef__ = wrapInstance
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
    if (!wrapInstance.__veauryReactRef__) return
    // Garbage collection, but retain property names,
    // vue's refs retain the mode of property names for component destruction
    wrapInstance.__veauryReactRef__.__veauryVueWrapperRef__ = null
    wrapInstance.__veauryReactRef__ = null
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
          console.log(8888888888, i, props[i])
          const vueSlot = props[i]
          // TODO: defaultSlotsFormatter
          // if (options.defaultSlotsFormatter) {
          //   props[i].__top__ = this.__veauryVueWrapperRef__
          //   props[i] = options.defaultSlotsFormatter(props[i], this.vueInReactCall, hashList)
          //   if (props[i] instanceof Array || (typeof props[i]).indexOf("string", "number") > -1) {
          //     props[i] = [...props[i]]
          //   } else if (typeof props[i] === "object") {
          //     props[i] = { ...props[i] }
          //   }
          // } else {
            props[i] = { ...applyVueInReact(this.createSlot(props[i]), { ...options, isSlots: true, wrapInstance }).render() }
          // }
          props[i].vueFunction = vueSlot
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

    const getChildren = () => {
      if (!children.reactSlot) {
        const vueSlot = children


        // if (typeof children === 'function') {
        //   const trueChildren = children()
        //   // Check if children are from react children wrapped by applyReactInVue
        //   if (trueChildren.length === 1) {
        //     if (trueChildren[0].reactSlot) {
        //       children = trueChildren[0].reactSlot
        //       return
        //     }
        //     // Vue Fragment wrapped
        //     if (trueChildren[0].type === VueFragment && trueChildren[0].children?.length === 1 && trueChildren[0].children[0].reactSlot) {
        //       children = trueChildren[0].children[0].reactSlot
        //       return
        //     }
        //   }
        // }
        // TODO: defaultSlotsFormatter
        // if (options.defaultSlotsFormatter) {
        //   children.__top__ = this.__veauryVueWrapperRef__
        //   children = options.defaultSlotsFormatter(children, this.vueInReactCall, hashList)
        //   if (children instanceof Array || (typeof children).indexOf("string", "number") > -1) {
        //     children = [...children]
        //   } else if (typeof children === "object") {
        //     children = { ...children }
        //   }
        // } else {
        children = { ...applyVueInReact(this.createSlot(children), { ...options, isSlots: true, wrapInstance }).render() }
        children.vueFunction = vueSlot
        // }
        return
      }
      children = children.reactSlot
    }
    // parse normal slots
    if (children != null) {
      // Use a predicate function to determine the value of children
      getChildren()
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
    // class components and object components and components that can pass catchVueRef
    if ((Object.getPrototypeOf(Component) !== Function.prototype && !(typeof Component === "object" && !Component.render)) || applyReact.catchVueRefs()) {
      // If it is a function component (indicates that the catchVueRef is passed), remove the ref
      // Avoid react component warning that ref cannot be used
      if (Object.getPrototypeOf(Component) === Function.prototype) {
        delete refInfo.ref
      }
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
    setup(props, context) {
      // If it is a slot, useInjectPropsFromWrapper is not executed
      if (options.isSlots) return
      const setupResult = {}
      const injectedProps = reactive({})
      const instance = getCurrentInstance()

      const injection = options.useInjectPropsFromWrapper || component.__veauryInjectPropsFromWrapper__
      if (typeof injection === 'function') {
        const injectionResult = injection.call(instance.proxy, props)
        if (typeof injectionResult !== "function") {
          Object.assign(injectedProps, injectionResult)
          setupResult.__veauryInjectedProps__ = injectedProps
        } else {
          instance.proxy.__veauryInjectedComputed__ = injectionResult
        }
      }
      // setupResult.__veauryVueProviderList__ = vueProviderFunctionList
      // createProviderFromVueWrapper
      // if (vueProviderFunctionList.length > 0) {
      //   const vueProviderList = []
      //   vueProviderFunctionList.forEach((vueProviderFunction) => {
      //
      //   })
      // }
      // vueProviderFunctionList.forEach(() => {})

      return setupResult
    },
    data() {
      return {
        VEAURY_Portals: []
      }
    },
    created() {
      this.__veauryPortalKeyPool__ = []
      this.__veauryMaxPortalCount__ = 0
    },
    computed: {
      __veauryInjectedProps__() {
        return this.__veauryInjectedComputed__?.call(this)
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
      const VNode = createElement(options.react.componentWrap, { ref: "react", ...options.react.componentWrapAttrs || {}}, this.VEAURY_Portals.map(({ Portal, key }) => Portal(createElement, key)))
      // Must be executed after 'VNode' is created
      // this.slotsInit()
      this.__veauryCheckReactSlot__()
      return VNode
    },
    methods: {
      __veauryCheckReactSlot__() {
        function linkReact(slot, child, type) {
          if (child[type]) {
            slot[type] = child[type]
            return true
          }
        }
        Object.keys(this.$slots).forEach((key) => {
          try {
            const trueChildren = this.$slots[key]({})
            // Check if children are from react children wrapped by applyReactInVue
            if (trueChildren.length === 1) {
              const child = trueChildren[0]
              if (linkReact(this.$slots[key], child, 'reactSlot')) return
              // if (linkReact(this.$slots[key], child, 'reactFunction')) return

              // Vue Fragment wrapped
              if (child.type === VueFragment && child.children?.length === 1) {
                const subChild = child.children[0]
                if (linkReact(this.$slots[key], subChild, 'reactSlot')) return
                // linkReact(this.$slots[key], subChild, 'reactFunction')
              }
            }
          } catch(e) {}
        })
      },
      __veauryPushVuePortal__(vuePortal) {
        const key = this.__veauryPortalKeyPool__.shift() || this.__veauryMaxPortalCount__++
        this.VEAURY_Portals.push({
          Portal: vuePortal,
          key,
        })
      },
      __veauryRemoveVuePortal__(vuePortal) {
        let index
        const portalData = this.VEAURY_Portals.find((obj, i) => {
          if (obj.Portal === vuePortal) {
            index = i
            return true
          }
        })
        this.__veauryPortalKeyPool__.push(portalData.key)
        this.VEAURY_Portals.splice(index, 1)
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
      __veauryGetScopeSlot__(slotFunction, hashList, originSlotFunction) {
        const _this = this
        function scopedSlotFunction(createReactSlot) {
          function getSlot(...args) {
            if (slotFunction.reactFunction) {
              return slotFunction.reactFunction.apply(this, args)
            }
            console.log(111111, slotFunction.reactFunction)
            // TODO: Determine whether there is a reactFunction,
            //  but it will cause the slot function to be executed twice, and will trigger a vue warning
            // const trueSlot = slotFunction.apply(this, args)
            // if (trueSlot.length === 1) {
            //   if (trueSlot[0].reactFunction) {
            //     return trueSlot[0].reactFunction.apply(this, args)
            //   }
            //   if (trueSlot[0].children?.length === 1 && trueSlot[0].children[0].reactFunction) {
            //     return trueSlot[0].children[0].reactFunction.apply(this, args)
            //   }
            // }
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
      __veaurySyncUpdateProps__(extraData) {
        // this.__veauryMountReactComponent__(true, false, extraData)
        this.__veauryReactInstance__ && this.__veauryReactInstance__.setState(extraData)
      },
      __veauryMountReactComponent__(update, updateType, extraData = {}) {
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
            scopedSlots[i] = this.__veauryGetScopeSlot__(this.$slots[i], hashList, this.$.vnode?.children?.[i])
          }
        }

        let lastNormalSlots
        if (!update || update && updateType?.slot) {
          lastNormalSlots = { ...normalSlots }
          children = lastNormalSlots.default
          delete lastNormalSlots.default
        }

        // cache last data
        this.__veauryLast__ = this.__veauryLast__ || {}
        this.__veauryLast__.slot = this.__veauryLast__.slot || {}
        this.__veauryLast__.attrs = this.__veauryLast__.attrs || {}
        const compareLast = {
          slot: () => {
            this.__veauryLast__.slot = {
              ...(children ? { children } : {children: null}),
              ...lastNormalSlots,
              ...scopedSlots,
            }
          },
          attrs: () => {
            this.__veauryLast__.attrs = this.$attrs
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
            // __veauryVueProviderList__={this.__veauryVueProviderList__}
            {...toRaws(this.$attrs)}
            {...toRaws(this.__veauryInjectedProps__)}
            {...{ children }}
            {...lastNormalSlots}
            {...scopedSlots}
            {...(this.$attrs.class ? { className: this.$attrs.class } : {})}
            {...hashMap}
            hashList={hashList}
            {...(this.$attrs.style ? { style: this.$attrs.style } : {})}
            // style={this.$attrs.style}
            ref={(ref) => (this.__veauryReactInstance__ = ref)}
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
            reactWrapperRef.__veauryVueWrapperRef__ = this
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
          // TODO: react 18
          // this.__veauryReactApp__ = createRoot(container)
          // this.__veauryReactApp__.render(reactRootComponent)
        } else {

          const setReactState = () => {
            this.__veauryReactInstance__ && this.__veauryReactInstance__.setState((prevState) => {
              // Clear the previous 'state', preventing merging
              Object.keys(prevState).forEach((key) => {
                if (options.isSlots && key === 'children') return
                delete prevState[key]
              })
              return {
                ...this.__veauryCache__,
                ...toRaws(this.__veauryInjectedProps__),
                ...!options.isSlots && this.__veauryLast__.slot,
                ...toRaws(this.__veauryLast__.attrs),
                // '__veauryVueProviderList__': this. __veauryVueProviderList__
              }
            })
            this.__veauryCache__ = null
          }


          // do the micro task update
          if (this.microTaskUpdate) {
            // 'Promise' asynchronous merge update
            if (!this.__veauryCache__) {
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

          this.__veauryCache__ = {
            ...this.__veauryCache__ || {},
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
      this.__VEAURY_IGNORE_STRANGE_UPDATE__ = true
      Promise.resolve().then(() => {
        this.__VEAURY_IGNORE_STRANGE_UPDATE__ = false
      })
      clearTimeout(this.updateTimer)
      this.__veauryMountReactComponent__()
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
      // TODO: react 18
      // this.__veauryReactApp__.unmount()
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
      if (this.__VEAURY_IGNORE_STRANGE_UPDATE__) return

      this.__veauryMountReactComponent__(true, {slot: true})
    },
    inheritAttrs: false,
    watch: {
      $attrs: {
        handler() {
          this.__veauryMountReactComponent__(true, {attrs: true})
        },
        deep: true,
      },
      __veauryInjectedProps__: {
        handler() {
          this.__veauryMountReactComponent__(true, {attrs: true})
        },
        deep: true,
      },
      // __veauryVueProviderList__: {
      //   handler() {
      //     this.__veauryMountReactComponent__(true, {attrs: true})
      //   },
      //   deep: true,
      // },
    },
  }
}
