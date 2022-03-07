import request from './request'

export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
