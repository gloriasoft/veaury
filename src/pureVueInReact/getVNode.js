import {h} from 'vue';
import React from 'react';
import RenderReactNode from '../pureReactInVue/RenderReactNode';
import getDistinguishReactOrVue from "./getDistinguishReactOrVue";

const NoWrapFunction = getDistinguishReactOrVue({reactComponents: 'all', domTags: 'all'})

function getVNode(reactNode) {
  if (typeof reactNode === 'function') {
    reactNode = reactNode()
  }
  reactNode = [reactNode]
  reactNode = reactNode.flat(Infinity)

  return NoWrapFunction(reactNode, (reactNode) => h(RenderReactNode, {node: reactNode}))
}

export default getVNode
