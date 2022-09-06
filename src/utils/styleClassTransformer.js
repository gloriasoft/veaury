import toCamelCase from './toCamelCase'

export function formatStyle(val) {
    if (!val) return {}
    if (typeof val === 'string') {
        val = val.trim()
        return val.split(/\s*;\s*/).reduce((prev, cur) => {
            if (!cur) {
                return prev
            }
            cur = cur.split(/\s*:\s*/)
            if (cur.length !== 2) return prev
            Object.assign(prev, {
                [toCamelCase(cur[0])]: cur[1],
            })
            return prev
        }, {})
    }
    if (typeof val === 'object') {
        const newVal = {}
        Object.keys(val).forEach((v) => {
            newVal[toCamelCase(v)] = val[v]
        })
        return newVal
    }
    return {}
}

export function formatClass(val) {
    if (!val) return []
    if (val instanceof Array) return val
    if (typeof val === 'string') {
        val = val.trim()
        return val.split(/\s+/)
    }
    if (typeof val === 'object') {
        return Object.keys(val).filter((v)=>!!val[v])
    }
    return []
}
