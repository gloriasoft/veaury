import {applyVueInReact} from 'veaury'
import TestVue from './Test'

const Test = applyVueInReact(TestVue)
export default function () {
    return <div><Test/></div>
}
