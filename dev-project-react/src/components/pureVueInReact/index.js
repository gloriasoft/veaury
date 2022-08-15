import AAVue from './AA.vue'
import BasicVue from "./Basic.vue";
import DDVue from './DD'
import EEVue from './EE'
import {applyPureVueInReact, getReactNode, applyVueInReact} from 'veaury'
import {Component, useRef, useEffect, useState, useMemo} from 'react'
import {h, Fragment, Text} from 'vue'

const AA = applyPureVueInReact(AAVue)
const Basic = applyPureVueInReact(BasicVue)

// console.log(couldBeClass(BB))
export default function (props) {
  const ref = useRef(null)
  const vModelAa = useState(Math.random)
  const [aa, setAa] = vModelAa
  const [style, setStyle] = useState({color: 'red'})
  useEffect(() => {
    console.log(44444, ref.current)
    // setInterval(() => {
    //   setAa(Math.random())
    // }, 1000
  }, [])
  useEffect(() => {
    console.log('AA props updated')
    // setInterval(() => {
    //   setStyle({color: 'blue'})
    // }, 1000)
  }, [props])
  return <AA>
    <div>
      <Basic className="CCC" v-model-aa={vModelAa} style={{color: 'red'}}>
        <div>99999</div>
      </Basic>
    </div>
  </AA>
}
