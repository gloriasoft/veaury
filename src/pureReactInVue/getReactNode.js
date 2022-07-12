import {VueContainer} from '../applyVueInReact'
import React, {Fragment} from 'react'
import getDistinguishReactOrVue from "./getDistinguishReactOrVue";
import {formatClass, formatStyle} from './vueStyleClassTransformer'


const NoWrapFunction = getDistinguishReactOrVue({reactComponents: 'all', domTags: 'all'})
const VnodeBridge = {
    inheritAttrs: false,
    created() {
        this.cleanVnodeStyleClass()
    },
    methods: {
        updateLastVnodeData(vnode) {
            this.lastVnodeData = {
                style: { ...formatStyle(vnode.props?.style) },
                class: Array.from(new Set(formatClass(vnode.props?.class))),
            }
            Object.assign(vnode.data, {
                staticStyle: null,
                style: null,
                staticClass: null,
                class: null,
            })
            return vnode
        },
        // 清除style和class，避免包囊层被污染
        cleanVnodeStyleClass() {
            let vnode = this.$vnode
            this.updateLastVnodeData(vnode)
            // 每次$vnode被修改，将vnode.data中的style、staticStyle、class、staticClass记下来并且清除
            Object.defineProperty(this, '$vnode', {
                get() {
                    return vnode
                },
                set: (val) => {
                    if (val === vnode) return vnode
                    vnode = this.updateLastVnodeData(val)
                    return vnode
                }
            })
        },
    },
    render(h) {
        const vnode = this.$attrs.node && ((this.$attrs.node) as () => any)()
        if (vnode instanceof Array) {
            vnode.forEach((node) => {
                node.data['class'] = [
                    ...(node.data['class'] || []),
                    ...this.lastVnodeData.class,
                    ...formatClass(this.$attrs.className)
                ]
                node.data.style = {
                    ...node.data.style,
                    ...this.lastVnodeData.style
                }
            })
        } else {
            vnode.data['class'] = [
                ...(vnode.data['class'] || []),
                ...this.lastVnodeData.class,
                ...formatClass(this.$attrs.className)
            ]
            vnode.data.style = {
                ...vnode.data.style,
                ...this.lastVnodeData.style
            }
        }
        return h('div', { style: { all: 'unset' } }, [this.$attrs.node && ((this.$attrs.node) as () => any)()])
    },
}
function getReactNode(vnode: any) {
    let hashList = []
    vnode = [vnode]
    vnode = vnode.flat(Infinity)
    vnode.forEach((node) => {
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
