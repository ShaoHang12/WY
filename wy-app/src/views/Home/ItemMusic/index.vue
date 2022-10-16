<template>
  <div>
    <ItemMusicTop :playlist="playlist" />
    <ItemMusicList :itemList="itemList" :subscribedCount="playlist.subscribedCount "/>
  </div>
</template>

<script>
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/Item/ItemMusicTop.vue";
import ItemMusicList from "../../../components/Item/ItemMusicList.vue";
export default {
  components: { ItemMusicTop, ItemMusicList },
  data() {
    return {
      playlist: {}, //歌单的详情页的数据
      itemList: [], //歌单的歌曲
    };
  },
  methods: {
    async getUseRote() {
      let id = this.$route.query.id;
      //   获取歌单详情页
      let res = await getMusicItemList(id);
      if (res.status == 200) this.playlist = res.data.playlist;
      //   获取歌单的歌曲
      let result = await getItemList({ id, limit: 10, offset: 0 });
      if (result.status == 200) this.itemList = result.data.songs;
      //   防止页面刷新，数据丢失，将数据保存到sessionStorage中
      sessionStorage.setItem("itemDetail", JSON.stringify(this.playlist));
    },
  },
  mounted() {
    this.getUseRote();
  },
};
</script>

<style></style>
