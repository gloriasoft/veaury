import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Vue from "vue";

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

    getDirective(id) {
        const {vnode} = this.props
        const Ctor = vnode?.context?.$vnode?.componentOptions?.Ctor
        if (Ctor && Ctor.directive) {
            return Ctor.directive(id) || Vue.directive(id)
        }
        return Vue.directive(id)
    }
    doDirective() {
        let {directiveMap, ref} = this.state
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
        const directives = vnode.data?.directives
        if (!directives) return
        directives.forEach((directiveBinding) => {
            const directive = this.getDirective(directiveBinding.name)
            if (!directive) return

            const {update, componentUpdated, bind, inserted} = directive

            // bind
            if (!directiveMap[directiveBinding.name]) {
                directiveMap[directiveBinding.name] = directiveBinding
                bind && bind(ref, directiveBinding, vnode, null)
                inserted && inserted(ref, directiveBinding, vnode, null)
                directiveBinding.oldValue = directiveBinding.value
                return
            }
            // update
            directiveMap[directiveBinding.name] = {...directiveMap[directiveBinding.name], ...directiveBinding}
            update && update(ref, directiveMap[directiveBinding.name], vnode, this.state.prevVnode)
            componentUpdated && componentUpdated(ref, directiveMap[directiveBinding.name], vnode, this.state.prevVnode)
            directiveMap[directiveBinding.name].oldValue = directiveBinding.value
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
        const directives = vnode.data?.directives
        if (!directives) return
        directives.forEach((directiveBinding) => {
            const directive = this.getDirective(directiveBinding.name)
            if (!directive) return

            const {unbind} = directive

            // unbind
            directiveMap[directiveBinding.name] = {...directiveMap[directiveBinding.name], ...directiveBinding}
            unbind && unbind(ref, directiveMap[directiveBinding.name], vnode, prevVnode, true)
        })
        this.setState({
            prevVnode: {...vnode},
            directiveMap: {}
        })
    }

    render() {
        const {reactComponent: ReactComponent, ...props} = this.props
        // return this.props.children
        return <ReactComponent {...props}/>
    }

}

export default FakeDirective
