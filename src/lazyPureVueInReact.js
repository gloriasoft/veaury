import { lazy } from 'react'
import applyPureVueInReact from './pureVueInReact'
export default function lazyVueInReact (asyncImport, useVueOptions) {
  return lazy(() => asyncImport().then((mod) => {
    return { default: applyPureVueInReact(mod.default, useVueOptions) }
  }))
}
