export default function (reactInstance) {
    const fiberNode = reactInstance._reactInternals || reactInstance._reactInternalFiber
    let parentInstance = fiberNode?.return
    let vueWrapperRef
    // Look up the vueWrapperRef
    while (parentInstance) {
        const parentFiberNode = parentInstance.stateNode
        vueWrapperRef = parentFiberNode?.parentVueWrapperRef || parentFiberNode?.vueWrapperRef
        if (vueWrapperRef) return vueWrapperRef
        parentInstance = parentInstance.return
    }
}
