import React from 'react'
import lookupVueWrapperRef from "./lookupVueWrapperRef";

// The Base component must be a Class-type component,
// because you need to get the current FiberNode and look up whether vueWrapperRef is mounted on the node
class Base extends React.Component {
    constructor (props) {
        super(props)
    }
    componentDidMount () {
        if (!this.vueWrapperRef) return
        this.subscribe = this.props.__hocOptions.createSubscribe.call(this, this.vueWrapperRef, this.props.__options)
    }
    componentWillUnmount () {
        this.subscribe?.()
    }
    render () {
        if (!this.installed) {
            this.installed = true
            let vueWrapperRef = lookupVueWrapperRef(this)
            if (!vueWrapperRef || this.props.__hocOptions.beforeSetup.call(this, vueWrapperRef, this.props.__options) === false) {
                console.warn(`[veaury warn] vueWrapperRef does not exist!`)
            } else {
                this.vueWrapperRef = vueWrapperRef
                // do not use 'setState'
                this.state = {
                    ...this.props.__hocOptions.setupState.call(this, vueWrapperRef, this.props.__options)
                }
            }
        }
        const {__ref, __component, __props} = this.props
        let Component = __component
        let refInfo = {}
        // Determine whether to use 'forwardRef
        if (typeof Component === 'function' && Component.length > 1) {
            Component = React.forwardRef(Component)
            refInfo = {
                ref: __ref
            }
        }
        return (
            <Component {...__props} {...this.state} {...refInfo}/>
        )
    }
}

// This is a factory function to create a higher-order component that can provide vue instance related properties
export default function(hocOptions = {
    // Set the initial property key value for 'hoc'
    defaultOptions: {},
    // Create a subscription rule and return an unsubscribe function
    createSubscribe: (vueWrapperRef, options) => {},
    // Hook for judging initialization errors, returning 'false' to represent interception
    beforeSetup: (vueWrapperRef, options) => {},
    // Return to initialized state
    setupState: (vueWrapperRef, options) => {}
}) {
    return function (Component, options = hocOptions.defaultOptions) {
        return React.forwardRef((props, ref) => (
            <Base __ref={ref} __component={Component} __options={options} __props={props} __hocOptions={hocOptions} />
        ))
    }
}
