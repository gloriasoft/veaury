import Vue from 'vue'
class ReduxLinkVue {
  constructor (store) {
    if (!store || !store.subscribe || !store.getState) {
      throw Error('incorrect store passed in, please check the function applyRedux\'s parameter must contains redux store')
      return
    }
    this.store = store
    // 订阅
    // 由于vue组件的设计机制，store是中心化的存在，使得不用关心取消订阅
    store.subscribe(() => {
      this._vm.state = store.getState()
    })
    // 利用一个vue实例做双向绑定
    this._vm = new Vue({
      data () {
        return {
          state: store.getState() // 初始化的数据
        }
      }
    })
  }
  // 访问state对象时候，就直接返回响应式的数据
  get state () {
    return this._vm.state
  }
  get dispatch () {
    return this.store.dispatch
  }
}
let reduxInstance
function applyRedux ({ store, ReactReduxContext }) {
  // 只允许调用一次
  if (reduxInstance) return reduxInstance
  // 创建redux与vue组件的连接
  reduxInstance = new ReduxLinkVue(store)
  // 如果提供了ReactReduxContext，就注册到applyReactInVue中，允许在vue中使用的react组件可以使用redux
  if (ReactReduxContext) {
    reduxInstance.ReactReduxContext = ReactReduxContext
  }
  // 和react-redux的provider不同，这里直接设计所有vue组件都注入redux
  Vue.prototype.$redux = reduxInstance
  return reduxInstance
}
export default applyRedux
