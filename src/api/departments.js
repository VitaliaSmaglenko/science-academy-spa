import api from './axios'

export default {
  all: () => {
    return api.get('/departments')
  }
}
