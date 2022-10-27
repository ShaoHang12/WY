<template>
  <div class="FootMusic">
    <div class="footLeft" @click="update()">
      <img :src="playList[playListIndex].al.picUrl" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
      </div>
    </div>
    <div class="footRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="play"
        v-if="isbtnShow"
      >
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
        :updateTime="updateTime"
        :audio="$refs.audio"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MusicDetail from "./MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  methods: {
    play() {
      //判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); //播放
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); //清除
      }
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
    //添加总时长
    addDuration() {
      this.updateDuration(this.$refs.audio.duration);
    },
    update() {
      this.updateDetailShow();
      this.$store.state.isShowTab = false;
    },
  },

  watch: {
    playListIndex() {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
    playList() {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  components: { MusicDetail },
};
</script>

<style lang="less" scoped>
.FootMusic {
  width: 93%;
  height: 1.5rem;
  position: fixed;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  bottom: 0;
  border-top: 0.02rem solid #999;
  background-color: white;

  .footLeft {
    width: 55%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    p {
      width: 100%;
      height: 0.4rem;
      margin-left: 0.18rem;
      margin-top: 0.2rem;
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footRight {
    width: 19%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      margin-top: 8px;
    }
  }
}
</style>
