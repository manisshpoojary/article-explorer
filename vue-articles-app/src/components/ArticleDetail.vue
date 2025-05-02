<template>
  <div v-if="article" class="article-detail">
    <h1 class="detail-title">{{ article.title }}</h1>
    <img v-if="article.hero" :src="article.hero" class="detail-hero" alt="hero" />
    <div class="subtitle">{{ article.subtitle }}</div>
    <div class="meta">
      <span>By {{ article.authorName }}</span>
      <span v-if="categoryName"> | {{ categoryName }}</span>
      <span v-if="article.tags && article.tags.length">
        | <span v-for="tag in article.tags" :key="tag" class="tag">#{{ tag }}</span>
      </span>
    </div>
    <div class="content">
      <p>{{ article.description || article.summary || 'No content available.' }}</p>
    </div>
  </div>
  <div v-else class="not-found">Article not found.</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const article = ref(null);
const categoryName = ref('');

onMounted(async () => {
  const resp = await fetch('/src/mock-data/homePage.json').then(r => r.json());
  const articles = resp.data.articles || [];
  article.value = articles.find(a => a.articleId === route.params.articleId);
  if (article.value) {
    const catResp = await fetch('/src/mock-data/categories.json').then(r => r.json());
    const categories = catResp.data.categories || [];
    const cat = categories.find(c => c.id === article.value.categoryId);
    categoryName.value = cat ? cat.name : '';
  }
});
</script>

<style scoped>
.article-detail {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(60,60,60,0.08);
  padding: 2em 1.5em;
  margin: 2em auto;
  max-width: 700px;
  text-align: left;
}
.detail-hero {
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1.2em;
}
h1 {
  margin: 0 0 0.2em 0;
  font-size: 2em;
  color: #222;
  font-weight: 700;
}
.subtitle {
  color: #6c757d;
  font-size: 1.1em;
  margin-bottom: 0.7em;
  font-weight: 500;
}
.meta {
  color: #2563eb;
  font-size: 1em;
  margin-bottom: 1.2em;
}
.tag {
  background: #e0e7ff;
  border-radius: 4px;
  padding: 0.2em 0.7em;
  margin-right: 0.5em;
  font-size: 0.92em;
  color: #3b82f6;
  font-weight: 500;
  display: inline-block;
}
.content {
  color: #444;
  font-size: 1.1em;
  margin-top: 1.5em;
}
.not-found {
  text-align: center;
  color: #e53e3e;
  margin: 3em 0;
  font-size: 1.3em;
}
.detail-title {
  margin: 0 0 0.5em 0;
  font-size: 2em;
  color: #222;
  font-weight: 700;
  text-align: left;
}
</style>
