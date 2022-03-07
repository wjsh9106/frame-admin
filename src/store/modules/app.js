import { login as loginApi } from '@/api/login'
import router from '@/router'
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // 调用登录接口
        loginApi(userInfo)
          .then((res) => {
            // 登陆成功，存储token
            commit('setToken', res.token)
            // 跳转首页
            router.replace('/')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
