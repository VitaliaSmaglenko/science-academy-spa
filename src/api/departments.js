import api from './axios'

export default {
  all: () => {
    return api.get('/departments')
  },

  get: (id) => {
    return api.get(`/departments/${id}`)
  },

  delete: (id) => {
    return api.delete(`/departments/${id}`)
  },

  create: (data) => {
    return api.post('/departments', data)
  },

  update: (id, data) => {
    return api.put(`/departments/${id}`, data)
  }
}
