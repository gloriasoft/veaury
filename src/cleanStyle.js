const style = document.createElement('style')
const styleValue = {
  position: 'static',
  display: 'inline',
  margin: 0,
  padding: 0,
  float: 'none',
  border: 0,
  'line-height': 'normal',
  background: 'none',
  width: 'auto',
  height: 'auto'
}
const cssText = '[__use_react_component_wrap],[data-use-vue-component-wrap],[__use_react_slot_wrap]' + '{' + Object.keys(styleValue).map(function(v){return v + ':' + styleValue[v] + ';'}).join('') + '}'
const head = document.getElementsByTagName('head')[0]
style.type = 'text/css'
try {
  style.appendChild(document.createTextNode(cssText))
} catch (e) {
  style.styleSheet.cssText = 'cssText' // IE
}
head && head.appendChild(style)
