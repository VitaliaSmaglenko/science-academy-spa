import api from './../api/plannedWorks'

const initial = () => ({
  plannedWorks: []
})

const state = initial()

const mutations = {
  setPlannedWorks (state, works) {
    state.plannedWorks = works
  },
  reset (state) {
    Object.assign(state, initial())
  }
}

const getters = {
}

const actions = {
  async fetchPlannedWorksForUser (context) {
    const user = context.rootState.auth.user
    const response = await api.getForUser(user.id)
    context.commit('setPlannedWorks', response.data.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
