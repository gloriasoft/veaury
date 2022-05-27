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
            domTopObject[key][method] = old
            window[key].prototype[method] = function (...args) {
                const oldResult = old.apply(this, args)
                if (oldResult && (oldResult.constructor !== NodeList || (oldResult.constructor === NodeList && oldResult.length > 0))) return oldResult
                return Element.prototype[method].apply(refDom, args)
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
