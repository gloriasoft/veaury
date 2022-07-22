import applyReactInVue from '../applyReactInVue'

export default function transformer (ReactComponent, {globalName, combinedOption, transparentApi} = {}) {
    const Component = applyReactInVue(ReactComponent, combinedOption || {})
    Component.install = function(app, {globalName: newGlobalName} = {}) {
        if (globalName) {
            app.component(newGlobalName || globalName, Component);
        }
        return Component
    }
    return Component;
}
