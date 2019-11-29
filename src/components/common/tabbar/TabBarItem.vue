<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{'active':isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String
    },
    data() {
      return{
        // isActive: false
      }
    },
    computed: {
      isActive() {
        // /home -> /home true
        // 其他为 false
        return this.$route.path.indexOf(this.path) !== -1
      }
    },
    methods: {
      // 点击按钮，实现路由跳转
      itemClick() {
        this.$router.replace(this.path).catch(err => {})

        // if (this.$route.path != this.path) {
        //   this.$router.replace(this.path)
        //   console.log(this.$route.path);
        //   console.log(this.path);
        // }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    height: 49px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
  }
  .active{
    color: red;
  }
</style>