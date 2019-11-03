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
    let department = context.getters.getDepartment(id)
    if (!department) {
      const response = await api.get(id)
      department = response.data.data
    }
    return department
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
