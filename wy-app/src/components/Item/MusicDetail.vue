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
          <!-- 走马灯 -->
          <span style="color: #fff" @click="lang">{{ this.msg }}</span
          ><br />
          <!-- 作者 -->
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
    <!-- 动画磁盘磁针部分 -->
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
    <!-- 歌词部分 -->
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
    <!-- 底部icon -->
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
        <!-- 跳转到评论页 -->
        <router-link :to="{ path: '/comment', query: { id: musicList.id } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
          </svg>
        </router-link>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footerContent">
        <!-- 进度条 -->
        <div class="progress">
          <Progress
            :percent="percent"
            v-model:src="changeCurrentTime"
            @percentChange="onProgressBarChange"
          />
        </div>
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
import Progress from "./Progress.vue";
export default {
  props: [
    "musicList",
    "isbtnShow",
    "play",
    "addDuration",
    "updateTime",
    "audio",
  ],
  data() {
    return {
      msg: this.musicList.al.name,
      flag: null,
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
      // 等到数组拿到之后再对歌词进行判断
      if (this.lyricList.lyric) {
        // 对字符串进行切割 [(\r\n)\r\n]为换行符
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          //对数组元素进行切割
          let min = item.slice(1, 3);//从1切到2
          let sec = item.slice(4, 6);
          let mil = item.slice(7, 10);
          //歌词部分
          let lrc = item.slice(11, item.length);
          // 计算毫秒
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mil);
            // 如果毫秒的最后一位为NAN则重新切割
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
    percent() {
      return this.currentTime / this.duration;
    },
    changeCurrentTime: {
      get() {
        return this.currentTime;
      },
      set(value) {
        if(value) {
          this.audio.currentTime = Math.floor(value);
        }
        // this.updateCurrentTime((value*1))
      },
    },
  },
  methods: {
    ...mapMutations([
      "updateDetailShow",
      "updatePlayListIndex",
      "updateCurrentTime",
    ]),
    backHome() {
      this.isLyricListShow = false;
      this.updateDetailShow();
      if (this.$route.path == "/home") this.$store.state.isShowTab = true;
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
      // this.play()
    },
    //跑马灯
    lang() {
      if (this.flag != null) return; //当第一次执行过后，this.flag存在值 就会退出！！！
      this.flag = setInterval(() => {
        var start = this.msg.substring(0, 1);
        var end = this.msg.substring(1);
        this.msg = end + start;
      }, 1000);
    },
    //在player监听这个percentChange事件，定义这个事件方法:要改变audio的currentTime才能真正改变播放器的进度条，这个currentTime是可读写属性
    onProgressBarChange(percent) {
      // this.currentTime = this.duration * percent;
      // this.updateCurrentTime(this.duration * percent)
      this.changeCurrentTime = this.duration * percent;
    },
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
    $router() {
      this.$store.state.isShowTab = false;
    },
  },
  mounted() {
    this.updateTime();
    this.addDuration();
    this.lang();
  },

  components: { Progress },
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
  .footerContent {
    /* 自定义进度条样式 */
    /* 自定义进度条样式 */
    input[type="range"] {
    }
    /*拖动块的样式*/
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; /*清除系统默认样式*/
      height: 0.3rem; /*拖动块高度*/
      width: 0.3rem; /*拖动块宽度*/
      background: white; /*拖动块背景*/
      border-radius: 50%; /*外观设置为圆形*/
      border: solid 1px #ddd; /*设置边框*/
    }
    .range {
      width: 100%;
      height: 0.06rem;
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
