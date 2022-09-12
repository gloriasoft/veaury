import {applyVueInReact} from 'veaury'
import BasicVue from './Basic'

const Basic = applyVueInReact(BasicVue)
export default function () {
  return <div>
    <h3>Pass Slots to Vue Components.</h3>
    <h4>The usage of 'slots' is similar to the usage of 'v-slots' of vue's jsx.</h4>
    {/*just send children*/}
    <Basic v-slots={{
      toReactComNode: 'To React Component Node'
    }} showReactCom={true}>
      <div className="slot">this is children</div>
    </Basic>
    {/*send v-slots*/}
    <Basic v-slots={{
      slot1: <div className="slot">this is slot1(namedSlot)</div>,
      slot2: ({value}) => <div className="slot">this is slot2(scopedSlot), and receive value: {value}</div>,
      default: <div className="slot">this is children</div>
    }}/>
    {/*another usage*/}
    <Basic>
      {{
        slot1: <div className="slot">this is slot1(namedSlot)</div>,
        slot2: ({value}) => <div className="slot">this is slot2(scopedSlot), and receive value: {value}</div>,
        default: <div className="slot">this is children</div>
      }}
    </Basic>
  </div>
}
