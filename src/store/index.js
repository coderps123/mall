import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {

      payload.checked = true

      // 方法一、
      // let oldProduct = null
      //
      // // 1.判断商品是否相同
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = payload
      //   }
      // }
      // // 2.判断oldProduct是否有值
      // if (oldProduct) {
      //   oldProduct.count += 1
      // } else {
      //   payload.count = 1
      //   state.cartList.push(payload)
      // }

      // 方法二、
      let oldProduct = state.cartList.find(function (item) {
        return item.iid === payload.iid
      })

      if (oldProduct) {
        oldProduct.count += 1
        oldProduct.res = "该商品数量+1"
      } else {
        payload.count = 1
        state.cartList.push(payload)
        payload.res = "此商品已加入购物车"
      }
    }
  }
})

// 3.导出store
export default store