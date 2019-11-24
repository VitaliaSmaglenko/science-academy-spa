import roles from '../../constants/roles'
import PlannedWorksForUser from '../../views/plannedWorks/PlannedWorksForUser'
import UserWorksList from '../../views/management/plannedWorks/UserWorksList'
import UserPlannedWorks from '../../views/management/plannedWorks/UserPlannedWorks'

const routes = [
  {
    path: '/planned-works',
    name: 'PlannedWorksForUser',
    component: PlannedWorksForUser,
    meta: { requiresRoles: [roles.ROLE_TEACHER], redirect: { name: 'Dashboard' } }
  },
  {
    path: '/manage/planned-works/users',
    name: 'UserWorksList',
    component: UserWorksList,
    meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
  },
  {
    path: '/manage/planned-works/users/:id',
    name: 'UserPlannedWorks',
    component: UserPlannedWorks,
    meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
  }
]

export default routes
