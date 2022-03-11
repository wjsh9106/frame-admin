import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
  (response) => {
    // console.log(response.headers)
    // console.log('ISREFRESH', response.headers.isrefresh)
    // token过期，但登录未失效，更新本地token
    if (response.headers.isrefresh) {
      // console.log('更新token：', response.headers.authorization)
      // console.log('旧token：', store.getters.token)
      store.dispatch('app/updateToken', response.headers.authorization)
      // console.log('新token：', store.getters.token)
    }
    // 获取返回信息中的 data 属性
    const { data } = response
    if (data.code === 2000) {
      return data.result
    } else {
      // 错误提示
      ElMessage.error(data.message)

      if (data.code === 2009) {
        // token过期/登录过期
        store.dispatch('app/logout')
      }

      return Promise.reject(new Error(data.message))
    }
  },
  (error) => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)
export default service
