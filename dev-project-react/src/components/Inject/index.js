import { applyVueInReact } from 'veaury'
import BasicVue from './Basic'
import { useNavigate } from 'react-router-dom'

const Basic = applyVueInReact(BasicVue)
export default function () {
    const navigate = useNavigate()

    return <div>
        <h3>This example shows the basic usage of `injectPropsFromWrapper`.</h3>
        <h4>Get the state of the current React app's react-router in a Vue component.</h4>
        <Basic/>
        <button onClick={() => navigate('?a='+ Math.random(), {replace: true})}>change query</button>
    </div>
}
