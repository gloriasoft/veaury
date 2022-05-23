import * as React from 'react'
import {forwardRef} from 'react'
import injectPropsFromWrapper from "./injectPropsFromWrapper"

function withVueScopeInReact(injectionFunction ,Component) {
  console.log(injectionFunction)
  function Bridge(props, ref) {
    console.log(props)
    const refInfo = ref? { ref }: {}
    return <Component {...props} {...refInfo}/>
  }

  const name = Component.displayName || Component.name;
  forwardRef.displayName = `withVueScopeInReact(${name})`;

  return injectPropsFromWrapper(injectionFunction, forwardRef(Bridge))
}

export default withVueScopeInReact
