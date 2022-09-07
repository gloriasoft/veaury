import React from 'react'

export default function CC(props) {
  console.log('AAAAAA', props)
  return <>
    {props.renderProps1?.()}
    {props.renderProps2?.(<div>ReactNode</div>)}
    {props.reactNode}
    {props.children}
  </>
}
