import api from './../api/users'
import departmentApi from './../api/departments'
import Vue from 'vue'
import router from './../router'

const initial = () => ({
  users: [],
  targetUser: {}
})

const state = initial()

const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  reset (state) {
    Object.assign(state, initial())
  }
}

const getters = {
  getUser: (state) => (id) => {
    return state.users.find(user => user.id === id)
  }
}

const actions = {
  async fetchUsers (context) {
    const response = await api.all()
    context.commit('setUsers', response.data.data)
  },
  async fetchUsersByDepartment (context, departmentId) {
    const response = await departmentApi.get(departmentId)
    context.commit('setUsers', response.data.data.users)
  },
  async getUser (context, id) {
    let user = context.getters.getUser(id)
    if (!user) {
      const response = await api.get(id)
      user = response.data.data
    }
    return user
  },
  async createUser (context, data) {
    try {
      const response = await api.create(data)
      Vue.notify({
        title: '',
        text: response.data.data.message,
        type: 'success'
      })
      router.push({ name: 'UserList' })
    } catch (e) {
      return e.response.data.errors
    }
  },
  async updateUser (context, { id, data }) {
    try {
      const response = await api.update(id, data)
      Vue.notify({
        title: '',
        text: response.data.data.message,
        type: 'success'
      })
      router.push({ name: 'UserList' })
    } catch (e) {
      return e.response.data.errors
    }
  },
  async deleteUser (context, id) {
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
