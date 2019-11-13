<template>
  <div class="shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="shop-logo"><img :src="shop.shopLogo" alt="">{{shop.name}}</div>
    <div class="shop-middle">
      <div class="left">
        <div class="left-lt">
          <div class="top">{{shop.cSells | setcSells}}</div>
          <div>总销量</div>
        </div>
        <div class="left-rt">
          <div class="top">{{shop.cGoods}}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="right">
        <table>
          <tr v-for="item in shop.score">
            <td>{{item.name}}</td>
            <td class="score" :class="{scoreBetter: item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{betterMore: item.isBetter}">
              <span>{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <a>
       <span class="shop-bottom-text">进店逛逛</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      setcSells(value) {
        if(value >= 10000) {
          value = (value/10000).toFixed(1) + "万"
        }
        return value
      }
    }
  }
</script>

<style scoped>
  .shop-middle{
    display: flex;
  }
  .left, .right{
    flex: 1;
  }
  .shop-logo img{
    width: 48px;
    /*图片和文字垂直对齐*/
    vertical-align: middle;
  }
  .shop-logo{
    font-size: 20px;
    padding: 30px 16px 15px;
  }
  .left{
    display: flex;
    width: 50%;
    text-align: center;
    padding: 0 10px;
    align-items: center;
  }
  .left-rt{
    border-right: 1px solid #666666;
  }
  .left-lt, .left-rt{
    flex: 1;
  }
  .right{
    width: 50%;
  }
  .score{
    color: green;
  }
  .better span{
    background-color: green;
    color: #fff;
  }
  .scoreBetter{
    color: red;
  }
  .betterMore span{
    background-color: red;
    color: #fff;
  }
  .top{
    padding-bottom: 5px;
    font-size: 25px;
  }
  .shop-bottom{
    text-align: center;
    margin: 10px 5px 0;
    padding-bottom: 25px;
    border-bottom: 5px solid #F8F8F8;
  }
  .shop-bottom-text{
    display: inline-block;
    padding: 6px 50px;
    border-radius: 10px;
    background-color: #C1C1C1;
  }
  table{
    margin: 0 auto;
  }
  td{
    padding: 7px 5px;
  }
  ul{
    color: #fff;
  }
</style>