const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const isAuthorized = () => {
  return !!getUser()
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

export default {
  getUser,
  isAuthorized,
  authorize,
  unauthorize,
  setToken,
  getToken
}
