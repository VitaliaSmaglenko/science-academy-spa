import api from './../api/completedWorks'
import Vue from 'vue'
import router from '../router'

const initial = () => ({
  completedWorks: []
})

const state = initial()

const mutations = {
  setCompletedWorks (state, works) {
    state.completedWorks = works
  },
  reset (state) {
    Object.assign(state, initial())
  }
}

const getters = {
}

const actions = {
  async fetchCompletedWorks (context) {
    const response = await api.all()
    context.commit('setCompletedWorks', response.data.data)
  },

  async fetchCompletedWorksByUser (context, userId) {
    const response = await api.getByUser(userId)
    context.commit('setCompletedWorks', response.data.data)
  },

  async getCompletedWork (context, id) {
    const response = await api.get(id)
    return response.data.data
  },

  async addCompletedWork (context, data) {
    try {
      const response = await api.create(data)
      Vue.notify({
        title: '',
        text: response.data.data.message,
        type: 'success'
      })
      router.push({ name: 'CompletedWorksList' })
    } catch (e) {
      return e.response.data.errors
    }
  },

  async updateCompletedWork (context, { id, data }) {
    try {
      const response = await api.update(id, data)
      Vue.notify({
        title: '',
        text: response.data.data.message,
        type: 'success'
      })
      router.push({ name: 'CompletedWorksList' })
    } catch (e) {
      return e.response.data.errors
    }
  },

  async deleteCompletedWork (context, id) {
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
