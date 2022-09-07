import preset from "babel/ReactPreset";

describe('Test babel/ReactPreset.js', () => {
  test('Test default options', () => {
    const result = preset()
    const testFunction = result.overrides[0].test
    expect(result.presets.length === 1).toBe(true)
    expect(testFunction('/node_modules/xxxx') === undefined).toBe(true)
    expect(testFunction('node_modules/xxxx') === undefined).toBe(true)
    expect(testFunction('/react_app/xxxx') === '/react_app/xxxx').toBe(true)
  })

  test('Test custom options', () => {
    const result = preset({},{
      test (filename) {
        // default ignore node_modules
        if (filename.match(/[/\\]node_modules[\\/$]+/)) return
        // default pass abc path
        if (filename.match(/[/\\]abc[\\/$]+/)) return filename
      },
    })
    const testFunction = result.overrides[0].test
    expect(result.presets.length === 1).toBe(true)
    expect(testFunction('/abc/xxxx') === '/abc/xxxx').toBe(true)
  })
})
