import React, { useRef } from 'react'
import { withVuex } from 'veaury'

export default withVuex(function(props) {
    const style = useRef({
        background: '#91e7fc',
        width: 300,
        margin: 'auto',
        padding: 10
    })
    return (<div style={style.current}>
        This is the React Component
        <h3>
            Vuex state 'count': {props.$vuexStore.state.count}<br/>
            <button style={{marginTop: 20}} onClick={() => props.$vuexStore.dispatch('increment')}>increment the count of the Vuex state</button>
        </h3>
    </div>)
})
