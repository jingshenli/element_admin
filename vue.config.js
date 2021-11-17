// node 加载的 commonjs
// 导出一个配置对象 .作为webpack的配置
const path = require('path') // 导入node 一个默认模块  解析目录相关

// 配置一个方法，获取当前的绝对路径
function getPath(src) {
  // __dirname //当前文件的绝路路径
  return path.join(__dirname, src)
}

module.exports = {
  chainWebpack(config) {
    // config 就是webpack 默认的配置对象

    // 1 . 获取webpack 对svg 的解析的loader,并且忽略那个目录，忽略老的loader
    config.module.rule('svg').exclude.add(getPath('src/icons/svg')).end()

    // 3.配置新的loader 对svg的解析
    // 处理什么类型的文件
    config.module
      .rule('icons') // 新增一个名字叫icons的rule规则
      .test(/\.svg$/) // 解析什么文件
      .include.add(getPath('src/icons/svg')) // 处理那个目录下
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
