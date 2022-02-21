import React, { version } from "react"
import ReactDOM from "react-dom"
import applyVueInReact from "./applyVueInReact"
import { setOptions } from "./options"
import { h as createElement } from 'vue'
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
    // 使用reactRef属性保存目标react组件的实例，可以被父组setRef件的实例获取到
    wrapInstance.reactRef = ref
    // 将react实例的可枚举属性挂到vue实例中
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


    // 兼容接收useRef类型的参数
    this.setRef.current = ref

    // 并且将vue的中间件实例保存在react组件的实例中
    // react组件可以通过这个属性来判断是否被包囊使用
    ref.vueWrapperRef = wrapInstance
  }

  constructor(props) {
    super(props)
    // 将所有的属性全部寄存在中间件的状态中，原理是通过一个有状态的React组件作为中间件，触发目标组件的props
    this.state = {
      ...props,
      ...(options.isSlots ? { children: Component } : {}),
    }
    this.setRef = this.setRef.bind(this)
    this.vueInReactCall = this.vueInReactCall.bind(this)
    this.vueWrapperRef = wrapInstance
  }

  // 对于插槽的处理仍然需要将VNode转换成React组件
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
        // 有些react组件通过直接处理自身children的方式给children中的组件传递属性，会导致传递到包囊层中
        // 这里对包囊层属性进行透传，透传条件为children中只有一个vnode
        if (children?.length === 1 && children[0]?.data) {
          // 过滤掉内部属性
          const {key, ...otherAttrs} = this.$attrs
          children[0].props = {...otherAttrs, ...children[0].props}
        }
        // return createElement(options.react.slotWrap, { ...options.react.slotWrapAttrs }, children)
        // vue3不再需要根节点
        return children
      },
    }
  }

  componentWillUnmount() {
    if (!wrapInstance.reactRef) return
    // 垃圾回收，但是保留属性名，借鉴vue的refs对于组件销毁保留属性名的模式
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
    // 保留一份作用域和具名插槽，用于之后再透传给vue组件
    const $slots = {}
    const $scopedSlots = {}
    // 插槽的解析
    for (const i in props) {
      if (!props.hasOwnProperty(i) || props[i] == null) continue
      if (props[i].__slot) {
        if (!props[i].reactSlot) {
          const vueSlot = props[i]
          // 执行applyVueInReact方法将直接获得react组件对象，无需使用jsx
          // props[i] = { ...applyVueInReact(this.createSlot(props[i]))() }
          // 自定义插槽处理
          // TODO: defaultSlotsFormatter后续考虑
          if (options.defaultSlotsFormatter) {
            props[i].__top__ = this.vueWrapperRef
            props[i] = options.defaultSlotsFormatter(props[i], this.vueInReactCall, hashList)
            if (props[i] instanceof Array || (typeof props[i]).indexOf("string", "number") > -1) {
              props[i] = [...props[i]]
            } else if (typeof props[i] === "object") {
              props[i] = { ...props[i] }
            }
          } else {
            props[i] = { ...applyVueInReact(this.createSlot(props[i]), { ...options, isSlots: true, wrapInstance }).render() }
          }
          props[i].vueSlot = vueSlot
        } else {
          props[i] = props[i].reactSlot
        }
        $slots[i] = props[i]
      } else if (props[i].__scopedSlot) {
        // 作用域插槽是个纯函数，在react组件中需要传入作用域调用，然后再创建vue的插槽组件
        props[i] = props[i](this.createSlot)
        $scopedSlots[i] = props[i]
      }
    }
    // 普通插槽
    if (children != null) {
      if (!children.reactSlot) {
        const vueSlot = children
        // 自定义插槽处理
        if (options.defaultSlotsFormatter) {
          children.__top__ = this.vueWrapperRef
          children = options.defaultSlotsFormatter(children, this.vueInReactCall, hashList)
          if (children instanceof Array || (typeof children).indexOf("string", "number") > -1) {
            children = [...children]
          } else if (typeof children === "object") {
            children = { ...children }
          }
        } else {
          children = { ...applyVueInReact(this.createSlot(children), { ...options, isSlots: true, wrapInstance }).render() }
        }
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
    // 自定义处理参数
    if (options.defaultPropsFormatter) {
      finalProps = options.defaultPropsFormatter(props, this.vueInReactCall, hashList)
    }
    const newProps = { ...finalProps }
    // 判断是否要通过一个class组件包装一下来获取ref
    // 通过判断Component的原型是否不是Function原型
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
  // 兼容esModule
  if (component.__esModule && component.default) {
    component = component.default
  }
  if (options.isSlots) {
    component = component()
  }
  // 处理附加参数
  options = setOptions(options, undefined, true)
  return {
    originReactComponent: component,
    data() {
      return {
        portals: [],
        portalKeyPool: [],
        maxPortalCount: 0,
      }
    },
    created() {
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
      const VNode = createElement(options.react.componentWrap, { ref: "react", ...options.react.componentWrapAttrs || {} }, this.portals.map(({ Portal, key }) => Portal(createElement, key)))
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
      // hack!!!! 一定要在render函数李触发，才能激活具名插槽
      slotsInit(vnode) {
        // TODO: 之后处理
        // 针对pureTransformer类型的react组件进行兼容，解决具名插槽和作用域插槽不更新的问题
        // if (vnode) {
        //   if (vnode.componentOptions?.Ctor?.options && !vnode.componentOptions?.Ctor?.options.originReactComponent) return
        //   if (vnode.data?.scopedSlots) {
        //     Object.keys(vnode.data?.scopedSlots).forEach((key) => {
        //       if (typeof vnode.data.scopedSlots[key] === "function") {
        //         try {
        //           vnode.data.scopedSlots[key]()
        //         } catch (e) {}
        //       }
        //     })
        //   }
        //   const children = vnode.children || vnode.componentOptions?.children || []
        //   children.forEach((subVnode) => {
        //     this.slotsInit(subVnode)
        //   })
        //   return
        // }
        Object.keys(this.$slots).forEach((key) => {
          try {
            this.$slots[key]()
          } catch (e) {}
        })
      },
      // 用多阶函数解决作用域插槽的传递问题
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
        // 先提取透传属性
        // let {
        //   $slots: __passedPropsSlots,
        //   $scopedSlots: __passedPropsScopedSlots,
        //   children,
        //   ...__passedPropsRest
        // } = (this.$props.dataPassedProps != null ? this.$props.dataPassedProps : {})

        // 获取style scoped生成的hash
        const hashMap = {}
        const hashList = []
        const scopedId = this.$.vnode.scopeId
        if (scopedId) {
          hashMap[scopedId] = ""
          hashList.push(scopedId)
        }

        const normalSlots = {}
        const scopedSlots = {}
        let children
        if (!update || update && updateType?.slot) {
          // 处理具名插槽，将作为属性被传递
          // vue3所有插槽都函数（作用域插槽）
          // 为了让react区分是renderProps还是reactNode，这里仍然要区分是作用域插槽还是具名插槽
          // 约定以特殊的slots key的前缀作为具名插槽，处理方式就是直接执行函数

          // 对插槽类型的属性做标记
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

        // 预生成react组件的透传属性
        // const __passedProps = {
        //   ...__passedPropsRest,
        //   ...{ ...this.$attrs },
        //   ...(!update || update && updateType?.slot ? {
        //     $slots: normalSlots,
        //     $scopedSlots: scopedSlots,
        //     children,
        //   } : {})
        // }
        let lastNormalSlots
        if (!update || update && updateType?.slot) {
          lastNormalSlots = { ...normalSlots }
          children = lastNormalSlots.default
          delete lastNormalSlots.default
        }

        // 存上一次
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
        // 如果不传入组件，就作为更新
        if (!update) {
          compareLast.slot()
          compareLast.attrs()
          const Component = createReactContainer(component, options, this)
          let reactRootComponent = <Component
              {...this.$attrs}
              {...{ children }}
              {...lastNormalSlots}
              {...scopedSlots}
              {...(this.$attrs.class ? { className: this.$attrs.class } : {})}
              {...hashMap}
              hashList={hashList}
              style={this.$attrs.style}
              ref={(ref) => (this.reactInstance = ref)}
          />
          // 必须通过ReactReduxContext连接context
          if (this.$redux && this.$redux.store && this.$redux.ReactReduxContext) {
            const ReduxContext = this.$redux.ReactReduxContext
            reactRootComponent = <ReduxContext.Provider value={{ store: this.$redux.store }}>{reactRootComponent}</ReduxContext.Provider>
          }

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

          const reactInstance = ReactDOM.render(
              reactRootComponent,
              container,
          )
        } else {

          const setReactState = () => {
            this.reactInstance && this.reactInstance.setState((prevState) => {
              // Clear the previous 'state', preventing merging
              Object.keys(prevState).forEach((key) => {
                delete prevState[key]
              })
              return {
                ...this.cache,
                ...this.last.slot,
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
              style: this.$attrs.style,
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
      }
    },
  }
}
