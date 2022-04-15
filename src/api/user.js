import request from './request'

export const getUsers = (data) => {
  return request({
    url: '/user/users',
    method: 'POST',
    data
  })
}

export const changeUserStatus = (uid, type, status) => {
  return request({
    url: `/user/${uid}/state/${type}/${status}`,
    method: 'PUT'
  })
}

export const saveUser = (data) => {
  return request({
    url: '/user/saveUser',
    method: 'POST',
    data
  })
}

export const deleteUser = (uid) => {
  return request({
    url: `/user/delUser/${uid}`,
    method: 'DELETE'
  })
}

export const roleInfo = (userId) => {
  return request({
    url: `/user/roleInfo/${userId}`,
    method: 'GET'
  })
}

export const bindRoles = (data) => {
  return request({
    url: '/user/bindRoles',
    method: 'POST',
    data
  })
}
