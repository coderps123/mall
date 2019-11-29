<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{'active': currentIndex === index}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        //向父组件传值
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    /*适用于移动端*/
    /*position: sticky;*/
    /*top: 44px;*/
    /*background-color: #fff;*/
    /*z-index: 9;*/
  }
  .tab-control-item{
    flex: 1;
    line-height: 40px;
  }
  .tab-control-item span{
    padding: 0 7px 5px;
  }

  /*激活类*/
  .active{
    color: hotpink;
  }
  .active span{
    border-bottom: 3px solid hotpink;
  }
</style>