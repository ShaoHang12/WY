import Vue from "vue";
import Vuex from "vuex";

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

    playListIndex: 0,
    isbtnShow: true, //播放按钮
    detailShow: false,
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
    updatePlayList: function (state, value) {
      state.playList = value;
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
  },
  actions: {},
  modules: {},
});
