import { applyReactInVue } from 'vuereact-combined'
import {ReactComponent, transformerOptions, VueComponentOptions, vuePluginOptions} from './topTypes'

export default function transformer (ReactComponent: ReactComponent, {globalName, combinedOption, transparentApi}: transformerOptions = {}): VueComponentOptions {
    const Component = applyReactInVue(ReactComponent, combinedOption || {})
    // if (transparentApi) {
    //     Object.keys(transparentApi).forEach((key) => {
    //         // 避开与install重名
    //         if (key === 'install') {
    //             Component.__install = transparentApi[key]
    //             return
    //         }
    //         Component[key] = transparentApi[key]
    //     })
    // }
    Component.install = function(Vue: any, {globalName: newGlobalName}: vuePluginOptions = {}):any {
        if (globalName) {
            Vue.component(newGlobalName || globalName, Component);
        }
        return Component
    }
    return Component;
}
