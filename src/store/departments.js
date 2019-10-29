import api from './../api/departments'

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
}

const actions = {
  async fetchDepartments (context) {
    const response = await api.all()
    context.commit('setDepartments', response.data.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
