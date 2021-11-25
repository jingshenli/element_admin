import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 引入样式的入口文件
import './styles/index.scss'

// 引入所有的图片
import initSvgIcon from './icons/index.js'

// 用户鉴权
import './permission.js'

// 导入 i18n
import i18n from '@/i18n/index.js'

const app = createApp(App)
installElementPlus(app)
initSvgIcon(app)
app.use(store).use(router).use(i18n).mount('#app')

// 退出业务：
//     １.token 的作用
//       a) token 是由后台再首次登录的时候生成，通过response 响应给前端
//         意思是说一个token 同时再前后端都有保存
//       b) token 表示用户的身份，是一个用户的令牌，对 于服务器而言，只认token不认人，
//         意思说别人获取你的 token，以你的身份就能登录服务器，获取你的敏感数据
//         所以处于安全角度，需要对token进行一些安全策略的处理
//           常见的处理方式：
//             动态 token
//             时效 token （使用）
//             刷新 token
//             ．．．
//     ２.常见的退出方式：
//         主动退出：用户手动点击退出按钮，执行退出登录 （前端处理）
//         被动退出：
//           token失效：（超出了token有效期，失去服务器对用户校验身份的条件）
//             １ 前端获取的token过期 （前端处理）
//             ２ 后端生成的token过期 （后端处理）
//           单点登录                 （后端处理）
//             在你已经登录的情况下，你或者是别人再别的设备上再次登录。
//             你当前的登录状态会被顶下来

//       总结：
//         １、 前端只能处理主动退出和  前端token失效
//             也是要你执行前的退出操作
//         ２、如果是后端token失效 和 单端登录
//             以''特定''的状态码通知前端
//               ｃｏｄｅ  ４０１  后台token失效
//               ｃｏｄｅ  ４０５  单点登录
//             也是要你执行前的退出操作

//     ３、退出登录操作逻辑
//         １.清理掉用户的缓存数据
//         ２清理该用户的权限
//         ３.返回到登陆页面
//          ４. 主动退出(前端)

//     5. token 失效(前端 )
//       1.用户登录获得到token 的时候记录时间
//       2.指定token 生效时间2小时
//       3.再调用接口的时候 需要带token ，需要判断这个token时候再有效期之内

// 侧边导航栏业务
//   1.动态路由的场景
//     根据路由表的配置，动态生成侧边导航含，路由发生变化 ，对应的侧边菜单也会发生变化
//   2. 静态菜单的生成规则
//     菜单：
//       el-menu 整个菜单
//       el-sub-menu 包含子菜单的 一级菜单
//       el-menu-item 子菜单  一级菜单  （跳转页面）

//   3.实现动态路由和菜单的思路
//     1.创建路由和对应的页面组件
//     2.在sidebarMenu.vue中加载创建的路由
//       router.options.routes 获取完整的路由
//         优点：
//           不会重载二级路由多次出现的情况
//         缺点：
//           只能获取当前的路由 ，对于新增的或者减少的路由表 无法获取
//           再后期配合用户权限的时候，不能根据用户权限跟新路由表--》无法更新侧边菜单
//       router.getRoutes()
//         优点：能够获取完整路由，对于路由变化，也能拿到变化后的路由表，配合用户权限只能
//         用这种方式获取路由
//         缺点：
//           二级路由重复，并且和以及路由放在同一个层级

//       问题：
//         1. 处理重复的路由   （filterRouter）
//         2. 有些路由不应该出现再菜单中 /login （generateMenus）
//           以什么原则决定到底是否再菜单中？ 核心

//             1.meta 路由元信息 ：如果存在meta && meta.icon && meta.title 因该出现，
//               以title 作为标题 以icon作为logo 显示
//                 1.如果存在children ：以 el-sub-menu 显示一级菜单，
//                   以el-menu-item 显示chidlren的二级菜单
//                 2.不存在children，以el-menu-item 一级菜单
//             2.不过不满足  meta && meta.icon && meta.title 不应该出现

//     3.根据获取的路由对象 遍历输出对应的菜单

/*
    中英文切换（国际化）
        1、需要一个变量 loacle 控制语言环境
        2、所有语音中的数据源要事先准备好
        3、定义一个方法获取对应的语言包中的数据

    借助 i18n 插件完成 国际化
        npm install vue-i18n@next   // 因为项目是 vue3.2 的版本，所以i18n必须 在9.0以上的版本
*/
