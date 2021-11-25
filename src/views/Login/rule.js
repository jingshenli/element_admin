import i18n from '@/i18n/index.js'

export const passwordValidate = () => {
  return (rule, value, callback) => {
    // 密码最少是6位
    if (value.length < 6) {
      // 验证的input的value值
      callback(new Error(i18n.global.t('msg.login.passwordRule'))) // new Error() 错误对象，里面的值就是错误信息
    } else {
      callback() // 什么也不写就是没有错误
    }
  }
}
export const usernameValidate = () => {
  return (rule, value, callback) => {
    if (value.length < 1) {
      // vue  -->   t
      // html -->   $t
      // js   -->   global.t
      callback(new Error(i18n.global.t('msg.login.usernameRule')))
    } else {
      callback()
    }
  }
}
