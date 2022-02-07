import applyReactInVue from './applyReactInVue'
export default function lazyReactInVue (asyncImport, useReactOptions) {
  return () => asyncImport().then((mod) => {
    return applyReactInVue(mod.default, useReactOptions)
  })
}
