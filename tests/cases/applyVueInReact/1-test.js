import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import Basic from './Basic';
import {lazyVueInReact, lazyPureVueInReact} from 'veaury'
import {transferSlots} from "src/applyVueInReact";

test('renders a Vue component in React', () => {
  render(<Basic/>);
  const linkElement = screen.getByText(/Vue in React/);
  expect(linkElement).toBeInTheDocument();
});


test('test lazyVueInReact', async () => {
  const VueComponentInReact = lazyVueInReact(() => import('./VueComponent'))
  const PureVueComponentInReact = lazyPureVueInReact(() => import('./VueComponent'))
  await act(async () => {
    render(<div>
      <VueComponentInReact>test lazyVueInReact</VueComponentInReact>
      <PureVueComponentInReact>test lazyPureVueInReact</PureVueComponentInReact>
    </div>)
  })

  let linkElement = await screen.findByText(/test lazyVueInReact/);
  expect(linkElement).toBeInTheDocument();
  linkElement = await screen.findByText(/test lazyPureVueInReact/);
  expect(linkElement).toBeInTheDocument();
})

describe('Test transferSlots', () => {
  test('Without passing in $slots', () => {
    expect(transferSlots()).toBe(undefined)
    let slot = {
      a: null
    }
    expect(transferSlots(slot) === slot).toBe(true)
    slot = {
      a: {
        vueFunction: () => {}
      }
    }
    expect(transferSlots(slot) === slot).toBe(true)
  })
})
