import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import routerPlugin from 'dev-project-vue3/src/router'
import storePlugin from 'dev-project-vue3/src/store'
import App from 'dev-project-vue3/src/App'
import addScopeId from "src/pureReactInVue/addScopeId";
import resolveRef from "src/pureReactInVue/resolveRef";

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
    name: 'pureReactInVue'
  })
  expect(await findByText(/applyPureReactInVue/)).toBeInTheDocument();
  expect((await findByTestId('directiveTest')).style.color).toBe('red')
  expect(await findByTestId('random')).toBeVisible()
  expect(await findByTestId('ccRenderProps1')).toHaveTextContent('PPPPP')
  expect(await findByTestId('ccReactNode')).toHaveTextContent('RRRRR')
  expect(await findByTestId('ccDefault')).toHaveTextContent('YYYYY')
  expect(await findByText(/8888/)).toBeInTheDocument('8888')
  expect(await findByText(/6666/)).toBeInTheDocument('6666')
})

test('Test hashList', () => {
  const child = {}
  expect(addScopeId(child, [])).toBe(child)
  expect(addScopeId(child, ['aaaa']).props.aaaa).toBe('')
})

// Test('Test resolveRef', () => {
//   const child = {}
//   expect().toBe()
// })
