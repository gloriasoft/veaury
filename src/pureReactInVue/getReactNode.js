import {VueContainer} from '../applyVueInReact'
import React, {useState} from 'react'
import getDistinguishReactOrVue from "./getDistinguishReactOrVue";
import {h, getCurrentInstance} from 'vue'

const NoWrapFunction = getDistinguishReactOrVue({reactComponents: 'all', domTags: 'all'})
const VnodeBridge = {
  inheritAttrs: false,
  render() {
    // return h('div', { style: { all: 'unset' } }, [this.$attrs.node && this.$attrs.node()])
    return this.$attrs.node && this.$attrs.node()
  },
}

function getReactNode(vnode) {
  if (typeof vnode === 'function') {
    vnode = vnode()
  }
  let hashList = []
  vnode = [vnode]
  vnode = vnode.flat(Infinity)
  // const __scopeId = getCurrentInstance()?.type?.__scopeId

  return NoWrapFunction(vnode, (vnode) => React.createElement(VueContainer, {
    component: VnodeBridge,
    node: () => vnode
  }))
}

export default getReactNode
