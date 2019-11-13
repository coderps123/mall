<template>
  <div class="bottom-bar">
    <div class="item left">
      <div>
        <span class="icon icon_1"></span>
        <span class="text">客服</span>
      </div>
      <div>
        <span class="icon icon_2"></span>
        <span class="text">店铺</span>
      </div>
      <div @click="collectClick">
        <span v-if="active= isActive" class="icon icon_3"></span>
        <span v-else class="icon icon-active"></span>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class=" item right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    data() {
      return {
        isActive: true
      }
    },
    methods: {
      collectClick() {
        this.isActive = !this.isActive
      },
      addToCart() {
        this.$emit('addToCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: fixed;
    height: 49px;
    left: 0;
    right: 0;
    bottom: -2px;
    background-color: #ffffff;
    font-size: 15px;

    display: flex;
    text-align: center;
  }

  .item{
    flex: 1;
    display: flex;
  }

  .item>div{
    flex: 1;
  }

  .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 2px;

    /* 0 0 大小百分百*/
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100% ;
  }

  .icon_1{
    background-position: 0 -52px;
  }
  
  .icon_2{
    background-position: 0 52px;
  }

  .icon_3{
    background-position: 0 1px;
  }

  .cart{
    background-color: yellow;
    font-weight: 700;
  }

  .buy{
    background-color: hotpink;
    color: #fff;
  }

  .right{
    line-height: 49px;
  }

  .icon-active{
    background-position: 0 -26px;
  }
</style>