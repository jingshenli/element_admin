import * as loacl from './storage.js'
import { TIME_SEAMP, TIME_OUT } from '../common/common.js'
// 设置 token 时间
export const setTimeStamp = () => {
  // 保存时间
  loacl.setItem(TIME_SEAMP, Date.now())
}

// 获取保存的时间
const getTimeStamp = () => {
  return localStorage.getItem(TIME_SEAMP)
}

// cheak 检查 token 时间是否超时
// true 不过期
// false 过期
export const isCheckTimeOut = () => {
  // 现在的时间 - 保存的时间 > 2小时   才会过期
  const currentTime = Date.now()

  /* eslint-disable-next-line */
  const time_stamp = getTimeStamp()
  /* eslint-disable-next-line */
  return currentTime - time_stamp <= TIME_OUT
}
