<template>
  <div class="comment">
    <CommentTop />
    <CommentMain/>
  </div>
</template>

<script>
import CommentTop from "../../components/Comment/CommentTop.vue";
import CommentMain from "../../components/Comment/CommentMain.vue";
export default {
  components: { CommentTop, CommentMain },
};
</script>

<style lang="less" scoped>
</style>
