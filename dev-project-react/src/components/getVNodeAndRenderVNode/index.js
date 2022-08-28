import { applyPureVueInReact, VueContainer, getVNode, getReactNode } from 'veaury'
import { useRef } from 'react'
// The vue component AA accepts a parameter of type VNode and a vue scoped slot.
import AAVue from './AA.vue'
const AA = applyPureVueInReact(AAVue)

export default function () {
  const vSlots = useRef({
    // The scoped slot of the vue component AA
    // The v-slots property will automatically convert reactNode to VNode, so there is no need to manually use getVNode for conversion.
    renderSomething(VNode) {
      return <>
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
    }
  })
  // `VNodeBar` is a property of type VNode, so use getVNode to convert reactNode to VNode.
  const VNodeBar = useRef(getVNode(<div style={{background: 'dodgerblue', marginTop: '5px'}}>This is Bar's VNode</div>))
  return <>
    <h2>This example shows how to transform and render directly in reactNode and VNode.</h2>
    <AA v-slots={vSlots.current} VNodeBar={VNodeBar.current}/>
  </>
}
