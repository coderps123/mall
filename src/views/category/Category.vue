<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <slide-bar :slideList="slideList" @itemMaitKey="itemMaitKey"/>
    <subcategory :subcategory="subcategory" :goods="goods[type].list" @tabClick="tabClick"/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import SlideBar from "./child/SlideBar";
  import Subcategory from "./child/Subcategory";

  import {getCategory, getSubcategory, getSubcategoryDetail} from "network/category";

  export default {
    name: "Category",
    data() {
      return {
        slideList: [],
        maitKey: '',
        miniWallkey: '',
        subcategory: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []}
        },
        type: 'pop'
      }
    },
    components: {
      NavBar,
      SlideBar,
      Subcategory
    },
    created() {
      this.getCategory()
      // this.getSubcategory(this.maitKey)
      // this.getSubcategoryDetail()
    },
    methods: {
      getCategory() {
        getCategory().then(res =>{
          this.slideList = res.data.category.list
          this.getSubcategory(this.slideList[0].maitKey)
          this.getSubcategoryDetail(this.slideList[0].miniWallkey, 'pop')
          this.getSubcategoryDetail(this.slideList[0].miniWallkey, 'new')
          this.getSubcategoryDetail(this.slideList[0].miniWallkey, 'sell')
          // console.log(this.slideList);
        })
      },
      getSubcategory(maitKey) {
        getSubcategory(maitKey).then(res => {
          this.subcategory = res.data.list
          // console.log(this.subcategory);
        })
      },
      itemMaitKey(key) {
        this.maitKey = key.maitKey
        this.miniWallkey = key.miniWallkey
        this.getSubcategory(this.maitKey)
        this.getSubcategoryDetail(this.miniWallkey, 'pop')
        this.getSubcategoryDetail(this.miniWallkey, 'new')
        this.getSubcategoryDetail(this.miniWallkey, 'sell')
      },
      getSubcategoryDetail(miniWallkey, type) {
        getSubcategoryDetail(miniWallkey, type).then(res => {
          this.goods[type].list = res
          // console.log(res);
        })
      },
      tabClick(index) {
        switch (index) {
          case 0: this.type = 'pop';
            break;
          case 1: this.type = 'new';
            break;
          case 2: this.type = 'sell';
            break;
        }
      }
    }
  }
</script>

<style scoped>
  #category{
    height: 100vh;
  }

  .nav-bar{
    background-color: hotpink;
    color: #fff;
  }
</style>