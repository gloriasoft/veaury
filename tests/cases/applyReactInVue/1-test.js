import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import Basic from './Basic';
import LazyReactInVue from './LazyReactInVue'
// function Basic() {
//   return h('div', null, 121212)
// }
test('renders a React component In Vue', async () => {
  render(Basic);
  const linkElement = await screen.findByText(/React in Vue/);
  expect(linkElement).toBeInTheDocument();
});

test('test lazyReactInVue', async () => {
  render(LazyReactInVue);
  let linkElement = await screen.findByText(/test lazyReactInVue/);
  expect(linkElement).toBeInTheDocument();
  linkElement = await screen.findByText(/test lazyPureReactInVue/);
  expect(linkElement).toBeInTheDocument();
})
