import api from './../api/departments'
import Vue from 'vue'
import router from '../router'

const initial = () => ({
  departments: []
})

const state = initial()

const mutations = {
  setDepartments (state, departments) {
    state.departments = departments
  }
}

const getters = {
  getDepartment: (state) => (id) => {
    return state.departments.find(d => d.id === id)
  }
}

const actions = {
  async fetchDepartments (context) {
    const response = await api.all()
    context.commit('setDepartments', response.data.data)
  },

  async getDepartment (context, id) {
    const response = await api.get(id)
    return response.data.data
  },

  async deleteDepartment (context, id) {
    const response = await api.delete(id)
    Vue.notify({
      title: '',
      text: response.data.data.message,
      type: 'success'
    })
  },

  async createDepartment (context, data) {
    try {
      const response = await api.create(data)
      Vue.notify({
        title: '',
        text: response.data.data.message,
        type: 'success'
      })
      router.push({ name: 'DepartmentList' })
    } catch (e) {
      return e.response.data.errors
    }
  },

  async updateDepartment (context, { id, data }) {
    try {
      const response = await api.update(id, data)
      Vue.notify({
        title: '',
        text: response.data.data.message,
        type: 'success'
      })
      router.push({ name: 'DepartmentList' })
    } catch (e) {
      return e.response.data.errors
    }
  },

  async addUser (context, { id, userId, position }) {
    const response = await api.addUser(id, userId, position)
    return response.data.data
  },

  async removeUser (context, { id, userId }) {
    const response = await api.removeUser(id, userId)
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
