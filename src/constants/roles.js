const constants = {
  ROLE_ADMIN: {
    id: 1,
    text: 'Адміністратор',
    value: 'administrator'
  },
  ROLE_MANAGER: {
    id: 2,
    text: 'Керівник',
    value: 'manager'
  },
  ROLE_TEACHER: {
    id: 3,
    text: 'Викладач',
    value: 'user'
  }
}

constants.MANAGEMENT_ROLES = [
  constants.ROLE_ADMIN,
  constants.ROLE_MANAGER
]

constants.ROLES = [
  constants.ROLE_TEACHER,
  constants.ROLE_MANAGER,
  constants.ROLE_TEACHER
]

constants.CAN_CREATE_ADMIN = [
  constants.ROLE_ADMIN,
  constants.ROLE_MANAGER,
  constants.ROLE_TEACHER
]

constants.CAN_CREATE_MANAGER = [
  constants.ROLE_MANAGER,
  constants.ROLE_TEACHER
]

constants.MAP_ROLE_PERMISSIONS = {
  [constants.ROLE_ADMIN.value]: constants.CAN_CREATE_ADMIN,
  [constants.ROLE_MANAGER.value]: constants.CAN_CREATE_MANAGER
}

export default constants
