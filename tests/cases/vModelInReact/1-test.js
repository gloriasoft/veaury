import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from 'dev-project-react/src/App';

test('test crossingProvider', async () => {
  window.history.pushState({}, '', '/#/useInjectPropsFromWrapper')
  const {findByText, getByTestId, findByTestId} = render(<App/>)
  const targetFullPath = document.location.hash.replace('#', '')
  expect(await findByTestId('fullPath')).toHaveTextContent(targetFullPath)

  // A click triggers an asynchronous update of the state
  await (new Promise((resolve) => {
    setTimeout(async () => {
      fireEvent.click(await findByTestId('changeQuery'))
      resolve()
    })
  }))

  await waitFor(async () => {
    const targetFullPath = document.location.hash.replace('#', '')
    if (!targetFullPath.match(/\?a=/)) expect().toThrowError('Hash has no parameters!')
    expect(await findByTestId('fullPath')).toHaveTextContent(targetFullPath)
  })
})
