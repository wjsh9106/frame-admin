import request from './request'

export const getRoles = (data) => {
  return request({
    url: '/role/roles',
    method: 'POST',
    data
  })
}

export const changeRoleStatus = (uid, type, status) => {
  return request({
    url: `/role/${uid}/state/${type}`,
    method: 'PUT'
  })
}

export const saveRole = (data) => {
  return request({
    url: '/role/saveRole',
    method: 'POST',
    data
  })
}

export const menuTree = () => {
  return request({
    url: '/menu/menuTree',
    method: 'GET'
  })
}

export const menuIds = (roleId) => {
  return request({
    url: `/menu/menuIds/${roleId}`,
    method: 'GET'
  })
}

export const bindMenus = (data) => {
  return request({
    url: '/role/bindMenus',
    method: 'POST',
    data
  })
}
