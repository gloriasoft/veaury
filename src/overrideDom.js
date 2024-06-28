const domMethods = ["getElementById", "getElementsByClassName", "getElementsByTagName", "getElementsByTagNameNS", "querySelector", "querySelectorAll"]
const domTopObject = { Document: {}, Element: {} }
/**
 * Override the native method of finding DOM objects.
 * In order to ensure that React can obtain the DOM before destruction,
 * and the DOM has been unloaded in the beforeDestroy phase of Vue
 **/
export function overwriteDomMethods(refDom) {
    Object.keys(domTopObject).forEach((key) => {
        domMethods.forEach((method) => {
            const old = window[key].prototype[method]
            if (!old) return
            domTopObject[key][method] = old
            // console.log(`key:${key}, method:${method}, old:${old}`)
            window[key].prototype[method] = function (...args) {
                const oldResult = old.apply(this, args)
                if (oldResult && (oldResult.constructor !== NodeList || (oldResult.constructor === NodeList && oldResult.length > 0))) return oldResult
                // If each function of Document is called using apply, an error will occur. Here you need to use the native function of Element.
                if (method === 'getElementById'){
                    method = 'querySelector'
                    args = ['#' + args[0]]
                }
                const nativeElementFn = domTopObject.Element[method] || Element.prototype[method]
                return nativeElementFn.apply(refDom, args)
            }
        })
    })
}
// Restore native method
export function recoverDomMethods() {
    Object.keys(domTopObject).forEach((key) => {
        domMethods.forEach((method) => {
            window[key].prototype[method] = domTopObject[key][method]
        })
    })
}
