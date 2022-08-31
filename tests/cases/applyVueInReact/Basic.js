import React from 'react'
import { applyVueInReact } from 'veaury'
import AA from './AA'
const AAReact = applyVueInReact(AA)

export default function () {
  return <AAReact/>
}
