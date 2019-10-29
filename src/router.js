import Vue from 'vue'
import Router from 'vue-router'
import guardMiddleware from './router/guardMiddleware'
import roles from './constants/roles'

import Dashboard from './views/Dashboard.vue'
import SignIn from './views/auth/SignIn'
import ChooseDepartment from './views/auth/ChooseDepartment'
import Management from './views/management/Management'
import UserList from './views/management/user/UserList'
import UserDetails from './views/management/user/UserDetails'
import UserUpdate from './views/management/user/UserUpdate'
import UserCreate from './views/management/user/UserCreate'

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
      name: 'Dashboard',
      component: Dashboard,
      meta: { ...authWithDepartment, redirect: { name: 'SignIn' } },
      children: [
        {
          path: '/manage',
          name: 'Management',
          component: Management,
          meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
        },
        {
          path: '/manage/users',
          name: 'UserList',
          component: UserList,
          meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
        },
        {
          path: '/manage/users/create',
          name: 'UserCreate',
          component: UserCreate,
          meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
        },
        {
          path: '/manage/users/:id',
          name: 'UserDetails',
          component: UserDetails,
          meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
        },
        {
          path: '/manage/users/:id/update',
          name: 'UserUpdate',
          component: UserUpdate,
          meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
        }
      ]
    },
    {
      path: '/auth',
      name: 'SignIn',
      component: SignIn,
      meta: { onlyGuests: true, redirect: { name: 'Dashboard' } }
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
