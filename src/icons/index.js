import SvgIcon from '@/components/SvgIcon'

const svgRequired = require.context('./svg', false, /\.svg$/) // 三个参数：目录 是否查询子目录 正则筛选.svg结尾文件
svgRequired.keys().forEach((iteam) => svgRequired(iteam))

export default (app) => {
  // 注册全局组件
  app.component('svg-icon', SvgIcon)
}
