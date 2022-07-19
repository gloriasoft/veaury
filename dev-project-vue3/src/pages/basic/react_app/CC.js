import React, {useEffect, useState, useImperativeHandle, forwardRef} from 'react'
export default forwardRef(function (props, ref) {
  // const [aa, setAa] = useState(3333)
  // useImperativeHandle(ref, () => ({
  //   aaa: 1
  // }))
  // useEffect(() => {
  //   console.log('CC mounted!!!!!')
  // }, [])
  return <div>
    {/*<div>{props.children}</div>*/}
    {props.bbb}
    {/*{props.children}*/}
    {/*22222222222*/}
  </div>
})
