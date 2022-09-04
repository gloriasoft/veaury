import {applyPureVueInReact} from 'veaury'
import BasicVue from './Basic'
import BasicVuePure from './BasicPure'
import { ReactRouterProviderForVue } from './reactRouterCrossingProvider'
import { ReactRouterProviderForVuePure } from './reactRouterCrossingProviderPure'

const Basic = applyPureVueInReact(BasicVue)
const BasicPure = applyPureVueInReact(BasicVuePure)
export default function () {

    return <div>
        <h3>This example shows the basic usage of `createCrossingProviderForVueInReact`.</h3>
        <h4>Get the state of the current React app's react-router in a Vue component.</h4>
        <ReactRouterProviderForVue>
            <Basic/>
        </ReactRouterProviderForVue>
        <ReactRouterProviderForVuePure>
            <BasicPure/>
        </ReactRouterProviderForVuePure>
    </div>
}
