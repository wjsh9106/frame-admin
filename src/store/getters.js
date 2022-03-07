export default {
  token: (state) => state.app.token, // state.app：app模块下的state
  siderType: (state) => state.app.siderType,
  lang: (state) => state.app.lang
}
