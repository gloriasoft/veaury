/* Analyzed bindings: {
  "aa": "data",
  "getRandom": "options",
  "update": "options"
} */
import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, mergeProps as _mergeProps, withCtx as _withCtx, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue"
import {h, withCtx, getCurrentInstance, createVNode} from 'vue'
import Basic from "./Basic";
import AA from './AA'

let AASlot
let BBSlot


const __sfc__ = {
  name: "DD",
  created() {
    const slot3 = [h('div', 9999)]
    const slot1 = {
      default: _withCtx(() => slot3),
      _: 1
    }
    BBSlot = [h(Basic, {style: {color: 'red'}, aa: this.aa, bb: () => this.$forceUpdate(), 'onUpdate:aa': (aa) => {this.aa = aa}}, slot1)]
    AASlot = {aa: _withCtx(({value}) => BBSlot), _:1}
  },
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
  },
  mounted() {
    // setInterval(() => {
    //   this.aa = Math.random()
    // }, 1000)
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


const AAA = ({value}) => [h(Basic, {style: {color: 'red'},
  // aa: this.aa, bb: () => this.$forceUpdate(), 'onUpdate:aa': (aa) => {this.aa = aa}
}, {
  default: () => [h('div', 9999)],
})]

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Basic = _resolveComponent("Basic")
  const _component_AA = _resolveComponent("AA")
  const a =this.aa
  // const b =this.bb

  const VNode = h(_component_AA, {
    cc: $options.getRandom(),
    bb: () => {this.$forceUpdate()}
  }, AASlot)
  delete VNode.children._ctx
  delete VNode.children.__vInternal
  VNode.children._ = 1
  console.log(111111111, VNode.children)
  return VNode

}
__sfc__.render = render
__sfc__.__scopeId = "data-v-472cff63"
__sfc__.__file = "App.vue"
export default __sfc__
