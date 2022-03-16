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

export const addUser = (data) => {
  return request({
    url: '/user/addUser',
    method: 'POST',
    data
  })
}
