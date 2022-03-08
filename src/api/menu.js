import request from './request'

export const menuList = () => {
  return request({
    url: '/user/getMenus',
    method: 'GET'
  })
}
