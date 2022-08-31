import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AA from './AA';
import { applyVueInReact } from 'veaury'
const AAReact = applyVueInReact(AA)
function Test() {
  return <div>ABC</div>
}

test('renders learn react link', () => {
  render(<AAReact/>);
  const linkElement = screen.getByText(/Vue/);
  expect(linkElement).toBeInTheDocument();
});
