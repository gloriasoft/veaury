import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import VueComponent from './2-getVNode'
import {applyPureVueInReact, getVNode} from 'veaury'

const ReactComponent = applyPureVueInReact(VueComponent)
const ReactNode = <div>test getVNode</div>
test('test getVNode', () => {
  render(<ReactComponent passingVNode={getVNode(ReactNode)}/>);
  const linkElement = screen.getByText(/test getVNode/);
  expect(linkElement).toBeInTheDocument();
});
