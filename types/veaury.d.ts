type VueComponent = object;
type ReactComponent = object | Function;
type options = object | null | undefined;
interface defineAsyncComponentOptions {
    [key: string]: any
}
export const applyReactInVue: (ReactComponent: ReactComponent, options?: options) => VueComponent;
export const applyVueInReact: (VueComponent: ReactComponent, options?: options) => ReactComponent;
export const lazyVueInReact: (asyncImport: Promise<any>, options?: options) => any;
export const lazyReactInVue: (asyncImport: Promise<any> | defineAsyncComponentOptions, options?: options) => any;
export const VueContainer: any;
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
export const injectPropsFromWrapper: injectPropsFromWrapper
