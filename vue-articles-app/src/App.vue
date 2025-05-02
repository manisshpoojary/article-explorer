<script setup>
import { ref, computed, onMounted } from 'vue';
import ArticleList from './components/ArticleList.vue';
import FilterBar from './components/FilterBar.vue';
import VuePullRefresh from 'vue-pull-refresh';

const articles = ref([]);
const categories = ref([]);
const authors = ref([]);
const types = ref([]);
const tags = ref([]);
const filters = ref({ category: '', type: '', author: '', tag: '' });

const loadData = async () => {
  const [articleData, categoryData] = await Promise.all([
    fetch('/article.json').then(r => r.json()),
    fetch('/categories.json').then(r => r.json()),
  ]);
  articles.value = articleData;
  categories.value = categoryData.categories || [];
  // Extract authors, types, tags from articles
  authors.value = [...new Set(articleData.map(a => a.author))];
  types.value = [...new Set(articleData.map(a => a.type))];
  tags.value = [...new Set(articleData.flatMap(a => a.tags || []))];
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

const refreshArticles = async (done) => {
  await loadData();
  done();
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
    <vue-pull-refresh @refresh="refreshArticles">
      <ArticleList :articles="filteredArticles" />
    </vue-pull-refresh>
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
