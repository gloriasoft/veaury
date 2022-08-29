import {VueContainer} from '../applyVueInReact'
import React from 'react'
import getDistinguishReactOrVue from "./getDistinguishReactOrVue";

const NoWrapFunction = getDistinguishReactOrVue({reactComponents: 'all', domTags: 'all'})

function getReactNode(vnode) {
  if (typeof vnode === 'function') {
    vnode = vnode()
  }
  vnode = [vnode]
  vnode = vnode.flat(Infinity)

  return NoWrapFunction(vnode, (vnode) => <VueContainer node={vnode}/>)
}

export default getReactNode
