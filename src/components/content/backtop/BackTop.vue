<template>
  <div class="back-top">
    <img class="back-top-img" src="~assets/img/common/top.png">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
  }
</script>

<style scoped>
  .back-top{
    display: flex;
    background-color: red;
  }
  .back-top-img{
    position: fixed;
    width: 48px;
    height: 48px;
    bottom: 55px;
    right: 10px;
    z-index: 9;
  }
</style>