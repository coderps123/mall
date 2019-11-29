<template>
  <div class="goods-item" v-if="Object.keys(goodsitem).length != 0">
    <a>
      <img v-lazy="showImage" alt=""
            @load="itemLoad"
            @click="itemClick">
    </a>
    <div class="goods-title">{{goodsitem.title}}</div>
    <div class="goods-info">
      <span class="price">{{ goodsitem.price }}</span>
      <span class="collect">{{ goodsitem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsitem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        //             detail              category                 home
        return this.goodsitem.image || this.goodsitem.img || this.goodsitem.show.img
      }
    },
    methods: {

      // 每个图片加载完成后调用此方法
      itemLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        // 点击实现路由跳转
        // 动态路由
        this.$router.push('/detail' + this.goodsitem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 20px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    /*overflow: hidden;*/
    text-align: center;
  }

  .goods-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>