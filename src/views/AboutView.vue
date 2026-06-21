<template>
  <div class="about-container">
    <!--  临时调试：显示 pages 数组内容和匹配结果 -->
    <div v-if="!aboutPage" style="color: red; padding: 20px;">
      <p>❌ 未找到 about 页面</p>
      <p>pages 数量: {{ pages.length }}</p>
      <p>pages slugs: {{ pages.map(p => p.slug) }}</p>
    </div>

    <component v-else :is="aboutPage.component" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { pages } from '../utils/posts'

const aboutPage = computed(() =>
    pages.find(p => p.slug === 'about') || null
)
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
}
</style>