<template>
  <div class="slide-bar">
    <scroll class="wrapper">
      <ul>
        <li v-for="(item, index) in slideList"
            :key="item.maitKey"
            :class="{active: index === currentIndex}" @click="itemClick(index)">
          {{ item.title }}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "SlideBar",
    props: {
      slideList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Scroll
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        // this.maitKey = this.slideList[index].maitKey
        // console.log(this.maitKey);
        const key = {}
        key.maitKey = this.slideList[index].maitKey
        key.miniWallkey = this.slideList[index].miniWallkey
        this.$emit('itemMaitKey', key)
      }
    }
  }
</script>

<style scoped>

  .slide-bar ul{
    background-color: #f6f6f6;
    width: 100%;
  }

  .slide-bar ul li{
    height: 38px;
    text-align: center;
    line-height: 38px;
    font-size: 12px;
  }

  .active{
    border-left: 2px solid #ff5777;
    background-color: #fff;
    color: #ff5777;
  }

  .wrapper{
    position: fixed;
    top: 44px;
    left: 0;
    right: 75%;
    bottom: 49px;
    background-color: #f6f6f6;
  }
</style>