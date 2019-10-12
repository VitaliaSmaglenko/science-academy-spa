import Vue from 'vue'
import Router from 'vue-router'
import guardMiddleware from './router/guardMiddleware'

import Home from './views/Home.vue'
import SignIn from './views/auth/SignIn'
import ChooseDepartment from './views/auth/ChooseDepartment'

Vue.use(Router)

const authWithDepartment = {
  requiresAuth: true,
  requireDepartment: true
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { ...authWithDepartment, redirect: { name: 'SignIn' } }
    },
    {
      path: '/auth',
      name: 'SignIn',
      component: SignIn,
      meta: { onlyGuests: true, redirect: { name: 'Home' } }
    },
    {
      path: '/auth/choose-department',
      name: 'ChooseDepartment',
      component: ChooseDepartment,
      meta: { requiresAuth: true, redirect: { name: 'SignIn' } }
    }
  ]
})

router.beforeEach(guardMiddleware)

export default router
