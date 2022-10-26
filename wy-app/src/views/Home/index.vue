<template>
  <div>
    <Topnav />
    <Swiper />
    <IconList />
    <MusicList />
    <FootMusic />
  </div>
</template>

<script>
import Topnav from "@/components/Home/Topnav.vue";
import Swiper from "@/components/Home/Swiper.vue";
import IconList from "@/components/Home/IconList.vue";
import MusicList from "@/components/Home/MusicList.vue";
import FootMusic from "@/components/Item/FootMusic.vue";
export default {
  components: { Topnav, Swiper, IconList, MusicList, FootMusic },
  mounted() {
    this.$store.state.isFooterMusic = true;
    const key = 'commentBack'
    if (localStorage.getItem(key) === '1') {
      this.$store.state.isShowTab = false;
      localStorage.removeItem(key);
    } else {
      this.$store.state.isShowTab = true;
    }
  }
};
</script>

<style></style>
