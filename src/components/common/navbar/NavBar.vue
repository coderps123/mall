<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    line-height: 44px;
    height: 44px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    z-index: 9;
    background-color: #fff;
  }
  .left, .right{
    width: 60px;
  }
  .center{
    text-align: center;
    flex: 1;
  }
</style>