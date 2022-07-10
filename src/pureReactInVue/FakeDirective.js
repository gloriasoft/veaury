import * as React from "react";

export default function DirectiveHOC(VNode, ReactNode) {
    const directives = VNode.dirs
    if (directives && directives.length > 0) {
        return <FakeDirective vnode={VNode}>{ReactNode}</FakeDirective>
    }
    return ReactNode
}

// Fake Vue's directive
class FakeDirective extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevVnode: null,
            directiveMap: {},
            ref: null,
            prevProps: props
        }
    }
    findDirectiveName({instance, dir}) {
        if (!instance) return
        const innerDirectives = instance.$?.directives
        if (innerDirectives) {
            const directiveName = Object.keys(innerDirectives).find((n) => innerDirectives[n] === dir)
            if (directiveName) return directiveName
        }
        const appDirectives = instance.$?.appContext?.directives
        if (appDirectives) {
            return Object.keys(appDirectives).find((n) => appDirectives[n] === dir)
        }
        return null
    }
    doDirective() {
        let {directiveMap, ref} = this.state
        // get el
        if (!ref) {
            const fiber = this._reactInternals || this._reactInternalFiber
            ref = fiber.child
            while(ref && ref.tag !== 5) {
                ref = ref.child
            }
            if (!ref) return
            ref = ref.stateNode
        }
        const {vnode} = this.props
        const directives = vnode.dirs
        if (!directives) return
        directives.forEach((directiveBinding) => {
            if (!directiveBinding) return
            const directiveName = this.findDirectiveName(directiveBinding)
            if (!directiveName) return

            // All hooks of vue3's directive
            // These hooks will be mapped to the life cycle of the react component
            const {created, beforeMount, mounted, beforeUpdate, updated} = directiveBinding.dir

            // created, beforeMount, mounted
            if (!directiveMap[directiveName]) {
                directiveMap[directiveName] = directiveBinding
                const directiveHookArgs = [ref, directiveBinding, vnode, null]
                created?.apply(null, directiveHookArgs)
                beforeMount?.apply(null, directiveHookArgs)
                mounted?.apply(null, directiveHookArgs)
                // set oldValue
                directiveBinding.oldValue = directiveBinding.value
                return
            }
            // beforeUpdate, updated
            directiveMap[directiveName] = {...directiveMap[directiveName], ...directiveBinding, oldValue: directiveMap[directiveName].oldValue}
            const directiveHookArgs = [ref, directiveMap[directiveName], vnode, this.state.prevVnode]
            beforeUpdate?.apply(null, directiveHookArgs)
            updated?.apply(null, directiveHookArgs)
            // set oldValue
            directiveMap[directiveName].oldValue = directiveBinding.value
        })
        this.setState({
            prevVnode: {...vnode},
            directiveMap: {...directiveMap},
            ref
        })
    }
    componentDidMount() {
        this.doDirective()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.vnode === this.props.vnode) return
        this.doDirective()
    }
    componentWillUnmount() {
        const {vnode} = this.props
        const {directiveMap, ref, prevVnode} = this.state
        const directives = vnode.dirs
        if (!directives) return
        directives.forEach((directiveBinding) => {
            if (!directiveBinding) return
            const directiveName = this.findDirectiveName(directiveBinding)
            if (!directiveName) return

            const {beforeUnmount, unmounted} = directiveBinding.dir

            // beforeUnmount, unmounted
            directiveMap[directiveName] = {...directiveMap[directiveName], ...directiveBinding}
            const directiveHookArgs = [ref, directiveMap[directiveName], vnode, prevVnode]
            beforeUnmount?.apply(null, directiveHookArgs)
            unmounted?.apply(null, directiveHookArgs)
        })
        this.setState({
            prevVnode: {...vnode},
            directiveMap: {}
        })
    }

    render() {
        const {vnode, children} = this.props
        // return this.props.children
        return children
    }

}
