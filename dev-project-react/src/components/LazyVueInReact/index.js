import { lazyVueInReact } from 'veaury'
import { useEffect, useState, useRef } from 'react'

const AsyncBasic = lazyVueInReact(() => import('./Basic'))
console.log(AsyncBasic)
export default function () {
    const [state, setState] = useState({
        foo: Math.random(),
        currentTime: new Date().toLocaleString()
    })
    const timer = useRef(null)
    useEffect(() => {
        timer.current = setInterval(() => {
            setState({
                foo: Math.random(),
                currentTime: new Date().toLocaleString()
            })
        }, 1000)
        return () => {
            clearInterval(timer.current)
        }
    }, [])

    return <div>
        <h3>This example shows the basic usage of `lazyVueInReact`.</h3>
        <h4>Using React components in Vue components.</h4>
        <AsyncBasic foo={state.foo}>
            <div className="slot">
                This is the Vue component Slot from React<br/>
                current time: {state.currentTime}
            </div>
        </AsyncBasic>
    </div>
}
