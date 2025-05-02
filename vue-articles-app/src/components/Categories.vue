<template>
  <div class="page">
    <h2>Categories</h2>
    <input
      v-model="search"
      class="category-search"
      type="text"
      placeholder="Search categories..."
    />
    <ul class="category-list">
      <li
        v-for="cat in filteredCategories"
        :key="cat.id"
        class="category-item"
        @click="goToCategory(cat.id)"
        tabindex="0"
        @keyup.enter="goToCategory(cat.id)"
      >
        <span class="cat-name">{{ cat.name }}</span>
        <span class="cat-count">({{ getArticleCount(cat.id) }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const categories = ref([]);
const articles = ref([]);
const search = ref('');
const router = useRouter();

onMounted(async () => {
  const catResp = await fetch('/src/mock-data/categories.json').then(r => r.json());
  categories.value = catResp.data.categories || [];
  const artResp = await fetch('/src/mock-data/homePage.json').then(r => r.json());
  articles.value = artResp.data.articles || [];
});

const filteredCategories = computed(() => {
  if (!search.value) return categories.value;
  return categories.value.filter(cat =>
    cat.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

function getArticleCount(categoryId) {
  return articles.value.filter(a => a.categoryId === categoryId).length;
}

function goToCategory(categoryId) {
  router.push({ name: 'CategoryArticles', params: { categoryId } });
}
</script>

<style scoped>
.page {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  padding: 2em 1.5em;
  margin: 2em auto;
}
.category-search {
  width: 350px;
  max-width: 100%;
  display: block;
  margin: 0 auto 1.2em auto;
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 1px solid #e0e7ff;
  font-size: 1.08em;
  outline: none;
  transition: border 0.2s;
}
.category-search:focus {
  border: 1.5px solid #2563eb;
}
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.category-item {
  padding: 0.7em 1em;
  border-bottom: 1px solid #f0f0f0;
  font-size: 1.1em;
  color: #2563eb;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.18s, color 0.18s;
}
.category-item:hover, .category-item:focus {
  background: #e0e7ff;
  color: #1d4ed8;
}
.category-item:last-child {
  border-bottom: none;
}
.cat-name {
  flex: 1;
}
.cat-count {
  color: #64748b;
  font-size: 0.98em;
  margin-left: 0.7em;
}
</style>
