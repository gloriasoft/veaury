import { Component as VueComponent } from 'vue'
// type VueComponent = object | Function;
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
interface ReactMissVueOptions {
    useVueInjection: injectionFunction
    beforeVueAppMount?: (app: object) => any
}
type useCrossingHooks = Function
type CrossingProviderComponent = component
type ReactContext = Object
type CrossingProviderReactInVueReturn = [useCrossingHooks, CrossingProviderComponent, ReactContext]
type CrossingProviderVueInReactReturn = [useCrossingHooks, CrossingProviderComponent]
type useReactMissVueHooks = useCrossingHooks
type ReactMissVueProvider = CrossingProviderComponent
type createReactMissVueReturn = [useReactMissVueHooks, ReactMissVueProvider, ReactContext]

export const createCrossingProviderForReactInVue: (vueInjection: injectionFunction) => CrossingProviderReactInVueReturn;
export const createCrossingProviderForVueInReact: (reactInjection: injectionFunction, providerName?: string) => CrossingProviderVueInReactReturn;
// export const veauryOptions: options;
// export const setVeauryOptions: (veauryOptions: options) => options;
export const applyReactInVue: (ReactComponent: ReactComponent, options?: options) => VueComponent;
export const applyVueInReact: (VueComponent: VueComponent, options?: options) => ReactComponent;
export const lazyVueInReact: (asyncImport: Promise<any>, options?: options) => any;
export const lazyReactInVue: (asyncImport: Promise<any> | defineAsyncComponentOptions, options?: options) => any;
export const VueContainer: any;
export const injectPropsFromWrapper: injectPropsFromWrapper
export const creatReactMissVue: (ReactMissVueOptions) => createReactMissVueReturn

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
