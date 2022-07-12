import React from 'react';
import getChildInfo from "./getChildInfo";
import {isTextOwner} from "./isTextChild";
import takeVueDomInReact from "./takeVueDomInReact";
import DirectiveHOC from "./FakeDirective";
import { pureInterceptProps } from "./interceptProps";
import RenderReactNode from "./RenderReactNode";

export default function getDistinguishReactOrVue({reactComponents: Component, domTags, division = true}) {
    return function defaultSlotsFormatter(children, vueInReactCall, hashList) {
        if (children && children.forEach) {
            const newChildren = []
            children.forEach((child, topIndex) => {
                if (!child) return
                if (!child.type?.originReactComponent ) {
                    console.log(22222, child)
                    if (child.dirs) {
                        window.aaa = child
                    }
                    // reactNode
                    if (child.$$typeof || typeof child === 'string') {
                        newChildren.push(child)
                        return
                    }
                    if (isTextOwner(child)) {
                        child.children.trim() !== '' && newChildren.push(child.children.trim())
                        return
                    }
                    // dom element
                    if(typeof child.type === 'string') {
                        let newChild = takeVueDomInReact(child, domTags, vueInReactCall, division, defaultSlotsFormatter, hashList, children.__top__)
                        if (newChild instanceof Array) {
                            newChild = newChild[0]
                        }
                        if (newChild.key == null && children.length > 1) {
                            newChild = {...newChild}
                            newChild.key = `_key_${topIndex}`
                        }
                        if (hashList) {
                            newChild = {...newChild}
                            newChild.props = {...newChild.props}
                            hashList.forEach((val) => {
                                newChild.props[val] = ''
                            })
                        }
                        newChildren.push(newChild)
                    }
                    return
                }
                // react component in vue
                const ReactComponent = child.type.originReactComponent

                let newChild
                if (Component !== 'all' && ! (Component instanceof Array)) {
                    Component = [Component]
                }
                if (Component === 'all' || Component.indexOf(ReactComponent) > -1) {
                    child.__top__ = children.__top__
                    const props = getChildInfo(child, `_key_${topIndex}`, vueInReactCall, defaultSlotsFormatter, hashList)
                    // TODO: 处理ref
                    let ref = child.data?.ref
                    // if (ref && typeof ref === 'string') {
                    //     const refKey = ref
                    //     ref = (reactRef) => {
                    //         if (!reactRef) return
                    //         reactRef.__syncUpdateProps = function (newExtraData = {}) {
                    //             if (!children.__top__) return
                    //             child.__extraData = newExtraData
                    //             children.__top__.__syncUpdateProps({})
                    //         }
                    //
                    //         const $refs = child.context.$refs
                    //         if ($refs) {
                    //             $refs[refKey] = reactRef
                    //         }
                    //     }
                    //     const oldRef= ref
                    //     ref = new Proxy(oldRef, {
                    //         get(target, key) {
                    //             return target[key]
                    //         },
                    //         set(target, key, value) {
                    //             const reactRef = child.context.$refs?.[refKey]
                    //             if (reactRef) {
                    //                 reactRef[key] = value
                    //             }
                    //             return value
                    //         }
                    //     })
                    // }

                    // if (child.children) {
                    //     child.children.__top__ = children.__top__
                    // }
                    newChild = DirectiveHOC(child, <ReactComponent {...{...pureInterceptProps(props, child, ReactComponent), ...(child.__extraData ? child.__extraData : {}), ...(ref? {ref}: {})}} />)
                } else {
                    newChild = isTextOwner(child)? child.text: takeVueDomInReact(child, domTags, vueInReactCall, division, defaultSlotsFormatter, hashList)
                }
                if (newChild instanceof Array) {
                    newChild = newChild[0]
                }
                if (newChild.key == null && children.length > 1) {
                    newChild = {...newChild}
                    newChild.key = `_key_${topIndex}`
                }
                if (hashList) {
                    newChild = {...newChild}
                    newChild.props = {...newChild.props}
                    hashList.forEach((val) => {
                        newChild.props[val] = ''
                    })
                }
                newChildren.push(newChild)
            })
            return newChildren.length === 1 ? newChildren[0]: newChildren
        }
        return children
    }
}
