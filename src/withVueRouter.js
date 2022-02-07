import vueRootInfo from './vueRootInfo'
import React from 'react'
import Vue from 'vue'
const vueRouterInfo = {}
export default function widthVueRouter (Component) {
  class WithVueRouterCom extends React.Component {
    constructor (props) {
      super(props)
      // 判断是否有vue的router
      if (!vueRouterInfo.instance) {
        if (!vueRootInfo.router) {
          throw Error('Vue router does not exist! You must setting the Vue router in the Vue Instance options first.')
        }
        // 这里需要借用一个vue实例来完成watch
        vueRouterInfo.instance = new Vue({
          router: vueRootInfo.router
        })
      }
      this.state = {
        $vueRouter: vueRouterInfo.instance.$router,
        $vueRoute: vueRouterInfo.instance.$route
      }
    }
    componentDidMount () {
      // 订阅
      this.subscribe = vueRouterInfo.instance.$watch('$route', () => {
        this.setState({
          $vueRouter: vueRouterInfo.instance.$router,
          $vueRoute: vueRouterInfo.instance.$route
        })
      })
    }
    componentWillUnmount () {
      // 停止订阅
      this.subscribe()
    }
    render () {
      return (
        <Component {...this.props} {...this.state} ref={this.props.forwardedRef}/>
      )
    }
  }
  // 转发ref
  return React.forwardRef((props, ref) => (
    <WithVueRouterCom forwardedRef={ref} {...props} />
  ))
}
