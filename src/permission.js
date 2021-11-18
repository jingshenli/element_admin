// 用户鉴权 基于 路由守卫
import router from './router'
import store from './store'
const whiteRouter = ['/login']
// 进入每一个路由前都会执行这个钩子
router.beforeEach((to, from, next) => {
  /*
    用户鉴权
      1、当用户未登陆时没有 token，只能进入login页面
      2、用户登录后 token 未过期之前，不允许进去login页面
  */
  //  判断store里面含不含有token，判断有没有登录
  console.log(store.getters.token, '11111')
  if (store.getters.token) {
    // 也就是你要去的地方里面的地址为 login 的时候不可以，会自己跳到 / 上面
    if (to.path === '/login') {
      // 不允许
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteRouter.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
