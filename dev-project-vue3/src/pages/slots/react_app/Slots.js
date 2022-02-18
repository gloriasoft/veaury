import React, { useRef, useState, useEffect } from 'react'

export default function(props) {
    const style = useRef({
        background: '#91e7fc',
        width: 500,
        margin: 'auto',
        padding: 10,
        lineHeight: '30px'
    })
    const [foo, setFoo] = useState(Math.random())
    const timer = useRef(null)
    useEffect(() => {
        timer.current = setInterval(() => {
            setFoo(Math.random())
        }, 1000)
        return () => {
            clearTimeout(timer.current)
        }
    }, [])
    return (<div style={style.current}>
        This is the React Component
        {props.slot1 && props.slot1()}
        {props.slot2 && props.slot2(foo)}
        {props.slot3}
        {props.children}
    </div>)
}
