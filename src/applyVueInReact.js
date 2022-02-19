import React, {version} from 'react'
import {Teleport, h as createElement, createApp} from 'vue'
import applyReactInVue from './applyReactInVue'
import { reactRouterInfo, setReactRouterInVue, updateReactRouterInVue } from './applyReactRouterInVue'
import {setOptions} from './options'
import REACT_ALL_HANDLERS from './reactAllHandles'
import lookupVueWrapperRef from "./lookupVueWrapperRef"

const unsafePrefix = parseFloat(version) >= 17 ? 'UNSAFE_' : ''
const optionsName = 'vuereact-combined-options'


// function toCamelCase(val) {
//   const reg = /-(\w)/g
//   return val.replace(reg, ($, $1) => $1.toUpperCase())
// }

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

  if (reactRouterInfo.withRouter) {
    if (!VueContainer.RouterTargetComponent) {
      VueContainer.RouterTargetComponent = reactRouterInfo.withRouter(GetReactRouterPropsCom)
    }
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
    let { component, [optionsName]: options, 'v-slots': $slots = {}, children, ...props } = nextProps
    if (this.currentVueComponent !== component) {
      this.updateVueComponent(component)
    }
    if (component.__fromReactSlot) return
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
    this.vueInstance && Object.assign(this.vueInstance.$data, this.parseVModel(props))
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

  // parse v-model
  parseVModel (props) {
    const VModels = {}
    const newProps = {...props}
    function createModifiers(VModels, modelKey, modifiers) {
      const modifiersObject = {}
      modifiers.forEach((key) => {
        modifiersObject[key] = true
      })
      return VModels[(modelKey === 'modelValue'? 'model': modelKey) + 'Modifiers'] = modifiersObject
    }
    function setVModel(originValue, modelKey, errorFrom = 'v-model') {
      const modelMix = originValue
      if (modelMix instanceof Array) {
        if (typeof modelMix[1] !== 'function') {
          throw Error(`[error:veaury] Parameter type error from '${errorFrom}', a single v-model is an array, the second element of the array must be a setter function`)
        }
        const setter = modelMix[1]
        if (typeof modelMix[2] === 'string') {
          modelKey = modelMix[2]
          if (modelMix[3] instanceof Array) {
            createModifiers(VModels, modelKey, modelMix[3])
          }
        } else if (modelMix[2] instanceof Array) {
          createModifiers(VModels, modelKey, modelMix[2])
        }
        VModels['onUpdate:' + modelKey] = setter
        VModels[modelKey] = modelMix[0]
      } else {
        throw Error(`[error:veaury] Parameter type error from '${errorFrom}', a single v-model is an array, such as [val, setter, argumentKey, modifiers] or [val, setter, modifiers]`)
      }
    }
    Object.keys(props).forEach((key) => {
      // parse onUpdate event
      let matcher = key.match(/^onUpdate-([^-]+)/)
      if (matcher) {
        delete newProps[key]
        newProps[`onUpdate:${matcher[1]}`] = props[key]
        return
      }

      // single v-model
      matcher = key.match(/^v-model($|:([^:]+)|-([^:]+))/)
      if (matcher) {
        let modelKey = matcher[2] || matcher[3] || 'modelValue'
        setVModel(props[key], modelKey)
        delete newProps[key]
        return
      }
      // multiple v-model
      if (key === 'v-models') {
        if (typeof props[key] === 'object' && !(props[key] instanceof Array)) {
          const modelsParam = props[key]
          Object.keys(modelsParam).forEach((key) => {
            setVModel(modelsParam[key], key, 'v-models')
          })
          delete newProps[key]
        } else {
          throw Error('[error:veaury] The parameter \'v-models\' must be an object type, such as {[argumentKey]: singleVModel}')
        }
      }
    })
    return {...newProps, ...VModels}
  }

  transferSlots ($slots) {
    // 将$slots中的内容处理成函数，防止被vue的data进行observer处理
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
  // 将通过react组件的ref回调方式接收组件的dom对象，并且在class的constructor中已经绑定了上下文
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
    const vueOptionsData = { ...this.parseVModel(props) }
    const vueOptions = {
      data() {
        return options.isSlots? { children: VueContainerInstance.currentVueComponent.originVNode }: vueOptionsData
      },
      created() {
        this.reactWrapperRef = VueContainerInstance
        setVueInstance(this)
      },
      methods: {
        // 获取作用域插槽
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
                  newSlot?.component?.ctx.reactInstance.setState({ children: scopedSlot.apply(this, args) })
                }
                return newSlot
              }
            })(reactFunction)
            tempScopedSlots[i].reactFunction = reactFunction
          }
          return tempScopedSlots
        },
        // 获取插槽整体数据
        getChildren (createElement, children) {
          // 这里要做判断，否则没有普通插槽传入，vue组件又设置了slot，会报错
          if (children != null) {
            if (typeof children === 'function') children = children()
            if (children.vueSlot) {
              return children.vueSlot
            }
            let newSlot
            if (!this.getChildren.__vnode) {
              newSlot = createElement(applyReactInVue(() => children, { ...options, isSlots: true, wrapInstance: VueContainerInstance }))
              this.getChildren.__vnode = newSlot
            } else {
              newSlot = this.getChildren.__vnode
              newSlot?.component?.ctx.reactInstance.setState({ children })
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
      beforeUnmount () {
        // 垃圾回收
        VueContainerInstance.vueRef = null
        this.$refs.use_vue_wrapper.reactWrapperRef = null
      },
      render () {
        // Filter out the content that is not an property and extract it separately
        let { component,
          $slots,
          children,
          'class': className = '',
          style = '',
          ...lastProps } = this.$data

        // 获取插槽数据（包含了具名插槽）
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
            'class': className || newClassName || newClassName1 || '',
            style,
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
    // 获取react的fiber实例
    let vueWrapperRef = options.wrapInstance
    if (!vueWrapperRef) {
      vueWrapperRef = lookupVueWrapperRef(this)
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

    this.vueInstance = createApp(vueOptions).mount(targetElement)
  }

  updateVueComponent (nextComponent) {
    if (!this.vueInstance) return

    // 使用$forceUpdate强制重新渲染vue实例，因为此方法只会重新渲染当前实例和插槽，不会重新渲染子组件，所以不会造成性能问题
    if (nextComponent.__fromReactSlot) {
      this.vueInstance.children = typeof nextComponent.originVNode === 'function'? nextComponent.originVNode: () => nextComponent.originVNode
    } else {
      this.currentVueComponent = nextComponent
      // 如果是标准的vue组件，则整个替换use_vue_wrapper为新的组件
      // this.vueInstance.$options.components.use_vue_wrapper = nextComponent
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

  // 兼容esModule
  if (component.__esModule && component.default) {
    component = component.default
  }

  // // 使用React.forwardRef之后，组件不再是函数组件，如果使用applyVueInReact处理插槽vue的插槽，需要直接调用返回对象的render方法
  return React.forwardRef((props, ref) => {
    return <VueContainer {...props} component={component} ref={ref} {...{[optionsName]: options}}/>
  })
}
