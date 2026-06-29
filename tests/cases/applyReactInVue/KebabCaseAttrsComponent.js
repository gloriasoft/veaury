import React from 'react'

export default function KebabCaseAttrsComponent(props) {
  return (
    <div data-testid="prop-capture">
      <span data-testid="myProp">{props.myProp ?? ''}</span>
      <span data-testid="anotherProp">{props.anotherProp ?? ''}</span>
      <span data-testid="aria-label">{props['aria-label'] ?? ''}</span>
      <span data-testid="data-foo">{props['data-foo'] ?? ''}</span>
      <span data-testid="alreadyCamel">{props.alreadyCamel ?? ''}</span>
    </div>
  )
}
