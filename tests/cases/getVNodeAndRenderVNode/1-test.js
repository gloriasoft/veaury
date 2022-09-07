import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from 'dev-project-react/src/App';

test('test crossingProvider', async () => {
  window.history.pushState({}, '', '/#/getVNodeAndRenderVNode')
  const {findByText, getByTestId, findByTestId} = render(<App/>)
  expect(await findByTestId('VueContainerTest')).toHaveTextContent('This is a VNode of Foo!')
})
