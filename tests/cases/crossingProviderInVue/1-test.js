import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/vue';
import routerPlugin from 'dev-project-vue3/src/router'
import storePlugin from 'dev-project-vue3/src/store'
import App from 'dev-project-vue3/src/App'

function getGlobalProperties(targetOject) {
  return function(app) {
    Object.assign(targetOject, app.config.globalProperties)
  }
}
test('test crossingProvider', async () => {
  const globalProperties = {}
  const { findByText, getByTestId } = render(App, {
    global: {
      plugins: [
        routerPlugin,
        storePlugin,
        getGlobalProperties(globalProperties)
      ]
    }
  })
  await globalProperties.$router.push({
    name: 'crossingProvider'
  })
  const linkElement = await findByText(/\/crossingProvider/);
  expect(linkElement).toBeInTheDocument();

  await fireEvent.click(await findByText('change query'))
  // await waitFor(async () => await findByText(/a=/))
  await waitFor(() => {
    const targetFullPath = document.location.hash.replace('#', '')
    expect(getByTestId('fullPath')).toHaveTextContent(targetFullPath)
    expect(getByTestId('fullPathPure')).toHaveTextContent(targetFullPath)
  })

  const lastCount = globalProperties.$store.state.count
  await fireEvent.click(getByTestId('increment count'))
  await waitFor(() => expect(getByTestId('stateCount')).toHaveTextContent(lastCount + 1))
  await waitFor(() => expect(getByTestId('stateCountPure')).toHaveTextContent(lastCount + 1))
})
