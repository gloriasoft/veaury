import React, { useRef } from 'react'

export default function(props) {
    const style = useRef({
        background: '#91e7fc',
        width: 500,
        margin: 'auto',
        padding: 10,
        lineHeight: '30px'
    })
    return (<div style={style.current}>
        This is the React Component
        {props.slot1 && props.slot1()}
        {props.slot2 && props.slot2()}
        {props.slot3}
        {props.children}
    </div>)
}
