<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in imgs" :key="index">
        <img :src="item.pic" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reqGetBanner } from "@/request/api/home.js";
export default {
  data() {
    return {
      imgs: [],
    };
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    async getBanner() {
      let result = await reqGetBanner();
      this.imgs = result.data.banners;
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
    //   padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>
