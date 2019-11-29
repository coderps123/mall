<template>
  <div class="subcategory">
    <scroll class="wrapper" ref="scroll">
      <div class="top">
        <div v-for="item in subcategory" :key="item.image" class="top-img">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
            <div>{{item.title}}</div>
          </a>
        </div>
      </div>

      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>

      <goods-list :goods="goods"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  export default {
    name: "Subcategory",
    props: {
      subcategory: {
        type: Array,
        default() {
          return []
        }
      },
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        type: {
          type: String,
          default: 'pop'
        }
      }
    },
    components: {
      Scroll,
      TabControl,
      GoodsList
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.scroll.refresh()
      },
      tabClick(index) {
        this.$emit('tabClick', index)
      }
    },
    mounted() {
      this.$bus.$on('itemImageLoad', () => {
        this.$refs.scroll.scroll.refresh()
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    position: fixed;
    top: 44px;
    left: 25%;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }

  .subcategory{
    position: fixed;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 25%;
  }

  .top{
    display: flex;

    flex-wrap: wrap;

    font-size: 12px;
  }

  .top-img{
    width: 80px;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  .top-img div{
    margin-top: 3px;
    text-align: center;
  }

  .top-img img{
    width: 60px;
  }

  .tab-control{
    font-size: 12px;
  }
</style>