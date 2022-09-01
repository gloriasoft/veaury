import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import VueComponent from './3-getReactNode';

test('test getReactNode', async () => {
  render(VueComponent);
  const linkElement = await screen.findByText(/test getReactNode/);
  expect(linkElement).toBeInTheDocument();
});
