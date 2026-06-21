<template>
  <!-- ✅ 顶部返回导航 -->
  <div class="post-header">
    <mdui-button
        variant="text"
        icon="arrow_back"
        @click="$router.back()"
        class="back-btn"
    >
      返回
    </mdui-button>

    <h1 v-if="currentPost" class="post-title">{{ currentPost.title }}</h1>
  </div>

  <article class="post-content-wrapper">
    <component
        :is="currentPost?.component"
        v-if="currentPost"
        class="post-content"
    />
    <div v-else class="loading">加载中...</div>
  </article>

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
.post-header {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 调整 MDUI 按钮的样式细节 */
.back-btn {
  --mdui-button-text-color: var(--text-secondary, #666);
  font-weight: 500;
}

.back-btn:hover {
  --mdui-button-text-color: var(--accent, #3b82f6);
}

.post-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary, #333);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 文章内容区布局 */
.post-content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px 32px;
  padding-right: 280px; /* 给右侧目录留空间 */
  min-width: 0;
}

.post-content { line-height: 1.8; font-size: 1rem; }

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

@media (max-width: 1200px) {
  .post-content-wrapper { padding-right: 20px; }
}
</style>