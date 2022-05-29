type VueComponent = object | Function;
type ReactComponent = Function;
interface propsFromWrapper {
    [propName: string]: any;
}
type component = VueComponent | ReactComponent
type computedModeReturn = () => propsFromWrapper
type defaultModeReturn = propsFromWrapper | Function
type allModeReturn = defaultModeReturn | computedModeReturn
type injectionFunction<T = allModeReturn> = (props?: propsFromWrapper) => T
interface injectPropsFromWrapper<T extends allModeReturn = allModeReturn>{
    (injectionFunction: injectionFunction<T>, component:component): component
}
interface magicOptions {
    [key: string]: any
    useInjectPropsFromWrapper?: injectionFunction
    beforeVueAppMount?: (app: object) => any
}
type options = magicOptions | null | undefined;
interface defineAsyncComponentOptions {
    [key: string]: any
}
type useCrossingHooks = Function
type CrossingProviderComponent = component
type CrossingProviderReturn = [useCrossingHooks, CrossingProviderComponent]

export const createCrossingProviderForReactInVue: (vueInjection: injectionFunction) => CrossingProviderReturn;
export const createCrossingProviderForVueInReact: (reactInjection: injectionFunction, providerName?: string) => CrossingProviderReturn;
// export const veauryOptions: options;
// export const setVeauryOptions: (veauryOptions: options) => options;
export const applyReactInVue: (ReactComponent: ReactComponent, options?: options) => VueComponent;
export const applyVueInReact: (VueComponent: VueComponent, options?: options) => ReactComponent;
export const lazyVueInReact: (asyncImport: Promise<any>, options?: options) => any;
export const lazyReactInVue: (asyncImport: Promise<any> | defineAsyncComponentOptions, options?: options) => any;
export const VueContainer: any;
export const injectPropsFromWrapper: injectPropsFromWrapper

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        __veauryReactRef__?: any;
    }
}

declare namespace React {
    interface Component {
        __veauryVueRef__?: any;
    }
}
