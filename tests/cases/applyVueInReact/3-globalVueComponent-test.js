import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import VueComponent from './2-getVNode'
import {applyPureVueInReact, getVNode} from 'veaury'

const ReactComponent = applyPureVueInReact(VueComponent)
const ReactNode = <div>test getVNode</div>
test('test getVNode', (done) => {
  render(<ReactComponent passingVNode={getVNode(ReactNode)}/>);
  setTimeout(() => {
    const linkElement = screen.getByText(/test getVNode/);
    expect(linkElement).toBeInTheDocument();
    done()
  })

});
