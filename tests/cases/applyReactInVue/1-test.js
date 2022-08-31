import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import Basic from './Basic';
// function Basic() {
//   return h('div', null, 121212)
// }
test('renders a React component In Vue', () => {
  render(Basic);
  const linkElement = screen.getByText(/React in Vue/);
  expect(linkElement).toBeInTheDocument();
});
