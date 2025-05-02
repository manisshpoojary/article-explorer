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
