export const passwordValidate = () => {
  return (rule, value, callback) => {
    // 密码最少是6位
    if (value.length < 6) {
      // 验证的input的value值
      callback(new Error('密码至少是6位')) // new Error() 错误对象，里面的值就是错误信息
    } else {
      callback() // 什么也不写就是没有错误
    }
  }
}
