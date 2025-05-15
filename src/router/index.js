import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/weapon',
  },

  {
    path: '/weapon',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/weapon/index.vue'),
        meta: { title: '武器' }
      },
    ]
  },

  {
    path: '/armor',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/armor/index.vue'),
        meta: { title: '防具' }
      },
    ]
  },

  {
    path: '/upgrade',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/upgrade/index.vue'),
      },
    ]
  },

  {
    path: '/simulation',
    component: () => import('../layout/index.vue'),
    children: [
      {
        name: 'simulation',
        path: '',
        component: () => import('../views/simulation/index.vue'),

      },
      {
        name: 'scheme',
        path: 'scheme',
        component: () => import('../views/scheme/index.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
