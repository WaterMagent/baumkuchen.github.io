<template>
  <!-- ✅ 移除原来的 grid 布局，改为单列 -->
  <article class="post-content-wrapper">
    <component
        :is="currentPost?.component"
        v-if="currentPost"
        class="post-content"
    />
    <div v-else class="loading">加载中...</div>
  </article>

  <!-- ✅ TOC 组件独立放置，不受父容器约束 -->
  <ArticleToc v-if="currentPost" container-selector=".post-content" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { allPosts } from '../utils/posts'
import ArticleToc from '../components/ArticleToc.vue'

const route = useRoute()
const currentPost = computed(() =>
    allPosts.find(p => p.slug === route.params.slug)
)
</script>

<style scoped>
.post-content-wrapper {
  max-width: 800px;       /* 文章主体宽度 */
  margin: 0 auto;         /* 水平居中 */
  padding: 32px 20px;

  /* ✅ 关键：右侧留出 280px 空间给固定的目录 */
  padding-right: 280px;
  min-width: 0;
}

.post-content {
  line-height: 1.8;
  font-size: 1rem;
}

/* 锚点偏移，避免跳转后标题被顶部导航遮挡 */
.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  scroll-margin-top: 100px;
}

.loading {
  text-align: center;
  padding: 60px 0;
  color: var(--text-secondary);
}

/*  小屏幕取消右侧留白 */
@media (max-width: 1200px) {
  .post-content-wrapper {
    padding-right: 20px;
  }
}
</style>