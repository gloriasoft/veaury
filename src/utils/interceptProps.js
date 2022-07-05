// import {Input} from '@wemo-ui/klein'

// 处理Input和TextArea的输入法闪烁问题
// const reactComponents = [Input, Input.TextArea, Input.Search]

export function pureInterceptProps (target = {}, child, ReactComponent) {
    return target
    if (reactComponents.indexOf(ReactComponent) > -1) {
        if (target.onChange && child.__top__) {
            const oldChange = target.onChange
            target.onChange = function(...args) {
                child.__extraData = {
                    value: args[0].target.value
                }
                child.__top__.__syncUpdateProps({})
                // 利用缓式微任务还原
                // let parentWrapper = child.__top__.parentReactWrapperRef
                // function slowMicroTask () {
                //     if (parentWrapper) {
                //         parentWrapper = parentWrapper.parentVueWrapperRef?.parentReactWrapperRef
                //         child.__top__.$nextTick(slowMicroTask)
                //         return
                //     }
                //     child.__top__.$nextTick(() => {
                //         child.__top__.__syncUpdateProps()
                //     })
                // }
                // child.__top__.$nextTick(slowMicroTask)
                child.__top__.macroTaskUpdate = true;
                oldChange.apply(this, args)
                if (child.__top__) {
                    Promise.resolve().then(() => {
                        child.__extraData = null
                        child.__top__.mountReactComponent(true)
                    })
                }
            }
        }
    }
    return target
}
