function createModifiers(VModels, modelKey, modifiers) {
    const modifiersObject = {}
    modifiers.forEach((key) => {
        modifiersObject[key] = true
    })
    return VModels[(modelKey === 'modelValue'? 'model': modelKey) + 'Modifiers'] = modifiersObject
}

function setVModel(VModels, originValue, modelKey, errorFrom = 'v-model') {
    const modelMix = originValue
    if (modelMix instanceof Array) {
        if (typeof modelMix[1] !== 'function') {
            throw Error(`[error:veaury] Parameter type error from '${errorFrom}', a single v-model is an array, the second element of the array must be a setter function`)
        }
        const setter = modelMix[1]
        if (typeof modelMix[2] === 'string') {
            modelKey = modelMix[2]
            if (modelMix[3] instanceof Array) {
                createModifiers(VModels, modelKey, modelMix[3])
            }
        } else if (modelMix[2] instanceof Array) {
            createModifiers(VModels, modelKey, modelMix[2])
        }
        const onUpdate = VModels['onUpdate:' + modelKey]
        if (typeof onUpdate === 'function') {
            VModels['onUpdate:' + modelKey] = (...args) => {
                onUpdate.apply(this, args)
                setter.apply(this, args)
            }
        } else {
            VModels['onUpdate:' + modelKey] = setter
        }
        VModels[modelKey] = modelMix[0]
    } else {
        throw Error(`[error:veaury] Parameter type error from '${errorFrom}', a single v-model is an array, such as [val, setter, argumentKey, modifiers] or [val, setter, modifiers]`)
    }
}

// parse v-model
export default function parseVModel (props) {
    const VModels = {}
    const newProps = {...props}

    Object.keys(props).forEach((key) => {
        // parse onUpdate event
        let matcher = key.match(/^onUpdate-([^-]+)/)
        if (matcher) {
            delete newProps[key]
            const onUpdate = VModels[`onUpdate:${matcher[1]}`]
            if (typeof onUpdate === 'function') {
                VModels[`onUpdate:${matcher[1]}`] = (...args) => {
                    onUpdate.apply(this, args)
                    props[key].apply(this, args)
                }
            } else {
                VModels[`onUpdate:${matcher[1]}`] = props[key]
            }
            return
        }

        // single v-model
        matcher = key.match(/^v-model($|:([^:]+)|-([^:]+))/)
        if (matcher) {
            let modelKey = matcher[2] || matcher[3] || 'modelValue'
            setVModel(VModels, props[key], modelKey)
            delete newProps[key]
            return
        }
        // multiple v-model
        if (key === 'v-models') {
            if (typeof props[key] === 'object' && !(props[key] instanceof Array)) {
                const modelsParam = props[key]
                Object.keys(modelsParam).forEach((key) => {
                    setVModel(VModels, modelsParam[key], key, 'v-models')
                })
                delete newProps[key]
            } else {
                throw Error('[error:veaury] The parameter \'v-models\' must be an object type, such as {[argumentKey]: singleVModel}')
            }
        }
    })
    return {...newProps, ...VModels}
}
