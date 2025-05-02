<script setup>
import { ref, computed, onMounted } from 'vue';
import ArticleList from './components/ArticleList.vue';
import FilterBar from './components/FilterBar.vue';

const articles = ref([]);
const categories = ref([]);
const authors = ref([]);
const types = ref([]);
const tags = ref([]);
const filters = ref({ category: '', type: '', author: '', tag: '' });
const isRefreshing = ref(false);

const loadData = async () => {
  // Load mock home page data
  const homePageResp = await fetch('/src/mock-data/homePage.json').then(r => r.json());
  const articlesData = homePageResp.data.articles;
  articles.value = articlesData.map(article => ({
    id: article.articleId,
    title: article.title,
    subtitle: article.subtitle,
    hero: article.hero,
    categoryId: article.categoryId,
    authorId: article.authorId,
    type: article.articleType,
    tags: article.tags
  }));
  // Extract unique categories, authors, types, and tags from articles
  categories.value = [...new Set(articlesData.map(a => a.categoryId))];
  authors.value = [...new Set(articlesData.map(a => a.authorId))];
  types.value = [...new Set(articlesData.map(a => a.articleType))];
  tags.value = [...new Set(articlesData.flatMap(a => a.tags || []))];
};

const filteredArticles = computed(() => {
  return articles.value.filter(article => {
    const { category, type, author, tag } = filters.value;
    return (
      (!category || article.category === category) &&
      (!type || article.type === type) &&
      (!author || article.author === author) &&
      (!tag || (article.tags && article.tags.includes(tag)))
    );
  });
});

const onFilterChange = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters };
};

const refreshArticles = async () => {
  isRefreshing.value = true;
  await loadData();
  setTimeout(() => { isRefreshing.value = false; }, 500); // Simulate refresh time
};

onMounted(loadData);
</script>

<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="/vite.svg" alt="Logo" />
      <span class="navbar-title">Article Explorer</span>
    </div>
    <div class="navbar-links">
      <a href="#" class="active">Home</a>
      <a href="#">Categories</a>
      <a href="#">Tags</a>
      <a href="#">About</a>
    </div>
  </nav>
  <div>
    <FilterBar
      :categories="categories"
      :authors="authors"
      :types="types"
      :tags="tags"
      @filter-change="onFilterChange"
    />
    <button @click="refreshArticles" :disabled="isRefreshing">
      <span v-if="isRefreshing">Refreshing...</span>
      <span v-else>Refresh</span>
    </button>
    <ArticleList :articles="filteredArticles" />
  </div>
</template>

<style scoped>
.navbar {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7em 2em;
  border-radius: 0 0 16px 16px;
  margin-bottom: 2em;
}
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.7em;
}
.navbar-logo img {
  width: 36px;
  height: 36px;
}
.navbar-title {
  font-size: 1.3em;
  font-weight: 700;
  color: #3b82f6;
  letter-spacing: 1px;
}
.navbar-links {
  display: flex;
  gap: 1.5em;
}
.navbar-links a {
  color: #222;
  text-decoration: none;
  font-weight: 500;
  font-size: 1em;
  padding: 0.2em 0.5em;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
}
.navbar-links a.active, .navbar-links a:hover {
  background: #e0e7ff;
  color: #2563eb;
}
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.7em 1em;
    gap: 0.7em;
  }
  .navbar-links {
    gap: 1em;
  }
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
