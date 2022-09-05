import { applyVueInReact } from 'veaury'
import BasicVue from './Basic'
import Basic1Vue from './Basic1'
import Basic2Vue from './Basic2'
import { useState } from 'react'

const Basic = applyVueInReact(BasicVue)
const Basic1 = applyVueInReact(Basic1Vue)
const Basic2 = applyVueInReact(Basic2Vue)
export default function () {
    const [foo, setFoo] = useState(Math.random())
    const [bar, setBar] = useState(Math.random())
    const [zoo, setZoo] = useState(Math.random())
    const [type0, setType0] = useState('')
    const [type1, setType1] = useState('')
    const [type2, setType2] = useState('')

    return <div>
        <h3>Pass v-model to Vue Components.</h3>
        <h4>The usage of 'v-model' is similar to the usage of 'v-model' of vue's jsx.</h4>
        <Basic v-model={[foo, setFoo]} v-model-bar={[bar, setBar]}>
            <div className="slot">
                This is the Vue component Slot from React<br/>
                foo's value: <span data-testid="reactModelShow">{foo}</span><br/>
                bar's value: {bar}
            </div>
        </Basic>
        typeof received v-model zoo: <span data-testid="modelType0">{type0}</span>
        <Basic2 v-model={[zoo, (val) => {setType0(typeof val); setZoo(val)}, 'zoo']} testId="0"/>
        typeof received v-model zoo: <span data-testid="modelType1">{type1}</span>
        <Basic2 v-model={[zoo, (val) => {setType1(typeof val); setZoo(val)}, 'zoo', ['number']]}  testId="1"/>
        typeof received v-model value: <span data-testid="modelType2">{type2}</span>
        <Basic2 v-model={[zoo, (val) => {setType2(typeof val); setZoo(val)}, ['number']]} testId="2"/>
        <Basic1 v-models={{
            modelValue: [zoo, setZoo],
            //...otherModels
        }}>
            <div className="slot" data-testid="reactSlot1">
                This is the Vue component Slot from React<br/>
                zoo's value: <span data-testid="reactModelShow1">{zoo}</span>
            </div>
        </Basic1>
    </div>
}
