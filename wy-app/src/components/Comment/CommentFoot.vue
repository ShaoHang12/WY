<template>
  <van-row class="commentFoot">
    <van-field v-model="content" placeholder="请发表评论" />
    <van-button @click="doSentComment">发送</van-button>
  </van-row>
</template>

<script>
import { sentComment } from "@/request/api/comment";
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    async doSentComment() {
      await sentComment({
        t: 1,
        type: 0,
        id: this.$route.query.id,
        content: this.content,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.commentFoot {
  width: 100%;
  height: 1.13rem;
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: -0.2rem;
  z-index: 999;
  border-top: 0.02rem solid #999;
  background-color: white;
  .van-field {
    width: 80%;
    height: 1.5rem;
  }
  .van-button {
    width: 20%;
  }
}
</style>
