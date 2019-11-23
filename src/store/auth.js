import authApi from './../api/auth'
import authHelper from './../helpers/auth'
import router from './../router'
import axios from '../api/axios'
import roles from './../constants/roles'

const initial = () => ({
  authorized: false,
  error: null,
  user: authHelper.getUser() || {
    id: null,
    roles: [],
    departments: [],
    email: null
  },
  department: authHelper.getCurrentDepartment() || {}
})

const state = initial()

const mutations = {
  authorize (state, user) {
    state.authorized = true
    state.user = user
    state.error = null
  },
  unauthorize (state) {
    state.authorized = false
    state.user = {
      id: null,
      roles: [],
      email: null
    }
    authHelper.unauthorize()
  },
  setError (state, error) {
    state.error = error
  },
  setCurrentDepartment (state, department) {
    state.department = department
  }
}

const getters = {
  iAmTeacher: (state) => {
    return state.user.roles.some(r => r.name === roles.ROLE_TEACHER.value)
  },
  iAmAdmin: (state) => {
    return state.user.roles.some(r => r.name === roles.ROLE_ADMIN.value)
  },
  iAmManager: (state) => {
    return state.user.roles.some(r => r.name === roles.ROLE_MANAGER.value)
  },
  getHighestRole: (state, getters) => {
    if (getters.iAmAdmin) {
      return roles.ROLE_ADMIN.value
    }
    if (getters.iAmManager) {
      return roles.ROLE_MANAGER.value
    }
    return roles.ROLE_TEACHER.value
  },
  hasDepartment: (state) => (id) => {
    return state.user.departments.some(d => d.id === id)
  }
}

const actions = {
  async signIn (context, credentials) {
    try {
      const response = await authApi.signIn(credentials)
      const { user, token } = response.data.data
      context.commit('authorize', user)
      authHelper.authorize(state.user, token.token_type + ' ' + token.access_token)
      axios.defaults.headers.common['Authorization'] = authHelper.getToken()
      router.push({ name: 'ChooseDepartment' })
    } catch (error) {
      let message = error.response && error.response.status === 401
        ? 'Не корректні данні'
        : 'Помилка сервера'

      context.commit('setError', message)
    }
  },
  signOut (context) {
    context.commit('unauthorize')
    context.dispatch('resetAllState', {}, { root: true })
    router.push({ name: 'SignIn' })
  },
  selectDepartment (context, department) {
    context.commit('setCurrentDepartment', department)
    authHelper.setCurrentDepartment(department)
    router.push({ name: 'Dashboard' })
  },
  changeDepartment (context) {
    context.commit('setCurrentDepartment', null)
    authHelper.resetDepartment()
    router.push({ name: 'ChooseDepartment' })
  },
  isTeacher: (context, user) => {
    return user.roles.some(r => r.name === roles.ROLE_TEACHER.value)
  },
  isAdmin: (context, user) => {
    return user.roles.some(r => r.name === roles.ROLE_ADMIN.value)
  },
  isManager: (context, user) => {
    return user.roles.some(r => r.name === roles.ROLE_MANAGER.value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
