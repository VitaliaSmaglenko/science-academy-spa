import api from './axios'

export default {
  get: (id) => {
    return api.get(`indicators/${id}`)
  },

  getForUser: () => {
    return api.get('indicators')
  },

  getByUser: (userId) => {
    return api.get(`indicators/users/${userId}`)
  },

  create: (data) => {
    return api.post('indicators', data)
  },

  update: (id, data) => {
    return api.put(`indicators/${id}`, data)
  },

  delete: (id) => {
    return api.delete(`indicators/${id}`)
  }
}
