import api from './axios'

export default {
  all: () => {
    return api.get('/completed-works')
  },

  get: (id) => {
    return api.get(`/completed-works/${id}`)
  },

  create: (data) => {
    return api.post('completed-works', data)
  },

  update: (id, data) => {
    return api.put(`/completed-works/${id}`, data)
  },

  delete: (id) => {
    return api.delete(`/completed-works/${id}`)
  }
}
