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
    expect(await findByTestId('vModelShow')).toHaveTextContent(getByTestId('reactModelShow').textContent)
    expect(await findByTestId('vModelShow1')).toHaveTextContent(getByTestId('reactModelShow1').textContent)
    expect(await findByTestId('zooValueShow2_0')).toHaveTextContent(getByTestId('reactModelShow1').textContent)
    expect(await findByTestId('zooValueShow2_1')).toHaveTextContent(getByTestId('reactModelShow1').textContent)
    expect(await findByTestId('modelValueShow2_2')).toHaveTextContent(getByTestId('reactModelShow1').textContent)
  })

  await act(async () => {
    fireEvent.click(await findByTestId('changeModel2_0'))
    fireEvent.click(await findByTestId('changeModel2_1'))
    fireEvent.click(await findByTestId('changeModel2_2'))
  })

  await waitFor(async () => {
    expect(await findByTestId('modelType0')).toHaveTextContent('string')
    expect(await findByTestId('modelType1')).toHaveTextContent('number')
    expect(await findByTestId('modelType2')).toHaveTextContent('number')
  })
})
