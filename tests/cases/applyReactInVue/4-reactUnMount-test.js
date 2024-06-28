import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/vue';
import Component from "./4-reactUnMount.vue"

test('test reactUnMount', async () => {
  render(Component);
  await new Promise(resolve => {
    setTimeout(resolve, 300);
  })
  const linkElement = await screen.findByText(/test-result-1/);
  expect(linkElement).toBeInTheDocument()  
});
test('test reactUnMount getElementById', async () => {
  render(Component);
  await new Promise(resolve => {
    setTimeout(resolve, 300);
  })
  const linkElement = await screen.findByText(/test-result-2/);
  expect(linkElement).toBeInTheDocument()  
});
// test('test reactUnMount querySelector', async () => {
//   render(Component);
//   await new Promise(resolve => {
//     setTimeout(resolve, 300);
//   })
//   const linkElement = await screen.findByText(/reactUnMountQuerySelectorSuccess/);
//   expect(linkElement).toBeInTheDocument()  
// });
