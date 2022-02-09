import React, {useEffect, useState} from 'react'
import Test1 from '../components/Test1'
import {applyVueInReact} from 'combined'
const Com1 = applyVueInReact(Test1)
function A1 () {
    const [val1, setVal1] = useState('red')
    useEffect(() => {
        setTimeout(() => {
            setVal1('blue')
        }, 1000)
    }, [])
    return <div>A1
        <Com1 onClick={()=>{console.log(22222)}} on={{click:()=>{console.log(333333)}}}><div>{val1}</div></Com1>
    </div>
}

export default A1
