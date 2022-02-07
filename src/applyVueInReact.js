import React, {version, Fragment} from 'react'
import Vue, {Teleport, h as createElement, createApp} from 'vue'

import applyReactInVue from './applyReactInVue'
import vueRootInfo from './vueRootInfo'
import { reactRouterInfo, setReactRouterInVue, updateReactRouterInVue } from './applyReactRouterInVue'
import globalOptions, {setOptions} from './options'
import ReactDOM from "react-dom";
import REACT_ALL_HANDLERS from './reactAllHandles'
import App from "../dev-projcet/src/App";

const unsafePrefix = parseFloat(version) >= 17 ? 'UNSAFE_' : ''
const optionsName = 'vuereact-combined-options'

// 获取随机的元素id，并保证不重复
function getRandomId (prefix) {
  const id = prefix + (Math.random() + '').substr(2)
  // 如果产生碰撞则重新获取
  if (getRandomId.pool.has(id)) {
    return getRandomId(prefix)
  }
  getRandomId.pool.add(id)
  return id
}
getRandomId.pool = new Set()

// 根据传入的是否是字符串，判断是否需要获取Vue的全局组件
function filterVueComponent (component) {
  if (typeof component === 'string') {
    return Vue.component(component)
  }
  return component
}
// 获取组件选项对象
function getOptions (Component) {
  if (typeof Component === 'function') {
    // return new (Component)().$options
    return Component.options
  }
  return Component
}
// 利用多阶组件来获取reactRouter
class GetReactRouterPropsCom extends React.Component {
  constructor (props) {
    super(props)
    let { history, match, location } = props
    // 设置react router属性绑定倒所有的vue的原型上
    setReactRouterInVue({
      history,
      match,
      location
    })
  }
  [`${unsafePrefix}componentWillReceiveProps`] (nextProps) {
    let { history, match, location } = nextProps
    updateReactRouterInVue({
      history,
      match,
      location
    })
  }
  render () {
    const { history, match, location, ...newProps } = this.props
    return <VueComponentLoader {...newProps} ref={ this.props.forwardRef } />
  }
}
const VueContainer = React.forwardRef((props, ref) => {
  const globalOptions = setOptions(props[optionsName] || {}, undefined, true)

  // 判断是否获取过reactRouter
  if (reactRouterInfo.withRouter) {
    if (!VueContainer.RouterTargetComponent) {
      VueContainer.RouterTargetComponent = reactRouterInfo.withRouter(GetReactRouterPropsCom)
    }
    // withRouter方法是通过wrappedComponentRef来传递ref的
    return (
        <VueContainer.RouterTargetComponent {...{...props, [optionsName]: globalOptions}} forwardRef={ref} />
    )
  } else {
    return <VueComponentLoader {...{...props, [optionsName]: globalOptions}} ref={ref}/>
  }
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
    // 捕获vue组件
    this.currentVueComponent = filterVueComponent(props.component)
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

  // 这一步变的复杂是要判断插槽和组件的区别，如果是插槽则对wrapper传入原生事件和插槽相关的属性，如果是组件对wrapper不传入原生事件
  createVueComponentContainer () {
    let nativeProps = {}
    const options = this.props[optionsName]
    if (options.isSlots) {
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

  [`${unsafePrefix}componentWillReceiveProps`] (nextProps) {
    let { component, [optionsName]: options, ...props } = nextProps
    component = filterVueComponent(component)
    if (this.currentVueComponent !== component) {
      this.updateVueComponent(component)
    }
    if (component.__fromReactSlot) return
    Object.assign(this.vueInstance.$data.children, this.doVModel(props).children)
    // 更改vue组件的data
    this.vueInstance && Object.assign(this.vueInstance.$data, this.doVModel(props))
  }

  componentWillUnmount () {
    // 删除portal
    if (this.vuePortal) {
      this.parentVueWrapperRef.removeVuePortal(this.vuePortal)
      return
    }
    this.vueInstance && this.vueInstance.$destroy()
    getRandomId.pool.delete(this.vueTargetId)
  }

  // 处理v-model
  doVModel (props) {
    let { $model, ...newProps } = props
    if ($model === undefined) return props
    // 考虑到了自定义v-model
    let vueInstanceModelOption = { ...{ prop: 'value', event: 'input' }, ...getOptions(this.currentVueComponent).model }
    let modelProp = { [vueInstanceModelOption.prop]: $model.value }
    // 如果有绑定的事件和v-model事件相同，需合并两个绑定函数
    if (!newProps.on) newProps.on = {}
    if (newProps.on[vueInstanceModelOption.event]) {
      let oldFun = newProps.on[vueInstanceModelOption.event]
      newProps.on[vueInstanceModelOption.event] = function (...args) {
        oldFun.apply(this, args)
        $model.setter && $model.setter.apply(this, args)
      }
    } else {
      newProps.on = { ...newProps.on, ...{ [vueInstanceModelOption.event]: $model.setter || (() => {}) } }
    }
    return { ...newProps, ...modelProp }
  }

  // 处理sync
  doSync (props) {
    let { $sync, ...newProps } = props
    if ($sync === undefined) return props
    const syncValues = {}
    for (let i in $sync) {
      if (!$sync.hasOwnProperty(i) || !$sync[i] || $sync[i].value == null || $sync[i].setter == null) continue
      syncValues[i] = $sync[i].value
      let syncEvent = 'update:' + i
      // 如果有绑定的事件和sync事件相同，需合并两个绑定函数
      if (!newProps.on) newProps.on = {}
      if (newProps.on[syncEvent]) {
        let oldFun = newProps.on[syncEvent]
        newProps.on[syncEvent] = function (...args) {
          oldFun.apply(this, args)
          $sync[i].setter && $sync[i].setter.apply(this, args)
        }
      } else {
        newProps.on = { ...newProps.on, ...{ [syncEvent]: $sync[i].setter || (() => {}) } }
      }
    }
    return { ...newProps, ...syncValues }
  }
  transferSlots ($slots) {
    // 将$slots中的内容处理成函数，防止被vue的data进行observer处理
    if ($slots) {
      Object.keys($slots).forEach((key) => {
        const originSlot = $slots[key]
        $slots[key] = () => originSlot
      })
      return $slots
    }
  }
  transferChildren (children) {
    // 将children中的内容处理成函数，防止被vue的data进行observer处理
    if (children) {
      const originChildren = children
      children = () => originChildren
      return children
    }
  }
  // 将通过react组件的ref回调方式接收组件的dom对象，并且在class的constructor中已经绑定了上下文
  createVueInstance (targetElement) {
    const VueContainerInstance = this
    let { component: vueComponent, 'data-passed-props': __passedProps = {}, [optionsName]: options, children, $slots, ...props } = this.props
    children = this.transferChildren(children)
    $slots = this.transferSlots($slots)
    if (children) {
      props.children = children
    }
    if ($slots) {
      props.$slots = $slots
    }

    vueComponent = filterVueComponent(vueComponent)
    // 过滤vue组件实例化后的$attrs
    let filterAttrs = (props) => {
      // 对mixin进行合并
      let mixinsPropsArray = []
      let mixinsPropsJson = {}
      // 这一步我暂时没有想到更好的方案
      let componentOptions = getOptions(this.currentVueComponent)
      if (componentOptions.mixins) {
        componentOptions.mixins.forEach((v) => {
          if (v.props) {
            if (v.props instanceof Array) {
              mixinsPropsArray = [...v.props]
            } else {
              mixinsPropsJson = { ...v.props }
            }
          }
        })
      }

      let attrs = Object.assign({}, props)
      let optionProps = componentOptions.props
      if (optionProps) {
        if (optionProps instanceof Array) {
          let tempArr = [...optionProps, ...mixinsPropsArray]
          tempArr.forEach((v) => {
            delete attrs[v]
          })
        } else {
          let tempJson = { ...optionProps, ...mixinsPropsJson }
          for (let i in tempJson) {
            if (!tempJson.hasOwnProperty(i)) continue
            delete attrs[i]
          }
        }
      }
      return attrs
    }

    // 从作用域插槽中过滤具名插槽
    let filterNamedSlots = (scopedSlots, slots) => {
      if (!scopedSlots) return {}
      if (!slots) return scopedSlots
      for (let i in scopedSlots) {
        if (!scopedSlots.hasOwnProperty(i)) continue
        if (slots[i]) delete scopedSlots[i]
      }
      return scopedSlots
    }

    function setVueInstance(instance) {
      if (!this.vueInstance) {
        this.vueInstance = instance
      }
    }
    setVueInstance = setVueInstance.bind(this)
    // 将vue组件的inheritAttrs设置为false，以便组件可以顺利拿到任何类型的attrs
    // 这一步不确定是否多余，但是vue默认是true，导致属性如果是函数，又不在props中，会出警告，正常都需要在组件内部自己去设置false
    // component.inheritAttrs = false
    const vueOptionsData = { ...this.doSync(this.doVModel(props)), 'data-passed-props': __passedProps }
    const vueOptions = {
      ...vueRootInfo,
      data() {
        return vueOptionsData
      },
      created() {
        this.reactWrapperRef = VueContainerInstance
        setVueInstance(this)
      },
      methods: {
        // 获取具名插槽
        // 将react组件传入的$slots属性逐个转成vue组件，但是透传的插槽不做处理
        getNamespaceSlots (createElement, $slots) {
          if (!this.getNamespaceSlots.__namespaceSlots) {
            this.getNamespaceSlots.__namespaceSlots = {}
          }
          let tempSlots = Object.assign({}, $slots)
          for (let i in tempSlots) {
            if (!tempSlots.hasOwnProperty(i) || !tempSlots[i]) continue
            if (typeof tempSlots[i] === 'function') tempSlots[i] = tempSlots[i]()
            tempSlots[i] = ((slot, slotName) => {
              if (slot.vueSlot) {
                return slot.vueSlot
              }
              // 使用单例模式进行缓存，类似getChildren
              let newSlot
              if (!this.getNamespaceSlots.__namespaceSlots[i]) {
                newSlot = [createElement(applyReactInVue(() => slot, { ...options, isSlots: true, wrapInstance: VueContainerInstance }), { slot: slotName })]
                this.getNamespaceSlots.__namespaceSlots[i] = newSlot
              } else {
                newSlot = this.getNamespaceSlots.__namespaceSlots[i]
                this.$nextTick(() => {
                  newSlot[0].child.reactInstance.setState({ children: slot })
                })
              }
              newSlot.reactSlot = slot
              return newSlot
            })(tempSlots[i], i)
          }
          return tempSlots
        },
        // 获取作用域插槽
        // 将react组件传入的$scopedSlots属性逐个转成vue组件
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
                // 使用单例模式进行缓存，类似getChildren
                let newSlot
                if (!this.getScopedSlots.__scopeSlots[i]) {
                  newSlot = createElement(applyReactInVue(() => scopedSlot.apply(this, args), { ...options, isSlots: true, wrapInstance: VueContainerInstance }))
                  this.getScopedSlots.__scopeSlots[i] = newSlot
                } else {
                  newSlot = this.getScopedSlots.__scopeSlots[i]
                  // 触发通信层更新fiberNode
                  this.$nextTick(() => {
                    newSlot.child.reactInstance.setState({ children: scopedSlot.apply(this, args) })
                  })
                }
                return newSlot
              }
            })(reactFunction)
            tempScopedSlots[i].reactFunction = reactFunction
          }
          return tempScopedSlots
        },
        // 获取插槽整体数据
        // children是react jsx的插槽，需要使用applyReactInVue转换成vue的组件选项对象
        // 转化规则是单例原则，转换的vnode是用于react插槽的，vnode只是作为容器存在，恒久不变，除非chidren为空就则不返回vnode，容器将销毁
        // vnode容器恒久保持只有一个子元素，children更新时，直接对子元素浅更新，（浅更新其实可以省略），因为真正操作react fiberNode更新是reactInstance.setState
        // 在applyReactInVue中的通信层react实力会保存react插槽的children到state，获取通信层更定为vnode.child.reactInstance
        getChildren (createElement, children) {
          // 这里要做判断，否则没有普通插槽传入，vue组件又设置了slot，会报错
          if (children != null) {
            if (typeof children === 'function') children = children()
            if (children.vueSlot) {
              return children.vueSlot
            }
            let newSlot
            if (!this.getChildren.__vnode) {
              newSlot = [createElement(applyReactInVue(() => children, { ...options, isSlots: true, wrapInstance: VueContainerInstance }))]
              this.getChildren.__vnode = newSlot
            } else {
              // 此步vnode的浅更新可以省略
              // Object.assign(this.getChildren.__vnode[0], createElement(applyReactInVue(() => children, {...options, isSlots: true})))
              newSlot = this.getChildren.__vnode
              // 直接修改react的fiberNode，此过程vnode无感知，此方案只是临时
              this.$nextTick(() => {
                newSlot[0].child.reactInstance.setState({ children })
              })
            }
            newSlot.reactSlot = children
            return newSlot
          }
        }
      },
      mounted () {
        // 隐藏id
        targetElement.removeAttribute('id')
        // 在react包囊实例中，使用vueRef保存vue的目标组件实例
        VueContainerInstance.vueRef = this.$refs.use_vue_wrapper
        // 在vue的目标组件实例中，使用reactWrapperRef保存react包囊实例，vue组件可以通过这个属性来判断是否被包囊使用
        this.$refs.use_vue_wrapper.reactWrapperRef = VueContainerInstance
      },
      beforeDestroy () {
        // 垃圾回收
        VueContainerInstance.vueRef = null
        this.$refs.use_vue_wrapper.reactWrapperRef = null
      },
      render () {
        // 这里很重要，将不是属性的内容过滤掉，并单独抽取
        let { component,
          on,
          $slots,
          $scopedSlots,
          children,
          'class': className = '',
          style = '',
          'data-passed-props': {
            $slots: __passedPropsSlots,
            $scopedSlots: __passedPropsScopedSlots,
            children: __passedPropsChildren,
            on: __passedPropsOn,
            ...__passedPropsRest
          }, ...props } = this.$data
        filterNamedSlots(__passedPropsScopedSlots, __passedPropsSlots)
        // 作用域插槽的处理
        const scopedSlots = this.getScopedSlots(createElement, { ...__passedPropsScopedSlots, ...$scopedSlots })
        const lastChildren = this.getChildren(createElement, this.$slots?.default?.() || __passedPropsChildren)
        // 获取插槽数据（包含了具名插槽）
        const namedSlots = this.getNamespaceSlots(createElement, { ...__passedPropsSlots, ...$slots })
        if (lastChildren) namedSlots.default = lastChildren
        const lastSlots = [
          (lastChildren || []),
          ...Object.keys(namedSlots).map((key) => {
            if (key === 'default') {
              return
            }
            return namedSlots[key]
          })
        ]
        const lastOn = { ...__passedPropsOn, ...on }
        const nativeOn = {}

        // 解决原生事件
        Object.keys(props).forEach((keyName) => {
          if (REACT_ALL_HANDLERS.has(keyName) && typeof props[keyName] === 'function') {
            nativeOn[keyName.replace(/^on/, '').toLowerCase()] = props[keyName]
            delete props[keyName]
          }
        })

        let lastProps = {
          ...__passedPropsRest,
          ...props,
          // 封装透传属性
          'data-passed-props': {
            ...__passedPropsRest,
            ...props,
            on: lastOn,
            children: lastChildren,
            $slots: namedSlots,
            $scopedSlots: scopedSlots
          }
        }

        // 手动把props丛attrs中去除，
        // 这一步有点繁琐，但是又必须得处理
        const attrs = filterAttrs({ ...lastProps })
        const {className: newClassName, classname: newClassName1, ...lastAttrs} = attrs
        return createElement(
            VueContainerInstance.currentVueComponent,
            {
              // props: lastProps,
              // on: lastOn,
              // nativeOn,
              // attrs: lastAttrs,
              // 'class': className || newClassName || newClassName1 || '',
              // style,
              // scopedSlots: { ...scopedSlots },
              ref: 'use_vue_wrapper'
            },
            // lastSlots
        )
      }
    }

    if (!targetElement) return

    // Vue.nextTick(() => {
    const targetId = getRandomId('__vue_wrapper_container_')
    targetElement.id = targetId
    this.vueTargetId = targetId
    // 获取react的fiber实例
    let vueWrapperRef = options.wrapInstance
    if (!vueWrapperRef) {
      const fiberNode = this._reactInternals || this._reactInternalFiber
      let parentInstance = fiberNode.return
      // 向上查找react包囊层
      while (parentInstance) {
        if (parentInstance.stateNode?.parentVueWrapperRef) {
          vueWrapperRef = parentInstance.stateNode.parentVueWrapperRef
          break
        }
        if (parentInstance.stateNode?.vueWrapperRef) {
          vueWrapperRef = parentInstance.stateNode.vueWrapperRef
          break
        }
        parentInstance = parentInstance.return
      }
    } else {
      vueWrapperRef = options.wrapInstance
      vueWrapperRef.reactWrapperRef = VueContainerInstance
    }

    // 如果存在包囊层，则激活portal
    if (vueWrapperRef && document.getElementById(targetId)) {
      // 存储包囊层引用
      this.parentVueWrapperRef = vueWrapperRef

      // 存储portal引用
      this.vuePortal = (createElement, key) => createElement(Teleport, {to: '#' + targetId, key: targetId}, [createElement(Object.assign(vueOptions, {router: this._router}))])
      vueWrapperRef.pushVuePortal(this.vuePortal)
      return
    }

    // 创建vue实例
    this.vueInstance = createApp(vueOptions).mount(targetElement)
    // })

  }

  updateVueComponent (nextComponent) {
    this.currentVueComponent = nextComponent
    if (!this.vueInstance) return

    // 使用$forceUpdate强制重新渲染vue实例，因为此方法只会重新渲染当前实例和插槽，不会重新渲染子组件，所以不会造成性能问题
    // if (nextComponent.__fromReactSlot) {
    //   // 如果是来自react的slot，就强行通过修改vue组件构造器的use_vue_wrapper的缓存
    //   // Object.assign(this.vueInstance.$.components.use_vue_wrapper, nextComponent)
    // } else {
    //   // 如果是标准的vue组件，则整个替换use_vue_wrapper为新的组件
    //   this.vueInstance.$options.components.use_vue_wrapper = nextComponent
    // }
    this.vueInstance.$forceUpdate()
  }

  render () {
    return <this.vueComponentContainer portals={this.state.portals}/>
  }
}

export default function applyVueInReact (component, options = {}) {
  if (!component) {
    console.warn('Component must be passed in applyVueInReact!')
  }

  // 兼容esModule
  if (component.__esModule && component.default) {
    component = component.default
  }

  // // 使用React.forwardRef之后，组件不再是函数组件，如果使用applyVueInReact处理插槽vue的插槽，需要直接调用返回对象的render方法
  return React.forwardRef((props, ref) => {
    return <VueContainer {...props} component={component} ref={ref} {...{[optionsName]: options}}/>
  })
}
