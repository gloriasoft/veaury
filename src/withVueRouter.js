import createLinkVueWrapperRefHoc from './createLinkVueWrapperRefHoc'

export default createLinkVueWrapperRefHoc({
  defaultOptions: {
    routeKey: '$vueRoute',
    routerKey: '$vueRouter'
  },
  createSubscribe(vueWrapperRef, {routeKey, routerKey}) {
    return vueWrapperRef.$watch('$route', () => {
      this.setState({
        [routeKey]: vueWrapperRef?.$route,
        [routerKey]: vueWrapperRef?.$router
      })
    })
  },
  beforeSetup(vueWrapperRef) {
    if (!vueWrapperRef.$router) {
      console.warn(`[veaury warn] $router does not exist!`)
      return false
    }
  },
  setupState(vueWrapperRef, {routeKey, routerKey}) {
    return {
      [routeKey]: vueWrapperRef?.$route,
      [routerKey]: vueWrapperRef?.$router
    }
  }
})
