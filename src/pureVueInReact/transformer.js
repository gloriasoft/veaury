import applyVueInReact from '../applyVueInReact'

export default function transformer (ReactComponent, {globalName, combinedOption, transparentApi} = {}) {
   return applyVueInReact(ReactComponent, combinedOption || {})
}
