import {applyVueInReact, VueContainer} from 'veaury'
import { ReactMissVue, useReactMissVue } from './defineReactMissVue'
import { useEffect } from 'react'
import { KeepAlive } from 'vue'

const KeepAliveReact = applyVueInReact(KeepAlive)

function TestReactComponent() {
  const AAA = useReactMissVue()
  // useEffect(() => {
  //   setInterval(() => {
  //     AAA.fooStore.changeName(Math.random())
  //   }, 1000)
  // }, [])
  return <div>
    Foo's name: {AAA.fooStore.name}
  </div>
}

function TestReactComponent1() {
  const AAA = useReactMissVue()
  return <div>
    Foo's name: {AAA.fooStore.name}
  </div>
}

export default function () {

  return <div>
    <h3>This example shows the basic usage of `ReactMissVue`.</h3>
    <h4>Sometimes some features and plugins of Vue are really more useful than React.</h4>
    <h4>Such as keep-alive, beforeEach of vue-router, pinia.</h4>
    <h4></h4>
    <ReactMissVue>
      <KeepAliveReact>
        <TestReactComponent/>
      </KeepAliveReact>
      <TestReactComponent1/>
      <VueContainer component="RouterView"/>
    </ReactMissVue>
  </div>
}
