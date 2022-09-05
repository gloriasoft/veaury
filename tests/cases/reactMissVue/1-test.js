import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from 'dev-project-react/src/App';

test('test crossingProvider', async () => {
  window.history.pushState({}, '', '/#/CrossingProvider')
  const {findByText, getByTestId, findByTestId} = render(<App/>)
  expect(await findByText(/createCrossingProviderForVueInReact/)).toBeInTheDocument()

  // A click triggers an asynchronous update of the state
  await act(async () => {
    fireEvent.click(await findByTestId('changeQuery'))
  })

  await waitFor(() => {
    const targetFullPath = document.location.hash.replace('#', '')
    if (!targetFullPath.match(/\?a=/)) expect().toThrowError('Hash has no parameters!')
    expect(getByTestId('pathnameSearch')).toHaveTextContent(targetFullPath)
    expect(getByTestId('pathnameSearchPure')).toHaveTextContent(targetFullPath)
  })
})
