<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
        <!-- 新鲜好物 -->
        <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
          <template #right>
            <XtxMore />
          </template>
          <p>面板的内容</p>
          <p>面板的内容</p>
          <p>面板的内容</p>
          <p>面板的内容</p>
        </HomePanel>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Home">
import HomeBanner from './components/home-banner.vue';
import HomeCategory from './components/home-category.vue';
import HomePanel from './components/home-panel.vue';
</script>

<style>
</style>