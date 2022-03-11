import request from './request'

export const getUsers = (data) => {
  return request({
    url: '/user/users',
    method: 'POST',
    data
  })
}
