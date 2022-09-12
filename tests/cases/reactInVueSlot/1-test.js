import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import routerPlugin from 'dev-project-vue3/src/router'
import storePlugin from 'dev-project-vue3/src/store'
import App from 'dev-project-vue3/src/App'

function getGlobalProperties(targetOject) {
  return function(app) {
    Object.assign(targetOject, app.config.globalProperties)
  }
}

test('Test pureReactInVue', async () => {
  const globalProperties = {}
  const { findByText, getByTestId, findByTestId } = render(App, {
    global: {
      plugins: [
        routerPlugin,
        storePlugin,
        getGlobalProperties(globalProperties)
      ]
    }
  })
  await globalProperties.$router.push({
    name: 'slots'
  })
  expect(await findByText(/This is the Custom1 Vue Component./)).toBeInTheDocument();
})
