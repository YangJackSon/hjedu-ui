import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/home')
        },
        {
            path: '/base',
            name: 'base',
            component: () => import('@/views/base/index'),
            children: [
                {
                    path: 'auth',
                    name: 'baseAuth',
                    component: () => import('@/views/base/auth')
                },
                {
                    path: 'dbcenter',
                    name: 'baseDbcenter',
                    component: () => import('@/views/base/dbcenter')
                },
                {
                    path: 'global',
                    name: 'baseGlobal',
                    component: () => import('@/views/base/global/global_set')
                },
            ]
        },

        {
            path: '/res',
            name: 'res',
            component: () => import('@/views/res/index'),
            children: [
                {
                    path: 'ftp',
                    name: 'resFtp',
                    component: () => import('@/views/res/res_ftp')
                },
                {
                    path: 'catalog',
                    name: 'resCatalog',
                    component: () => import('@/views/res/catalog')
                },
                {
                    path: 'resource',
                    name: 'resResource',
                    component: () => import('@/views/res/resource')
                },
            ]
        },

        {
            path: '/teacherManagement',
            name: 'teacherManagement',
            component: () => import('@/views/teacher_management/index'),
            children: [
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('@/views/teacher_management/register/index')
                },
                {
                    path: 'archive',
                    name: 'archive',
                    component: () => import('@/views/teacher_management/archive/index')
                },
            ]
        },
    ]
})

export default router
