import applyReactInVue from '../applyReactInVue'

export default function transformer (ReactComponent, {globalName, combinedOption, transparentApi} = {}) {
    const Component = applyReactInVue(ReactComponent, combinedOption || {})
    // Component.install = function(Vue, {globalName: newGlobalName} = {}) {
    //     if (globalName) {
    //         Vue.component(newGlobalName || globalName, Component);
    //     }
    //     return Component
    // }
    return Component;
}
