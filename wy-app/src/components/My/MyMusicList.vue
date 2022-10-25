<template>
  <div class="myList">
    <span>我的歌单</span>
    <van-cell class="like" v-for="(item, index) in playList" :key="index">
      <img :src="item.coverImgUrl" alt="" />
      <p class="title">{{ item.name }}</p>
      <p class="count">{{ item.trackCount }}首</p>
    </van-cell>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getPlayList } from "@/request/api/my";
export default {
  data() {
    return {
      playList: [],
      index: 1,
    };
  },
  computed: {
    ...mapState(["user", "playListIndex"]),
    playListIndex: {
      get() {
        return this.playListIndex;
      },
      set() {
        this.playListIndex++;
      },
    },
  },
  mounted() {
    this.$store.state.isShowTab = true;
    this.reqGetPlayList();
  },
  methods: {
    ...mapMutations(["updatePlayListIndex"]),
    async reqGetPlayList() {
      let result = await getPlayList(this.user.data.profile.userId);
      if (result.data.code == 200) {
        console.log(result);
        this.playList = result.data.playlist;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.myList {
  width: 90%;
  height: 8rem;
  margin-left: 0.4rem;
  margin-top: 0.4rem;
  span {
    font-size: 0.36rem;
    font-weight: 600;
    margin-left: 0.3rem;
  }
  .like {
    width: 100%;
    height: 1.5rem;
    border-radius: 20px;
    margin-top: 0.2rem;
    .title {
      width: 4rem;
      height: 0.3rem;
      float: right;
      text-align: left;
      font-size: 0.3rem;
      font-weight: 600;
      margin-top: 0.25rem;
      margin-right: 0.7rem;
    }
    .count {
      width: 1rem;
      height: 0.3rem;
      float: right;
      margin-right: -1rem;
      margin-top: 0.6rem;
      font-size: 0.2rem;
      color: #bbbbbb;
    }

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 0.2rem;
      margin-top: 0.1rem;
      //   margin-left: -1.7rem;
    }
  }
}
</style>
