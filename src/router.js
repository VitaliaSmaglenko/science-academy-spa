import Vue from 'vue'
import Router from 'vue-router'
import guardMiddleware from './router/guardMiddleware'

import Home from './views/Home.vue'
import SignIn from './views/auth/SignIn'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true, redirect: { name: 'SignIn' } }
    },
    {
      path: '/auth',
      name: 'SignIn',
      component: SignIn,
      meta: { onlyGuests: true, redirect: { name: 'home' } }
    },
  ]
})

router.beforeEach(guardMiddleware)

export default router
