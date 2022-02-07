import lazyVueInReact from './lazyVueInReact'
import lazyReactInVue from './lazyReactInVue'
import applyReactInVue from './applyReactInVue'
import applyVueInReact, { VueContainer } from './applyVueInReact'
import applyRedux from './applyRedux'
import applyVuex, { connectVuex } from './applyVuex'
import withVueRouter from './withVueRouter'
import vueRootInfo from './vueRootInfo'
import applyReactRouterInVue from './applyReactRouterInVue'
import REACT_ALL_HANDLERS from './reactAllHandles'
// import './cleanStyle'
// 兼容旧的方法名(因为旧的方法名中的use与react hook有冲突)
const useReactInVue = applyReactInVue
const useVueInReact = applyVueInReact
const useRedux = applyRedux
const useVuex = applyVuex
export {
  lazyVueInReact,
  lazyReactInVue,
  applyReactInVue,
  applyVueInReact,
  VueContainer,
  applyRedux,
  applyVuex,
  connectVuex,
  useReactInVue,
  useVueInReact,
  useRedux,
  useVuex,
  withVueRouter,
  vueRootInfo,
  applyReactRouterInVue,
  REACT_ALL_HANDLERS
}
