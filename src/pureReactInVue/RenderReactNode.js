import applyReactInVue from '../applyReactInVue'
import React from 'react'
import {h} from 'vue'

function RenderReactNode (props) {
    return props.node()
}

const Bridge = applyReactInVue(RenderReactNode)
function WrapVue(props) {
    return h(Bridge, {
        node: () => props.node
    })
}
WrapVue.originReactComponent = RenderReactNode

export default WrapVue
