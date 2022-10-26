<template>
  <div class="commentTop">
    <svg class="icon" aria-hidden="true" @click="goBack">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <van-nav-bar title="评论" />
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      localStorage.setItem('commentBack', '1')
      this.$router.go(-1);
    },
  },
  mounted() {
    this.$store.state.isShowTab = false;
  },
};
</script>

<style lang="less" scoped>
.commentTop {
  width: 100%;
  height: 1rem;
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 999;

  .icon {
    width: 0.6rem;
    height: 0.6rem;
    margin: 0.16rem;
  }
  .van-nav-bar {
    width: 3rem;
    //   height: 1rem;
    margin-top: -1rem;
    margin-left: 2.3rem;
    font-size: 0.4rem;
  }
}
</style>
