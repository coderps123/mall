<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar"
                    @itemClick="itemClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-image :images="images"/>
      <detail-item-params ref="params" :params="params"/>
      <detail-rate-info ref="rateInfo" :list="list"/>
      <detail-recommend ref="recommend" :recommends="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <toast :msg="msg" v-show="show"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail, Goods, Shop, itemParams, getRecommend} from 'network/detail'
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailImage from "./childComps/DetailImage";
  import Scroll from "components/common/scroll/Scroll";
  import DetailItemParams from "./childComps/DetailItemParams";
  import DetailRateInfo from "./childComps/DetailRateInfo";
  import DetailRecommend from "./childComps/DetailRecommend";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backtop/BackTop";
  import Toast from 'components/common/toast/Toast'
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        images: {},
        params: {},
        list: {},
        recommends: [],
        listenerImgLoad: null,
        scrollToY: [],
        changeIndex: 0,
        isShowBackTop: false,
        msg: '',
        show: false
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImage,
      Scroll,
      DetailItemParams,
      DetailRateInfo,
      DetailRecommend,
      DetailBottomBar,
      BackTop,
      Toast
    },
    methods: {
      itemClick(index) {
        this.$refs.scroll.scroll.scrollTo(0, -this.scrollToY[index], 300)
      },
      contentScroll(position) {
        let y = -position.y
        // 方案一：
        // [0, 2000, 4000, 6000]
        // 0       y   2000    index: 0
        // 2000    y   4000    index: 1
        // 4000    y   6000    index: 2
        // 大于   6000          index：3
        let length = this.scrollToY.length
        // for (let i = 0; i < length; i++) {
        //   if (this.changeIndex !== i && ((i < length-1 && this.scrollToY[i] < y && y < this.scrollToY[i+1]) || (i === length-1 && y > this.scrollToY[i]))) {
        //     this.changeIndex = i
        //     this.$refs.nav.currentIndex = this.changeIndex
        //     console.log(this.changeIndex);
        //   }
        // }

        // 方案二：
        // [0, 2000, 4000, 6000, Number.MAX_VALUE]
        // 0       y   2000    index: 0
        // 2000    y   4000    index: 1
        // 4000    y   6000    index: 2
        // 6000    y   js中最大的值   index：3
        // console.log(Number.MAX_VALUE);
        for (let i = 0; i < length; i++) {
          if (this.changeIndex != i  && ( y > this.scrollToY[i] && y < this.scrollToY[i+1])) {
            this.changeIndex = i
            this.$refs.nav.currentIndex = this.changeIndex
            console.log(this.changeIndex);
          }
        }
        this.isShowBackTop = y > 1000
        // if (y > 1000) {
        //   this.isShowBackTop = true
        // } else {
        //   this.isShowBackTop = false
        // }
      },
      // 返回顶部
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0, 0, 300)
      },
      // 添加购物车
      addToCart() {
        // 1. 获取需要添加的信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.lowNowPrice = this.goods.lowNowPrice
        product.count = 0

        // 2. 将获取到的信息添加到 vuex 中
        this.$store.commit('addCart', product)

        this.msg = "添加成功，在购物车等您亲~"
        this.show = true
         setTimeout(res => {
           this.msg = ""
           this.show = false
         }, 1500)
      }
    },
    created() {
      // 1. 保存传入的iid
      this.iid = this.$route.params.iid

      // 2. 根据传入的iid，获取详情页轮播图数据
      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages
        console.log(data);

        // 将获取到的数据保存到goods中
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods);

        // 将获取到的数据保存到shop中
        this.shop = new Shop(data.shopInfo)

        // 将获取到的详情图片信息保存到 images中
        this.images = data.detailInfo

        // 获取itemParams（参数）中的数据
        this.params = new itemParams(data.itemParams.info, data.itemParams.rule)
        // console.log(this.params);

        const cRate = data.rate.cRate
        if (cRate != 0) {
          // 获取rate（评价信息）数据
          this.list = data.rate.list
          // console.log(this.rates);
        }
      })

      // 3. 获取详情页推荐信息
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted() {
      this.listenerImgLoad = () => {
        this.$refs.scroll.scroll.refresh()

        // 1. 先重置数组
        this.scrollToY = []
        this.scrollToY.push(0)
        this.scrollToY.push(this.$refs.params.$el.offsetTop)
        this.scrollToY.push(this.$refs.rateInfo.$el.offsetTop)
        this.scrollToY.push(this.$refs.recommend.$el.offsetTop)
        this.scrollToY.push(Number.MAX_VALUE)

      }
      this.$bus.$on('itemImageLoad', this.listenerImgLoad)
    },
    destroyed() {
      // 取消事件
      this.$bus.$off('itemImageLoad', this.listenerImgLoad)
    }
  }
</script>

<style scoped>
  #hy-swiper{
    margin-top: 0;
    height: 300px;
    overflow: hidden;
  }
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    /*height: calc(100% - 93px);*/
    position: fixed;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .nav-bar{
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    background-color: #fff;
  }
</style>