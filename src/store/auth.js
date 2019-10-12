import authApi from './../api/auth'
import authHelper from './../helpers/auth'
import router from './../router'
import axios from '../api/axios'

const initial = () => ({
  authorized: false,
  error: null,
  user: authHelper.getUser() || {
    id: null,
    roles: [],
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

const getters = {}

const actions = {
  async signIn (context, credentials) {
    try {
      const response = await authApi.signIn(credentials)
      const data = response.data.data
      context.commit('authorize', data.user)
      authHelper.authorize(state.user, data.token_type + ' ' + data.access_token)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
