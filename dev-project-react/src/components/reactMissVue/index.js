import {applyVueInReact, VueContainer} from 'veaury'
import { ReactMissVue, useReactMissVue } from './defineReactMissVue'
import { KeepAlive, h } from 'vue'

const KeepAliveReact = applyVueInReact(KeepAlive)
const AA = applyVueInReact({
  render() {
    console.log(55555)
    return 12121212
  }
})

function TestReactComponent() {
  // use pinia store
  const { fooStore } = useReactMissVue()
  return <div>
    Foo's name: {fooStore.name}
  </div>
}

function TestReactComponent1() {
  // use pinia store
  const { barStore } = useReactMissVue()
  return <div>
    Bar's name: {barStore.name}
  </div>
}

function Demo() {
  const { vueRouter } = useReactMissVue()
  function jump(path) {
    vueRouter.push(path)
  }

  function DD(aa) {
    console.log(1111111111, aa)
    return 121212
  }

  return <div>
    <h3>This example shows the basic usage of `ReactMissVue`.</h3>
    <h4>Sometimes some features and plugins of Vue are really more useful than React.</h4>
    <h4>Such as keep-alive, beforeEach of vue-router, pinia.</h4>
    <h4></h4>
    <TestReactComponent/>
    <TestReactComponent1/>
      {/* Use the global component router-view */}
    <VueContainer component="RouterView">
      {() => <AA/>}
    </VueContainer>
    <button onClick={() => jump('aaa')}>jump to 'ReactMissVue/aaa' from vue-router</button><br/>
    <button onClick={() => jump(Math.random().toString())}>jump to random path from vue-router</button>
  </div>
}



export default function () {
  return <ReactMissVue>
    <Demo/>
  </ReactMissVue>
}
