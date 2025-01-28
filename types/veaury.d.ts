// Do not actively import Vue
// import { Component as VueComponent, VNode } from 'vue'

type ReactNode = object | number | string;
type VNode = object | number | string;
type SlotFunction = () => VNode
type ReactComponent = Function;
type VueComponent = any;
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
interface SyncUpdateHooks {
    [key: string]: Function
}
interface SyncUpdateStates {
    [key: string]: any
}
type useCrossingHooks = Function
type CrossingProviderComponent = component
type ReactContext = Object
type CrossingProviderReactInVueReturn = [useCrossingHooks, CrossingProviderComponent, ReactContext]
type CrossingProviderVueInReactReturn = [useCrossingHooks, CrossingProviderComponent]
type useReactMissVueHooks = useCrossingHooks
type ReactMissVueProvider = CrossingProviderComponent
type createReactMissVueReturn = [useReactMissVueHooks, ReactMissVueProvider, ReactContext]
interface VeauryOptions {
    react?: {
        [key: string]: any
        createRoot?: Function
    },
    vue?: {
        [key: string]: any
    }
}

export const createCrossingProviderForReactInVue: (vueInjection: injectionFunction) => CrossingProviderReactInVueReturn;
export const createCrossingProviderForVueInReact: (reactInjection: injectionFunction, providerName?: string) => CrossingProviderVueInReactReturn;
export const veauryOptions: VeauryOptions;
export const setVeauryOptions: (veauryOptions: VeauryOptions) => VeauryOptions;
export const applyReactInVue: (ReactComponent: ReactComponent, options?: options) => VueComponent;
export const applyVueInReact: (VueComponent: VueComponent, options?: options) => ReactComponent;
export const lazyVueInReact: (asyncImport: Promise<any>, options?: options) => any;
export const lazyReactInVue: (asyncImport: Promise<any> | defineAsyncComponentOptions, options?: options) => any;
export const VueContainer: ReactComponent;
export const injectPropsFromWrapper: injectPropsFromWrapper;
export const createReactMissVue: (ReactMissVueOptions: ReactMissVueOptions) => createReactMissVueReturn;
export const getReactNode: (VueElement: VNode | SlotFunction) => ReactNode;
export const getVNode: (ReactElement: ReactNode) => VNode;
export const RenderReactNode: VueComponent;
export const applyPureReactInVue: typeof applyReactInVue;
export const applyPureVueInReact: typeof applyVueInReact;
export const createCrossingProviderForPureReactInVue: typeof createCrossingProviderForReactInVue;
export const createCrossingProviderForPureVueInReact: typeof createCrossingProviderForVueInReact;
export const lazyPureReactInVue: typeof lazyReactInVue;
export const lazyPureVueInReact: typeof lazyVueInReact;
export const injectSyncUpdateForPureReactInVue: (ReactComponent: ReactComponent, syncUpdateHooks: SyncUpdateHooks) => SyncUpdateStates;

declare module 'vue' {
    interface ComponentCustomProperties {
        __veauryReactRef__?: any;
    }
}

declare namespace React {
    interface Component {
        __veauryVueRef__?: any;
    }
}
