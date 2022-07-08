<script lang="ts" setup name="HomePanel">
// 标题和子标题应该有父组件传递进来，不能写死
defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
        <!-- 插槽处理，右侧的查看全部和面板具体的内容不应该写死 -->
        <!-- <XtxMore to="/"></XtxMore> -->
        <!-- 具名插槽 -->
        <slot name="right"></slot>
      </div>
      <!-- 默认的内容插槽 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang="less">
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>