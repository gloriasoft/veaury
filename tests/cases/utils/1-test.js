import couldBeClass from "src/utils/couldBeClass";
import { formatClass, formatStyle } from "src/utils/styleClassTransformer";
describe('Test utils', () => {

  test('Test couldBeClass.js', () => {
    expect(couldBeClass({})).toBe(false)
    expect(couldBeClass(112)).toBe(false)
    expect(couldBeClass('1212')).toBe(false)
    expect(couldBeClass(null)).toBe(false)
    expect(couldBeClass(undefined)).toBe(false)
    expect(couldBeClass(function () {})).toBe(false)
    expect(couldBeClass(() => {})).toBe(false)
    expect(couldBeClass(async function () {})).toBe(false)

    expect(couldBeClass(class{})).toBe(true)
  })

  test('Test styleClassTransformer.js', () => {
    expect(formatClass({
      'AAA': true,
      'BBB': false
    }).toString()).toBe('AAA')
    expect(formatClass('aaaa bbbb').toString()).toBe('aaaa,bbbb')
    expect(formatClass([]).toString()).toBe('')
    expect(formatClass(1212).toString()).toBe('')

    expect(JSON.stringify(formatStyle('color: red; font-weight: bold ; aaa; '))).toBe('{"color":"red","fontWeight":"bold"}')
    expect(JSON.stringify(formatStyle(1212))).toBe('{}')
  })

})
