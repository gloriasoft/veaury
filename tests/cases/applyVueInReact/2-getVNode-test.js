import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React, { Fragment } from 'react';
import VueComponent from './2-getVNode'
import {applyPureVueInReact, getVNode} from 'veaury'
import {h} from 'vue'

const ReactComponent = applyPureVueInReact(VueComponent)
const TempVueComponentInReact = applyPureVueInReact(function(props, context) {
  return h('div', context.attrs, context.slots)
})
function TempReactComponent(props) {
  return <div>{props.children}</div>
}
const ReactNode = <Fragment><div>test getVNode<TempReactComponent>TempReactComponent</TempReactComponent></div></Fragment>
test('test getVNode', async () => {
  let ref1
  let ref2 = {current: null}
  render(<ReactComponent passingVNode={getVNode(() => ReactNode)}>
    <div data-testid="children1" ref={(r) => {ref1 = r}}>children1</div>
    <div data-testid="children2" ref={ref2}>children2</div>
    <TempReactComponent>AABBCC</TempReactComponent>
    <TempVueComponentInReact style={{color: 'red'}}><div>aaaa</div></TempVueComponentInReact>
    <TempVueComponentInReact className="AAA">{{
      default: () => <div>bbbb</div>
    }}</TempVueComponentInReact>
  </ReactComponent>);
  await waitFor(() => {
    expect(screen.getByText(/test getVNode/)).toBeInTheDocument();
    expect(screen.getByText(/TempReactComponent/)).toBeInTheDocument();
    expect(screen.getByText(/aaaa/)).toBeInTheDocument();
    expect(screen.getByText(/bbbb/)).toBeInTheDocument();
    expect(!!ref1).toBe(true)
    expect(!!ref2.current).toBe(true)
  })

});
