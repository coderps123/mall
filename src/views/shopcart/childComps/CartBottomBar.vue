<template>
  <div class="bottom-bar">
    <div class="bar-left" @click="selectAll">
      <img src="~assets/img/cart/tick.svg"
           :class="{checked: isChecked}">
      <span>全选</span>
    </div>
    <div>
      合计：{{totalPrice}}
    </div>
    <div class="bar-right">
      去计算({{getCartLength}})
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartBottomBar",
    data() {
      return {
        // isChecked: {
        //   type: Boolean,
        //   default: true
        // }
      }
    },
    computed: {
      totalPrice() {
        return "￥" + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((prevalue, item) => {
          return item.lowNowPrice * item.count + prevalue
        }, 0).toFixed(2)
      },
      getCartLength() {
        return this.$store.state.cartList.length
      },
      isChecked() {
        if (!this.$store.state.cartList.length) {
          return false
        }

        // 方法一、 filter 全部过滤
        // return !this.$store.state.cartList.filter(item => {
        //   return !item.checked
        // }).length

        // 方法二、 find  找到一个就停止遍历
        return !this.$store.state.cartList.find(item => {
          return !item.checked
        })

        // 方法三、 for循环
        // for (let item of this.$store.state.cartList) {
        //   // console.log(item); // item => cartList中的对象
        //   if (!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      // checkedClick() {
      //   this.isChecked = !this.isChecked
      // }
      selectAll() {
        if (!this.isChecked) {
          for (let item of this.$store.state.cartList) {
            item.checked = true
          }
        } else {
          for (let item of this.$store.state.cartList) {
            item.checked = false
          }
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    right: 0;
    left: 0;
    bottom: 49px;
  }

  .bar-left{
    height: 100%;
    display: flex;
    align-items: center;
    /*background-color: red;*/
  }
  .bar-left img{
    border: 2px solid #ff8198;
    border-radius: 50%;
    margin-left: 20px;
  }

  .checked{
    background-color: red;
  }

  .bar-right{
    width: 100px;
    height: 100%;
    background-color: red;
    color: #fff;
    line-height: 40px;
    text-align: center;
  }
</style>