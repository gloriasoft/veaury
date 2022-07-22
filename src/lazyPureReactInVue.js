import applyPureReactInVue from './pureReactInVue'
import { defineAsyncComponent } from 'vue'
export default function lazyReactInVue (asyncImport, useReactOptions) {
  let loader = asyncImport
  if (typeof asyncImport === 'object') {
    loader = asyncImport.loader
  }
  const resolveLoader = () => loader().then((mod) => {
    return applyPureReactInVue(mod.default, useReactOptions)
  })
  return defineAsyncComponent(typeof asyncImport === 'object' ? {...asyncImport, loader: resolveLoader}: resolveLoader)
}
