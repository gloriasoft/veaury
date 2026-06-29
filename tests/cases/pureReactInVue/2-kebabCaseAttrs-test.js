import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import KebabCaseAttrs from './2-kebabCaseAttrs'
import KebabCaseAttrsUpdate from './2-kebabCaseAttrs-update'
import KebabCaseAttrsWrapped from './2-kebabCaseAttrs-wrapped'

test('applyPureReactInVue maps kebab-case attrs to camelCase props', async () => {
  render(KebabCaseAttrs)
  expect(await screen.findByTestId('myProp')).toHaveTextContent('value')
  expect(await screen.findByTestId('anotherProp')).toHaveTextContent('value')
  expect(await screen.findByTestId('aria-label')).toHaveTextContent('value')
  expect(await screen.findByTestId('data-foo')).toHaveTextContent('value')
  expect(await screen.findByTestId('alreadyCamel')).toHaveTextContent('value')
})

test('applyPureReactInVue maps kebab-case attrs when wrapped inside another applyPureReactInVue', async () => {
  render(KebabCaseAttrsWrapped)
  expect(await screen.findByTestId('myProp')).toHaveTextContent('value')
  expect(await screen.findByTestId('anotherProp')).toHaveTextContent('value')
})

test('applyPureReactInVue updates transformed attrs reactively', async () => {
  render(KebabCaseAttrsUpdate)
  expect(await screen.findByTestId('myProp')).toHaveTextContent('value')
  await fireEvent.click(await screen.findByTestId('update-btn'))
  await waitFor(async () => {
    expect(await screen.findByTestId('myProp')).toHaveTextContent('new-value')
  })
})
