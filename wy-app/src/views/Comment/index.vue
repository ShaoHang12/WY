<template>
  <div class="comment">
    <CommentTop />
    <CommentMain/>
    <CommentFoot/>
  </div>
</template>

<script>
import CommentTop from "../../components/Comment/CommentTop.vue";
import CommentMain from "../../components/Comment/CommentMain.vue";
import CommentFoot from "@/components/Comment/CommentFoot.vue";
export default {
  components: { CommentTop, CommentMain, CommentFoot },
};
</script>

<style lang="less" scoped>
</style>
