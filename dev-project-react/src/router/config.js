import { lazy, Suspense } from 'react'

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
    }
]
