<template>
  <div id="app">
    <router-view></router-view>
    <tabbar v-if="$store.state.isShowTab"/>
  </div>
</template>

<script>
import Tabbar from "./components/Currency/Tabbar.vue";
import FootMusic from "./components/Item/FootMusic.vue";
export default {
  name: "app",
  created: function () {
    this.$router.push("/");
  },
  components: {
    Tabbar,
    FootMusic,
  },
};
</script>
<style>
*{
  margin: 0;
  padding: 0;
  color: black;
}
</style>
