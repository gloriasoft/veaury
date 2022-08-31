import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Basic from './Basic';

test('renders a Vue component in React', () => {
  render(<Basic/>);
  const linkElement = screen.getByText(/Vue in React/);
  expect(linkElement).toBeInTheDocument();
});
