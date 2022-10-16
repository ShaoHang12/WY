<template>
  <div class="tab">
    <div
      class="tab_item"
      v-for="(item, index) in tabBarImg"
      :key="index"
      @click="switchToTab(item.path)"
    >
      <img :src="$route.path === item.path ? item.icon : item.normal" alt="" />
      <span :class="$route.path === item.path ? 'active' : ''">{{
        item.title
      }}</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "Tabbar",
  data() {
    return {
      tabBarImg: [
        {
          path: "/home",
          normal: require("@/assets/TabbarIcons/Home.jpg"),
          icon: require("@/assets/TabbarIcons/HomeActive.jpg"),
          title: "首页",
        },
        {
          path: "/my",
          normal: require("@/assets/TabbarIcons/My.jpg"),
          icon: require("@/assets/TabbarIcons/MyActive.jpg"),
          title: "我的",
        },
      ],
    };
  },
  methods: {
    switchToTab(path) {
      console.log(path);
      this.$router.replace(path);
    },
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  .tab {
    width: 100%;
    height: 8vh;
    display: flex;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    background: #fff;
    z-index: 999;
  }
  .tab_item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    font-weight: 500;
     img {
      width: 30px;
      height: 30px;
    }
    .active {
      color: #FF0000;
    }
  }
}
</style>
