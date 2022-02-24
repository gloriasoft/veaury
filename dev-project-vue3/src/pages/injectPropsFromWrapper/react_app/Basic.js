import React, { useRef } from 'react'

export default function(props) {
    const style = useRef({
        background: '#91e7fc',
        width: 300,
        margin: 'auto',
        padding: 10
    })
    return (<div style={style.current}>
        This is the React Component
        <h3>
            received foo's value: {props.foo}
        </h3>
        {props.children}
    </div>)
}
