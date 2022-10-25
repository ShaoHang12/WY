import Vue from "vue";
import Vuex from "vuex";
import { getMusicLyric } from "@/request/api/item";
import {getPhoneLogin} from "@/request/api/my"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //默认歌曲
    playList: [
      {
        //播放列表
        al: {
          id: 135992033,
          name: "漠河舞厅·2022",
          pic: 109951166609630670,
          picUrl:
            "https://p2.music.126.net/m8BMzRWR53lMu2uaMYV2mA==/109951166609630672.jpg",
          pic_str: "109951166609630672",
        },
        id: 1894094482,
        name: "漠河舞厅·2022",
        ar: [{ name: "柳爽" }],
      },
    ],
    isShowTab: true, //是否展示tabbar
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //播放按钮
    detailShow: false, //歌曲详情页的显示
    lyricList: {}, //歌词
    currentTime: 0, //当前时间
    duration: 0, //歌曲总时间
    isFooterMusic: true,
    isLogin: false, //判断是否登录
    token: "",
    user: {}, //用户信息
  },
  getters: {},
  mutations: {
    updateIsbtnShow(state, value) {
      state.isbtnShow = value;
    },
    updatePlayList(state, value) {
      state.playList = value;
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList(state, value) {
      state.lyricList = value;
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
    },
    updateDuration(state, value) {
      state.duration = value;
    },
    //将搜索点击的音乐插入到数组的最后
    pushPlayList(state, value) {
      state.playList.push(value);
    },
    updateIsLogin(state, value) {
      state.isLogin = true;
    },
    updateToken(state, value) {
      state.token = value;
      localStorage.setItem("token", state.token);
    },
    updateUser(state, value) {
      state.user = value;
    },
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value);
      if (res.status == 200) context.commit("updateLyricList", res.data.lrc);
    },
    async   getLogin(context, value) {
      let res = await getPhoneLogin(value);
      if (res.status == 200) return res;
    },
  },
  modules: {},
});
