import React, {useEffect, useState} from "react";

function DDD (props) {
    useEffect(() => {
        console.log('DDDD mounted')
    }, [])
    return <div>DDD:{props.children}</div>
}

function EEE (props) {
    useEffect(() => {
        console.log('EEE mounted')
    }, [])
    return <div>EEE:{props.children}</div>
}

export default function (props) {
    console.log('test receive props:', props)
    // const [v1, setV1] = useState(true)
    // useEffect(() => {
    //     setTimeout(() => {
    //         setV1(false)
    //     }, 2000)
    //     setTimeout(() => {
    //         setV1(true)
    //     }, 4000)
    // }, [])
    // console.log(6666, props)
    //
    // useEffect(() => {
    //     console.log('xxxxxxxxxxxx')
    // }, [props.style])
    console.log('call!!!!!!!!!')

    // const [VVV, setVVV] = useState('VVV')
    // useEffect(() => {
    //     setTimeout(() => {
    //         setVVV('VVV111')
    //     }, 1000)
    // }, [])
    return <div>
        {/*<DDD>*/}
        {/*    <div>{VVV}</div>*/}
        {/*    <EEE>{VVV}</EEE>*/}
        {/*</DDD>*/}
        {props.children}
        {/*{props.slot1({a:1}, 2)}*/}
    </div>
}
