import React from 'react'

const containerStyle = {
  background: '#91e7fc',
  width: 800,
  margin: 'auto',
  padding: 10,
  display: 'flex',
  justifyContent: 'space-around'
}
export default function AA(props) {
  return <div style={containerStyle}>
    {props.children}
    {props.numberNode}
  </div>
}
