/**
 * variables.scss.js中变量的命名规则如下：
 * 1.驼峰命名法
 * 使用方式如下：
 * 1.在scss变量中使用是正常的scss变量：sideBarWidth
 * 2.在js中使用是定义时的变量格式：import { sideBarWidth } from "@/styles/variables.scss.js",
 * */
module.exports = {
  // sideBar
  menuText: '#bfcbd9',
  menuActiveText: '#409EFF',
  subMenuActiveText: '#f4f4f5',
  menuBg: '#304156',
  menuHover: '#263445',
  subMenuBg: '#1f2d3d',
  subMenuHover: '#001528',
  sideBarWidth: '210px',
  hideSideBarWidth: '67px',
  sideBarDuration: '0.28s'
}
