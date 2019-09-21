const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const isAuthorized = () => {
  return !!getUser()
}

const authorize = (user) => {
  return localStorage.setItem('user', JSON.stringify(user))
}

const unauthorize = () => {
  return localStorage.removeItem('user')
}

export default {
  getUser,
  isAuthorized,
  authorize,
  unauthorize
}
