import React, {useRef} from 'react'
import { useVueHooksInReact } from './CrossProvider'

export default function (props) {
  const { vuex, vueRoute, vueRouter } = useVueHooksInReact()
  function changeQuery() {
    vueRouter.replace({
      query: {
        a: Math.random()
      }
    })
  }
  function incrementCount() {
    vuex.dispatch('increment')
  }

  const style = useRef({
    background: '#91e7fc',
    width: 500,
    margin: 'auto',
    padding: 10,
    lineHeight: '30px'
  })
  return (<div style={style.current}>
    This is the React Component<br/>
    <span>
      the path info from 'vue-router': <span style={{fontWeight: 'bold'}}>{vueRoute.fullPath}</span><br/>
      the count from 'vuex': <span style={{fontWeight: 'bold'}}>{vuex.state.count}</span>
    </span><br/>
    <button onClick={changeQuery}>change query</button> <button onClick={incrementCount}>increment count</button>
  </div>)
}
