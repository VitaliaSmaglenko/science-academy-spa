const isAuthorized = () => {
  return !!getUser() && !!getToken()
}

const authorize = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', JSON.stringify(token))
}

const unauthorize = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

const setToken = (token) => {
  return localStorage.setItem('token', JSON.stringify(token))
}

const getToken = () => {
  return JSON.parse(localStorage.getItem('token'))
}

const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default {
  isAuthorized,
  authorize,
  unauthorize,
  setToken,
  getToken,
  getUser
}
