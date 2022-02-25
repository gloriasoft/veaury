import {lazy, Suspense} from 'react'

const asyncElement = (asyncImport) => {
  const Component = lazy(asyncImport)
  return <Suspense fallback={<div>loading...</div>}><Component/></Suspense>
}

export default [
  {
    path: '/basic',
    element: asyncElement(() => import('../components/Basic')),
  },
  {
    path: '/events',
    element: asyncElement(() => import('../components/Events')),
  },
  {
    path: '/slots',
    element: asyncElement(() => import('../components/Slots')),
  },
  {
    path: '/v-model',
    element: asyncElement(() => import('../components/VModel')),
  },
  {
    path: '/context',
    element: asyncElement(() => import('../components/Context')),
  },
  {
    path: '/inject',
    element: asyncElement(() => import('../components/Inject')),
  },
  {
    path: '/lazyVueInReact',
    element: asyncElement(() => import('../components/LazyVueInReact')),
  },
  {
    path: '*',
    element: asyncElement(() => import('../components/Introduce')),
  },
]
