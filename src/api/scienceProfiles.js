import api from './axios'

export default {
  all: () => {
    return api.get('scientist-profiles')
  },

  get: (id) => {
    return api.get(`/scientist-profiles/${id}`)
  },

  getForUser: () => {
    return api.get('scientist-profiles/user')
  },

  create: (data) => {
    return api.post(`scientist-profiles`, data)
  },

  update: (id, data) => {
    return api.put(`/scientist-profiles/${id}`, data)
  },

  delete: (id) => {
    return api.delete(`scientist-profiles/${id}`)
  }
}
