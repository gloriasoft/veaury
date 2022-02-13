import React, {useEffect, useState} from 'react'
import Test1 from '../components/Test1'
import {applyVueInReact} from 'combined'
const Com1 = applyVueInReact(Test1)
function A1 () {
    const [val1, setVal1] = useState('red')
    const [params, setParams] = useState({aaa:1})
    const [slot1, setSlot1] = useState('slot111111111111')
    useEffect(() => {
        setTimeout(() => {
            setVal1('blue')
            setSlot1('slot22222222222')
            setParams({})
        }, 1000)
    }, [])
    return <div>A1
        <Com1 {...params} v-model={[val1, setVal1, ['abc', 'ddd']]} $slots={
            {
                slot1: <div>{slot1}</div>
            }
        }>
            <div>{val1}</div>
        </Com1>
    </div>
}

export default A1
