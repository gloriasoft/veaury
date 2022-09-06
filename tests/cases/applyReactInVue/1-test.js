import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import Basic from './Basic';
import LazyReactInVue from './LazyReactInVue'

describe('', () => {
  test('renders a React component In Vue', async () => {
    render(Basic);
    let linkElement = await screen.findByText(/React in Vue/);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText(/test ref/);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText((content, element) => content.match(/test pure style/) && element.style.color === 'red' && element.classList.contains('AAA'));
    expect(linkElement).toBeInTheDocument();
  });

  test('test lazyReactInVue', async () => {
    render(LazyReactInVue);
    let linkElement = await screen.findByText(/test lazyReactInVue/);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText(/test lazyPureReactInVue/);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText(/lazyReactInVue loader options/);
    expect(linkElement).toBeInTheDocument();
    linkElement = await screen.findByText(/lazyPureReactInVue loader options/);
    expect(linkElement).toBeInTheDocument();
  })
})

