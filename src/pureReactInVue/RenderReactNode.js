import applyReactInVue from '../applyReactInVue'
import React, {forwardRef} from 'react'
import {h} from 'vue'

function RenderReactNode(props, ref) {
  let reactNode = props.node
  if (typeof reactNode === 'function') {
    reactNode = reactNode()
  }

  if (!ref?.current && typeof ref !== 'function' && !ref?.toString().match(/^function/)) {
    ref = null
  }
  
  if (['string', 'number'].indexOf(typeof reactNode) > -1) {
    if (ref) {
      console.warn('[veaury warn]: The node type is a string or a number, and ref cannot be used!')
    }
    return reactNode
  }
  if (reactNode instanceof Array) {
    if (ref) {
      console.warn('[veaury warn]: The node type is an array and cannot use ref!')
    }
    return reactNode
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
