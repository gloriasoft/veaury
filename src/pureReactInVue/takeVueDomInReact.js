import React from 'react';
import {formatClass, formatStyle} from './vueStyleClassTransformer'
import DirectiveHOC from "./FakeDirective";

function takeVueDomInReact(child, tags, vueInReactCall, division, slotsFormatter, hashList, __top__) {
    if (tags !== 'all' && ! (tags instanceof Array)) {
        tags = tags ? [tags]: []
    }
    if (!child.component && (tags === 'all' || tags.indexOf(child.type) > -1)) {
        console.log(7777777, child)

        // Analyze ref
        // the VNode internal properties, ref: {i: instance, r: ref_key}
        // TODO: ref for
        let ref = child.ref?.r
        if (ref && typeof ref === 'string') {
            const refKey = ref
            ref = (reactRef) => {
                if (!reactRef) return
                if (child.ref.i.refs) {
                    // object is not extensible, so reassign the whole object
                    const $refs = {...child.ref.i.refs}
                    $refs[refKey] = reactRef
                    child.ref.i.refs = $refs
                }
                // composition api ref variable exists
                const refObj = child.ref.i.setupState?.[refKey]
                if (refObj !== undefined) {
                    child.ref.i.setupState[refKey] = reactRef
                }
            }
            const oldRef= ref
            ref = new Proxy(oldRef, {
                get(target, key) {
                    return target[key]
                },
                set(target, key, value) {
                    if (child.ref.i.refs?.[refKey]) {
                        const $refs = {...child.ref.i.refs}
                        $refs[key] = value
                        child.ref.i.refs = $refs
                    }
                    return value
                }
            })
        }


        const hashMap = {}
        if (hashList) {
            hashList.forEach((val) => {
                hashMap[val] = ''
            })
        }

        const props = {
            style: formatStyle(child.props?.style),
            className: Array.from(new Set(formatClass(child.props?.class))).join(' '),
            ...hashMap,
            ...(ref? {ref}: {})
        }
        // const directives = child.dirs
        let newChildren = child.children || props.children
        if (newChildren) {
            if (["string", "number"].indexOf(typeof newChildren) > -1) {
                newChildren = [newChildren]
            } else {
                newChildren = [...newChildren]
            }
            newChildren.__top__ = __top__
        }
        return DirectiveHOC(child, <child.type {...props}>{slotsFormatter(newChildren, vueInReactCall, hashList)}</child.type>)
    }
    return vueInReactCall([child], null, division)
}

export default takeVueDomInReact
