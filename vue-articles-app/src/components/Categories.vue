<template>
  <div class="page">
    <h2>Categories</h2>
    <ul class="category-list">
      <li v-for="cat in categories" :key="cat" class="category-item">
        {{ cat }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const categories = ref([]);

onMounted(async () => {
  const resp = await fetch('/src/mock-data/categories.json').then(r => r.json());
  categories.value = resp.categories || [];
});
</script>

<style scoped>
.page {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  padding: 2em 1.5em;
  margin: 2em auto;
  max-width: 600px;
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
}
.category-item:last-child {
  border-bottom: none;
}
</style>
