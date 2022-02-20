import createHocForGetVueInstance from './createHocForGetVueInstance'

export default createHocForGetVueInstance({
  defaultOptions: {
    routeKey: '$vueRoute',
    routerKey: '$vueRouter'
  },
  // Must return a method for unsubscribing
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
  // The second parameter is an object,
  // the key value must be the same as the key value of 'defaultOptions'
  setupState(vueWrapperRef, {routeKey, routerKey}) {
    return {
      [routeKey]: vueWrapperRef?.$route,
      [routerKey]: vueWrapperRef?.$router
    }
  }
})
