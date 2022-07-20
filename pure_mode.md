# Pure mode  

## Example  
The example is given to illustrate the difference between `applyReactInVue` and `applyPureReactInVue`.  

The React component AA.  
(./react_app/AA)  
```jsx
import React from 'react'

const containerStyle = {
  background: '#91e7fc',
  width: 500,
  margin: 'auto',
  padding: 10,
  display: 'flex',
  justifyContent: 'space-around'
}
export default function AA(props) {
  return <div style={containerStyle}>
    {props.children}
  </div>
}
```

The Vue example.  
Shows the difference in display of AA components using `applyReactInVue` and `applyPureReactInVue` respectively.  
```vue
<template>
  <h3>Pure mode</h3>
  <AAWithPure>
    <div class="flex-sub">A</div>
    <div class="flex-sub">B</div>
    <div class="flex-sub">C</div>
  </AAWithPure>
  <br/>
  <h3>Normal mode</h3>
  <AAWithNormal>
    <div class="flex-sub">A</div>
    <div class="flex-sub">B</div>
    <div class="flex-sub">C</div>
  </AAWithNormal>
</template>

<script setup>
import { applyPureReactInVue, applyReactInVue } from 'veaury'
// React component AA
import AAReact from './react_app/AA'

// Children and slots in the component will be rendered completely as pure ReactNode
const AAWithPure = applyPureReactInVue(AAReact)
const AAWithNormal = applyReactInVue(AAReact)

</script>

<style scoped>
.slot {
  background: aquamarine;
  padding: 10px;
  margin: 10px;
}
.flex-sub {
  width: 50px;
  height: 50px;
  background: dodgerblue;
  line-height: 50px;
  margin: 5px;
}
</style>
```
## Preview  
<img width="500" src="https://user-images.githubusercontent.com/38802722/179908805-be8afde8-8c92-4eea-ad7b-b2040ee8b94a.png"/>  

## Why does it behave like this?  
<img width="800" src="https://user-images.githubusercontent.com/38802722/179910828-b20c9128-a531-4de5-ab0f-7075eafb9b80.png"/>  

