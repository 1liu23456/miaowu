<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroller",
  props: {
    handlToScroll: {
      type: Function,
      default: function() {},
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {},
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 还有 本来 是不能滑动的 一点击保存可以滑动
      // 刷新又不可以了
      // 有个问题  我的 Dom 还是 没加载完毕
      // 不使用  setTimeout   没法滑动
      setTimeout(() => {
        var scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          mouseWheel: true,
          bounce: true,
          momentumLimitDistance: 5,
          scrollY: true,
        });
        this.scroll = scroll
        scroll.on("scroll", (pos) => {
          this.handlToScroll(pos);
        });
        scroll.on("touchEnd", (pos) => {
          this.handleToTouchEnd(pos);
        });
        // console.log(scroll);
      }, 100);
    });
  },
  methods: {
    toScrollTop(y) {
      this.scroll.toscrollTo(0,y)
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper{
  max-height: 520px;
  overflow: hidden;
}
</style>
