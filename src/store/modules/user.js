import { login1, getUserInfo } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN, USER_INFO } from '../../common/common.js'
import router from '@/router/index.js'
import { setTimeStamp } from '../../utils/auth.js'
const state = {
  token: utils.getItem(TOKEN) || '',
  userInfo: utils.getItem(USER_INFO) || ''
}
const getters = {}
const mutations = {
  setToken(state, token) {
    state.token = token
    utils.setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    // 保存 vuex
    state.userInfo = userInfo
    // 保存本地的token
    utils.setItem(USER_INFO, userInfo)
  }
}
const actions = {
  login(context, info) {
    const { username, password } = info
    return new Promise((resolve, reject) => {
      login1({
        username,
        password: md5(password)
      })
        .then((res) => {
          // 保存 token 到 vuex中 和 本地中
          context.commit('setToken', res.token)
          // 记录token的时间
          setTimeStamp()
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    // 清理用户数据
    commit('setToken', '')
    router.push('/login')
  },
  // 请求用户数据
  getUserInfo({ commit }) {
    // 发送axios
    getUserInfo()
      .then((res) => {
        commit('setUserInfo', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
