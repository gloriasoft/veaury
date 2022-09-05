import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from 'dev-project-react/src/App';

test('test crossingProvider', async () => {
  window.history.pushState({}, '', '/#/ReactMissVue')
  const {findByText, getByTestId, findByTestId} = render(<App/>)
  expect(await findByText(/This example shows the basic usage of `ReactMissVue`/)).toBeInTheDocument()

  // A click triggers an asynchronous update of the state
  await act(async () => {
    fireEvent.click(await findByTestId('jumpAAA'))
    fireEvent.change(getByTestId('fooValue'), {
      target: {
        value: 'abc'
      }
    })
  })

  await waitFor(async () => {
    expect(await findByTestId('routePath')).toHaveTextContent('path: /aaa')
    expect(await findByTestId('fooValueShow')).toHaveTextContent('abc')
  })
})
