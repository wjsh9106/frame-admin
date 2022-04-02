import request from './requestJson'

// 获取全国JSON
export const getChinaJson = () => {
  return request({
    url: '/map/china.json',
    method: 'GET'
  })
}

// 获取省JSON
export const getProvinceJson = (path) => {
  return request({
    url: `/map/province/${path}.json`,
    method: 'GET'
  })
}

// 获取市JSON
export const getCityJson = (path) => {
  return request({
    url: `/map/city/${path}.json`,
    method: 'GET'
  })
}

// 获取县JSON
export const getDistrictJson = (path) => {
  return request({
    url: `/map/county/${path}.json`,
    method: 'GET'
  })
}

// 获取全国所有省市区县的adcode JSON
export const getAreaCodeJson = () => {
  return request({
    url: '/map/area.json',
    method: 'GET'
  })
}
