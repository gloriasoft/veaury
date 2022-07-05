import React from 'react';
import {formatClass, formatStyle} from './vueStyleClassTransformer'
import FakeDirective from "./FakeDirective";


function toFirstUpperCase(val) {
    const reg = /^(\w)/g
    return val.replace(reg, ($, $1) => $1.toUpperCase())
}

function takeVueDomInReact(child, tags, vueInReactCall, division, slotsFormatter, hashList, __top__) {
    if (tags !== 'all' && ! (tags instanceof Array)) {
        tags = tags ? [tags]: []
    }
    if (!child.componentOptions && (tags === 'all' || tags.indexOf(child.tag) > -1)) {

        // 处理ref
        let ref = child.data?.ref
        if (ref && typeof ref === 'string') {
            const refKey = ref
            ref = (reactRef) => {
                if (!reactRef) return
                const $refs = child.context.$refs
                if ($refs) {
                    $refs[refKey] = reactRef
                }
                try { Proxy } catch(e) {
                    Promise.resolve().then(() => {
                        Object.keys(ref).forEach((key) => {
                            if (!reactRef[key]) {
                                reactRef[key] = ref[key]
                            }
                        })
                    })
                }
            }
            try {
                Proxy;
                const oldRef= ref
                ref = new Proxy(oldRef, {
                    get(target, key) {
                        return target[key]
                    },
                    set(target, key, value) {
                        const reactRef = child.context.$refs?.[refKey]
                        if (reactRef) {
                            reactRef[key] = value
                        }
                        return value
                    }
                })
            } catch(e) {}
        }


        // 处理事件
        const newListeners = {}
        if (child.data?.on) {
            Object.keys(child.data.on).forEach((key) => {
                newListeners['on' + toFirstUpperCase(key)] = child.data.on[key]
            })
        }
        const hashMap = {}
        if (hashList) {
            hashList.forEach((val) => {
                hashMap[val] = ''
            })
        }
        const props = {
            ...child.data?.attrs,
            style: { ...formatStyle(child.data?.attrs?.style), ...formatStyle(child.data?.style), ...formatStyle(child.data?.staticStyle) },
            className: Array.from(new Set([...formatClass(child.data?.attrs?.className), ...formatClass(child.data?.attrs?.class), ...formatClass(child.data?.class), ...formatClass(child.data?.staticClass)])).join(' '),
            ...newListeners,
            ...hashMap,
            ...(ref? {ref}: {})
        }
        const directives = child.data?.directives
        let newChildren = child.children || props.children
        if (newChildren) {
            newChildren = [...newChildren]
            newChildren.__top__ = __top__
        }
        if (directives && directives.length > 0) {
            // return <FakeDirective vnode={child}><child.tag {...props}>{slotsFormatter(child.children, vueInReactCall, hashList)}</child.tag></FakeDirective>
            return <FakeDirective vnode={child} reactComponent={child.tag}  {...props}>{slotsFormatter(newChildren, vueInReactCall, hashList)}</FakeDirective>
        }
        return <child.tag {...props}>{slotsFormatter(newChildren, vueInReactCall, hashList)}</child.tag>
    }
    // if (child.text || child.tag) {
        return vueInReactCall([child], null, division)
    // }
}

export default takeVueDomInReact
