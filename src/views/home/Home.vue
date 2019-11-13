<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="titles"
                 @tabClick="tabClick"
                 :class="{TabControl: isShowTabControl }"
                 ref="tabControl2"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <scroll class="content"
            :probeType="probeType"
            :pullUpLoad="pullUpLoad"
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners" @homeitemImageLoad="homeitemImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :titles="titles"
        @tabClick="tabClick" ref="tabControl1"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabcontrol/TabControl";

  import { getHomeMultidata, getHomeGoods } from 'network/home';

  import HomeSwiper from "./HomeSwiper";
  import RecommendView from "./RecommendView";
  import FeatureView from "./FeatureView";

  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backtop/BackTop";
  export default {
    name: "Home",
    data() {
      return{
        banners: [],
        recommends: [],
        titles: ['流行','新款','精选'],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        currentType: 'pop',
        probeType: 3,
        pullUpLoad: true,
        isShowBackTop: false,
        tabControloffset: 0,
        isShowTabControl: false,
        offset: 0,
        listenerImgLoad: null
      }
    },
    components: {
      NavBar,
      Scroll,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      BackTop
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // const refresh = this.debounce(this.$refs.scroll.scroll.refresh)
      // （接受事件）
      this.listenerImgLoad = () => {
        this.$refs.scroll.scroll.refresh()
      }
      this.$bus.$on('itemImageLoad',this.listenerImgLoad)
    },
    methods: {
      /**
       *  事件监听相关方法
       */
      tabClick(index) {
        // console.log(index);
        switch(index) {
          case 0: this.currentType = 'pop';
            break;
          case 1: this.currentType = 'new';
            break;
          case 2: this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl2.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },
      backClick() {
        // 使用$refs拿到scroll组件，并调用scrollTo方法
        this.$refs.scroll.scroll.scrollTo(0 ,0, 500)
      },
      contentScroll(position) {
        // 决定 BackTop shi是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 决定TabControl 是否显示  此处有bug 所以这样写 涉及先后赋值问题
        this.isShowTabControl = (-position.y) > this.$refs.tabControl1.$el.offsetTop + 40
      },
      pullingUp() {
        this.getHomeGoods(this.currentType)
      },
      // 图片加载完成后调用，计算出 offsettop
      homeitemImageLoad() {
        // console.log(this.$refs.tabControl1.$el.offsetTop);
        this.tabControloffset = this.$refs.tabControl1.$el.offsetTop
        // console.log(this.tabControloffset);
      },
      // // 防抖函数
      // debounce(func, delay) {
      //   let timer = null
      //   return function (...args) {
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this, args)
      //     },delay)
      //   }
      // },

      /**
       * 网络模块相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res.data);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page += 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          // 请求完数据立即执行 finishPullUp() 函数
          this.$refs.scroll.scroll.finishPullUp()
        })
      }
    },
    activated() {
      // 回来后将记录的offset赋值到scrollTo方法
      this.$refs.scroll.scroll.scrollTo(0, this.offset, 0)
      // 一定要重新刷新scroll
      this.$refs.scroll.scroll.refresh()
    },
    deactivated() {
      // 1.离开时记录滚动位置，并赋值给offset
      this.offset = this.$refs.scroll.scroll.y

      // 2.取消全局事件的监听
      // 注意此处不能取消全局事件监听
      // this.$bus.$off('itemImageLoad', this.listenerImgLoad)
    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background-color: hotpink;
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .content{
    position: absolute;
    overflow: hidden;
    top: 40px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
  .TabControl{
    position: relative;
    left: 0;
    right: 0;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  }
</style>