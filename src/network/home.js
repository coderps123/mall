import {request} from './request'

//获取首页多个数据
export function getHomeMultidata() {
  return request({
    url: '/api/v1/home/multidata'
  })
}
//获取商品数据
export function getHomeGoods(type, page) {
  return request({
    url: '/api/v1/home/data',
    params: {
      type,
      page
    }
  })
}