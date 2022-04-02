import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: '/',
    component: () => import('../layout'),
    redirect: '/users',
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/role/index.vue')
      },
      {
        path: 'menus',
        name: 'menus',
        component: () => import('@/views/menu/index.vue')
      },
      {
        path: 'depts',
        name: 'depts',
        component: () => import('@/views/dept/index.vue')
      },
      {
        path: 'charts',
        name: 'charts',
        component: () => import('@/views/echarts/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
