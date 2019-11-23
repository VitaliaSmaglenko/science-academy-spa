import roles from '../../constants/roles'
import CompletedWorksList from '../../views/completedWorks/CompletedWorksList'
import CompletedWorkDetails from '../../views/completedWorks/CompletedWorkDetails'
import CompletedWorkAdd from '../../views/completedWorks/CompletedWorkAdd'

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
  }
]

export default routes
