import request from './request'

export const deptTree = () => {
  return request({
    url: '/dept/deptTree',
    method: 'GET'
  })
}

export const initDepts = (data) => {
  return request({
    url: '/dept/depts',
    method: 'POST',
    data
  })
}

export const deleteDept = (did) => {
  return request({
    url: `/dept/delDept/${did}`,
    method: 'DELETE'
  })
}

export const saveDept = (data) => {
  return request({
    url: '/dept/saveDept',
    method: 'POST',
    data
  })
}
