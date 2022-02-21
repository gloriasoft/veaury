import { applyVueInReact } from 'veaury'
import BasicVue from './Basic'
import Basic1Vue from './Basic1'
import { useState } from 'react'

const Basic = applyVueInReact(BasicVue)
const Basic1 = applyVueInReact(Basic1Vue)
export default function () {
    const [foo, setFoo] = useState(Math.random())
    const [bar, setBar] = useState(Math.random())
    const [zoo, setZoo] = useState(Math.random())

    return <div>
        <h3>Pass v-model to Vue Components.</h3>
        <h4>The usage of 'v-model' is similar to the usage of 'v-model' of vue's jsx.</h4>
        <Basic v-model={[foo, setFoo]} v-model-bar={[bar, setBar]}>
            <div className="slot">
                This is the Vue component Slot from React<br/>
                foo's value: {foo}<br/>
                bar's value: {bar}
            </div>
        </Basic>
        {/*<Basic1 v-model={[zoo, setZoo, 'zoo']}/>*/}
        {/*<Basic1 v-model={[zoo, setZoo, 'zoo', ['number']]}/>*/}
        {/*<Basic1 v-model={[zoo, setZoo, ['number']]}/>*/}
        <Basic1 v-models={{
            modelValue: [zoo, setZoo],
            //...otherModels
        }}>
            <div className="slot">
                This is the Vue component Slot from React<br/>
                zoo's value: {zoo}
            </div>
        </Basic1>
    </div>
}
