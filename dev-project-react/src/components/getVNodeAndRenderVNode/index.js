import { applyPureVueInReact, VueContainer, getVNode, getReactNode } from 'veaury'
// The vue component AA accepts a vue scoped slot.
import AAVue from './AA.vue'
const AA = applyPureVueInReact(AAVue)

export default function () {
  const vSlots = {
    // The scoped slot of the vue component AA
    renderSomething(VNode) {
      const reactNode = <>
        <h4>Render scoped slots</h4>
        {/* There are two ways to consume VNode in reactNode. */}
        <div style={{background: 'green', color: 'white'}}>
          <span>rendered with VueContainer</span>
          {/* The first is to use VueContainer */}
          <VueContainer node={VNode}/>
        </div>
        <div style={{background: 'seagreen', color: 'white', marginTop: '5px'}}>
          <span>rendered with getReactNode</span>
          {/* The second is to directly convert VNode to ReactNode. */}
          {getReactNode(VNode)}
        </div>
      </>
      const aa = [<div>33333</div>,<div>44444</div>]
      // Finally, it is rendered in the vue component, so it needs to be converted into VNode.
      return (aa)
    },
    slot1: ({aa}) => <div>{aa}</div>
  }
  return <>
    <h2>This example shows how to transform and render directly in reactNode and VNode.</h2>
    <AA v-slots={vSlots}/>
  </>
}
