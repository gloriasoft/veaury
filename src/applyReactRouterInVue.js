import Vue from 'vue'
let reactRouterInfo = {}
function applyReactRouterInVue (withRouter) {
  // 只允许调用一次
  if (reactRouterInfo.withRouter) return reactRouterInfo.withRouter
  reactRouterInfo.withRouter = withRouter
  return reactRouterInfo.withRouter
}
export {
  reactRouterInfo
}
export function setReactRouterInVue (reactRouter) {
  if (reactRouterInfo.vueInstance) {
    updateReactRouterInVue(reactRouter)
    return
  }
  reactRouterInfo.vueInstance = new Vue({
    data: {
      ...reactRouter
    }
  })
  Vue.prototype.$reactRouter = reactRouterInfo.vueInstance.$data
}
export function updateReactRouterInVue (reactRouter) {
  Object.assign(reactRouterInfo.vueInstance.$data, { ...reactRouter })
}
export default applyReactRouterInVue
