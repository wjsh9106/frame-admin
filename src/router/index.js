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
    redirect: '/user',
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/role/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
