import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
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
            name: 'withVueRouter',
            path: '/withVueRouter',
            component: () => import('../pages/withVueRouter')
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
            name: 'withVuex',
            path: '/withVuex',
            component: () => import('../pages/withVuex')
        },
        {
            name: 'lazyReactInVue',
            path: '/lazyReactInVue',
            component: () => import('../pages/lazyReactInVue')
        },
        {
            name: 'injection',
            path: '/injection',
            component: () => import('../pages/injectPropsFromWrapper')
        },
        {
            name: 'introduce',
            path: '/:default(.*)',
            component: () => import('../pages/introduce')
        },
    ],
})
