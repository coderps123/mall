<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <div class="left" slot="left" @click="backHome">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="center" slot="center">
        <div class="nav-bar-item"
             v-for="(item, index) in titles"
             :class="{active: currentIndex === index}"
             @click="itemClick(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      },
      backHome() {
        // this.$router.back()
        this.$router.go(-1)
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .left img{
    margin-top: 11px;
    margin-left: 15px;
  }
  .center{
    display: flex;
  }
  .nav-bar-item{
    flex: 1;
  }
  .active{
    color: #ff8198;
  }
</style>