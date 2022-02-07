import React, {useEffect} from "react";

export default function (props) {
    console.log(6666, props)
    //
    // useEffect(() => {
    //     console.log('xxxxxxxxxxxx')
    // }, [props.style])

    return <div><div>33333</div><div>{props.children}</div></div>
}
