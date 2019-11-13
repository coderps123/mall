<template>
  <div class="params" v-if="Object.keys(params).length != 0">
    <table class="params-first">
      <caption class="h1">{{params.key1}}</caption>
      <tr v-for="item in params.set"><td>{{item.key}}</td><td class="value-style">{{item.value}}</td></tr>
    </table>
    <table v-for="(table, index) in params.tables" :key="index" class="params-next">
      <caption class="h2">{{params.key2}}</caption>
      <tr v-for="(tr, index) in table" :key="index"><td v-for="(td, index) in tr">{{td}}</td></tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "DetailItemParams",
    props: {
      params: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .params{
    position: relative;
    z-index: 9;
    padding-bottom: 40px;
    border-bottom: 5px solid #bababa;
  }
  .h1{
    padding: 10px 0;
  }
  .params-first{
    width: 100%;
    background-color: #F8F8F8;
  }
  .params-first td{
    padding: 10px 0 10px 10px;
    width: 25px;
    height: 45px;
  }
  .value-style{
    color: #f36f6f;
  }
  .params-next{
    width: 100%;
    text-align: center;
    background-color: #F8F8F8;
  }
  .params-next td{
    padding: 10px 0;
  }
  tr{
    margin-bottom: 3px;
    background-color: #fff;
    border-bottom: green 1px solid;
  }
  .h2{
    padding: 20px 0 10px;
  }
</style>