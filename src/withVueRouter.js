import vueRootInfo from './vueRootInfo'
import React from 'react'
class WithVueRouterCom extends React.Component {
  constructor (props) {
    super(props)
    if (!vueRootInfo.$root?.$router) {
      throw Error('Vue router does not exist! You must setting the Vue router in the Vue Instance options first.')
    }
    this.state = {
      $vueRouter: vueRootInfo.$root.$router,
      $vueRoute: vueRootInfo.$root.$route
    }
  }
  componentDidMount () {
    // watch
    this.subscribe = vueRootInfo.$root.$watch('$route', () => {
      this.setState({
        $vueRouter: vueRootInfo.$root.$router,
        $vueRoute: vueRootInfo.$root.$route
      })
    })
  }
  componentWillUnmount () {
    // unwatch
    this.subscribe()
  }
  render () {
    let Component = this.props.__widthVueRouter__component
    let refInfo = {}
    if (typeof Component === 'function' && Component.length > 1) {
      Component = React.forwardRef(Component)
      refInfo = {
        ref: this.props.__widthVueRouter__forwardedRef
      }
    }
    return (
        <Component {...this.props} {...this.state} {...refInfo}/>
    )
  }
}
export default function widthVueRouter (Component) {
  return React.forwardRef((props, ref) => (
    <WithVueRouterCom __widthVueRouter__forwardedRef={ref} __widthVueRouter__component={Component} {...props} />
  ))
}
