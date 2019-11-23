import roles from '../../constants/roles'
import ScienceProfiles from '../../views/profile/ScienceProfiles'

const routes = [
  {
    path: '/science-profiles',
    name: 'ScienceProfiles',
    component: ScienceProfiles,
    meta: { requiresRoles: [roles.ROLE_TEACHER], redirect: { name: 'Dashboard' } }
  }
]

export default routes
