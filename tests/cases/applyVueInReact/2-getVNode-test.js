import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React, { Fragment } from 'react';
import VueComponent from './2-getVNode'
import {applyPureVueInReact, getVNode} from 'veaury'

const ReactComponent = applyPureVueInReact(VueComponent)
function TempReactComponent() {
  return <div>TempReactComponent</div>
}
const ReactNode = <Fragment><div>test getVNode<TempReactComponent/></div></Fragment>
test('test getVNode', async () => {
  let ref1
  let ref2 = {current: null}
  render(<ReactComponent passingVNode={getVNode(() => ReactNode)}>
    <div data-testid="children1" ref={(r) => {ref1 = r}}>children1</div>
    <div data-testid="children2" ref={ref2}>children2</div>
  </ReactComponent>);
  await waitFor(() => {
    expect(screen.getByText(/test getVNode/)).toBeInTheDocument();
    expect(screen.getByText(/TempReactComponent/)).toBeInTheDocument();
    expect(!!ref1).toBe(true)
    expect(!!ref2.current).toBe(true)
  })

});
