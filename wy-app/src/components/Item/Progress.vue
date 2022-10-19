<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { prefixStyle } from "@/common/js/dom";
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    percent(newPercent) {
      const progressBtnWidth = 16;
      /**拖动的时候，进度条不断往回跳。因为歌曲正在播放，percent在不断改变，
       * watch percent的时候又修改了进度条的宽度，所以会有冲突。我们需要在拖动的时候不被干扰
         解决方法：
        在watch的时候加个判断条件需要newPercent>=0并且在没有拖动的过程中才可以改变这个宽度. 
      */
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const offsetWidth = newPercent * barWidth;
        this._offset(offsetWidth);
      }
    },
  },
  created() {
    // 这个touch的作用用于在不同的回调里面需要共享一些数据的时候，把这些共享数据挂载到这个对象上
    this.touch = {};
  },
  methods: {
    //当touchStart触发的时候，给这个touch定个标志位叫initiated并设置为true，还要记录touch点击时候的位置以及已经滚动的进度条宽度
    progressTouchStart(e) {
      this.touch.initiated = true;
      // e.touches[0]表示第一个手指
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    //定义progressTouchMove方法:重新设置偏移量
    progressTouchMove(e) {
      const progressBtnWidth = 16;
      // 如果没有初始化就进入touchMove事件就return
      if (!this.touch.initiated) {
        return;
      }
      // 当前点击的位置和在touchStart的位置计算出在纵向的偏移量
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - progressBtnWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      this._offset(offsetWidth);
    },
    _offset(offsetWidth) {
      const transform = prefixStyle("transform");
      //代码重复 封装为该函数，减少代码重复率
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
    },
    //拖动结束后派发事件，即在progressTouchEnd中调用一个方法去派发事件
    progressTouchEnd() {
      // 重置为false
      this.touch.initiated = false;
      this._triggerPercent();
    },
    //首先获取barWidth以及当前的percent，然后派发事件percentChange，传递参数percent
    _triggerPercent() {
      const progressBtnWidth = 16;
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      // 派发当前的percent
      this.$emit("percentChange", percent);
    },
    //定义该事件：设置偏移量，可由e.offsetX获得，然后调用_triggerPercent方法派发事件
    progressClick(e) {
      // 设置偏移量
      this._offset(e.offsetX);
      // 去通知外层改变了多少percent
      this._triggerPercent();
    },
  },
};
</script>
<style lang="less" scoped>
.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 0.26rem;
    height: 0.06rem;
    background: rgba(0, 0, 0, 0.1);

    .progress {
      position: absolute;
      height: 100%;
      background: white;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -0.16rem;
      top: -0.26rem;
      width: 0.6rem;
      height: 0.6rem;

      .progress-btn {
        position: relative;
        top: 0.14rem;
        left: 0.14rem;
        box-sizing: border-box;
        width: 0.32rem;
        height: 0.32rem;
        border: 0.06rem solid white;
        border-radius: 50%;
        background: white;
      }
    }
  }
}
</style>
