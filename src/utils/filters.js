/**
 * 数字/浮点数保留n位小数点
 * @param {*} val 值
 * @param {*} num 位数
 */
export const numToFixed = (val = 0, num = 2) => {
  val = Number(val)
  val = isNaN(val) ? 0 : val
  return val.toFixed(num)
}

/**
 * 名字脱敏
 * eg：张三（*三）  张某某（张*某）
 * @param {*} name  姓名
 * @returns
 */
export function nameFilters(name) {
  if (typeof name === 'undefined') {
    return name
  } else if (name.length < 2) {
    return name
  } else if (name.length === 2) {
    return new Array(name.length).join('*') + name.substr(-1)
  } else {
    return (
      name.substr(0, 1) + new Array(name.length - 1).join('*') + name.substr(-1)
    )
  }
}

/**
 * 证件号脱敏
 * eg：429004199902024125（42900419********25）
 * @param {*} num 证件号
 * @returns
 */
export function idCardFilters(num) {
  if (typeof num === 'undefined') {
    return num
  } else if (num.length !== 18) {
    return num
  } else {
    return num.replace(/(\d{8})\d{8}(\d*)/, '$1********$2')
  }
}

/**
 * 根据身份证判断性别
 * @param {*} num 证件号
 * @returns 男/女
 */
export function sexIdcareFilter(num) {
  if (typeof num === 'undefined') {
    return num
  } else if (num.length !== 18) {
    return num
  } else {
    return num.substr(16, 1) % 2 === 1 ? '男' : '女'
  }
}

/**
 * 手机号码脱敏
 * eg：18641526389  （186****6389）
 * @param {*} num 手机号码
 * @returns
 */
export function phoneFilters(num) {
  if (typeof num === 'undefined') {
    return num
  } else if (num.length !== 11) {
    return num
  } else {
    return num.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')
  }
}

/**
 * 文本超出后截取
 * @param {*} type 文本
 * @param {*} n 长度
 * @returns
 */
export function textFilter(type, n) {
  if (typeof type === 'undefined' || type.length <= n) {
    return type
  } else {
    if (type.length > n) {
      return type.substr(0, n) + '...'
    }
  }
}

/**
 * 金额
 * eg：￥100.00
 * @param {*} type 数额
 * @param {*} n 长度
 * @returns
 */
export function priceFilter(type, n) {
  if (typeof type === 'undefined') {
    return type
  } else {
    return '￥' + type.toFixed(n)
  }
}

// /**
//  * 时间格式化
//  * @param {*} data 时间戳
//  * @returns yyyy-MM-dd HH:mm:SS
//  */
// export function timeFilters(data) {
//   const time = new Date(data) // 时间
//   const year = time.getFullYear() // 年
//   const month = time.getMonth() + 1 // 月
//   const date = time.getDate() // 日
//   const hour = time.getHours() // 时
//   const minutes = time.getMinutes() // 分
//   const seconds = time.getSeconds() // 秒
//   return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
// }

const dayjs = require('dayjs')
/**
 * 时间格式化
 * @param {*} data 时间戳
 * @returns yyyy-MM-dd HH:mm:SS
 */
export const timeFilters = (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!isNull(val)) {
    if ((val + '').length === 10) {
      // 10位的时间戳，精度是秒
      val = parseInt(val) * 1000
    } else {
      // 13位的时间戳，精度是毫秒
      val = parseInt(val)
    }

    return dayjs(val).format(format)
  } else {
    return '--'
  }
}

/**
 * 判断数据是否为空值
 * @param {*} data
 * @returns
 */
export const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}
