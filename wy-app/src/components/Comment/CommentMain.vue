<template>
  <div class="commentCenter">
    <!-- 下拉加载 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 上拉加载 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="Finished"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in commentList"
          :key="index"
          class="commentItem"
        >
          <div class="imgWrap">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="contentWarp">
            <div class="headerWarp">
              <div class="infoWarp">
                <p style="font-size: 0.22rem">{{ item.user.nickname }}</p>
                <p style="color: #bbbbbb">{{ item.timeStr }}</p>
              </div>
              <p class="like">{{ item.likedCount }}点赞</p>
            </div>
            <div class="footerWarp">
              {{ item.content }}
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getComment } from "@/request/api/comment";
export default {
  data() {
    return {
      commentList: [],
      count: 0,
      isLoading: false,
      loading: false,
      finished: false,
      page: 0,
    };
  },
  methods: {
    async reqGetComment() {
      let result = await getComment({
        id: this.$route.query.id,
        limit: 20,
        offest: (this.page - 1) * 20,
      });
      if (result.status == 200) {
        //拼接字符串
        result.data.comments.forEach((item) => {
          this.commentList.push(item);
        });
        // this.commentList = result.data.comments;
        this.isLoading = false;
        this.loading = false;
      }
    },
    async onRefresh() {
      //重新获取数据
      this.commentList = [];
      this.reqGetComment();
    },
    async onLoad() {
      this.page++;
      this.reqGetComment();
    },
  },
  mounted() {
    this.reqGetComment();
  },
};
</script>

<style lang="less" scoped>
.commentCenter {
  width: 97%;
  height: 100%;
  padding-top: 0.4rem;
  .commentItem {
    width: 100%;
    height: 100%;
    display: flex;
    margin: 1rem 0.2rem 0.4rem 0.2rem;
    img {
      width: 0.6rem;
      height: 0.6rem;
      margin-bottom: -0.5rem;
      margin-right: 0.2rem;
      border-radius: 50%;
      vertical-align: middle;
    }
    .contentWarp {
      width: 100%;
      height: 100%;
      .headerWarp {
        font-size: 0.2rem;
        .infoWarp {
          p {
            margin-top: 0.1rem;
          }
        }
        .like {
          float: right;
          font-size: 0.3rem;
          margin-top: -0.14rem;
          margin-right: 0.2rem;
          color: gray;
        }
      }
      .footerWarp {
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
