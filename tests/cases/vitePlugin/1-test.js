/**
 * @jest-environment node
 */

import vitePlugin from "root/vite/index";

describe('Test babel/ReactPreset.js', () => {
  test('Test type vue', () => {
    const result = vitePlugin({
      type: 'vue'
    })
    expect(result.length === 4).toBe(true)
    expect(!!result[2].config()).toBe(true)
  })
  test('Test type react', () => {
    const result = vitePlugin({
      type: 'react'
    })
    expect(result.length === 4).toBe(true)
  })
  test('Test type custom', () => {
    const result = vitePlugin({
      type: 'custom',
      // The jsx in .vue files and in the directory named 'vue_app' will be parsed with vue jsx.
      vueJsxInclude: [/vue&type=script&lang\.[tj]sx?$/, /vue&type=script&setup=true&lang\.[tj]sx?$/, /[/\\]vue_app[\\/$]+/],
      vueJsxExclude: []
    })
    expect(result.length === 4).toBe(true)
  })
})
