<template>
  <swiper>
    <swiper-item v-for="item in topImages"><img :src="item" alt=""></swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        // 当类型为数组或对象时，default为函数
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

</style>