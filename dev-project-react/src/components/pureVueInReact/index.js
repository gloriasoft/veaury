import AAVue from './AA.vue'
import './style.css'
import {applyPureVueInReact, getReactNode, applyVueInReact, getVNode} from 'veaury'

const AAWithPure = applyPureVueInReact(AAVue)
const AAWithNormal = applyVueInReact(AAVue)

export default function (props) {
  return <>
    <h3>
      This example shows the basic usage of `applyPureVueInReact`.
    </h3>
    <h4>
      The style attribute display is set to 'flex' inside the AA component.
    </h4>
    <h4>
      Pure mode<br/>
      The divs in the children will no longer be placed in an additional container, so the divs will be directly
      affected by the flex style.
    </h4>
    <AAWithPure>
      <div className="flex-sub">A</div>
      <div className="flex-sub">B</div>
      <div className="flex-sub">C</div>
    </AAWithPure>
    <br/>
    <h4>
      Normal mode<br/>
      The divs in the children will be placed in a container styled 'all:unset', so the flex setting in the AA component
      has no effect on the divs.
    </h4>
    <AAWithNormal>
      <div className="flex-sub">A</div>
      <div className="flex-sub">B</div>
      <div className="flex-sub">C</div>
    </AAWithNormal>
  </>
}
