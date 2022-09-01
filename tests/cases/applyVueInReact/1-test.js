import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import Basic from './Basic';
import {lazyVueInReact} from 'veaury'

test('renders a Vue component in React', () => {
  render(<Basic/>);
  const linkElement = screen.getByText(/Vue in React/);
  expect(linkElement).toBeInTheDocument();
});


test('test lazyVueInReact', (done) => {
  const VueComponentInReact = lazyVueInReact(() => import('./VueComponent'))
  act(async () => {
    render(<VueComponentInReact>test lazyVueInReact</VueComponentInReact>)
  }).then(() => {
    const linkElement = screen.getByText(/test lazyVueInReact/);
    expect(linkElement).toBeInTheDocument();
    done()
  })
})
