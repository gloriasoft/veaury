import { applyVueInReact } from 'veaury'
import BasicVue from './Basic'
import { ReactRouterProviderForVue } from './reactRouterCrossingProvider'

const Basic = applyVueInReact(BasicVue)
export default function () {

    return <div>
        <h3>This example shows the basic usage of `injectPropsFromWrapper`.</h3>
        <h4>Get the state of the current React app's react-router in a Vue component.</h4>
        <ReactRouterProviderForVue>
            <Basic/>
        </ReactRouterProviderForVue>
    </div>
}
