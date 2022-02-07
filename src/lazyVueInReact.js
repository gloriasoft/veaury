import { lazy } from 'react'
import applyVueInReact from './applyVueInReact'
export default function lazyVueInReact (asyncImport, useVueOptions) {
  return lazy(() => asyncImport().then((mod) => {
    return { default: applyVueInReact(mod.default, useVueOptions) }
  }))
}
