import authHelper from './../helpers/auth'

export default (to, from, next) => {
  const onlyGuests = to.matched.some(m => m.meta.onlyGuests)
  const requiresAuth = to.matched.some(m => m.meta.requiresAuth)
  const requireDepartment = to.matched.some(m => m.meta.requireDepartment)

  const requiresRoles = to.matched.reduce((roles, m) => {
    return roles.concat(m.meta.requiresRoles || [])
  }, [])

  const redirect = to.matched.reduceRight((redirect, m) => {
    return redirect || m.meta.redirect
  }, false)

  if (onlyGuests && authHelper.isAuthorized()) {
    return next(redirect || '/')
  }

  if (requiresAuth && !authHelper.isAuthorized()) {
    return next(redirect || { name: 'SignIn' })
  }

  if (requireDepartment && !authHelper.departmentIsChosen()) {
    return next({ name: 'ChooseDepartment' })
  }

  const user = authHelper.getUser()

  if (requiresRoles.length > 0 && !requiresRoles.some(item => user.roles.map(r => r.name).includes(item))) {
    return next(redirect || '/')
  }

  next()
}
