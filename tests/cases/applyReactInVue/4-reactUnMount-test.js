import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/vue';
import Component from "./4-reactUnMount.vue"

test('test reactUnMount', async () => {
  render(Component);
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  })
  const linkElement = await screen.findByText(/reactUnMountSuccess/);
  expect(linkElement).toBeInTheDocument()  
});
