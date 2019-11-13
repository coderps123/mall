<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isEmit: true
      }
    },
    components: {
      SwiperItem,
      Swiper
    },
    methods: {
      // 监听图片是否加载完成
      imageLoad() {
        // 向父元素发射事件
        if (this.isEmit) {
          this.$emit('itemImageLoad')
          this.isEmit = false
        }
      }
    }
  }
</script>

<style scoped>

</style>