import createLinkVueWrapperRefHoc from './createLinkVueWrapperRefHoc'

export default createLinkVueWrapperRefHoc({
    defaultOptions: {
        storeKey: '$vuexStore'
    },
    createSubscribe(vueWrapperRef, {storeKey}) {
        return vueWrapperRef.$store.subscribe((mutation, state) => {
            this.setState({
                [storeKey]: vueWrapperRef?.$store
            })
        })
    },
    beforeSetup(vueWrapperRef) {
        if (!vueWrapperRef.$store) {
            console.warn(`[veaury warn] $store does not exist!`)
            return false
        }
    },
    setupState(vueWrapperRef, {storeKey}) {
        return {
            [storeKey]: vueWrapperRef?.$store
        }
    }
})
