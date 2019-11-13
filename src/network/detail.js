import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/api/v1/detail',
    params: {
      iid
    }
  })
}

// 获取 detail 推荐信息
export function getRecommend() {
  return request({
    url: '/api/v1/recommend'
  })
}

export class Goods {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title
    this.oldPrice = itemInfo.oldPrice
    this.price =  itemInfo.price
    this.discountDesc = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.desc = itemInfo.desc
    this.lowNowPrice = itemInfo.lowNowPrice

    this.columns = columns
    this.services = services
  }
}

export class Shop {
  constructor (shopInfo) {
    this.shopLogo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

export class itemParams {
  constructor (info, rule) {
    // images可能没有值，有些商品有image，有些商品没有image
    this.images = info.images ? info.images[0] : ''
    this.key1 = info.key
    this.key2 = rule.key
    this.set = info.set
    this.tables = rule.tables
  }
}


//
// const obj ={
//
// }
// // 判断 对象obj是否为空对象
// Object.keys(obj).length === 0