import {Fragment} from 'react'
import { NavLink } from 'react-router-dom'
export default function introduce() {
  const style = {
    marginRight: 10
  }
  return <Fragment>
    <h1><img src="https://raw.githubusercontent.com/devilwjp/VueReact/master/vuereact-combined.png"/></h1>
    <h2>The React development environment for Veaury</h2>
    <h3>Examples</h3>
    <NavLink to={'/basic'} style={style}>basic</NavLink>
    <NavLink to={'/events'} style={style}>events</NavLink>
    <NavLink to={'/slots'} style={style}>slots</NavLink>
    <NavLink to={'/v-model'} style={style}>v-model</NavLink>
    <NavLink to={'/context'} style={style}>context</NavLink>
    <NavLink to={'/useInjectPropsFromWrapper'} style={style}>useInjectPropsFromWrapper</NavLink>
    <NavLink to={'/CrossingProvider'} style={style}>CrossingProvider</NavLink>
    <NavLink to={'/lazyVueInReact'} style={style}>lazyVueInReact</NavLink>
    <NavLink to={'/ReactMissVue'} style={style}>ReactMissVue</NavLink>
  </Fragment>
}
