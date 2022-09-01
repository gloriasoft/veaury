import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/vue';
import Event from "./2-scopedSlot-vnode"

test('test scoped slots', async () => {
  render(Event);
  const linkElement = await screen.findByText(/vnode-/);
  expect(linkElement).toBeInTheDocument()
  const linkElement1 = await screen.findByText(/scopedSlotA-attr1/);
  expect(linkElement1).toBeInTheDocument()
  const linkElement2 = await screen.findByText(/slotA/);
  expect(linkElement2).toBeInTheDocument()
});
