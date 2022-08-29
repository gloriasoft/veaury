import { provide, inject, h } from "vue"
import applyPureVueInReact from "./pureVueInReact"
import Random from "./utils/getRandomId"

const random = new Random()
export default function createCrossingProviderForVueInReact(reactInjection, providerName) {
  providerName = providerName || random.getRandomId('veauryCrossingProvide_')
  const ProviderInReact = applyPureVueInReact({
    setup(props, context) {
      provide(providerName, context.attrs)
      return () => h(context.slots.default)
    }
  }, {
    useInjectPropsFromWrapper: reactInjection
  })
  function useReactHooksInVue() {
    return inject(providerName)
  }
  return [useReactHooksInVue, ProviderInReact]
}
