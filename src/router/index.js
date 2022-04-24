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
      },
      {
        path: 'maps',
        name: 'maps',
        component: () => import('@/views/echarts/map.vue')
      },
      {
        path: 'sandian',
        name: 'sandian',
        component: () => import('@/views/echarts/sandian.vue')
      },
      {
        path: 'xiazuan',
        name: 'xiazuan',
        component: () => import('@/views/echarts/xiazuan.vue')
      },
      {
        path: 'xzsd',
        name: 'xzsd',
        component: () => import('@/views/echarts/xzsd.vue')
      },
      {
        path: 'books',
        name: 'books',
        component: () => import('@/views/book/index.vue')
      },
      {
        path: 'chapterTitles',
        name: 'chapterTitles',
        component: () => import('@/views/book/chapterTitles.vue')
      },
      {
        path: 'chapterInfo',
        name: 'chapterInfo',
        component: () => import('@/views/book/chapterInfo.vue')
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/views/book/upload.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
