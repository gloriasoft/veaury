import React from 'react'
import vueRootInfo from './vueRootInfo'
let vuexStore
export function connectVuex ({ mapStateToProps = (state) => {}, mapGettersToProps = (getters) => {}, mapCommitToProps = (commit) => {}, mapDispatchToProps = (dispatch) => {} }) {
  return function (Component) {
    class VuexCom extends React.Component {
      constructor (props) {
        super(props)
        if (vueRootInfo.store) {
          vuexStore = vueRootInfo.store
        }
        if (!vuexStore || !vuexStore.state || !vuexStore.subscribe || !vuexStore.dispatch || !vuexStore.commit) {
          throw Error('[vuereact-combined warn]Error: incorrect store passed in, please check the function applyVuex\'s parameter must be vuex store')
        }
        this.state = vuexStore.state
      }
      componentDidMount () {
        // 订阅
        this.subscribe = vuexStore.subscribe((mutation, state) => {
          this.setState(state)
        })
      }
      componentWillUnmount () {
        // 停止订阅
        this.subscribe()
      }
      render () {
        return (
          <Component {...this.props} {...{ ...mapStateToProps(this.state), ...mapGettersToProps(vuexStore.getters), ...mapCommitToProps(vuexStore.commit), ...mapDispatchToProps(vuexStore.dispatch) }} ref={this.props.forwardedRef}/>
        )
      }
    }
    // 转发ref
    return React.forwardRef((props, ref) => (
      <VuexCom forwardedRef={ref} {...props} />
    ))
  }
}

export default function applyVuex (store) {
  vuexStore = store
}
