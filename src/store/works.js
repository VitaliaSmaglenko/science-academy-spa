import api from './../api/works'

const initial = () => ({
  works: []
})

const state = initial()

const mutations = {
  setWorks (state, works) {
    state.works = works
  },
  reset (state) {
    Object.assign(state, initial())
  }
}

const getters = {
}

const actions = {
  async fetchWorks (context) {
    const response = await api.all()
    context.commit('setWorks', response.data.data)
  },

  async getWork (context, id) {
    const response = await api.get(id)
    return response.data.data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
