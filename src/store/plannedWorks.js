import api from './../api/plannedWorks'
import Vue from 'vue'

const initial = () => ({
  plannedWorks: [],
  targetDepartment: {}
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
    const response = await api.getForUser()
    context.commit('setPlannedWorks', response.data.data)
  },

  async fetchPlannedWorksByUser (context, userId) {
    const response = await api.getByUser(userId)
    context.commit('setPlannedWorks', response.data.data)
  },

  async getPlannedWork (context, id) {
    const response = await api.get(id)
    return response.data.data
  },

  async addPlannedWork (context, data) {
    try {
      const response = await api.create(data)
      Vue.notify({
        title: '',
        text: response.data.data.message,
        type: 'success'
      })
      return {}
    } catch (e) {
      return e.response.data.errors
    }
  },

  async updatePlannedWork (context, { id, data }) {
    try {
      await api.update(id, data)
      Vue.notify({
        title: '',
        text: 'Роботу оновлено',
        type: 'success'
      })
      return {}
    } catch (e) {
      return e.response.data.errors
    }
  },

  async deletePlannedWork (context, id) {
    const response = await api.delete(id)
    Vue.notify({
      title: '',
      text: response.data.data.message,
      type: 'success'
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
