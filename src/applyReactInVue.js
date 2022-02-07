import React, { version } from "react"
import ReactDOM from "react-dom"
import applyVueInReact, { VueContainer } from "./applyVueInReact"
import options, { setOptions } from "./options"
import {h as createElement, createApp} from 'vue'

// vueRootInfo是为了保存vue的root节点options部分信息，现在保存router、store，在applyVueInReact方法中创建vue的中间件实例时会被设置
// 为了使applyReactInVue -> applyVueInReact之后的vue组件依旧能引用vuex和vue router
import vueRootInfo from "./vueRootInfo"

const domMethods = ["getElementById", "getElementsByClassName", "getElementsByTagName", "getElementsByTagNameNS", "querySelector", "querySelectorAll"]
const domTopObject = { Document: {}, Element: {} }
// 覆盖原生的查找dom对象的方法，为了确保react在销毁前都可以获取dom，而vue的beforeDestroy阶段已经将dom卸载的问题
function overwriteDomMethods(refDom) {
  Object.keys(domTopObject).forEach((key) => {
    domMethods.forEach((method) => {
      const old = window[key].prototype[method]
      domTopObject[key][method] = old
      window[key].prototype[method] = function (...args) {
        const oldResult = old.apply(this, args)
        if ((oldResult && oldResult.constructor !== NodeList) || (oldResult.constructor === NodeList && oldResult.length > 0)) return oldResult
        return Element.prototype[method].apply(refDom, args)
      }
    })
  })
}
// 恢复原生方法
function recoverDomMethods() {
  Object.keys(domTopObject).forEach((key) => {
    domMethods.forEach((method) => {
      window[key].prototype[method] = domTopObject[key][method]
    })
  })
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
  // 用于reactDevTools调试用
  static displayName = `useReact_${Component.displayName || Component.name || "Component"}`

  // 使用静态方法申明是因为可以节省性能开销，因为内部没有调用到实例属性和方法
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
      inheritAttrs: false,
      __fromReactSlot: true,
      render() {
        if (children instanceof Function) {
          children = children(this)
        }
        console.log('XXXXXXXXXXX', children)
        // 有些react组件通过直接处理自身children的方式给children中的组件传递属性，会导致传递到包囊层中
        // 这里对包囊层属性进行透传，透传条件为children中只有一个vnode
        if (children?.length === 1 && children[0]?.data) {
          // 过滤掉内部属性
          const {key, ['data-passed-props']:dataPassedProps, ...otherAttrs} = this.$attrs
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
      "data-passed-props": __passedProps,
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
    // 封装透传属性
    __passedProps = { ...__passedProps, ...{ $slots, $scopedSlots }, children }
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
    const newProps = { ...finalProps, ...{ "data-passed-props": __passedProps } }
    // 判断是否要通过一个class组件包装一下来获取ref
    // 通过判断Component的原型是否不是Function原型
    if ((Object.getPrototypeOf(Component) !== Function.prototype && !(typeof Component === "object" && !Component.render)) || applyReact.catchVueRefs()) {
      return (
          <Component {...newProps}
                     {...{ "data-passed-props": __passedProps }} {...refInfo}>
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
      if (this.$root.$options.router) {
        vueRootInfo.router = this.$root.$options.router
      }
      if (this.$root.$options.router) {
        vueRootInfo.store = this.$root.$options.store
      }
    },
    props: ["dataPassedProps"],
    render() {
      this.slotsInit()
      return createElement(options.react.componentWrap, { ref: "react", ...options.react.componentWrapAttrs || {} }, this.portals.map(({ Portal, key }) => Portal(createElement, key)))
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
            return applyVueInReact(createReactSlot(slotFunction.apply(this, args)), { ...options, isSlots: true, wrapInstance: _this }).render()
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
      __syncUpdateProps(extraData) {
        // this.mountReactComponent(true, false, extraData)
        this.reactInstance && this.reactInstance.setState(extraData)
      },
      mountReactComponent(update, updateType, extraData = {}) {
        // 先提取透传属性
        let {
          $slots: __passedPropsSlots,
          $scopedSlots: __passedPropsScopedSlots,
          children,
          ...__passedPropsRest
        } = (this.$props.dataPassedProps != null ? this.$props.dataPassedProps : {})

        // 获取style scoped生成的hash
        const hashMap = {}
        const hashList = []
        const scopedId = this.$.vnode.scopeId
        if (scopedId) {
          hashMap[scopedId] = ""
          hashList.push(scopedId)
        }

        const normalSlots = { ...__passedPropsSlots }
        const scopedSlots = { ...__passedPropsScopedSlots }
        if (!update || update && updateType?.slot) {
          // 处理具名插槽，将作为属性被传递
          // vue3所有插槽都函数（作用域插槽）
          // 为了让react区分是renderProps还是reactNode，这里仍然要区分是作用域插槽还是具名插槽
          // 约定以特殊的slots key的前缀作为具名插槽，处理方式就是直接执行函数

          // 对插槽类型的属性做标记
          for (const i in this.$slots || {}) {
            if (!this.$slots.hasOwnProperty(i) || this.$slots[i] == null) continue
            if (options.react.vueNamedSlotsKey.find((prefix) => i.indexOf(prefix) === 0) || i === 'default') {
              normalSlots[i] = this.$slots[i]()
              normalSlots[i].__slot = true
              continue
            }
            scopedSlots[i] = this.getScopeSlot(this.$slots[i], hashList, this.$.vnode?.children?.[i])
          }
        }

        // 预生成react组件的透传属性
        const __passedProps = {
          ...__passedPropsRest,
          ...{ ...this.$attrs },
          ...(!update || update && updateType?.slot ? {
            $slots: normalSlots,
            $scopedSlots: scopedSlots,
            children,
          } : {})
        }
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
              {...__passedPropsRest}
              {...this.$attrs}
              {...{ children }}
              {...lastNormalSlots}
              {...scopedSlots}
              {...{ "data-passed-props": __passedProps }}
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
          // 必须异步，等待包囊层的react实例完毕
          // this.$nextTick(() => {
          const container = this.$refs.react
          let reactWrapperRef = options.wrapInstance

          if (!reactWrapperRef) {
            let parentInstance = this.$parent
            // 向上查找react包囊层
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

          // 如果存在包囊层，则激活portal
          if (reactWrapperRef) {
            // 存储包囊层引用
            this.parentReactWrapperRef = reactWrapperRef
            // 存储portal引用
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
          // })
        } else {

          const setReactState = () => {
            this.reactInstance && this.reactInstance.setState((prevState) => {
              // 清除之前的state，阻止合并
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


          // 更新
          if (this.microTaskUpdate) {
            // Promise异步合并更新
            if (!this.cache) {
              this.$nextTick(() => {
                // this.reactInstance && this.reactInstance.setState(this.cache)
                setReactState()
                this.microTaskUpdate = false
              })
            }
          }

          // 宏任务合并更新
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
              ...__passedPropsRest,
              ...extraData,
              ...{ "data-passed-props": __passedProps },
              ...(this.$attrs.class ? { className: this.$attrs.class } : {}),
              ...{ ...hashMap },
              hashList,
              style: this.$attrs.style,
            },
          }

          // 同步更新
          if (!this.macroTaskUpdate && !this.microTaskUpdate) {
            // ...this.last.attrs,
            // ...reactEvent,
            // ...(update && updateType?.slot ? {...this.last.slot} : {}),
            // this.reactInstance && this.reactInstance.setState(this.cache)
            setReactState()
          }
        }
      },
    },
    mounted() {
      clearTimeout(this.updateTimer)
      this.mountReactComponent()
    },
    beforeDestroy() {
      clearTimeout(this.updateTimer)
      // 删除portal
      if (this.reactPortal) {
        // 骚操作，覆盖原生dom查找dom的一些方法，使react在vue组件销毁前仍然可以查到dom
        overwriteDomMethods(this.$refs.react)
        this.parentReactWrapperRef?.removeReactPortal(this.reactPortal)
        // 恢复原生方法
        recoverDomMethods()
        return
      }
      // 删除根节点
      // 骚操作，覆盖原生dom查找dom的一些方法，使react在vue组件销毁前仍然可以查到dom
      overwriteDomMethods(this.$refs.react)
      ReactDOM.unmountComponentAtNode(this.$refs.react)
      // 恢复原生方法
      recoverDomMethods()
    },
    updated() {
      // if (this.attrsUpdated) return
      this.mountReactComponent(true, {slot: true})
    },
    inheritAttrs: false,
    watch: {
      $attrs: {
        handler() {
          this.mountReactComponent(true, {attrs: true})
          // this.attrsUpdated = true
          // Promise.resolve().then(() => {
          //   this.attrsUpdated = false
          // })
        },
        deep: true,
      },
      "$props.dataPassedProps": {
        handler() {
          this.mountReactComponent(true, {passedProps: true})
        },
        deep: true,
      },
    },
  }
}
