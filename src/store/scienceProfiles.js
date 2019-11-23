import api from './../api/scienceProfiles'
import Vue from 'vue'

const initial = () => ({
  scienceProfiles: []
})

const state = initial()

const mutations = {
  setScienceProfiles (state, profiles) {
    state.scienceProfiles = profiles
  },
  reset (state) {
    Object.assign(state, initial())
  }
}

const getters = {
}

const actions = {
  async fetchScienceProfilesForUser (context) {
    const user = context.rootState.auth.user
    const response = await api.getForUser(user.id)
    context.commit('setScienceProfiles', response.data.data)
  },

  async getScienceProfile (context, id) {
    const response = await api.get(id)
    return response.data.data
  },

  async deleteScienceProfile (context, id) {
    const response = await api.delete(id)
    Vue.notify({
      title: '',
      text: response.data.data.message,
      type: 'success'
    })
  },

  async addScienceProfile (context, data) {
    try {
      await api.create(data)
      Vue.notify({
        title: '',
        text: 'Проіль добавлено',
        type: 'success'
      })
      return {}
    } catch (e) {
      return e.response.data.errors
    }
  },

  async updateScienceProfile (context, { id, data }) {
    try {
      await api.update(id, data)
      Vue.notify({
        title: '',
        text: 'Проіль оновлено',
        type: 'success'
      })
      return {}
    } catch (e) {
      return e.response.data.errors
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
