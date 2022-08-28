import React from 'react';
import {Fragment} from 'vue';
import {formatClass, formatStyle} from '../utils/styleClassTransformer'
import DirectiveHOC from "./FakeDirective";
import resolveRef from "./resolveRef";
import addScopeId from "./addScopeId";

function takeVueDomInReact(child, tags, vueInReactCall, division, slotsFormatter, hashList, __top__) {
    if (tags !== 'all' && ! (tags instanceof Array)) {
        tags = tags ? [tags]: []
    }

    if (child.type === Fragment) {
        return slotsFormatter(child.children, vueInReactCall, hashList)
    }

    if (typeof child.type === 'string' && (tags === 'all' || tags.indexOf(child.type) > -1)) {

        // Resolve ref
        let ref = resolveRef(child)

        const {style, class: className, ...otherProps} = child.props || {}
        const props = {
            ...otherProps,
            style: formatStyle(style),
            className: Array.from(new Set(formatClass(className))).join(' '),
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
        const reactNode = addScopeId(<child.type {...props}>{slotsFormatter(newChildren, vueInReactCall, hashList)}</child.type>, child.scopeId)
        return DirectiveHOC(child, reactNode)
    }
    return vueInReactCall([child], null, division)
}

export default takeVueDomInReact
