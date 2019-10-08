import api from './axios'

export default {
  signIn: (credentials) => {
    return api.post('/auth/login', credentials, {
      disableUnauthorizedErrorHandler: true
    })
  }
}
