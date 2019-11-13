<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动位置 probeType 值为 3 时，执行下面代码
      this.scroll.on('scroll',position => {
        // console.log(position);
        this.$emit('scroll', position)
      })

      // 滚动到某处 (x, y)
      // this.scroll.scrollTo(0, 0)

      // 上拉加载更多
      this.scroll.on('pullingUp',() => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>

</style>