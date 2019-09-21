import authApi from './../api/auth'
import authHelper from './../helpers/auth'
import router from './../router'

const initial = () => ({
  authorized: false,
  error: null,
  user: authHelper.getUser() || {
    id: null,
    role: null,
    email: null
  }
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
      role: null,
      login: null,
      email: null
    }
    authHelper.unauthorize()
  },
  setError (state, error) {
    state.error = error
  }
}

const getters = {}

const actions = {
  async signin (context, { credentials }) {
    try {
      const response = await authApi.signIn(credentials)
      const user = response.data.result

      context.commit('authorize', user)
      authHelper.authorize(state.user)

    } catch (error) {
      let message = error.response && error.response.status === 401
        ? "Wrong credentials"
        : "Server error"

      context.commit('setError', message)
    }
  },
  signout (context) {
    context.commit('unauthorize')
    context.dispatch('resetAllState', {}, { root: true })
    router.push({ name: 'auth.signin' })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
