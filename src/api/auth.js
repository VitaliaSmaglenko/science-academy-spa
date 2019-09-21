import api from './axios'

export default {
  signIn: (credentials) => {
    return api.post('/auth/signin', credentials, {
      disableUnauthorizedErrorHandler: true
    })
  }
}
