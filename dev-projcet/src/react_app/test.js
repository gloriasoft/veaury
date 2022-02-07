import React, {useEffect, useState} from "react";

export default function (props) {
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

    return <div><div>33333</div>{props.children}</div>
}
