<template>
  <div class="active-filters" v-if="activeFilters.length">
    <span v-for="filter in activeFilters" :key="filter.label" class="active-filter">
      {{ filter.label }}: <strong>{{ filter.value }}</strong>
      <span v-if="filter.label === 'Tag'" class="clear-icon" @click="clearTagFilter">✕</span>
      <span v-else-if="filter.label === 'Category'" class="clear-icon" @click="clearCategoryFilter">✕</span>
      <span v-else-if="filter.label === 'Author'" class="clear-icon" @click="clearAuthorFilter">✕</span>
      <span v-else-if="filter.label === 'Type'" class="clear-icon" @click="clearTypeFilter">✕</span>
    </span>
    <span class="clear-all" @click="clearAllFilters">Clear All</span>
  </div>
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
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ArticleList from './ArticleList.vue';
import FilterBar from './FilterBar.vue';

const route = useRoute();
const router = useRouter();
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
    authorName: article.authorName,
    type: article.articleType,
    tags: article.tags || []
  }));
  categories.value = [...new Set(articlesData.map(a => a.categoryId))];
  authors.value = [...new Set(articlesData.map(a => a.authorName))];
  types.value = [...new Set(articlesData.map(a => a.articleType))];
  tags.value = [...new Set(articlesData.flatMap(a => a.tags || []))];

  // Set filter from route if present
  if (route.params.tag) {
    filters.value = { ...filters.value, tag: route.params.tag };
  } else if (route.params.categoryId) {
    filters.value = { ...filters.value, category: route.params.categoryId };
  } else if (route.params.author) {
    filters.value = { ...filters.value, author: route.params.author };
  } else {
    filters.value = { category: '', type: '', author: '', tag: '' };
  }
};

// Watch for route changes to update filters
watch(() => route.params, () => {
  loadData();
});

const filteredArticles = computed(() => {
  return articles.value.filter(article => {
    const { category, type, author, tag } = filters.value;
    return (
      (!category || article.categoryId === category) &&
      (!type || article.type === type) &&
      (!author || article.authorName === author) &&
      (!tag || (article.tags && article.tags.includes(tag)))
    );
  });
});

const activeFilters = computed(() => {
  const filtersArr = [];
  if (filters.value.category) {
    // Map categoryId to name
    const cat = categories.value.find(c => c === filters.value.category || c.id === filters.value.category);
    filtersArr.push({ label: 'Category', value: cat?.name || filters.value.category });
  }
  if (filters.value.type) {
    filtersArr.push({ label: 'Type', value: filters.value.type });
  }
  if (filters.value.author) {
    filtersArr.push({ label: 'Author', value: filters.value.author });
  }
  if (filters.value.tag) {
    filtersArr.push({ label: 'Tag', value: filters.value.tag });
  }
  return filtersArr;
});

const onFilterChange = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters };
  // Update the route to reflect the selected filter
  if (newFilters.tag) {
    router.push({ name: 'TagArticles', params: { tag: newFilters.tag } });
  } else if (newFilters.category) {
    router.push({ name: 'CategoryArticles', params: { categoryId: newFilters.category } });
  } else if (newFilters.author) {
    router.push({ name: 'AuthorArticles', params: { author: newFilters.author } });
  } else {
    router.push({ name: 'Home' });
  }
};

function clearTagFilter() {
  filters.value = { ...filters.value, tag: '' };
  router.push({ name: 'Home' });
}

function clearCategoryFilter() {
  filters.value = { ...filters.value, category: '' };
  router.push({ name: 'Home' });
}

function clearAuthorFilter() {
  filters.value = { ...filters.value, author: '' };
  router.push({ name: 'Home' });
}

function clearTypeFilter() {
  filters.value = { ...filters.value, type: '' };
  router.push({ name: 'Home' });
}

function clearAllFilters() {
  filters.value = { category: '', type: '', author: '', tag: '' };
  router.push({ name: 'Home' });
}

onMounted(loadData);
</script>

<style scoped>
/* Add your styles here */
.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-bottom: 1em;
  font-size: 1.08em;
}
.active-filter {
  background: #e0e7ff;
  color: #2563eb;
  border-radius: 6px;
  padding: 0.3em 1em;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(60,60,60,0.04);
}
.clear-icon {
  margin-left: 0.5em;
  cursor: pointer;
  color: #2563eb;
  font-weight: bold;
  font-size: 1.1em;
  transition: color 0.2s;
}
.clear-icon:hover {
  color: #1d4ed8;
}
.clear-all {
  margin-left: 1.5em;
  color: #fff;
  background: #2563eb;
  border-radius: 6px;
  padding: 0.2em 1em;
  font-size: 0.98em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 3px rgba(60,60,60,0.08);
}
.clear-all:hover {
  background: #1d4ed8;
}
</style>