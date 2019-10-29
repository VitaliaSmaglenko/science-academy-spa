import api from './axios'

export default {
  all: () => {
    return api.get('/users')
  },

  get: (id) => {
    return api.get(`/users/${id}`)
  },

  create: (data) => {
    return api.post('/users', data)
  },

  update: (id, data) => {
    return api.put(`/users/${id}`, data)
  },

  delete: (id) => {
    return api.delete(`/users/${id}`)
  }
}
