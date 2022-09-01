import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import VueComponent from './3-getReactNode';

test('test getReactNode', (done) => {
  render(VueComponent);
  setTimeout(() => {
    const linkElement = screen.getByText(/test getReactNode/);
    expect(linkElement).toBeInTheDocument();
    done()
  })

});
