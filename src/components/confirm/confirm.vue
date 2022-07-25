<script lang="ts" setup name="XtxConfirm">
// 不能使用全局组件 button 就导进来使用局部组件
import XtxButton from "@/components/button/index.vue";
import { onMounted, ref } from "vue";
defineProps<{
  title: string;
  text: string;
  cancelCallback: () => void;
  confirmCallback: () => void;
}>();

const isShow = ref(false);

// 加一个宏任务延迟, 等 DOM 完全渲染出来后, 在修改变量, 让 DOM 渲染
setTimeout(() => {
  isShow.value = true;
}, 0);
</script>
<template>
  <!-- 可以通过 transition 加动画, 但是只能控制整体的动画, 无法让对话框和背景分开执行动画  -->
  <!-- 为了优化用户体验, 可以选择使用 css 动画 -->
  <!-- <Transition name="fade-in-out"> -->
  <div class="xtx-confirm" :class="{ active: isShow }">
    <div class="wrapper" :class="{ active: isShow }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <XtxButton size="mini" type="gray" @click="cancelCallback">取消</XtxButton>
        <XtxButton size="mini" type="primary" @click="confirmCallback">确认</XtxButton>
      </div>
    </div>
  </div>
  <!-- </Transition> -->
</template>

<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  // background: rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0);
  &.active {
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    transform: translate(-50%, -65%);
    opacity: 0;
    &.active {
      opacity: 1;
      transition: all 0.3s;
      transform: translate(-50%, -50%);
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
