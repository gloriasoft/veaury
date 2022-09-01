import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import Basic from './Basic';
import LazyReactInVue from './LazyReactInVue'
// function Basic() {
//   return h('div', null, 121212)
// }
test('renders a React component In Vue', (done) => {
  render(Basic);
  setTimeout(() => {
    const linkElement = screen.getByText(/React in Vue/);
    expect(linkElement).toBeInTheDocument();
    done()
  })
});

test('test lazyReactInVue', (done) => {
  render(LazyReactInVue);
  setTimeout(() => {
    const linkElement = screen.getByText(/test lazyReactInVue/);
    expect(linkElement).toBeInTheDocument();
    done()
  })
})
