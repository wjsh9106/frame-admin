import request from './request'

export const leftMenus = () => {
  return request({
    url: '/menu/leftMenus',
    method: 'GET'
  })
}

export const initMenus = (data) => {
  return request({
    url: '/menu/menus',
    method: 'POST',
    data
  })
}

export const deleteMenu = (mid) => {
  return request({
    url: `/menu/delMenu/${mid}`,
    method: 'DELETE'
  })
}

export const saveMenu = (data) => {
  return request({
    url: '/menu/saveMenu',
    method: 'POST',
    data
  })
}
