import React, {useEffect} from 'react'

export default function BB(props) {
  useEffect(() => {
    console.log('BB mounted!!!!!')
  }, [])
  return props.children
}
