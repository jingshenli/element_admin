import axios from '../utils/requset'
// 定义user相关的网络请求
export const login1 = function (data) {
  // axios 请求
  return axios.request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户数据
export const getUserInfo = () => {
  return axios.request({
    url: '/sys/profile',
    method: 'GET'
  })
}
