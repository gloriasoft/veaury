import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
        name: 'basic',
        path: '/basic',
        component: () => import('../pages/basic')
    }],
})
