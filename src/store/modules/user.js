import { login1 } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN } from '../../common/common.js'
const state = {
  token: utils.getItem(TOKEN) || ''
}
const getters = {}
const mutations = {
  setToken(state, token) {
    state.token = token
    utils.setItem(TOKEN, token)
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
          // 保存到 vuex中 和 本地中
          context.commit('setToken', res.token)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
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
