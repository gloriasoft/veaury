export default function (reactInstance) {
    const fiberNode = reactInstance._reactInternals || reactInstance._reactInternalFiber
    let parentInstance = fiberNode.return
    let vueWrapperRef
    // Look up the vueWrapperRef
    while (parentInstance) {
        if (parentInstance.stateNode?.parentVueWrapperRef) {
            vueWrapperRef = parentInstance.stateNode.parentVueWrapperRef
            break
        }
        if (parentInstance.stateNode?.vueWrapperRef) {
            vueWrapperRef = parentInstance.stateNode.vueWrapperRef
            break
        }
        parentInstance = parentInstance.return
    }
    return vueWrapperRef
}
