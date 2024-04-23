export default function injectSyncUpdateForPureReactInVue(ReactComponent, syncUpdateHooks) {
  if (!ReactComponent.__syncUpdateForPureReactInVue) {
    ReactComponent.__syncUpdateForPureReactInVue = {}
  }
  Object.assign(ReactComponent.__syncUpdateForPureReactInVue, syncUpdateHooks)
}
