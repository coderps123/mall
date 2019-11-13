<template>
  <div class="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{getCartLength}})</div></nav-bar>
    <scroll class="content" ref="scroll">
      <div v-for="(item, index) in $store.state.cartList" :key="index" class="list">
        <div class="left">
          <img src="~assets/img/cart/tick.svg"
               :class="{checked: item.checked}"
               @click="checkedClick(index)">
        </div>
        <div class="center">
          <img :src="item.image" alt="">
        </div>
        <div class="right">
          <div class="overflow title">{{item.title}}</div>
          <div class="overflow desc">{{item.desc}}</div>
          <div class="bottom">
            <div class="bottom-item price">￥{{item.lowNowPrice}}</div>
            <div class="bottom-item count">x{{item.count}}</div>
          </div>
        </div>
      </div>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll"
  import CartBottomBar from "./childComps/CartBottomBar";
  export default {
    name: "ShopCart",
    components: {
      NavBar,
      Scroll,
      CartBottomBar
    },
    computed: {
      getCartLength() {
        return this.$store.state.cartList.length
      }
    },
    methods: {
      checkedClick(index) {
        // console.log(index);
        this.$store.state.cartList[index].checked = !this.$store.state.cartList[index].checked
      }
    },
    activated() {
      this.$refs.scroll.scroll.refresh()
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: deeppink;
    color: #ffffff;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9;
  }

  .cart{
    height: 100vh;
  }

  .content{
    position: fixed;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
  }

  .center img{
    width: 70px;
    border-radius: 5px;
  }

  .list{
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 10px 10px 0;
    box-shadow: 0 1px 3px #666666;
  }

  .right{
    width: 65%;
    margin-left: 10px;
  }

  .left{
    width: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left img{
    border-radius: 50%;
    border: 2px solid #eee;
  }

  .overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .title{
    font-size: 20px;
    color: #000;
  }

  .bottom{
    display: flex;
    justify-content: space-between;
  }

  .title{
    padding-bottom: 20px;
  }

  .desc{
    padding-bottom: 25px;
  }

  .price{
    color: red;
    font-size: 20px;
  }

  .checked{
    background-color: red;
  }
</style>