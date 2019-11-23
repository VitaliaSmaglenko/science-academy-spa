import Vue from 'vue'
import Router from 'vue-router'
import guardMiddleware from './router/guardMiddleware'
import roles from './constants/roles'

import Dashboard from './views/Dashboard.vue'
import SignIn from './views/auth/SignIn'
import ChooseDepartment from './views/auth/ChooseDepartment'
import Management from './views/management/Management'
import PlannedWorksForUser from './views/plannedWorks/PlannedWorksForUser'

import userRoutes from './router/routes/users'
import departmentRoutes from './router/routes/departments'
import completeWorks from './router/routes/completedWorks'
import scienceProfiles from './router/routes/scienceProfiles'

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
          path: '/planned-works',
          name: 'PlannedWorksForUser',
          component: PlannedWorksForUser,
          meta: { requiresRoles: [roles.ROLE_TEACHER], redirect: { name: 'Dashboard' } }
        },
        {
          path: '/manage',
          name: 'Management',
          component: Management,
          meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
        },
        ...userRoutes,
        ...departmentRoutes,
        ...completeWorks,
        ...scienceProfiles
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
