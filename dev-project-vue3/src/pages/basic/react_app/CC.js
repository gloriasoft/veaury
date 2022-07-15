import React, {useEffect, useState, useImperativeHandle, forwardRef} from 'react'
export default function (props, ref) {
  console.log(666666666666)
  const [aa, setAa] = useState(3333)
  // useImperativeHandle(ref, () => ({
  //   aaa: 1
  // }))
  useEffect(() => {
    console.log('CC mounted!!!!!')
  }, [])
  return <div onClick={props.onClick}>
    {/*<div>{props.children}</div>*/}
    {props.bbb(<div>{aa}</div>)}
  </div>
}
