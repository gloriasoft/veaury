import {h} from 'vue';
import RenderReactNode from '../pureReactInVue/RenderReactNode';
import getDistinguishReactOrVue from "./getDistinguishReactOrVue";

const NoWrapFunction = getDistinguishReactOrVue({reactComponents: 'all', domTags: 'all'})

function getVNode(reactNode) {
  if (typeof reactNode === 'function') {
    reactNode = reactNode()
  }

  reactNode = [reactNode]
  reactNode = reactNode.flat(Infinity)
  if (reactNode.length === 1) {
    reactNode = reactNode[0]
  }

  return NoWrapFunction(reactNode, (reactNode) => h(RenderReactNode, {node: reactNode}))
}

export default getVNode
