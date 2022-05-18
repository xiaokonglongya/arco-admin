import config from '@/config/index'

export default {
  context: {
    type: String,
    default: config.name
  },
  // 宽度
  width: {
    type: Number,
    default: 120
  },
  // 高度
  height: {
    type: Number,
    default: 64
  },
  // 水印水平与垂直距离
  gapX: {
    type: Number,
    default: 212
  },
  gapY: {
    type: Number,
    default: 222
  },
  offsetLeft: Number,
  offsetTop: Number,
  // 字体样式设置
  fontStyle: {
    type: String,
    default: 'normal'
  },
  fontWeight: {
    type: String,
    default: 'normal'
  },
  fontColor: {
    type: String,
    default: 'rgba(0,0,0,.15)'
  },
  fontSize: {
    type: Number,
    default: 16
  },
  fontFamily: {
    type: String,
    default: 'sans-serif'
  }
}
