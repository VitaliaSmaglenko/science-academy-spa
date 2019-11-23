import api from './axios'

export default {
  all: () => {
    return api.get('/works')
  },

  get: (id) => {
    return api.get(`/works/${id}`)
  }
}
