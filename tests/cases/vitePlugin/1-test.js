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
    let result = vitePlugin({
      type: 'custom',
      // The jsx in .vue files and in the directory named 'vue_app' will be parsed with vue jsx.
      vueJsxInclude: [/vue&type=script&lang\.[tj]sx?$/, /vue&type=script&setup=true&lang\.[tj]sx?$/, /[/\\]vue_app[\\/$]+/],
      vueJsxExclude: []
    })
    expect(result.length === 4).toBe(true)

    result = vitePlugin({
      type: 'custom'
    })
    expect(result.length === 4).toBe(true)
  })
  // test('Test react-dom/client', async () => {
  //   const result = vitePlugin({
  //     type: 'vue'
  //   })
  //   const resolveId = result[0].resolveId
  //   // fake this.resolve
  //   let fakeThis = {
  //     resolve: () => true
  //   }
  //   let resolution
  //   resolution = await resolveId.call(fakeThis, 'react-dom/client', '')
  //   expect(resolution).toBe(undefined)
  //   resolution = await resolveId.call(fakeThis, 'aabbcc', '')
  //   expect(resolution).toBe(undefined)
  //   fakeThis = {
  //     resolve: () => null
  //   }
  //   resolution = await resolveId.call(fakeThis, 'react-dom/client', '')
  //   expect(resolution.id === 'veaury-fake-react-dom-client').toBe(true)
  //
  //   const load = result[0].load
  //   expect(!!load('veaury-fake-react-dom-client')).toBe(true)
  //   expect(!!load('asasas')).toBe(false)
  // })
})
