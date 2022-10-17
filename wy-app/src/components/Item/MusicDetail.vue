<!-- 播放音乐页面 -->
<template>
  <div>
    <img :src="musicList.al.picUrl" class="bigImg" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon liebiao" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="leftDetail">
          <span style="color: #fff" @click="lang">{{ this.msg }}</span
          ><br />
          <span v-for="(authors, index) in musicList.ar" :key="index">{{
            authors.name
          }}</span>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLyricListShow">
      <img
        src="@/assets/Music/needle-ab.png"
        class="img_needle"
        :class="{ img_needle_active: !isbtnShow }"
      />
      <img src="@/assets/Music/cd.png" class="img_cd" />
      <img
        :src="musicList.al.picUrl"
        class="img_ar"
        :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
        @click="isLyricListShow = true"
      />
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="isLyricListShow">
      <p
        v-for="(sentence, index) in lyric"
        :key="index"
        :class="{
          active:
            currentTime * 1000 >= sentence.time &&
            currentTime * 1000 < sentence.pre,
        }"
        @click="isLyricListShow = false"
      >
        {{ sentence.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footerContent">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon bofang"
          aria-hidden="true"
          v-if="isbtnShow"
          @click="play"
        >
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["musicList", "isbtnShow", "play", "addDuration"],
  data() {
    return {
      msg: this.musicList.al.name,
      flag: null, //根据该主键清除定时器
      isLyricListShow: false,
    };
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playList",
      "playListIndex",
      "duration",
    ]),
    lyric() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mil = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mil);
          if (isNaN(Number(mil))) {
            mil = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mil);
          }
          return { min, sec, mil, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      return arr;
    },
  },
  methods: {
    ...mapMutations(["updateDetailShow"]),
    backHome() {
      this.isLyricListShow = false;
      this.updateDetailShow();
      this.$store.state.isFooterMusic = true;
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updatePlayListIndex"]),
    //跑马灯
    lang() {
      if (this.flag != null) return; //当第一次执行过后，this.flag存在值 就会退出！！！
      this.flag = setInterval(() => {
        var start = this.msg.substring(0, 1);
        var end = this.msg.substring(1);
        this.msg = end + start;
      }, 1000);
    },
  },
  watch: {
    currentTime() {
      let p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
    },
  },
  mounted() {
    this.$store.state.isFooterMusic = false;
    this.addDuration();
    this.lang();
  },
};
</script>

<style lang="less" scoped>
.bigImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(1.6rem);
}
.detailTop {
  width: 90%;
  height: 0.9rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  fill: #fff;
  .detailTopLeft {
    width: 100%;
    height: 1rem;
    display: flex;
    .leftDetail {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      fill: #fff;
      span {
        color: #999;
      }
      .liebiao {
        width: 10px;
        height: 10px;
        fill: #fff;
      }
    }
  }
  .icon {
    width: 0.6rem;
    height: 0.6rem;
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
    background-color: white;
    progress::-webkit-progress-value {
      background: black;
    }
  }

  .footer {
    width: 100%;
    height: 1rem;
    display: flex;

    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 14px;
  overflow: scroll;
  p {
    color: rgb(173, 165, 165);
    margin-bottom: 0.3rem;
  }
  .active {
    color: #fff;
    font-size: 0.4rem;
  }
}
.FootMusic {
  margin: 0 !important;
}
</style>
