import roles from '../../constants/roles'
import UserList from './../../views/management/user/UserList'
import UserDetails from './../../views/management/user/UserDetails'
import UserUpdate from './../../views/management/user/UserUpdate'
import UserCreate from './../../views/management/user/UserCreate'

const routes = [
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

export default routes
