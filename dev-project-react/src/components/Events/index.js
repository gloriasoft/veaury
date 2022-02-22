import {applyVueInReact} from 'veaury'
import BasicVue from './Basic'
import {useState} from 'react'

const Basic = applyVueInReact(BasicVue)
export default function () {
  const [state, setState] = useState({
    foo: Math.random(),
    currentTime: Date.now()
  })

  function onClickForVue() {
    setState((prevState) => ({
      ...prevState,
      foo: Math.random()
    }))
  }

  function onClickForReact() {
    setState((prevState) => ({
      ...prevState,
      currentTime: Date.now()
    }))
  }

  return <div>
    <h3>This example shows how to pass events when using `applyVueInReact`.</h3>
    <Basic foo={state.foo} onClick={onClickForVue}>
      <div className="slot">
        This is the Vue component Slot from React<br/>
        <span style={{fontWeight: 'bold'}}>current timestamp: {state.currentTime}</span><br/>
        Click the button can refresh current timestamp<br/>
        <button onClick={onClickForReact}>button in React</button>
      </div>
    </Basic>
  </div>
}
