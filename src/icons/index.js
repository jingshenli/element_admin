// 注册一个组件
import svgIcon from './svgIcon.vue'
// 将这个组件注册成全局的组件
export default function initSvgIcon(app) {
  app.component('svg-icon', svgIcon)
}

const file = require.context('@/icons/svg', false, /\.svg$/)
file.keys().map(file)
