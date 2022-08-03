/* Analyzed bindings: {
  "aa": "data",
  "getRandom": "options",
  "update": "options"
} */
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, mergeProps as _mergeProps, withCtx as _withCtx, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue"
import {h, withCtx, getCurrentInstance, createVNode} from 'vue'
import Basic from "./Basic";
import AA from './AA'

const __sfc__ = {
  name: "DD",
  data() {
    return {
      aa: Math.random()
    }
  },
  components: {
    Basic,
    AA
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    update() {
      this.$forceUpdate()
    }
  }
  // render() {
  //   const style = {color: 'red'}
  //   // const node = withCtx(() => [<div>999</div>, <div>77777</div>], getCurrentInstance())
  //
  //   // return <AA v-slots={{
  //   //   aa: ({value}) => <Basic className="CCC" style={style} v-slots={{default:  node}}></Basic>
  //   // }}/>
  //   return createVNode(AA, {}, {
  //     aa: ({value}) => createVNode(Basic, {
  //       className: 'CCC',
  //       style: {color: 'red'}
  //     })
  //   })
  // }
}



const _withScopeId = n => (_pushScopeId("data-v-472cff63"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("div", null, "999911111", -1 /* HOISTED */))
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Basic = _resolveComponent("Basic")
  const _component_AA = _resolveComponent("AA")

  return (_openBlock(), _createBlock(_component_AA, {
    cc: $options.getRandom()
  }, {
    aa: _withCtx(({value}) => [
      _createVNode(_component_Basic, _mergeProps({
        className: "CCC",
        style: {color: 'red'},
        aa: $data.aa,
        "onUpdate:aa": _cache[0] || (_cache[0] = $event => (($data.aa) = $event))
      }), {
        default: _withCtx(() => [
          _hoisted_1
        ]),
        _: 1 /* STABLE */
      }, 8 /* FULL_PROPS */, ["aa", "className", "style", "onUpdate:aa"])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["cc"]))
}
__sfc__.render = render
__sfc__.__scopeId = "data-v-472cff63"
__sfc__.__file = "App.vue"
export default __sfc__
