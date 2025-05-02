<template>
  <FilterBar
    :categories="categories"
    :authors="authors"
    :types="types"
    :tags="tags"
    @filter-change="onFilterChange"
  />
  <ArticleList :articles="filteredArticles" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ArticleList from './ArticleList.vue';
import FilterBar from './FilterBar.vue';

const articles = ref([]);
const categories = ref([]);
const authors = ref([]);
const types = ref([]);
const tags = ref([]);
const filters = ref({ category: '', type: '', author: '', tag: '' });

const loadData = async () => {
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
    tags: article.tags || []
  }));
  categories.value = [...new Set(articlesData.map(a => a.categoryId))];
  authors.value = [...new Set(articlesData.map(a => a.authorId))];
  types.value = [...new Set(articlesData.map(a => a.articleType))];
  // Fix: Only show unique tags, flattening all tags from all articles
  tags.value = [...new Set(articlesData.flatMap(a => a.tags || []))];
};

const filteredArticles = computed(() => {
  return articles.value.filter(article => {
    const { category, type, author, tag } = filters.value;
    return (
      (!category || article.categoryId === category) &&
      (!type || article.type === type) &&
      (!author || article.authorId === author) &&
      (!tag || (article.tags && article.tags.includes(tag)))
    );
  });
});

const onFilterChange = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters };
};

onMounted(loadData);
</script>

<style scoped>
/* Add your styles here */
</style>