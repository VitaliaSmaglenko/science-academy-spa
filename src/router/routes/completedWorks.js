import roles from '../../constants/roles'
import CompletedWorksList from '../../views/completedWorks/CompletedWorksList'
import CompletedWorkDetails from '../../views/completedWorks/CompletedWorkDetails'
import CompletedWorkAdd from '../../views/completedWorks/CompletedWorkAdd'
import CompletedWorkEdit from '../../views/completedWorks/CompletedWorkEdit'
import UserCompletedWorks from '../../views/management/plannedWorks/UserCompletedWorks'

const routes = [
  {
    path: '/completed-works',
    name: 'CompletedWorksList',
    component: CompletedWorksList,
    meta: { requiresRoles: [roles.ROLE_TEACHER], redirect: { name: 'Dashboard' } }
  },
  {
    path: '/completed-works/add',
    name: 'CompletedWorkAdd',
    component: CompletedWorkAdd,
    meta: { requiresRoles: [roles.ROLE_TEACHER], redirect: { name: 'Dashboard' } }
  },
  {
    path: '/completed-works/:id',
    name: 'CompletedWorkDetails',
    component: CompletedWorkDetails,
    meta: { requiresRoles: [roles.ROLE_TEACHER], redirect: { name: 'Dashboard' } }
  },
  {
    path: '/completed-works/:id/edit',
    name: 'CompletedWorkEdit',
    component: CompletedWorkEdit,
    meta: { requiresRoles: [roles.ROLE_TEACHER], redirect: { name: 'Dashboard' } }
  },
  {
    path: '/manage/completed-works/users/:id',
    name: 'UserCompletedWorks',
    component: UserCompletedWorks,
    meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
  }
]

export default routes
