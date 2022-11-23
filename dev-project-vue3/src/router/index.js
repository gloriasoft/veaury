import { createRouter, createWebHashHistory } from 'vue-router'
import PureReactInVue from '../pages/pureReactInVue/index'
// For unit testing, because jest does not generate scopeId when processing vue files.
if (!PureReactInVue.__scopeId) {
    PureReactInVue.__scopeId = 'data-v-5fa1ff81'
}
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'VueMissReact',
            path: '/VueMissReact',
            component: () => import('../pages/vueMissReact')
        },
        {
            name: 'basic',
            path: '/basic',
            component: () => import('../pages/basic')
        },
        {
            name: 'events',
            path: '/events',
            component: () => import('../pages/events')
        },
        {
            name: 'slots',
            path: '/slots',
            component: () => import('../pages/slots')
        },
        {
            name: 'context',
            path: '/context',
            component: () => import('../pages/context')
        },
        {
            name: 'routerView',
            path: '/routerView',
            component: () => import('../pages/routerView'),
            children: [
                {
                    name: 'routerViewSub',
                    path: '',
                    component: () => import('../pages/routerView/Sub')
                }
            ]
        },
        {
            name: 'lazyReactInVue',
            path: '/lazyReactInVue',
            component: () => import('../pages/lazyReactInVue')
        },
        {
            name: 'injection',
            path: '/useInjectPropsFromWrapper',
            component: () => import('../pages/useInjectPropsFromWrapper')
        },
        {
            name: 'crossingProvider',
            path: '/crossingProvider',
            component: () => import('../pages/crossProvider')
        },
        {
            name: 'pureReactInVue',
            path: '/pureReactInVue',
            component: PureReactInVue
            // component: () => import('../pages/pureReactInVue')
        },
        {
            name: 'introduce',
            path: '/:default(.*)',
            component: () => import('../pages/introduce')
        },
    ],
})
