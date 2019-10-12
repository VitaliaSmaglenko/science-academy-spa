const isAuthorized = () => {
  return !!getUser() && !!getToken()
}

const departmentIsChosen = () => {
  return !!getCurrentDepartment()
}

const authorize = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', JSON.stringify(token))
}

const unauthorize = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('department')
}

const resetDepartment = () => {
  localStorage.removeItem('department')
}

const setToken = (token) => {
  return localStorage.setItem('token', JSON.stringify(token))
}

const setCurrentDepartment = (department) => {
  return localStorage.setItem('department', JSON.stringify(department))
}

const getToken = () => {
  return JSON.parse(localStorage.getItem('token'))
}

const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const getCurrentDepartment = () => {
  return JSON.parse(localStorage.getItem('department'))
}

export default {
  isAuthorized,
  departmentIsChosen,
  authorize,
  unauthorize,
  resetDepartment,
  setToken,
  setCurrentDepartment,
  getToken,
  getUser,
  getCurrentDepartment
}
