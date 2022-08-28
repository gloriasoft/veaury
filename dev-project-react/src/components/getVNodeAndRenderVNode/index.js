import { applyVueInReact, VueContainer, getVNode } from 'veaury'
// The vue component AA accepts a parameter of type VNode and a Vue scoped slot.
import AAVue from './AA.vue'
const AA = applyVueInReact(AAVue)

export default function () {
  const vSlots = {
    // The scoped slot of the vue component AA
    renderSomething(VNode) {
      const newVNode = getVNode(<>
        <h4>Render scoped slots</h4>
        <h4>1212</h4>
        {/*<VueContainer node={VNode}/>*/}
      </>)
      console.log(11111, newVNode)
      return newVNode
    }
  }
  return <AA>
    {vSlots}
  </AA>
}
