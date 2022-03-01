import React, { useRef } from 'react'

export default function(props) {
    const style = useRef({
        background: '#917fc',
        width: 500,
        margin: 'auto',
        padding: 10
    })
    return (
        <div style={style.current}>
            This is the React Component
            {props.children}
        </div>
    )
}
