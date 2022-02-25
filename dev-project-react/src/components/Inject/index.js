import { applyVueInReact } from 'veaury'
import BasicVue from './Basic'

const Basic = applyVueInReact(BasicVue)
export default function () {

    return <div>
        <h3>This example shows the basic usage of `injectPropsFromWrapper`.</h3>
        <h4>Get the state of the current React app's react-router in a Vue component.</h4>
        <Basic/>
    </div>
}
