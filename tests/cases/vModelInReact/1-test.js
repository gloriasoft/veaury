import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from 'dev-project-react/src/App';

test('test crossingProvider', async () => {
  window.history.pushState({}, '', '/#/v-model')
  const {findByText, getByTestId, findByTestId} = render(<App/>)
  expect(await findByTestId('reactModelShow')).toBeVisible()
  expect(await findByTestId('reactModelShow1')).toBeVisible()

  await act(async () => {
    fireEvent.click(await findByTestId('changeModel'))
    fireEvent.click(await findByTestId('changeModel1'))
  })

  await waitFor(async () => {
    expect(await findByTestId('vModelShow')).toHaveTextContent(getByTestId('reactModelShow').innerHTML)
    expect(await findByTestId('vModelShow1')).toHaveTextContent(getByTestId('reactModelShow1').innerHTML)
  })

  await act(async () => {
    fireEvent.click(await findByTestId('changeModel'))
    fireEvent.click(await findByTestId('changeModel1'))
  })

})
