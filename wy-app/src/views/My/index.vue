<template>
  <div class="infoUser">
    <TopNav />
    <MyCenter/>
  </div>
</template>

<script>
import TopNav from "@/components/Home/Topnav";
import MyCenter from "@/components/My/MyCenter.vue";
export default {
  mounted(){
    this.$store.state.isShowTab = true;
  },
  components: { TopNav, MyCenter},
};
</script>
