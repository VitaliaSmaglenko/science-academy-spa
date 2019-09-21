import Axios from 'axios'
import config from './../configs'
import Vue from 'vue'
import auth from '../helpers/auth'
import router from '../router'

const axios = Axios.create({
  baseURL: config.API_BASE_URL
})

const requestErrorHandler = (error) => {
  Vue.notify({
    title: 'Server error',
    text: error.message,
    type: 'error'
  })

  throw error
}

const unauthorizedErrorHandler = (error) => {
  const { response, config } = error

  if (config.disableUnauthorizedErrorHandler) {
    throw error
  }

  if (response.status === 401) {
    auth.unauthorize()
    router.push({ name: 'SignIn', query: { referer: router.currentRoute.fullPath } })
    return
  }

  throw error
}

axios.interceptors.request.use(r => r, requestErrorHandler)
axios.interceptors.response.use(r => r, unauthorizedErrorHandler)

export default axios
