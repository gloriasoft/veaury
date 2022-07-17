import {VueContainer} from '../applyVueInReact'
import React from 'react'
import getDistinguishReactOrVue from "./getDistinguishReactOrVue";
import {h} from 'vue'

const NoWrapFunction = getDistinguishReactOrVue({reactComponents: 'all', domTags: 'all'})
const VnodeBridge = {
    inheritAttrs: false,
    render() {
        return h('div', { style: { all: 'unset' } }, [this.$attrs.node && this.$attrs.node()])
    },
}
function getReactNode(vnode) {
    let hashList = []
    vnode = [vnode]
    vnode = vnode.flat(Infinity)
    vnode.forEach((node) => {
        console.log(111111, node)
        const scopedId = node.context?.$vnode?.componentOptions?.Ctor?.extendOptions?._scopeId
        if (scopedId) {
            hashList.push(scopedId)
        }
    })
    // 去重
    hashList = Array.from(new Set(hashList))
    return NoWrapFunction(vnode, (vnode) => React.createElement(VueContainer, { component: VnodeBridge, node: () => vnode }), hashList)
}

export default getReactNode
