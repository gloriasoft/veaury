import applyReactInVue from '../applyReactInVue'
import React, {forwardRef} from 'react'
import {h} from 'vue'

function RenderReactNode (props, ref) {
    let reactNode = props.node
    if (typeof reactNode === 'function') {
        reactNode = reactNode()
    }

    if (!ref?.current && typeof ref !== 'function' && !ref?.toString().match(/^function/)) {
        ref = null
    }
    return {...reactNode, ref}
}

const Bridge = applyReactInVue(RenderReactNode)
function WrapVue(props) {
    return h(Bridge, {
        node: () => props.node
    })
}
WrapVue.originReactComponent = forwardRef(RenderReactNode)

export default WrapVue
