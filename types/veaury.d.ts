type VueComponent = any;
type ReactComponent = any;
type options = object | null | undefined;
interface applyReduxOptions {
    store: any;
    ReactReduxContext: any;
}
interface vuexStore {
    mapStateToProps?: null | undefined | ((state: any) => object);
    mapGettersToProps?: null | undefined | ((getters: any) => object);
    mapCommitToProps?: null | undefined | ((commit: any) => any);
    mapDispatchToProps?: null | undefined | ( (dispatch: any) => any);
}
export const applyReactInVue: (ReactComponent: ReactComponent, options?: options) => VueComponent;
export const applyVueInReact: (VueComponent: ReactComponent, options?: options) => ReactComponent;
export const lazyVueInReact: (asyncImport: Promise<any>, options?: options) => any;
export const lazyReactInVue: (asyncImport: Promise<any>, options?: options) => any;
export const VueContainer: any;
export const applyRedux: (applyReduxOptions: applyReduxOptions) => any;
export const applyVuex: (vuexStore: any) => any;
export const connectVuex: (vuexStore: vuexStore) => any;
export const withVueRouter: (ReactComponent: ReactComponent) => ReactComponent;
export const applyReactRouterInVue: (ReactRouterWithRouter: any) => any;
