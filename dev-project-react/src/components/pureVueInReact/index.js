import AAVue from './AA.vue'
import BasicVue from "./Basic.vue";
import {applyPureVueInReact} from 'veaury'
import {Component} from 'react'
// import couldBeClass from "../../../../src/utils/couldBeClass";

const AA = applyPureVueInReact(AAVue)
const Basic = applyPureVueInReact(BasicVue)
class BB extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>88888</div>
  }
}
// console.log(couldBeClass(BB))
export default function () {
  return <AA>{{
    aa: ({value}) => <div>
      <Basic className="CCC" style={{color: 'blue'}}/>
      <span>{value}</span>
    </div>
  }}</AA>
}
