<template>
  <div>
    <goods-list :goods="recommends"/>
  </div>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";
  export default {
    name: "DetailRecommend",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsList
    }
  }
</script>

<style scoped>

</style>