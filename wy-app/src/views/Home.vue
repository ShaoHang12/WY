<template>
  <div>
    <Topnav/>
    <Swiper/>
    <IconList/>
    <MusicList/>
  </div>
</template>

<script>
import Topnav from "@/components/Home/Topnav.vue";
import Swiper from "@/components/Home/Swiper.vue";
import IconList from "@/components/Home/IconList.vue";
import MusicList from "@/components/Home/MusicList.vue";
export default {
  components: { Topnav, Swiper, IconList, MusicList },
};
</script>

<style></style>
