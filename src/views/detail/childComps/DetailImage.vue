<template>
  <div class="detail-image" v-if="Object.keys(images).length != 0">
    <div class="detail-desc">{{images.desc}}</div>
    <div v-for="item in images.detailImage" class="images">
      <span>{{item.key}}</span>
      <img v-for="item1 in item.list" :src="item1" alt="" @load="itemLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailImage",
    props: {
      images: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      itemLoad() {
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>

<style scoped>
  .detail-image{
    margin-top: 20px;
    padding: 0 4px 30px;
    border-bottom: 5px solid #F8F8F8;
  }
  .images img{
    width: 100%;
  }
</style>