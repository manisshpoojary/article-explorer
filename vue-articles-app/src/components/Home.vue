<template>
  <div class="active-filters" v-if="activeFilters.length">
    <span v-for="filter in activeFilters" :key="filter.label" class="active-filter">
      {{ filter.label }}: <strong>{{ filter.value }}</strong>
      <span v-if="filter.label === 'Tag'" class="clear-icon" @click="clearTagFilter">✕</span>
      <span v-else-if="filter.label === 'Category'" class="clear-icon" @click="clearCategoryFilter">✕</span>
      <span v-else-if="filter.label === 'Author'" class="clear-icon" @click="clearAuthorFilter">✕</span>
      <span v-else-if="filter.label === 'Type'" class="clear-icon" @click="clearTypeFilter">✕</span>
    </span>
    <span class="clear-all" @click="clearAllFilters">
      <svg class="clear-all-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#2563eb"/><path d="M7 7L13 13M13 7L7 13" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      <span class="clear-all-text">Clear All</span>
    </span>
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

  // Update categories to use category objects for mapping
  const catResp = await fetch('/src/mock-data/categories.json').then(r => r.json());
  const categoryObjs = catResp.data.categories || [];
  categories.value = categoryObjs;

  // When mapping articles, add categoryName for display
  articles.value = articlesData.map(article => ({
    ...article,
    id: article.articleId,
    categoryName: (categoryObjs.find(c => c.id === article.categoryId) || {}).name || article.categoryId,
    title: article.title,
    subtitle: article.subtitle,
    hero: article.hero,
    categoryId: article.categoryId,
    authorId: article.authorId,
    authorName: article.authorName,
    type: article.articleType,
    tags: article.tags || []
  }));
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
    const cat = categories.value.find(c => c.id === filters.value.category);
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
  // Merge new filters with the current filters
  filters.value = { ...filters.value, ...newFilters };
  // Build params for route based on all active filters
  const params = {};
  if (filters.value.tag) params.tag = filters.value.tag;
  if (filters.value.category) params.categoryId = filters.value.category;
  if (filters.value.author) params.author = filters.value.author;
  // Prefer tag > category > author for route naming
  if (filters.value.tag) {
    router.push({ name: 'TagArticles', params });
  } else if (filters.value.category) {
    router.push({ name: 'CategoryArticles', params });
  } else if (filters.value.author) {
    router.push({ name: 'AuthorArticles', params });
  } else {
    router.push({ name: 'Home' });
  }
};

function clearTagFilter() {
  filters.value = { ...filters.value, tag: '' };
  // Remove tag from route params but keep others
  const params = {};
  if (filters.value.category) params.categoryId = filters.value.category;
  if (filters.value.author) params.author = filters.value.author;
  if (filters.value.type) params.type = filters.value.type;
  if (params.categoryId) {
    router.push({ name: 'CategoryArticles', params });
  } else if (params.author) {
    router.push({ name: 'AuthorArticles', params });
  } else if (params.type) {
    router.push({ name: 'Home', params });
  } else {
    router.push({ name: 'Home' });
  }
}

function clearCategoryFilter() {
  filters.value = { ...filters.value, category: '' };
  const params = {};
  if (filters.value.tag) params.tag = filters.value.tag;
  if (filters.value.author) params.author = filters.value.author;
  if (filters.value.type) params.type = filters.value.type;
  if (params.tag) {
    router.push({ name: 'TagArticles', params });
  } else if (params.author) {
    router.push({ name: 'AuthorArticles', params });
  } else if (params.type) {
    router.push({ name: 'Home', params });
  } else {
    router.push({ name: 'Home' });
  }
}

function clearAuthorFilter() {
  filters.value = { ...filters.value, author: '' };
  const params = {};
  if (filters.value.tag) params.tag = filters.value.tag;
  if (filters.value.category) params.categoryId = filters.value.category;
  if (filters.value.type) params.type = filters.value.type;
  if (params.tag) {
    router.push({ name: 'TagArticles', params });
  } else if (params.categoryId) {
    router.push({ name: 'CategoryArticles', params });
  } else if (params.type) {
    router.push({ name: 'Home', params });
  } else {
    router.push({ name: 'Home' });
  }
}

function clearTypeFilter() {
  filters.value = { ...filters.value, type: '' };
  const params = {};
  if (filters.value.tag) params.tag = filters.value.tag;
  if (filters.value.category) params.categoryId = filters.value.category;
  if (filters.value.author) params.author = filters.value.author;
  if (params.tag) {
    router.push({ name: 'TagArticles', params });
  } else if (params.categoryId) {
    router.push({ name: 'CategoryArticles', params });
  } else if (params.author) {
    router.push({ name: 'AuthorArticles', params });
  } else {
    router.push({ name: 'Home' });
  }
}

function clearAllFilters() {
  filters.value = { category: '', type: '', author: '', tag: '' };
  // Use router.replace to reset the route and trigger watcher
  router.replace({ name: 'Home' });
  // Optionally, reload data to ensure dropdowns update
  loadData();
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
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-left: 1.5em;
  color: #fff;
  background: linear-gradient(90deg, #2563eb 60%, #60a5fa 100%);
  border-radius: 999px;
  padding: 0.35em 1.3em 0.35em 1em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(60,60,60,0.10);
  border: none;
  outline: none;
}
.clear-all:hover {
  background: linear-gradient(90deg, #1d4ed8 60%, #3b82f6 100%);
  box-shadow: 0 4px 16px rgba(60,60,60,0.13);
}
.clear-all-icon {
  width: 1.2em;
  height: 1.2em;
  display: inline-block;
  vertical-align: middle;
}
.clear-all-text {
  vertical-align: middle;
  letter-spacing: 0.5px;
}
</style>