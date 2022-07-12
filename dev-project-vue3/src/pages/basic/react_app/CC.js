import React, {useEffect, useState} from 'react'
export default function (props) {
  const [aa, setAa] = useState(3333)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setAa(4444)
  //   }, 2000)
  // }, [])
  return <div onClick={props.onClick}>
    {/*<div>{props.children}</div>*/}
    {props.bbb(<div>{aa}</div>)}
  </div>
}
