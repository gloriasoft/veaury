import React, {useImperativeHandle, forwardRef} from 'react'
export default forwardRef(function (props, ref) {
  useImperativeHandle(ref, () => {
    return {
      aaa:1,
      ddd: null
    }
  })
  return <div style={{background: 'blue', color: 'white'}}>The React component will disappear in {props.disappearTime}s</div>
})
