import createHocForGetVueInstance from './createHocForGetVueInstance'

export default createHocForGetVueInstance({
    defaultOptions: {
        storeKey: '$vuexStore'
    },
    // Must return a method for unsubscribing
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
    // The second parameter is an object,
    // the key value must be the same as the key value of 'defaultOptions'
    setupState(vueWrapperRef, {storeKey}) {
        return {
            [storeKey]: vueWrapperRef?.$store
        }
    }
})
