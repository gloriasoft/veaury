import { VueContainer } from 'veaury'
import { ReactMissVue, useReactMissVue } from './defineReactMissVue'

function TestReactComponent() {
  // use pinia store
  const { fooStore } = useReactMissVue()
  return <div data-testid="fooValueShow">
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
  const { vueRouter, fooStore, barStore } = useReactMissVue()
  function jump(path) {
    vueRouter.push(path)
  }

  return <div>
    <h3>This example shows the basic usage of `ReactMissVue`.</h3>
    <h4>Sometimes some features and plugins of Vue are really more useful than React.</h4>
    <h4>Such as beforeEach of vue-router and pinia.</h4>
    <TestReactComponent/>
    <TestReactComponent1/>
    {/* Use the global component router-view */}
    <VueContainer component="RouterView"/>
    <button onClick={() => jump('aaa')} data-testid="jumpAAA">jump to 'ReactMissVue/aaa' from vue-router</button><br/>
    <button onClick={() => jump(Math.random().toString())}>jump to random path from vue-router</button><br/>
    change the name of 'Foo' store from pina:<input type="text" onChange={(ele) => fooStore.changeName(ele.target.value)} value={fooStore.name} data-testid="fooValue"/><br/>
    change the name of 'Bar' store from pina:<input type="text" onChange={(ele) => barStore.changeName(ele.target.value)} value={barStore.name}/><br/>
  </div>
}



export default function () {
  return <ReactMissVue>
    <Demo/>
  </ReactMissVue>
}
