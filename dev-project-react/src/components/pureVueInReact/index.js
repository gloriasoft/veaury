import AAVue from './AA.vue'
import BasicVue from "./Basic.vue";
import {applyPureVueInReact} from 'veaury'

const AA = applyPureVueInReact(AAVue)
const Basic = applyPureVueInReact(BasicVue)
export default function () {
  return <AA>{{
    aa: ({value}) => <div>
      <Basic className="CCC"/>
      <span>{value}</span>
    </div>
  }}</AA>
}
