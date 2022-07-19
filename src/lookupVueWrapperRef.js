export default function (reactInstance, fiberNode) {
    fiberNode = reactInstance?._reactInternals || reactInstance?._reactInternalFiber || fiberNode
    let parentInstance = fiberNode?.return
    let vueWrapperRef
    // Look up the vueWrapperRef
    while (parentInstance) {
        const parentFiberNode = parentInstance.stateNode
        vueWrapperRef = parentFiberNode?.parentVueWrapperRef || parentFiberNode?.__veauryVueWrapperRef__
        if (vueWrapperRef) return vueWrapperRef
        parentInstance = parentInstance.return
    }
}
