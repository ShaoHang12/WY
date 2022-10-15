<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="topContent">
      <van-search placeholder="Placeholder" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.topNav {
  width: 90%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topLeft {
    width: 0.4rem;
    height: 0.4rem;
  }
  .icon {
    width: 0.4rem;
    height: 0.4rem;
  }
  .topContent {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    .van-search {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
    }
    .active {
      font-weight: 900;
    }
  }
}
</style>
