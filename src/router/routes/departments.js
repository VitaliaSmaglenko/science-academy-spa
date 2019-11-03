import roles from '../../constants/roles'
import DepartmentList from '../../views/management/department/DepartmentList'
import DepartmentCreate from '../../views/management/department/DepartmentCreate'
import DepartmentUpdate from '../../views/management/department/DepartmentUpdate'
import DepartmentDetails from '../../views/management/department/DepartmentDetails'

const routes = [
  {
    path: '/manage/departments',
    name: 'DepartmentList',
    component: DepartmentList,
    meta: { requiresRoles: [roles.ROLE_ADMIN], redirect: { name: 'Dashboard' } }
  },
  {
    path: '/manage/departments/create',
    name: 'DepartmentCreate',
    component: DepartmentCreate,
    meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
  },
  {
    path: '/manage/departments/:id',
    name: 'DepartmentDetails',
    component: DepartmentDetails,
    meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
  },
  {
    path: '/manage/departments/:id/update',
    name: 'DepartmentUpdate',
    component: DepartmentUpdate,
    meta: { requiresRoles: roles.MANAGEMENT_ROLES, redirect: { name: 'Dashboard' } }
  }
]

export default routes
