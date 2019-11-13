<template>
  <div class="info" v-if="Object.keys(goods).length!==0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="price">{{goods.price}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discountDesc"
            class="discountDesc"
            :style="{backgroundColor: goods.discountBgColor}">
        <!--        ?????????-->
        <div>{{goods.discountDesc}}</div>
<!--        {{goods.discountDesc}}-->
      </span>
    </div>
    <div class="info-other">
      <span class="left">{{goods.columns[0]}}</span>
      <span class="center">{{goods.columns[1]}}</span>
      <span class="right">{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span v-for="(item, index) in goods.services.length-1" :key="index" class="services-item">
        <img v-if="goods.services[item-1].icon!==0" :src="goods.services[item-1].icon" alt="">
        <span>{{goods.services[item-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  }
</script>

<style scoped>
  .info-title{
    margin: 10px 5px;
    font-size: 19px;
  }
  .info-price span{
    padding-left: 10px;
  }
  .price{
    font-size: 23px;
    color: red;
  }
  .discountDesc{
    display: inline-block;
    padding: 5px 10px;
    color: #fff;
    border-radius: 20px;
  }
  .info-other{
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 14px;
    padding: 10px 5px 0;
  }
  .info-other span{
    border-bottom: 1px solid #C1C1C1;
    padding-bottom: 10px;
  }
  .center{
    flex: 1;
  }
  .info-services{
    display: flex;
    text-align: center;
    padding: 20px 5px;
    border-bottom: 4px solid #F8F8F8;
    font-size: 14px;

    /*水平布局----*/
    justify-content: space-between;
  }
  .info-services img{
    width: 14px;
    height: 14px;
  }
  .oldPrice{
     /*加横线*/
     text-decoration: line-through;
   }
</style>