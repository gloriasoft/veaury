import React from 'react'
class WithVueRouterCom extends React.Component {
  constructor (props) {
    super(props)
    const __routeKey = props.__widthVueRouter__options?.routeKey
    const __routerKey = props.__widthVueRouter__options?.routerKey
    Object.assign(this, {__routeKey, __routerKey})
  }
  componentDidMount () {
    // watch
    if (!this.vueWrapperRef) return
    this.subscribe = this.vueWrapperRef.$watch('$route', () => {
      this.setState({
        [this.__routerKey]: this.vueWrapperRef?.$router,
        [this.__routeKey]: this.vueWrapperRef?.$route
      })
    })
  }
  componentWillUnmount () {
    // unwatch
    this.subscribe()
  }
  render () {
    if (!this.checkVueInstance) {
      this.checkVueInstance = true
      const fiberNode = this._reactInternals || this._reactInternalFiber
      let parentInstance = fiberNode.return
      let vueWrapperRef
      // Look up the vueWrapperRef
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
      if (!vueWrapperRef || !vueWrapperRef.$router) {
        console.warn('Vue router does not exist! You must setting the Vue router in the Vue Instance options first.')
      } else {
        this.vueWrapperRef = vueWrapperRef
        // do not use 'setState'
        this.state = {
          [this.__routerKey]: this.vueWrapperRef?.$router,
          [this.__routeKey]: this.vueWrapperRef?.$route
        }
      }
    }
    const {__widthVueRouter__forwardedRef, __widthVueRouter__component, passedProps} = this.props
    let Component = __widthVueRouter__component
    let refInfo = {}
    if (typeof Component === 'function' && Component.length > 1) {
      Component = React.forwardRef(Component)
      refInfo = {
        ref: __widthVueRouter__forwardedRef
      }
    }
    return (
        <Component {...passedProps} {...this.state} {...refInfo}/>
    )
  }
}
export default function widthVueRouter (Component, options = {
  routeKey: '$vueRoute',
  routerKey: '$vueRouter'
}) {
  return React.forwardRef((props, ref) => (
    <WithVueRouterCom __widthVueRouter__forwardedRef={ref} __widthVueRouter__component={Component} __widthVueRouter__options={options} passedProps={props} />
  ))
}
