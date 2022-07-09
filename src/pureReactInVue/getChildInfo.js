import {formatClass, formatStyle} from './vueStyleClassTransformer'

export default function getChildInfo(child, index, vueInReactCall, defaultSlotsFormatter, hashList) {

    console.log('childinfo', child)
    const {on, key, scopedSlots = {}, ...props} = child.props
    // const {$stable, ...scoped} = scopedSlots
    //
    // const reactScoped = {}
    // Object.keys(scoped).forEach((key) => {
    //     // 判断具名插槽还是作用域插槽, 没有太好的办法, 这里通过将函数toString判断有没有参数
    //     const fn = scoped[key]
    //     const fnString = fn.toString()
    //     if (fnString.match(/^function\s*\(\s*\)/)) {
    //         // 具名插槽
    //         // reactScoped[key] = vueInReactCall([scoped[key]()])
    //         reactScoped[key] = defaultSlotsFormatter(scoped[key](), vueInReactCall, hashList)
    //     } else {
    //         // 作用域插槽
    //         reactScoped[key] = function(...args) {
    //             // return vueInReactCall([fn.apply(this, args)])
    //             return defaultSlotsFormatter(fn.apply(this, args), vueInReactCall, hashList)
    //         }
    //     }
    // })

    const newProps = {}
    const style = formatStyle(props.style)
    const className = Array.from(new Set(formatClass(props.class))).join(' ')
    if (Object.keys(style).length > 0) newProps.style = style
    if (className !== '') newProps.className = className

    const result = props
    Object.assign(result, {
        ...newProps,
        // ...reactScoped,
        // ...attrs,
    })
    delete result.class

    console.log(99999999, result)
    // 处理属性
    return result
}
