<template>
  <div class="rate-info" v-if="list.length != 0">
    <div class="rate-top">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="user" v-for="(item, index) in list" :key="index">
      <img class="user-image" :src="item.user.avatar" alt="">
      <span>{{item.user.uname}}</span>
      <div>{{item.content}}</div>
      <p><span>{{ item.created | showDate }}</span>{{item.style}}</p>
      <div class="show-images"><img v-for="(img, index) in item.images" :key="index" :src="img" alt=""></div>
    </div>
  </div>
</template>item

<script>
  import {formatDate} from 'common/utils'
  export default {
    name: "DetailRateInfo",
    props: {
      list: {
        tpye: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      showDate(value) {

        // 1.将时间戳转化为Date对象
        const date = new Date(value * 1000)

        // 2.将date进行格式化,并返回结果
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .rate-info{
    margin: 0 auto;
    padding-bottom: 30px;
    border-bottom: 5px solid #bababa;
  }
  .rate-top{
    display: flex;
    /*水平对齐方式：两边对齐*/
    justify-content: space-between;
    width: 96%;
    padding: 25px 0;
    border-bottom: 2px solid #bababa;
    margin: 0 auto;
  }
  .user{
    margin: 10px 10px 0;
    width: 96%;
  }
  .user-image{
    width: 50px;
    border-radius: 50%;
    border: 1px solid #bababa; vertical-align: middle;
    margin-bottom: 15px;
  }
  .user span{
    margin-left: 10px;
  }
  .user p span{
    padding-right: 15px;
    margin-left: 0;
  }
  .show-images img{
    height: 100px;
    margin-right: 10px;
    margin-top: 10px;
  }
</style>