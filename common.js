/* eslint-disable */

/*
 * common 
 * @ cll1
 */

const O = Object.prototype.toString 
const UA = navigator.userAgent

// 字符串
const isString = v => typeof v === 'string'

// 数组
const isArray = v => O.call(v) === '[object Array]'

// 对象
const isObject = v => O.call(v) === '[object Object]'

// 方法
const isFunction = v => O.call(v) === '[object Function]'

// date
const isDate = v => O.call(v) === '[object Date]'

// isFile
const isFile = v => O.call(v) === '[object File]'

// 数字
const isNumber = v => !isNaN(parseFloat(v)) && isFinite(v)

// symbol
const isSymbol = v =>
  typeof s === 'symbol' || ('Symbol' in window && s instanceof window.Symbol)

// buffer
const isBuffer = v =>
  v &&
  typeof v === 'object' &&
  typeof v.copy === 'function' &&
  typeof v.fill === 'function' &&
  typeof v.readUInt8 === 'function'

// isFormData
const isFormData = v => (typeof FormData !== 'undefined') && (v instanceof FormData)

// 手机
const isPhone = v => /^0*1\d{10}$/.test(v)

// 邮箱
const isEmail = v =>
  /^([a-z0-9]+[_\-\.]?)*[a-z0-9]+@([a-z0-9]+[_\-\.]?)*[a-z0-9]+\.[a-z]{2,5}$/i.test(
    v
  )

// 正则
const isRegExp = v => O.call(v) === '[object RegExp]'

// 真
const isTrue = v => v === true

// 假
const isFalse = v => v === false

// ie
const isIE = () => {
  if ('ActiveXObject' in window) return /MSIE (\d+)/.test(UA) ? RegExp.$1 : 11
  return false
}

// android
const isAndroid = () => UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1

// ios
const isIOS = () => /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(UA)

// 清空冻结
const emptyObject = Object.freeze({})

// url 参数  / vue 自带 this.$route.query
const getParams = () => {
  let e,
    t = location.hash.slice(1) || '/',
    n = t.split('?')[1]
  if (!n) return e
  n = n.split('&')
  e = {}
  for (let r = 0, len = n.length, f = void 0; r < len; r++)
    (f = n[r].split('=')), (e[f[0]] = f[1])
  return e
}

// cookie
const cookie = (name, value) => {
  if (!(value === void 0)) return (document.cookie = name + '=' + value), true
  let cookie = document.cookie.split(';'),
    e = {}
  for (let i = 0, len = cookie.length, kv = void 0; i < len; i++)
    (kv = cookie[i].split('=')), (e[trim(kv[0])] = trim(kv[1]))
  if (!(name === void 0)) return e[name]
  return e
}

// 获取dom实际属性
const getStyle = v => document.defaultView.getComputedStyle(dom, null)[v]

// 获取 3d 旋转值
const getTranslate = v =>
  transform.match(/^translate3?d?\(-?(\d+)px,\s*-?(\d+)px(.*)\)$/i)

// 去空
const trim = v => v.replace(/^\s+|\s+$/g, '')
const trimLeft = v => v.replace(/^\s*/g, '')
const trimRight = v => v.replace(/\s*$/, '')

// 翻转字符串
const reverseString = v =>
  v
    .split('')
    .reverse()
    .join('')

// 随机字符串
const randomString = n => {
  let tmp = '',
    i = 0
  for (; i < n; i++)
    tmp += String.fromCharCode(Math.round(Math.random() * 26) + 97)
  return tmp
}

// 去重
const unRepeat = () => {
  if ('Set' in window) return new Set(arguments).toJSON()

  let list = Array.prototype.concat.apply([], arguments)
  return list.filter(function(item, i) {
    return i == list.indexOf(item)
  })
}

// 数字
const toNumber = v => {
  const n = parseFloat(v)
  return isNaN(n) ? val : n
}

// 强制转为数字
const toAbsNum = v => {
  v = v
    .toString()
    .replace(/[^\d.]/g, '')
    .replace(/^\./g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  if (v == '') v = 0
  return v
}

// webapi 时间格式化
const webapiTime = v =>
  new Date(v.replace(/^(\d{4})-(\d{2})-(\d{2})[ T](.*)$/, '$1/$2/$3 $4'))

// 颜色 rgba => #******
const _10to16 = v => {
  let c = v.match(
    /^rgb[a]?\((\s?[0-9]*),(\s?[0-9]*),(\s?[0-9]*),?(\s?[0-9]?\.?[0-9]?)?\)$/i
  )
  r = k => {
    let m = parseInt(k)
      .toString(16)
      .toUpperCase()
    return m.length < 2 ? '0' + m : m
  }
  return { color: '#' + r(c[1]) + r(c[2]) + r(c[3]), c, o: c[4] || 1 }
}

// 颜色 #****** => rgba
const _16to10 = v =>
  'rgba(' +
  v
    .match(/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/i)
    .splice(1, 3)
    .map(c => parseInt(c, 16))
    .join(',') +
  ',1)'

// xxx°xx.xx' => xxx.xx
const latlngFmt = v =>
  v
    .match(/^(\d*)°(\d*\.\d{2})[′'][NEWS]?$/i)
    .splice(1, 2)
    .map((c, i) => (i ? (parseFloat(c) / 60).toString().split('.')[1] : c))
    .join('.')

// xxx.xx => xx°xx'xx"
const latlngToString = v => {
  let f = Math.abs(v),
    f1 = Math.floor(f),
    f2 = Math.floor((f - f1) * 60),
    f3 = Math.round(((f - f1) * 3600) % 60)
  return f1 + '°' + f2 + "'" + f3 + '"'
}

// 深层拷贝
const newSpace = (d, f) => {
  if (f !== void 0) return JSON.parse(JSON.stringify(d))
  if (isArray(d)) {
    if (d.length == 0 || (d.length > 0 && !isArray(d[0]) && !isObject(d[0])))
      return Object.assign([], d, [])
    return d.map(v => newSpace(v))
  }
  if (isObject(d)) {
    let nd = new Object()
    for (let p in d) nd[p] = newSpace(d[p])
    return nd
  }
  return d
}

// base64 转 FormData  使用 blob > ie9
const base64ToFormData = base64String => {
  let bytes = window.atob(base64String.split(',')[1]),
    bff = new ArrayBuffer(bytes.length),
    ut = new Uint8Array(bff)
  for (let i = 0, len = bytes.length; i < len; i++) ut[i] = bytes.charCodeAt(i)
  let type = ''
  try {
    type = base64String.split(';')[0].split(':')[1]
  } catch (err) {
    type = 'image/png'
  }
  let blob = new Blob([bff], { type: type }),
    fd = new FormData()
  fd.append('file', blob, Date.now() + '.' + type.split('/')[1])
  return fd
}

// entries fn iterator 待定
// class Rank {
//   constructor() {
//     this.list = new Array()
//     this.initialize()
//   }
//   list
//   entries
//   data
//   initialize() {
//     this.entries = this.list.entries()
//   }
//   then = v => (this.list.push(v), this)
//   do() {
//     let v = this.entries.next()
//     if (!v.done) (this.data = v.value[1](this.data)), this.do()
//   }
// }

// 修改微信title
// const changeWxTitle = v => {
//   let body = document.body
//   document.title = v
//   let iframe = document.createElement('iframe')
//   iframe.src = '/favicon.ico'
//   iframe
//     .on('load', function() {
//       setTimeout(function() {
//         iframe.off('load').remove()
//       }, 0)
//     })
//     .appendTo(body)
// }

// ${*} 替换  // 参考es6 字符串模板
const templateFmt = (str, data) => {
  let t_str, t_key
  while (str.includes('${')) {
    let a = str.indexOf('${'),
      b = str.indexOf('}')
    t_str = str.substring(a, b + 1)
    t_key = str.substring(a + 2, b)
    str = str.replace(t_str, data[t_key])
  }
  return str
}

// string to html
const toHtml = v => {
  let replaceList = function(str, re) {
    function _replace(a, b) {
      let arr = str.split(a)
      str = arr.join(b)
    }
    str = str || ''
    for (let key in re) {
      _replace(key, re[key])
    }
    return str
  }
  return replaceList(v, {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
    '<': '&lt;',
    '>': '&gt;',
    ' ': '&nbsp;',
    '\t': '&#09;',
    '(': '&#40;',
    ')': '&#41;',
    '*': '&#42;',
    '+': '&#43;',
    ',': '&#44;',
    '-': '&#45;',
    '.': '&#46;',
    '/': '&#47;',
    '?': '&#63;',
    '\\': '&#92;',
    '\n': '<br>'
  })
}

// setImmediate
const setImmediate = function(callback) {
  let params = [].slice.call(arguments, 1)
  return window.setTimeout(function() {
    callback.apply(null, params)
  }, 0)
}

// clearImmediate
const clearImmediate = function(handle) {
  window.clearTimeout(handle)
}

// encodeURIComponent
const encode = v => encodeURIComponent(v)

// decodeURIComponent
const decode = v => decodeURIComponent(v)

// 排序 v(array|string) order(asc|desc) by(对象数组排序key)
const sort = (v, { order = 'asc', by }) => {
  if (isString(v)) v = v.split('')
  let f = [2, 0]
  if (order.toLowerCase() === 'desc') f.reverse()
  v.sort((a, b) => {
    let m = a[by] === void 0 ? a : a[by],
      n = b[by] === void 0 ? b : b[by],
      c = m > n ? f[0] : f[1]
    return c - 1
  })
  return v
}

// 空函数
const noop = function () {}

// 循环
function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') return

  if (typeof obj !== 'object') obj = [obj]

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
    return
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn.call(null, obj[key], key, obj);
    }
  }
}

// 混入
const merge = () => {
  let ret = {}
  function assignValue (val, key) {
    if (typeof ret[key] === 'object' && typeof val === 'object') {
      ret[key] = merge(ret[key], val);
    } else {
      ret[key] = val;
    }
  }
  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return ret
}

export default {
  isString,
  isArray,
  isObject,
  isFunction,
  isDate,
  isFile,
  isNumber,
  isSymbol,
  isBuffer,
  isFormData,
  isPhone,
  isEmail,
  isRegExp,
  isTrue,
  isFalse,
  isIE,
  isAndroid,
  isIOS,
  emptyObject,
  getParams,
  cookie,
  getStyle,
  getTranslate,
  trim,
  trimLeft,
  trimRight,
  reverseString,
  randomString,
  unRepeat,
  toNumber,
  toAbsNum,
  webapiTime,
  _10to16,
  _16to10,
  latlngFmt,
  latlngToString,
  newSpace,
  // rank: new Rank(),
  base64ToFormData,
  // changeWxTitle,
  templateFmt,
  toHtml,
  setImmediate,
  clearImmediate,
  encode,
  decode,
  sort,
  noop,
  forEach,
  merge
}
