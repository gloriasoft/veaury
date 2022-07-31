import AAVue from './AA.vue'
import BasicVue from "./Basic.vue";
import {applyPureVueInReact, getReactNode, applyVueInReact} from 'veaury'
import {Component, useRef, useEffect, useState} from 'react'
import {h, Fragment, Text} from 'vue'

const AA = applyVueInReact(AAVue)
const Basic = applyVueInReact(BasicVue)
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
  const ref = useRef(null)
  const vModelAa = useState(Math.random)
  const [aa, setAa] = vModelAa
  useEffect(() => {
    console.log(44444, ref.current)
    // setInterval(() => {
    //   setAa(Math.random())
    // }, 1000)
  }, [])
  return <AA>
    <Basic className="CCC" style={{color: 'blue'}}/>
  </AA>
  return <AA>{{
    aa: ({value}) => <div>
      <Basic className="CCC" style={{color: 'blue'}} v-model-aa={vModelAa}>
        <div>99999</div>
      </Basic>
      <span ref={(r) => {
      }}>{getReactNode(value)}</span>
    </div>
  }}</AA>
}
