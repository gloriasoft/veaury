import {applyVueInReact} from 'veaury'
import BasicVue from './Basic'
import {useEffect, useState, useRef, createContext, useContext} from 'react'

const Basic = applyVueInReact(BasicVue)
const Context = createContext({})

function SubReactComponent() {
  const {bossName} = useContext(Context)
  return <div className="slot">bossName from Context: {bossName}</div>
}

export default function () {
  const [bossName, setBossName] = useState(Math.random)
  const timer = useRef(null)
  useEffect(() => {
    timer.current = setInterval(() => {
      setBossName(Math.random())
    }, 1000)
    return () => {
      clearInterval(timer.current)
    }
  }, [])
  return <div>
    <h3>This example shows the basic usage of `applyVueInReact`.</h3>
    <h4>Using React components in Vue components.</h4>
    <Context.Provider value={{bossName}}>
      <Basic>
        <div className="slot">
          This is the Vue component Slot from React<br/>
          <SubReactComponent/>
        </div>
      </Basic>
    </Context.Provider>
  </div>
}
