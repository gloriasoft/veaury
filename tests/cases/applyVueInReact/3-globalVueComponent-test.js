import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import VueComponent from './3-globalVueComponent'
import {h} from 'vue'
import {applyVueInReact, getVNode, VueContainer} from 'veaury'

function VueFC(props, context) {
  return h('div', context.attrs, context.slots)
}
const ReactComponent = applyVueInReact(VueFC, {beforeVueAppMount(app) {
 app.component('GlobalVueComponent', VueComponent)
}})
const ReactNode = <div>test getVNode</div>
test('test global vue component', async () => {
  render(<ReactComponent>
    <VueContainer component={'GlobalVueComponent'}/>
  </ReactComponent>);
  const linkElement = await screen.findByText(/test global vue component/);
  expect(linkElement).toBeInTheDocument();
});
